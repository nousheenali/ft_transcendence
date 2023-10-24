import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlayersService } from './players/players.service';


@WebSocketGateway({ namespace: '/game' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor (private readonly playersService: PlayersService){}

  // Handle a new player connection
  handleConnection(client: Socket) {

    const username = client.handshake.query.username;
    //to prevent string|string[] error, we do this check
    if (!Array.isArray(username)) {
      this.playersService.addPlayer(client, username);
    }
    console.log(`Player connected: ${client.id}`);
    // this.server
    //   .to(client.id)
    //   .emit('connected', 'Connected to the WebSocket server');
  }

  handleDisconnect(client: Socket) {
    // Handle player disconnection
    this.playersService.removePlayer(client.id);
    console.log(`Player disconnected: ${client.id}`);
  }
}
