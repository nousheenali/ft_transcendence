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
import { GameService, Player } from './game.service';
import { GameState } from './model/game-state.model';

@WebSocketGateway({ namespace: '/game' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly gameService: GameService,
    private readonly gameRoomService: GameRoomService,
  ) {}

  // Handle a new player connection
  handleConnection(client: Socket) {
    const username = client.handshake.query.username;
    if (!Array.isArray(username)) {
      this.gameService.addPlayer(client.id, username);
    }
    console.log(`Player connected: ${client.id} --- ${username}`);
    this.server.to(client.id).emit('connected');
  }

  handleDisconnect(client: Socket) {
    // Handle player disconnection
    this.gameService.removePlayer(client.id);
    console.log(`Player disconnected: ${client.id}`);
  }

  @SubscribeMessage('addToQueue')
  handleFindMatch(client: Socket, worldWidth: number, worldHeight: number) {
    this.gameService.addToQueue(client.id);
    const players: Player[] | null = this.gameService.matchQueuedPlayers();

    if (players !== null) {
      const player1 = players[0];
      const player2 = players[1];
      const roomID = this.gameRoomService.createGameRoom(player1, player2);
      this.server.to(player1.id).emit('matched', roomID);
      this.server.to(player2.id).emit('matched', roomID);
      const initialVelocity = { x: 5, y: 2 };
    }
  }
  @SubscribeMessage('playerReady')
  handleplayerReady(client: Socket) {
    this.gameService.playerReady(client.id);
    this.server.to(client.id).emit('ready');
  }

  @SubscribeMessage('initBallVelocity')
  handleInitBallVelocity(client: Socket, roomID: string) {
    const gameRoom: GameRoom = this.gameRoomService.getGameRoom(roomID);
    const player1 = gameRoom.players[0];
    const player2 = gameRoom.players[1];
    const initialVelocity = { x: 100, y: 70 };
    if (player1.readyToStart && player2.readyToStart) {
      this.server.to(player1.id).emit('initialVelocity', initialVelocity);
      this.server.to(player2.id).emit('initialVelocity', initialVelocity);
    }
  }

  @SubscribeMessage('updateBallPosition')
  handleBallPosition(client: Socket, obj) {
    const gameRoom: GameRoom = this.gameRoomService.getGameRoom(obj.roomID);
    const player1 = gameRoom.players[0];
    const player2 = gameRoom.players[1];
    this.server.to(player1.id).emit('ballMove', obj.x, obj.y);
    this.server.to(player2.id).emit('ballMove', obj.x, obj.y);
  }

  // @SubscribeMessage('updatePaddle')
  // handleUpdatePaddle(client: Socket, paddleY: number) {
  // if (client.id === 'player1') {
  //   this.gameState.paddle1Y = paddleY;
  // } else if (client.id === 'player2') {
  //   this.gameState.paddle2Y = paddleY;
  // }

  // Broadcast the updated game state to all clients
  // this.server.emit('gameStateUpdate', this.gameState);
  // }
  // const player1 = this.gameService.getQueuedPlayer();
  // if (!player1) {
  //   console.log(`Player added to queue ${client.id}`);
  // } else {
  //   const player2 = this.gameService.getPlayer(client.id);
  //   // const roomId = this.gameRoomService.createGameRoom(player1, player2);
  //   console.log(`Matched players...`);
  //   this.server.to(player1.id).emit('matched', player1.name, player2.name);
  //   this.server.to(player2.id).emit('matched', player1.name, player2.name);
  // }

  // //to prevent string|string[] error, we do this check
  // if (!Array.isArray(username)) {
  //   // console.log(`Player connected: ${client.id} --- ${username}`);
  //   const player1ID = this.gameService.getQueuedPlayer();

  //   if (!player1ID) {
  //     this.gameService.addToQueue(client, username);
  //     console.log(`Player added to queue ${client.id}`);
  //   } else {
  //     // const player1 = this.playersService.getPlayer(player1ID);
  //     // const player2 = this.playersService.getPlayer(client.id);
  //     // const roomId = this.gameRoomService.createGameRoom(player1, player2);
  //     // console.log(`Matched players...`);
  //     // this.server.to(player1ID).emit('matched', player1.name, player2.name);
  //     // this.server.to(player2.id).emit('matched', player1.name, player2.name);
  //   }
  // }
  // }

  // @SubscribeMessage('updateSpritePosition')
  // handleSpritePosition(client: Socket, spriteData: any) {
  //   client.broadcast.emit('syncSpritePosition', spriteData);
  // }
}
