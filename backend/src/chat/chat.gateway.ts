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
//================================================================================================
// ❂➤ Map that will store the users that are connected to
// the websocket server, the key will be the login of the
// user and the value will be the socketId
export const usersMap = new Map<string | string[], string>(); // key: username, value: socketId
//================================================================================================
// ❂➤ Array that will store the rooms that are created
type UserLoginType = string | string[];
export const roomsArray: UserLoginType[] = []; // (room name) = (useLogin)
//================================================================================================
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

//================================================================================================
// ❂➤ cors: { origin: 'http://localhost:3000' }: This is to allow
// the frontend to connect to the websocket server
@WebSocketGateway({ cors: { origin: 'http://localhost:3000' } })
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
  // ❂➤ Handling connection by subscribing to the event "connection" and adding the user to the
  // (usersMap) and (roomsArray) and join the user's room.
  //================================================================================================
  @SubscribeMessage('connection')
  async handleConnection(@ConnectedSocket() client: Socket) {
    const userLogin = client.handshake.query.userLogin;
    this.logger.log(
      `New Client connected: id => ${client.id} name => ${userLogin}`,
    );
    // Add the user to the (usersMap) and (roomsArray) and join the user's room
    if (userLogin) {
      usersMap.set(userLogin, client.id);
      client.join(userLogin);
      if (roomsArray.indexOf(userLogin) == -1) roomsArray.push(userLogin);
    }
    
    console.log('--------------------------------------------');
    console.log("[" + usersMap.size + "] users connected");
    console.log(`usersMap: => ${[...usersMap.entries()]}`);
    console.log("[" + roomsArray.length + "] rooms exists");
    console.log(`roomsMap: => ${roomsArray}`);
    console.log('--------------------------------------------');
  }

  //================================================================================================
  // ❂➤ Handling event by subscribing to the event "ClientToServer" and returning the message
  // to the receiver room, if the room doesn't exist it will be created, and adding it to the
  // (roomsArray)
  //================================================================================================
  @SubscribeMessage('ClientToServer')
  async sendToUser(@MessageBody() data: onConnection) {
    const userRoom = roomsArray.find((room) => room === data.receiver);
    if (userRoom === undefined) {
      if (roomsArray.indexOf(data.receiver) == -1)
        roomsArray.push(data.receiver);
    }
    this.server.to(userRoom).emit('ServerToClient', data);
  }

  //================================================================================================
  // ❂➤ Handling disconnection
  //================================================================================================
  handleDisconnect(client: Socket) {
    this.logger.log(
      `The client with id of ${client.id} has been disconnected!!`,
    );
  }
  //================================================================================================
}
