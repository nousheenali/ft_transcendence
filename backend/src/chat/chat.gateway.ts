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
import { Message } from './types';
import { RoomsService } from './rooms.service';

//================================================================================================
// // ❂➤ Array that will store the rooms that are created
// type UserLoginType = string | string[];
// export const roomsArray: UserLoginType[] = []; // (room name) = (useLogin)
//================================================================================================
// ❂➤ cors: { origin: 'http://10.11.3.8:3000' }: This is to allow
// the frontend to connect to the websocket server
@WebSocketGateway({ cors: { origin: 'http://10.11.3.8:3000' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}
  private roomsService: RoomsService = new RoomsService();
  //================================================================================================
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
  @SubscribeMessage('connect')
  async handleConnection(@ConnectedSocket() client: Socket) {
    // ❂➤ Extractin the user login from the handshake's query
    const userLogin = client.handshake.query.userLogin as string;
    if (userLogin === undefined) return;
    this.logger.log(
      `New Client connected: id => ${client.id} name => ${userLogin}`,
    );

    // ❂➤ Joining the user's room at connection
    this.roomsService.joinRoom(userLogin, userLogin, client, 'USERS');
    this.roomsService.printAllRooms();
  }

  //================================================================================================
  /**
   * ❂➤ Handling event by subscribing to the event "ClientToServer" and emitting the message
   * to the receiver room.
   */
  @SubscribeMessage('ClientToServer')
  async sendToUser(@MessageBody() data: Message) {
    this.server.to(data.receiver).emit('ServerToClient', data);
  }

  //================================================================================================
  /**
   * ❂➤ Handling event by subscribing to the event "ChannelToServer" and emitting the message
   * to the channel room.
   */
  @SubscribeMessage('ChannelToServer')
  async sendToChannel(
    @MessageBody() data: Message,
    @ConnectedSocket() client: Socket,
  ) {
    const userLogin = client.handshake.query.userLogin as string;
    if (userLogin === undefined) return;
    const roomName = data.channel + data.channelType;
    this.roomsService.joinRoom(roomName, userLogin, client, 'CHANNELS');
    this.server.to(data.channel).emit('ServerToChannel', data);
    console.log('Channel: [' + data.channel + '] => ' + data.message);
  }
  //================================================================================================
  /**
   * ❂➤ Handling disconnection
   */
  handleDisconnect(client: Socket) {
    this.logger.log(
      `The client with id of ${client.id} has been disconnected!!`,
    );
  }
  //================================================================================================
}
