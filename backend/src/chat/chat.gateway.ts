import {
  MessageBody,
  SubscribeMessage,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
// ========================================================
// ❂➤ Map that will store the users that are connected to
// the websocket server, the key will be the login of the
// user and the value will be the socketId
export const usersMap = new Map<string, string>(); // key: username, value: socketId
export const roomsMap = new Map<string, string>(); // key: roomName, value: socketId

// ========================================================
interface Message {
  socketId: string;
  username: string;
  receiver: string;
  message: string;
}

interface onConnection {
  socketId: string;
  username: string;
  receiver: string;
}
// ========================================================
// ❂➤ cors: { origin: 'http://localhost:3000' }: This is to allow
// the frontend to connect to the websocket server
@WebSocketGateway({ cors: '*' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  // ❂➤ Initializing instance of the websocket server
  @WebSocketServer() server: Server;

  // ❂➤ Initializing logger
  private logger: Logger = new Logger('ChatGateway');

  // ❂➤ Initializing the gateway
  afterInit(server: Server) {
    this.logger.log('Chat GateWay has been initialized!!');
  }

  //================================================================================================
  // ❂➤ Trying to send message to a specific user
  //================================================================================================
  // ❂➤ Handling connection
  @SubscribeMessage('connection')
  async handleConnection(@ConnectedSocket() client: Socket) {
    const user = client.handshake.query.userLogin;
    this.logger.log(
      `New Client connected: id => ${client.id} name => ${user}`,
    );
  }

  // ❂➤ Handling event by subscribing to the event "ClientToServer" and returning the message
  // to the receiver room.
  @SubscribeMessage('ClientToServer')
  async sendToUser(@MessageBody() data: onConnection) {
    this.logger.log(`Server received: ${data}`);
    // Send the message to the user's room
    this.server.emit('ServerToClient', data);
    // if (roomsMap[data.receiver] === undefined) {
    //   console.log('User is not connected to the server');
    //   roomsMap.set(data.receiver, data.socketId);
    // }
    // this.server.to(roomsMap[data.receiver]).emit('ServerToClient', data);
    // console.log('from [ClientToServer] => roomsMap: => ', roomsMap);
  }

  //================================================================================================

  // ❂➤ Handling disconnection
  handleDisconnect(client: Socket) {
    this.logger.log(
      `The client with id of ${client.id} has been disconnected!!`,
    );
  }
}
