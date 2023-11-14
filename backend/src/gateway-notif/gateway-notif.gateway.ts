import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { CreateGatewayNotifDto } from './dto/create-gateway-notif.dto';
import { Server, Socket } from 'socket.io';
// , { cors: '*' }
@WebSocketGateway(8001, { cors: { origin: '*' } })
export class GatewayNotifGateway {
  private userSocketMap = new Map<string, Socket>();

  @WebSocketServer()
  server: Server;

  // printUserSocketMapContents() {
  //   for (const [userId, socket] of this.userSocketMap) {
  //     console.log(`User ID: ${userId}, Socket ID: ${socket.id}`);
  //   }
  // }

  handleConnection(client: Socket, ...args: any[]) {
    // Access userId from the query parameter
    const userId = client.handshake.query.userId as string;

    // Store the mapping between userId and socket
    this.userSocketMap.set(userId, client);
    // this.printUserSocketMapContents();
  }

  @SubscribeMessage('newNotif')
  newNotification(
    @MessageBody() body: CreateGatewayNotifDto,
    @ConnectedSocket() sender: Socket,
  ) {
    const recipientSocket = this.userSocketMap.get(body.userId);
    if (recipientSocket) {
      recipientSocket.emit('newNotif', body);
    }
  }
}
