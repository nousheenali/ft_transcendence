import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GatewayNotifService } from './gateway-notif.service';
import { CreateGatewayNotifDto } from './dto/create-gateway-notif.dto';
import { UpdateGatewayNotifDto } from './dto/update-gateway-notif.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { cors: '*' })
export class GatewayNotifGateway {
  private userSocketMap = new Map<string, Socket>();
  constructor(private readonly gatewayNotifService: GatewayNotifService) {}

  @WebSocketServer()
  server: Server;

  printUserSocketMapContents() {
    for (const [userId, socket] of this.userSocketMap) {
      console.log(`User ID: ${userId}, Socket ID: ${socket.id}`);
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    // Access userId from the query parameter
    const userId = client.handshake.query.userId as string;

    console.log('New connection: ', client.id);

    // Store the mapping between userId and socket
    this.userSocketMap.set(userId, client);
    this.printUserSocketMapContents();
  }

  @SubscribeMessage('newNotif')
  newNotification(
    @MessageBody() body: CreateGatewayNotifDto,
    @ConnectedSocket() sender: Socket,
  ) {
    const recipientSocket = this.userSocketMap.get(body.userId);
    console.log('recipientSocket: ', body);
    if (recipientSocket) {
      recipientSocket.emit('newNotif', body);
    }
    return this.gatewayNotifService.newNotification();
  }
}
