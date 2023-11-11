/**
 * TODO:
 * ===========
 * # when the socket connect to the server:
 * 1. check if the user any relation with any channel, if so, join the user to the all the channels
 *   that he has relation with.
 *
 * # When the socket disconnect from the server:
 * 1. check if the user has any relation with any channel, if so, leave the user from all the channels rooms
 *  that he has relation with.
 * ===============================================================================================================
 */

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
import { ChannelService } from './../channel/channel.service';
import { ChannelRelationService } from './../channel/channel-relation.service';
import { UserService } from './../user/user.service';
import chalk from 'chalk';
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
    private readonly channelRelationService: ChannelRelationService,
    private readonly userService: UserService,
    private readonly channelService: ChannelService,
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

    // ❂➤ If the user login is undefined or null, return
    if (userLogin === undefined || userLogin === null) return;

    // ❂➤ Logging the new connection
    this.logger.log(
      chalk.blue('New Client connected: id => ') +
        chalk.magenta(client.id) +
        chalk.blue(' name => ') +
        chalk.green(userLogin),
    );

    // ❂➤ Joining the user's room at connection
    this.roomsService.joinRoom(userLogin, userLogin, client, 'USERS');

    // ❂➤ Get all the channels that the user has relation with
    const user = await this.userService.getUserByLogin(userLogin);
    const joinedChannels = await this.channelRelationService.findUserChannels(
      user.id,
    );
    const channelsRooms = joinedChannels.map((channel) => {
      return channel.channel.channelName + channel.channel.channelType;
    });

    // ❂➤ Joining the user to all the channels rooms again
    channelsRooms.forEach((room) => {
      this.roomsService.joinRoom(room, userLogin, client, 'CHANNELS');
    });
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

      // ❂➤ Printing the rooms array to the console for debugging
      this.roomsService.printAllRooms();
      console.log(
        chalk.greenBright('Message To: ') +
          chalk.blue(`[${data.receiver}]`) +
          chalk.white(' => ') +
          chalk.yellow(data.message),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** ================================================================================================
   * ❂➤ Handling JoinChannel event by subscribing to the event "JoinChannel" then:
   * 1. join the client's socket to the channel room
   * 2. emit the message to the channel room to notify the other users that the user has joined the
   *    channel
   * 3. add the user to the channel's members by creating a channel relation in the database between
   *    the user and the channel.
   */

  @SubscribeMessage('JoinChannel')
  async joinChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { channelName: string; channelType: string },
  ) {
    const { channelName, channelType } = data;
    if (channelType === 'PRIVATE') {
      console.log(chalk.red('PRIVATE CHANNEL NOT IMPLEMENTED YET'));
      return;
    }

    /**-------------------------------------------------------------------------**/
    const userLogin = client.handshake.query.userLogin as string;
    if (userLogin === undefined || userLogin === null) return;

    // ❂➤ get the user and the channel from the database
    const user = await this.userService.getUserByLogin(userLogin);
    const channel = await this.channelService.getChannelByName(channelName);
    /**-------------------------------------------------------------------------**/

    // ❂➤ get the channel room
    const channelRoom = this.roomsService.getRoom(
      channelName + channelType,
      'CHANNELS',
    );
    /**-------------------------------------------------------------------------**/

    // ❂➤join the user socket to the channel room
    this.roomsService.joinRoom(channelRoom.name, userLogin, client, 'CHANNELS');

    // ❂➤ Emitting the message to the channel room to notify the other users that the user has joined the channel
    this.server.to(channelRoom.name).emit('JoinChannel', {
      newJoiner: user.name,
      channelName: channelName,
      channelType: channelType,
    });

    /**-------------------------------------------------------------------------**/

    // ❂➤ create channel relation in the database between the user and the channel
    await this.channelRelationService.createChannelRelation({
      userId: user.id,
      channelId: channel.id,
    });

    /**-------------------------------------------------------------------------**/
    // ❂➤ Printing the rooms array to the console for debugging
    this.roomsService.printAllRooms();
  }

  /** ================================================================================================
   * ❂➤ Handling creating room for the channel when creating new channel by subscribing to the event
   * "CreateChannel" then:
   * 1. create the channel room
   * 2. join the client's socket to the channel room
   */
  @SubscribeMessage('CreateChannel')
  async createChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { channelName: string; channelType: string; creator: string },
  ) {
    const creatorData = await this.userService.getUserById(data.creator);
    console.log(creatorData);
    const { channelName, channelType, creator } = data;
    // ❂➤ create the channel room
    this.roomsService.createRoom(
      channelName + channelType,
      creatorData.login,
      'CHANNELS',
    );
    // ❂➤ get the created channel's room
    const channelRoom = this.roomsService.getRoom(
      channelName + channelType,
      'CHANNELS',
    );
    // ❂➤ join the client's socket to the channel room
    this.roomsService.joinRoom(
      channelRoom.name,
      creatorData.login,
      client,
      'CHANNELS',
    );

    /**-------------------------------------------------------------------------**/
    // ❂➤ Printing the rooms array to the console for debugging
    this.roomsService.printAllRooms();
  }
  /** ================================================================================================
   * ❂➤ Handling LeaveChannel event by subscribing to the event "LeaveChannel" then:
   * 1. leave the client's socket from the channel room
   * 2. emit the message to the channel room to notify the other users that the user has left the
   *   channel
   * 3. remove the user from the channel's members by deleting the channel relation in the database
   *   between the user and the channel.
   */
  @SubscribeMessage('LeaveChannel')
  async leaveChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { channelName: string; channelType: string; creator: string },
  ) {
    const {channelName, channelType, creator} = data
    const creatorLogin = client.handshake.query.userLogin as string;
    console.log(creatorLogin);
    if (creatorLogin === undefined || creatorLogin === null) return;
    const channelRoom = this.roomsService.getRoom(
      channelName + channelType,
      'CHANNELS',
    );
    this.roomsService.leaveRoom(channelRoom.name, creatorLogin, client, 'CHANNELS');

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

    // ❂➤ Get the channel room, then join the user to the channel room
    const channelRoom = this.roomsService.getRoom(roomName, 'CHANNELS');
    this.roomsService.joinRoom(channelRoom.name, userLogin, client, 'CHANNELS');

    // ❂➤ Emitting the message to the channel room
    this.server.to(channelRoom.name).emit('ServerToChannel', data);

    // ❂➤ Creating the message in the database
    await this.userMessagesService.createChannelMessage(data);

    // ❂➤ Printing the rooms array to the console for debugging
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
      chalk.red('The client with id of ') +
        chalk.magenta(client.id) +
        chalk.red(' has been disconnected!!'),
    );
    this.chatService.updateUserStatus(userLogin, false);
  }
  //================================================================================================
}
