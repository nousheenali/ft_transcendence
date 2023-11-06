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

@WebSocketGateway(8005, { cors: { origin: 'http://10.11.1.8:3000' } })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly playerService: PlayerService,
    private readonly gameRoomService: GameRoomService,
  ) {}

  // Handle a new player connection
  handleConnection(client: Socket) {
    const username = client.handshake.query.username;
    if (!Array.isArray(username)) {
      this.playerService.addPlayer(client, username);
    }
    console.log(`Player connected: ${client.id} --- ${username}`);
    this.server.to(client.id).emit('connected');
  }

  handleDisconnect(client: Socket) {
    // Handle player disconnection
    const player = this.playerService.getPlayerByID(client.id);
    if (player.gameRoom) {
      const gameRoom = this.gameRoomService.getGameRoom(player.gameRoom);

      // Get the ID of the other player
      const otherPlayer =
        gameRoom.players[0].id === client.id
          ? gameRoom.players[1]
          : gameRoom.players[0];
      // Emit a game over event to the other player and disconnect them
      if (!gameRoom.gameOver) {
        this.server
          .to(otherPlayer.id)
          .emit('gameOver', 'Other Player Disconnected', otherPlayer.name);
        otherPlayer.socketInfo.disconnect(true);
      }
    }
    this.playerService.removePlayer(client.id);
    console.log(`Player disconnected: ${client.id}`);
  }

  @SubscribeMessage('addToQueue')
  handleFindMatch(client: Socket, data: any) {
    this.playerService.addToQueue(client.id, data.width, data.height);
    const players: Player[] | null = this.playerService.matchQueuedPlayers();

    if (players !== null) {
      const p1 = players[0];
      const p2 = players[1];
      const roomID = this.gameRoomService.createGameRoom(p1, p2);
      const room = this.gameRoomService.getGameRoom(roomID);

      this.server
        .to(p1.id)
        .emit(
          'matched',
          roomID,
          p1.name,
          p2.name,
          room.worldWidth,
          room.worldHeight,
        );
      this.server
        .to(p2.id)
        .emit(
          'matched',
          roomID,
          p1.name,
          p2.name,
          room.worldWidth,
          room.worldHeight,
        );
    }
  }

  @SubscribeMessage('matchFriend')
  handleMatchFriend(client: Socket, data: any) {
    const p1: Player = this.playerService.getPlayerByID(client.id);
    const p2: Player = this.playerService.getPlayerByName(data.friendName);

    if (p1 && p2) {
      const roomID = this.gameRoomService.createGameRoom(p1, p2);
      const room = this.gameRoomService.getGameRoom(roomID);
      this.server
        .to(p1.id)
        .emit(
          'matched',
          roomID,
          p1.name,
          p2.name,
          room.worldWidth,
          room.worldHeight,
        );
      this.server
        .to(p2.id)
        .emit(
          'matched',
          roomID,
          p1.name,
          p2.name,
          room.worldWidth,
          room.worldHeight,
        );
    }
  }

  @SubscribeMessage('updateSpritePositions')
  handleSpritePositions(client: Socket, data: any) {
    const gameRoom: GameRoom = this.gameRoomService.getGameRoom(data.roomID);
    gameRoom.ballWidth = data.ballWidth;
    gameRoom.paddleWidth = data.paddleWidth;
    gameRoom.paddleHeight = data.paddleHeight;
    gameRoom.ballPosition.x = data.ballPosition.x;
    gameRoom.ballPosition.y = data.ballPosition.y;
    gameRoom.players[0].position.x = data.p0Position.x;
    gameRoom.players[0].position.y = data.p0Position.y;
    gameRoom.players[1].position.x = data.p1Position.x;
    gameRoom.players[1].position.y = data.p1Position.y;
  }

  @SubscribeMessage('playerReady')
  handleplayerReady(client: Socket) {
    this.playerService.playerReady(client.id);
    this.server.to(client.id).emit('ready');
  }

  @SubscribeMessage('initSettings')
  handleInitBallVelocity(client: Socket, roomID: string) {
    const gameRoom: GameRoom = this.gameRoomService.getGameRoom(roomID);

    // const initialiseData = { velocityX: 100, velocityY: 70, controls};
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
        gm.ballPosition.x += gm.ballVelocity.x;
        gm.ballPosition.y += gm.ballVelocity.y;

        // Handle collision on right paddle
        const buffer = gm.paddleWidth / 3; // this required otherwise ball skids through the wall
        if (gm.ballPosition.x > gm.worldWidth - buffer - gm.paddleWidth) {
          if (
            gm.ballPosition.y >=
              gm.players[0].position.y - gm.paddleHeight / 2 - buffer &&
            gm.ballPosition.y <=
              gm.players[0].position.y + gm.paddleHeight / 2 + buffer &&
            gm.ballVelocity.x > 0 // This is included so that the ball doesn't get stuck inside the paddle
          ) {
            gm.ballVelocity.x *= -1;
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
            gm.ballVelocity.x *= -1;
          }
        }

        // Handle wall collisions
        if (gm.ballPosition.x < buffer) {
          gm.ballVelocity.x *= -1; // Reverse the x velocity for left and right wall
          gm.players[0].score += 1;
          if (gm.players[0].score === 7) {
            gm.gameOver = true;
            this.server
              .to(gm.players[0].id)
              .emit('gameOver', 'Game Over!', gm.players[0].name);
            this.server
              .to(gm.players[1].id)
              .emit('gameOver', 'Game Over!', gm.players[0].name);
            gm.players[0].socketInfo.disconnect(true);
            gm.players[1].socketInfo.disconnect(true);
          }
        }
        if (gm.ballPosition.x > gm.worldWidth - buffer) {
          gm.ballVelocity.x *= -1;
          gm.players[1].score += 1;
          if (gm.players[1].score === 7) {
            gm.gameOver = true;
            this.server
              .to(gm.players[0].id)
              .emit('gameOver', 'Game Over!', gm.players[1].name);
            this.server
              .to(gm.players[1].id)
              .emit('gameOver', 'Game Over!', gm.players[1].name);
            gm.players[0].socketInfo.disconnect(true);
            gm.players[1].socketInfo.disconnect(true);
          }
        }
        if (
          gm.ballPosition.y < buffer ||
          gm.ballPosition.y > gm.worldHeight - buffer
        ) {
          gm.ballVelocity.y *= -1; // Reverse the y velocity for top and bottom walls
        }
        this.server
          .to(gm.players[0].id)
          .emit(
            'updateBallPosition',
            gm.ballPosition,
            gm.players[0].score,
            gm.players[1].score,
          );
        this.server
          .to(gm.players[1].id)
          .emit(
            'updateBallPosition',
            gm.ballPosition,
            gm.players[0].score,
            gm.players[1].score,
          );
      }
    }
  }

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
