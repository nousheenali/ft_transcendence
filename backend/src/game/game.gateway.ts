import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameRoom, GameRoomService } from './game-room/game-room.service';
import { PlayerService, Player } from './player/player.service';
import { GameLogicService } from './game-logic/game-logic.service';
import { GameService } from './game.service';
import { UserService } from 'src/user/user.service';
import { GameDto } from './dto/game.dto';
import { GameStatus } from '@prisma/client';

@WebSocketGateway(8005, { cors: { origin: 'http://localhost:3000' } })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly playerService: PlayerService,
    private readonly gameRoomService: GameRoomService,
    private readonly gameLogicService: GameLogicService,
    private readonly gamePrismaService: GameService,
    private readonly userService: UserService,
  ) {}

  // Handle a new player connection
  handleConnection(client: Socket) {
    const username = client.handshake.query.username;
    if (!Array.isArray(username)) {
      this.playerService.addPlayer(client, username);
      this.userService.updateUserGameStatus(username, true);
    }
    console.log(`Player connected to game: ${client.id} --- ${username}`);
  }

  // Handle player disconnection
  handleDisconnect(client: Socket) {
    const plyr = this.playerService.getPlayerByID(client.id);
    this.playerService.removeFromQueue(plyr.id);
    if (plyr.gameRoom != null) {
      const gm = this.gameRoomService.getGameRoom(plyr.gameRoom);
      if (gm) {
        if (gm.players.length === 2) {
          const otherPlyr =
            gm.players[0].id === client.id ? gm.players[1] : gm.players[0];
          if (!gm.gameOver)
            this.gameLogicService.updateResults(
              this.server,
              gm,
              otherPlyr,
              plyr,
            );
        } else {
          //if invited user hasn't joined the room yet
          this.gamePrismaService.updateGameEntry(
            gm.roomID,
            GameStatus.FINISHED,
            null,
            null,
          );
          this.gameRoomService.removeGameRoom(gm.roomID);
        }
      }
    }
    this.userService.updateUserGameStatus(plyr.name, false);
    this.playerService.removePlayer(client.id);
    console.log(`Player disconnected from game: ${client.id}`);
  }

  //when user joins a queue
  @SubscribeMessage('addToQueue')
  async handleFindMatch(client: Socket, data: any) {
    this.playerService.addToQueue(client.id, data.width, data.height);
    console.log(`Player added to queue: ${client.id}`);
    const players: Player[] | null = this.playerService.matchQueuedPlayers();

    if (players !== null) {
      const p0 = players[0];
      const p1 = players[1];
      const data = {
        userLogin: p0.name,
        opponentLogin: p1.name,
        gameStatus: GameStatus.LIVE,
      };
      const roomID = await this.gamePrismaService.createGameEntry(data);
      const room = this.gameRoomService.createGameRoom(roomID, p0, p1);
      this.gameLogicService.sendJoiningInformation(this.server, room, p0, p1);
    }
  }

  //when a user is waiting for a friend to join
  @SubscribeMessage('createWaitingRoom')
  async handleCreateWaitingRoom(client: Socket, data: any) {
    const player: Player = this.playerService.getPlayerByID(client.id);
    if (player) {
      player.worldWidth = data.width;
      player.worldHeight = data.height;
      const input: GameDto = {
        userLogin: player.name,
        opponentLogin: data.friendName,
        gameStatus: GameStatus.WAITING,
      };
      const roomID = await this.gamePrismaService.createGameEntry(input);
      this.gameRoomService.createWaitingRoom(roomID, player);
      console.log(`Player in waiting room: ${client.id} ${roomID}`);
    }
  }

  @SubscribeMessage('joinWaitingRoom')
  async handleJoinWaitingRoom(client: Socket, data: any) {
    const player: Player = this.playerService.getPlayerByID(client.id);
    if (player) {
      player.worldWidth = data.width;
      player.worldHeight = data.height;
      const player2: Player = this.playerService.getPlayerByName(data.inviter);
      const roomID = player2.gameRoom;
      if (!data.accept) {
        console.log("INVITATION DECLINED")
        player.socketInfo.disconnect();
        this.server.to(player2.socketInfo.id).emit('invitationDeclined');
        return;
      }
      if (roomID) {
        const room = this.gameRoomService.joinWaitingRoom(roomID, player);
        this.gamePrismaService.updateGameEntry(
          roomID,
          GameStatus.LIVE,
          null,
          null,
        );
        console.log('WAITING ROOM LOOKS LIKE', room);
        this.gameLogicService.sendJoiningInformation(
          this.server,
          room,
          room.players[0],
          room.players[1],
        );
        console.log(`Player joined waiting room: ${client.id}`);
      } //if inviter disconnects before invitee joins
      else
        this.server
          .to(client.id)
          .emit('gameOver', 'Other Player Disconnected', null);
    }
  }

  //initial positions of all sprites
  @SubscribeMessage('updateSpritePositions')
  handleSpritePositions(client: Socket, data: any) {
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
  handleBallPosition(client: any, data) {
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
            this.gameLogicService.emitHitPaddle(gm, this.server);
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
            this.gameLogicService.emitHitPaddle(gm, this.server);
            gm.ballVelocity.x *= -1;
            gm.ballPosition.y += gm.ballVelocity.y;
          }
        }

        // Handle wall collisions
        if (gm.ballPosition.x < buffer) {
          this.gameLogicService.emitHitPaddle(gm, this.server);
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
        if (gm.ballPosition.x > gm.worldWidth - buffer) {
          this.gameLogicService.emitHitPaddle(gm, this.server);
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
        if (
          gm.ballPosition.y < buffer ||
          gm.ballPosition.y > gm.worldHeight - buffer
        ) {
          this.gameLogicService.emitHitPaddle(gm, this.server);
          gm.ballVelocity.y *= -1; // Reverse the y velocity for top and bottom walls
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
