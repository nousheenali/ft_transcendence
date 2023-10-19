import {
  MessageBody,
  SubscribeMessage,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

// interface ClientToServerEvents {}
// interface ServerToClientClientEvents {}

interface Message {
  user: {
    id: string,
    username: string,
    socketId: string
  }
  sender: string;
  sentTime: string;
  message: string;
}

@WebSocketGateway({ cors: { origin: 'http://localhost:3000' } })
export class ChatGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  // ❂➤ Initializing instance of the websocket server
  @WebSocketServer() server: Server;

  // ❂➤ Initializing logger
  private logger: Logger = new Logger('ChatGateway');

  // ❂➤ Initializing the gateway
  afterInit(server: Server) {
    this.logger.log("Chat GateWay has been initialized!!");
  }

  // ❂➤ Handling connection
  handleConnection(client: Socket) {
    this.logger.log(`New Client with the id of ${client.id} has been connected!!`);
  }

  // ❂➤ Handling disconnection
  handleDisconnect(client: Socket) {
    this.logger.log(`The client with id of ${client.id} has been disconnected!!`);
  }

  // ❂➤ Handling event by subscribing to the event "ClientToServer" and returning the payload
  @SubscribeMessage("ClientToServer")
  async handleMessage(@MessageBody() payload: Message): Promise<Message> {
    this.logger.log(`Server received: ${payload}`);
    // ❂➤ Broadcasting the message to all the client that subscribed to the event "ServerToClient"
    this.server.emit("ServerToClient", payload);
    return (payload);
  }
}
