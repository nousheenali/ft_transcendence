import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { RoomsService } from './rooms.service';
import { UserMessagesService } from '../user/user-messages/user-messages.service';

@Module({
  providers: [ChatGateway, ChatService, RoomsService, UserMessagesService],
})
export class ChatModule {}
