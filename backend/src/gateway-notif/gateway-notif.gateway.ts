import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import {
  CreateGatewayNotifDto,
  newLiveGameDto,
} from './dto/create-gateway-notif.dto';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocketAuthGuard } from 'src/auth/socket.guard';
// , { cors: '*' }
@WebSocketGateway(8001, {
  cors: {
    origin: process.env.NEXT_PUBLIC_GATEWAY_URL,
    credentials: true,
  },
})
export class GatewayNotifGateway {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  private userSocketMap = new Map<string, Socket>();

  @WebSocketServer()
  server: Server;

  // printUserSocketMapContents() {
  //   for (const [userId, socket] of this.userSocketMap) {
  //     console.log(`User ID: ${userId}, Socket ID: ${socket.id}`);
  //   }
  // }
  private logger: Logger = new Logger('notif');

  afterInit(server: Server) {
    this.logger.log('Chat GateWay has been initialized!!');

    server.use((socket, next) => {
      this.validateConnection(socket)
        .then((user) => {
          socket.handshake.auth['user'] = user;
          socket.emit('userLogin', user);
          next();
        })
        .catch((err) => {
          this.logger.error(
            `Failed to authenticate user: ${socket.handshake.auth?.user?.login}`,
            err,
          );
        });
    });
  }

  private validateConnection(client: Socket) {
    // this.logger.log(client);
    console.log(client.handshake.headers.cookie);
    let token = client.handshake.headers.cookie;
    const [name, value] = token.trim().split('=');
    token = value;
    try {
      const payload = this.jwtService.verify<any>(token, {
        secret: process.env.JWT_SECRET,
      });
      return this.userService.getUserByLogin(payload.login);
    } catch {
      this.logger.error('Token invalid or expired');
      return Promise.reject(new WsException('Token invalid or expired'));
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    // Access userId from the query parameter
    const userId = client.handshake.query.userId as string;

    // Store the mapping between userId and socket
    this.userSocketMap.set(userId, client);
    // this.printUserSocketMapContents();
  }

  @UseGuards(SocketAuthGuard)
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

  // this is a gateway to listen to a new live game
  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('newLiveGame')
  async newLiveGame(
    @MessageBody() body: newLiveGameDto,
    @ConnectedSocket() sender: Socket,
  ) {
    const userInfo1 = await this.userService.getUserByName(body.player1);
    const userInfo2 = await this.userService.getUserByName(body.player2);
    await this.server.emit('newLiveGame', {
      player1: body.player1,
      player1Image: userInfo1.avatar,
      player2: body.player2,
      player2Image: userInfo2.avatar,
      startedTime: body.startedTime,
    });
  }
  // this is a gateway to listen to a finished live game
  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('finishedLiveGame')
  finishedLiveGame(
    @MessageBody() body: newLiveGameDto,
    @ConnectedSocket() sender: Socket,
  ) {
    console.log('got Finished Live Game');
    this.server.emit('finishedLiveGame', {
      player1: body.player1,
      player2: body.player2,
      startedTime: body.startedTime,
    });
  }
}
