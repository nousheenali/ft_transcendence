import {
  MessageBody,
  SubscribeMessage,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { SocketMessage } from './types';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { RoomsService } from './rooms.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserMessagesService } from '../user/user-messages/user-messages.service';
import {
  HttpException,
  HttpStatus,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
/**╭──🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼
 * │ ❂➤ Array that will store the rooms that are created
 * │ type UserLoginType = string | string[];
 * │ export const roomsArray: UserLoginType[] = []; // (room name) = (useLogin)
 * │ ========================================================================================== **
 * │ ❂➤ cors: { origin: 'http://localhost:3000' }: This is to allow
 * │ the frontend to connect to the websocket server
 * ╰──========================================================================================= **/

@WebSocketGateway({ cors: { origin: process.env.NEXT_PUBLIC_GATEWAY_URL } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatService: ChatService,
    private readonly userMessagesService: UserMessagesService,
  ) {}
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

  /** ================================================================================================
   * ❂➤ Handling connection by subscribing to the event "connection" and adding the user to the
   * (usersMap) and (roomsArray) and join the user's room.
   * ================================================================================================*/
  @SubscribeMessage('connect')
  async handleConnection(@ConnectedSocket() client: Socket) {
    // ❂➤ Extracting the user login from the handshake's query
    const userLogin = client.handshake.query.userLogin as string;
    // ❂➤ changing the user status in the database
    this.chatService.updateUserStatus(userLogin, true);

    if (userLogin === undefined || userLogin === null) return;
    this.logger.log(
      `New Client connected: id => ${client.id} name => ${userLogin}`,
    );

    // ❂➤ Joining the user's room at connection
    // this.roomsService.joinRoom(userLogin, userLogin, client, 'USERS');
    this.roomsService.createRoom(userLogin, userLogin, 'USERS');
    this.server.in(client.id).socketsJoin(userLogin);
  }

  /** ================================================================================================
   * ❂➤ Handling event by subscribing to the event "ClientToServer" and emitting the message
   * to the receiver room.
   */
  @SubscribeMessage('ClientToServer')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      skipUndefinedProperties: false,
      exceptionFactory: (errors) => {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints),
        );
        return new WsException(errorMessages);
      },
    }),
  )
  async sendToUser(@MessageBody() data: CreateChatDto) {
    try {
      const receiverRoom = this.roomsService.getRoom(data.receiver, 'USERS');

      // ❂➤ Emitting the message to the receiver room
      this.server.to(receiverRoom.name).emit('ServerToClient', data);

      // ❂➤ Creating the message in the database
      await this.userMessagesService.createUserMessage(data);

      this.roomsService.printAllRooms();
      console.log('Message To: [' + data.receiver + '] => ' + data.message);

    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** ================================================================================================
   * ❂➤ Handling event by subscribing to the event "ChannelToServer" and emitting the message
   * to the channel room.
   */

  /**
   * ================================================================================================
   * TODO:
   * ===========
   * [IMPORTANT]
   * ===========
   *     ❂➤ Try to join the channel at the moment when youL
   *          - accept the invitation to the private channel
   *          - Joined the public channel
   *          - Joined the private channel by entering the password correctly
   * ================================================================================================
   */
  @SubscribeMessage('ChannelToServer')
  async sendToChannel(
    @MessageBody() data: SocketMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const userLogin = data.sender;
    if (userLogin === undefined) return;
    const roomName = data.channel + data.channelType;

    // ❂➤ Creating the channel room if it doesn't exist and joining the user to it
    const channelRoom = this.roomsService.createRoom(
      roomName,
      userLogin,
      'CHANNELS',
    );
    this.server.in(client.id).socketsJoin(roomName);
    // this.roomsService.joinRoom(roomName, userLogin, client, 'CHANNELS');

    // ❂➤ Emitting the message to the channel room
    this.server.to(channelRoom.name).emit('ServerToChannel', data);
    this.roomsService.printAllRooms();
    console.log('Message To: [' + data.channel + '] => ' + data.message);
  }

  /** ================================================================================================
   * ❂➤ Handling disconnection
   */
  @SubscribeMessage('disconnect')
  handleDisconnect(client: Socket) {
    const userLogin = client.handshake.query.userLogin as string;
    this.logger.log(
      `The client with id of ${client.id} has been disconnected!!`,
    );
    this.chatService.updateUserStatus(userLogin, false);
  }
  //================================================================================================
}
