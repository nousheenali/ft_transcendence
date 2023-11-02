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
import { RoomsService } from './rooms.service';

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

//================================================================================================
// ❂➤ cors: { origin: 'http://10.11.3.8:3000' }: This is to allow
// the frontend to connect to the websocket server
@WebSocketGateway({ cors: { origin: 'http://10.11.3.8:3000' } })
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
    if (userLogin === undefined) return;
    this.logger.log(
      `New Client connected: id => ${client.id} name => ${userLogin}`,
    );
    client.join(userLogin);
    if (roomsArray.indexOf(userLogin) == -1) roomsArray.push(userLogin);

    console.log('--------------------------------------------');
    console.log('[' + roomsArray.length + '] rooms exists');
    console.log(`roomsMap: => ${roomsArray}`);
    console.log('--------------------------------------------');
  }

  //================================================================================================
  // ❂➤ Handling event by subscribing to the event "ClientToServer" and returning the message
  // to the receiver room, if the room doesn't exist it will be created, and adding it to the
  // (roomsArray)
  //================================================================================================
  @SubscribeMessage('ClientToServer')
  async sendToUser(@MessageBody() data: Message) {
    //-----------------------------------------------------------------------------
    //Note: The receiver will have a room when he connects to the websocket server
    // so this is only for testing purposes
    const userRoom = roomsArray.find((room) => room === data.receiver);
    if (userRoom === undefined) {
      if (roomsArray.indexOf(data.receiver) == -1)
        roomsArray.push(data.receiver);
    }
    console.log('userRoom ---->', userRoom);
    console.log('data.receiver ---->', data.receiver);
    //-----------------------------------------------------------------------------

    this.server.to(data.receiver).emit('ServerToClient', data);
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
