import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameRoomService } from './game-room/game-room.service';
import { PlayerService } from './player/player.service';
import { GameLogicService } from './game-logic/game-logic.service';
import { GameService } from './game.service';
import { UserService } from 'src/user/user.service';
import { GameDto } from './dto/game.dto';
import { GameStatus } from '@prisma/client';
import {
  GameOver,
  GameRoom,
  JoinWaitingRoom,
  Player,
  UpdateSpritePositions,
  WaitingRoom,
  WorldDimensions,
} from './types';
import { Console } from 'console';
import chalk from 'chalk';

@WebSocketGateway(8005, { cors: { origin: 'http://localhost:3000' } })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('GameGateway');

  constructor(
    private readonly playerService: PlayerService,
    private readonly gameRoomService: GameRoomService,
    private readonly gameLogicService: GameLogicService,
    private readonly gamePrismaService: GameService,
    private readonly userService: UserService,
  ) {}

  /*  Handle a new player connection */
  handleConnection(client: Socket) {
    const login = client.handshake.query.login;
    const username = client.handshake.query.username;
    if (!Array.isArray(login) && !Array.isArray(username)) {
      this.playerService.addPlayer(client, login, username);
      this.userService.updateUserGameStatus(login, true);
    }
    this.logger.log(chalk.cyanBright(`Player connected to game: ${client.id} -- ${login}`));
  }

  /* Handle player disconnection */
  handleDisconnect(client: Socket) {
    const plyr = this.playerService.getPlayerBySocketID(client.id);
    this.playerService.removeFromQueue(plyr.id);
    if (plyr.gameRoom != null) {
      const gm = this.gameRoomService.getGameRoom(plyr.gameRoom);
      if (gm) {
        if (gm.players.length === 2) {
          const otherPlyr =
            gm.players[0].id === client.id ? gm.players[1] : gm.players[0];
          if (!gm.gameOver)
            //in case of a disconnection
            this.gameLogicService.updateResults(
              this.server,
              gm,
              otherPlyr,
              plyr,
            );
        } else {
          //if invited user hasn't joined the room yet
          this.gamePrismaService.deleteGameEntry(gm.roomID);
          this.gameRoomService.removeGameRoom(gm.roomID);
        }
      }
    }
    this.userService.updateUserGameStatus(plyr.login, false);
    this.playerService.removePlayer(client.id);
    this.logger.log(
      chalk.red(`Player disconnected from game: ${client.id} -- ${plyr.login}`),
    );
  }

  /* when user joins a queue */
  @SubscribeMessage('addToQueue')
  async handleFindMatch(client: Socket, data: WorldDimensions) {
    try {
      this.playerService.addToQueue(client.id, data.width, data.height);
      this.logger.log(`Player added to queue: ${client.id}`);
      const players: Player[] | null = this.playerService.matchQueuedPlayers();
      if (players !== null) {
        const p0 = players[0];
        const p1 = players[1];
        const input = {
          userLogin: p0.login,
          opponentLogin: p1.login,
          gameStatus: GameStatus.LIVE,
        };
        const roomID = await this.gamePrismaService.createGameEntry(input);
        const room = this.gameRoomService.createGameRoom(roomID, p0, p1);
        this.gameLogicService.sendJoiningInformation(this.server, room, p0, p1);
      }
    } catch (error) {
      throw new BadRequestException('Unable to add player to queue.');
    }
  }

  /* when a user Invites a friend for a game. The inviter creates 
  a game-room and waits for the friend to join */
  @SubscribeMessage('createWaitingRoom')
  async handleCreateWaitingRoom(client: Socket, data: WaitingRoom) {
    const player: Player = this.playerService.getPlayerBySocketID(client.id);
    if (!player) throw new NotFoundException('Player does not exist');
    try {
      player.worldWidth = data.worldDimensions.width;
      player.worldHeight = data.worldDimensions.height;
      const input: GameDto = {
        userLogin: player.login,
        opponentLogin: data.invitee,
        gameStatus: GameStatus.WAITING, //waiting room
      };
      const roomID = await this.gamePrismaService.createGameEntry(input);
      this.gameRoomService.createWaitingRoom(roomID, player);
      this.logger.log(`Player in waiting room: ${client.id} ${roomID}`);
    } catch (error) {
      throw new BadRequestException('Unable to create waiting room.');
    }
  }

  /* On receiving the invitation the friend accepts or rejects the request */
  @SubscribeMessage('joinWaitingRoom')
  async handleJoinWaitingRoom(client: Socket, data: JoinWaitingRoom) {
    const player: Player = this.playerService.getPlayerBySocketID(client.id);
    if (!player) throw new NotFoundException('Player does not exist');
    const player2: Player = this.playerService.getPlayerByLogin(data.inviter);
    if (!player2) {
      this.server.to(client.id).emit('inviterDisconnected');
    } else {
      player.worldWidth = data.worldDimensions.width;
      player.worldHeight = data.worldDimensions.height;
      const roomID = player2.gameRoom;
      try {
        if (!data.accept) {
          this.server.to(player2.socketInfo.id).emit('invitationDeclined');
          this.server.to(player.socketInfo.id).emit('invitationDeclined');
        } else {
          if (roomID) {
            const room = this.gameRoomService.joinWaitingRoom(roomID, player);
            this.gamePrismaService.updateGameEntry(
              roomID,
              GameStatus.LIVE,
              null,
              null,
            );
            this.gameLogicService.sendJoiningInformation(
              this.server,
              room,
              room.players[0],
              room.players[1],
            );
            this.logger.log(`Player joined waiting room: ${client.id}`);
          } //if inviter disconnects before invitee joins
        }
      } catch (error) {
        throw new BadRequestException('Unable to join waiting room');
      }
    }
  }

  //initial positions of all sprites
  @SubscribeMessage('updateSpritePositions')
  handleSpritePositions(client: Socket, data: UpdateSpritePositions) {
    const gameRoom: GameRoom = this.gameRoomService.getGameRoom(data.roomID);
    this.gameLogicService.spritePositions(gameRoom, data);
  }

  @SubscribeMessage('playerReady')
  handleplayerReady(client: Socket) {
    this.playerService.playerReady(client.id);
    this.server.to(client.id).emit('ready');
  }

  //setting ball position and assigning keyboard controls
  @SubscribeMessage('initSettings')
  handleInitBallVelocity(client: Socket, roomID: string) {
    const gameRoom: GameRoom = this.gameRoomService.getGameRoom(roomID);
    gameRoom.gameStarted = true;
    if (gameRoom.players[0].readyToStart && gameRoom.players[1].readyToStart) {
      this.server.to(gameRoom.players[0].id).emit('initialise', {
        x: gameRoom.ballPosition.x,
        y: gameRoom.ballPosition.y,
        controls: 'arrows',
      });
      this.server.to(gameRoom.players[1].id).emit('initialise', {
        x: gameRoom.ballPosition.x,
        y: gameRoom.ballPosition.y,
        controls: 'ws',
      });
    }
  }

  @SubscribeMessage('ballPosition')
  handleBallPosition(client: Socket, data) {
    const gm: GameRoom = this.gameRoomService.getGameRoom(data.roomID);

    if (gm && !gm.gameOver) {
      if (gm.players[0].readyToStart && gm.players[1].readyToStart) {
        this.gameLogicService.updateBallPosition(gm);
        const buffer = gm.paddleWidth / 3; // this required otherwise ball skids through the wall

        // Handle collision on right paddle
        if (gm.ballPosition.x > gm.worldWidth - buffer - gm.paddleWidth) {
          if (
            gm.ballPosition.y >=
              gm.players[0].position.y - gm.paddleHeight / 2 - buffer &&
            gm.ballPosition.y <=
              gm.players[0].position.y + gm.paddleHeight / 2 + buffer &&
            gm.ballVelocity.x > 0 // This is included so that the ball doesn't get stuck inside the paddle
          ) {
            this.gameLogicService.emitHitPaddle(gm, this.server, true);
            gm.ballVelocity.x *= -1;
            gm.ballPosition.y += gm.ballVelocity.y;
          }
        }
        // Handle collison on left paddle
        if (gm.ballPosition.x < buffer + gm.paddleWidth) {
          if (
            gm.ballPosition.y >
              gm.players[1].position.y - gm.paddleHeight / 2 - buffer &&
            gm.ballPosition.y <
              gm.players[1].position.y + gm.paddleHeight / 2 + buffer &&
            gm.ballVelocity.x < 0
          ) {
            this.gameLogicService.emitHitPaddle(gm, this.server, true);
            gm.ballVelocity.x *= -1;
            gm.ballPosition.y += gm.ballVelocity.y;
          }
        }

        // Handle wall collisions
        if (gm.ballPosition.x < buffer && gm.ballVelocity.x < 0) {
          this.gameLogicService.emitHitPaddle(gm, this.server, false);
          gm.ballVelocity.x *= -1; // Reverse the x velocity for left and right wall
          gm.players[0].score += 1;
          if (gm.players[0].score === 7)
            this.gameLogicService.emitGameOver(
              gm,
              this.server,
              gm.players[0],
              gm.players[1],
            );
        }
        if (
          gm.ballPosition.x > gm.worldWidth - buffer &&
          gm.ballVelocity.x > 0
        ) {
          this.gameLogicService.emitHitPaddle(gm, this.server, false);
          gm.ballVelocity.x *= -1;
          gm.players[1].score += 1;
          if (gm.players[1].score === 7)
            this.gameLogicService.emitGameOver(
              gm,
              this.server,
              gm.players[1],
              gm.players[0],
            );
        }
        if (gm.ballPosition.y < buffer && gm.ballVelocity.y < 0) {
          this.gameLogicService.emitHitPaddle(gm, this.server, false);
          gm.ballVelocity.y *= -1; // Reverse the y velocity for top wall
        }

        if (
          gm.ballPosition.y > gm.worldHeight - buffer &&
          gm.ballVelocity.y > 0
        ) {
          this.gameLogicService.emitHitPaddle(gm, this.server, false);
          gm.ballVelocity.y *= -1; // Reverse the y velocity for bottom wall
        }

        //change ball speed
        // if (
        //   gm.players[0].score + gm.players[1].score === 4 ||
        //   gm.players[0].score + gm.players[1].score === 8
        // )
        //   this.gameLogicService.increaseBallSpeed(gm);
        this.gameLogicService.emitBallPosition(gm, this.server);
      }
    }
  }

  //tracking paddle movement
  @SubscribeMessage('movePaddle')
  handleMovePaddle(client: Socket, data) {
    const gameRoom: GameRoom = this.gameRoomService.getGameRoom(data.roomID);
    if (!gameRoom.gameOver) {
      if (client.id === gameRoom.players[0].id) {
        gameRoom.players[0].position.y = data.y;
        this.server
          .to(gameRoom.players[1].id)
          .emit('updateRemotePaddle', data.y, data.velocity);
      } else {
        gameRoom.players[1].position.y = data.y;
        this.server
          .to(gameRoom.players[0].id)
          .emit('updateRemotePaddle', data.y, data.velocity);
      }
    }
  }
}
