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
    try {
      const login = client.handshake.query.login;
      const username = client.handshake.query.username;
      if (!Array.isArray(login) && !Array.isArray(username)) {
        this.playerService.addPlayer(client, login, username);
        this.userService.updateUserGameStatus(login, true);
      }
      this.logger.log(
        chalk.cyan(
          `Player connected to game: id => ${client.id} LOGIN => ${login}`,
        ),
      );
    } catch (error) {
      throw new BadRequestException('Unable to connect user');
    }
  }

  /* Handle player disconnection */
  handleDisconnect(client: Socket) {
    const plyr = this.playerService.getPlayerBySocketID(client.id);
    if (!plyr) throw new NotFoundException('Player does not exist');

    try {
      this.playerService.removeFromQueue(plyr.id);
      if (plyr.gameRoom != null) {
        const gm = this.gameRoomService.getGameRoom(plyr.gameRoom);
        if (gm) {
          if (gm.players.length === 2) {
            const otherPlyr =
              gm.players[0].id === client.id ? gm.players[1] : gm.players[0];
            /* Only in case of a disconnection */
            if (!gm.gameOver) {
              this.gameLogicService.updateResults(
                this.server,
                gm,
                otherPlyr,
                plyr,
              );
            }
          } else {
            /* if invited user hasn't joined the room yet, then game entry is deleted */
            this.gamePrismaService.deleteGameEntry(gm.roomID);
            this.gameRoomService.removeGameRoom(gm.roomID);
          }
        }
      }
      this.userService.updateUserGameStatus(plyr.login, false);
      this.playerService.removePlayer(client.id);
      this.logger.log(
        chalk.gray(
          `Player disconnected from game: id => ${client.id} LOGIN => ${plyr.login}`,
        ),
      );
    } catch (error) {
      throw new BadRequestException('Unable to disconnect user');
    }
  }

  /* when user joins a queue */
  @SubscribeMessage('addToQueue')
  async handleFindMatch(client: Socket, data: WorldDimensions) {
    try {
      this.playerService.addToQueue(client.id, data.width, data.height);
      this.logger.log(`Player added to queue: id => ${client.id}`);
      const players: Player[] | null = this.playerService.matchQueuedPlayers();
      /* players will be null if it doesn't find 2 users in the queue */
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
        gameStatus: GameStatus.WAITING, //indicates waiting room
      };
      const roomID = await this.gamePrismaService.createGameEntry(input);
      this.gameRoomService.createWaitingRoom(roomID, player);
      this.logger.log(
        `Player in waiting: ROOM => ${roomID}  LOGIN => ${player.login}`,
      );
    } catch (error) {
      throw new BadRequestException('Unable to create waiting room.');
    }
  }

  /* On receiving the invitation the friend accepts or rejects the request */
  @SubscribeMessage('joinWaitingRoom')
  async handleJoinWaitingRoom(client: Socket, data: JoinWaitingRoom) {
    const player: Player = this.playerService.getPlayerBySocketID(client.id);
    if (!player) throw new NotFoundException('Invitee Player does not exist');

    const player2: Player = this.playerService.getPlayerByLogin(data.inviter);
    if (!player2) {
      /* if inviter disconnects before invitee joins */
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
          /* When game invitation is accepted, the invitee joins the waiting room and game is LIVE */
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
            this.logger.log(
              `Player joined waiting ROOM => ${roomID}  LOGIN => ${player.login}`,
            );
          }
        }
      } catch (error) {
        throw new BadRequestException('Unable to join waiting room');
      }
    }
  }

  /* initial positions of all sprites */
  @SubscribeMessage('updateSpritePositions')
  handleSpritePositions(client: Socket, data: UpdateSpritePositions) {
    const gameRoom: GameRoom = this.gameRoomService.getGameRoom(data.roomID);
    this.gameLogicService.spritePositions(gameRoom, data);
  }

  /* Sets readytoSTartt flag to 'true' indicating 'space' button has benn pressed */
  @SubscribeMessage('playerReady')
  handleplayerReady(client: Socket) {
    this.playerService.playerReady(client.id);
    this.server.to(client.id).emit('ready');
  }

  /* setting ball position and assigning keyboard controls */
  @SubscribeMessage('initSettings')
  handleInitBallVelocity(client: Socket, roomID: string) {
    const gameRoom: GameRoom = this.gameRoomService.getGameRoom(roomID);
    try {
      /* Game starts only when both players press space bar */
      if (
        gameRoom.players[0].readyToStart &&
        gameRoom.players[1].readyToStart
      ) {
        gameRoom.gameStarted = true;
        /* Player 0 is assigned arrows as controls */
        this.server.to(gameRoom.players[0].id).emit('initialise', {
          x: gameRoom.ballPosition.x,
          y: gameRoom.ballPosition.y,
          controls: 'arrows',
        });
        /* Player 1 is assigned W,S keys as controls */
        this.server.to(gameRoom.players[1].id).emit('initialise', {
          x: gameRoom.ballPosition.x,
          y: gameRoom.ballPosition.y,
          controls: 'ws',
        });
      }
    } catch (error) {
      throw new BadRequestException('Unable to assign controls to users');
    }
  }

  /* Changes Ball Position */
  @SubscribeMessage('ballPosition')
  handleBallPosition(client: Socket, data) {
    const gm: GameRoom = this.gameRoomService.getGameRoom(data.roomID);

    if (gm && !gm.gameOver) {
      if (gm.players[0].readyToStart && gm.players[1].readyToStart) {
        this.gameLogicService.updateBallPosition(gm, data.delta);
        this.gameLogicService.emitBallPosition(gm, this.server);
        const buf = gm.paddleWidth / 3; // this required otherwise ball skids through the wall

        /* Handle paddle collisions */
        if (gm.ballPosition.x > gm.worldWidth - buf - gm.paddleWidth)
          this.gameLogicService.rightPaddleCollision(this.server, gm, buf);
        if (gm.ballPosition.x < buf + gm.paddleWidth)
          this.gameLogicService.leftPaddleCollision(this.server, gm, buf);

        /* Handle wall collisions */
        if (gm.ballPosition.x < buf && gm.ballVelocity.x < 0)
          this.gameLogicService.leftWallCollision(this.server, gm, buf);
        if (gm.ballPosition.x > gm.worldWidth - buf && gm.ballVelocity.x > 0)
          this.gameLogicService.rightWallCollision(this.server, gm, buf);

        /* top wall */
        if (gm.ballPosition.y < buf && gm.ballVelocity.y < 0)
          this.gameLogicService.topBottomWallCollision(this.server, gm, buf);
        /* bottom wall */
        if (gm.ballPosition.y > gm.worldHeight - buf && gm.ballVelocity.y > 0)
          this.gameLogicService.topBottomWallCollision(this.server, gm, buf);

        /* change ball speed */
        // if (
        //   gm.players[0].score + gm.players[1].score === 4 ||
        //   gm.players[0].score + gm.players[1].score === 8
        // )
        //   this.gameLogicService.increaseBallSpeed(gm);
      }
    }
  }

  /*  tracking paddle movement */
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
