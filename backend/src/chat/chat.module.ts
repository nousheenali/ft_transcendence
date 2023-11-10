import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { RoomsService } from './rooms.service';
import { UserService } from '../user/user.service';
import { ChannelService } from '../channel/channel.service';
import { ChannelRelationService } from '../channel/channel-relation.service';
import { UserMessagesService } from '../user/user-messages/user-messages.service';

@Module({
  providers: [ChatGateway, ChatService, RoomsService, UserMessagesService, UserService, ChannelService, ChannelRelationService],
})
export class ChatModule {}
