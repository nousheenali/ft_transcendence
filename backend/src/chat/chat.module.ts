import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { RoomsService } from './rooms.service';
import { UserService } from '../user/user.service';
import { ChannelService } from '../channel/channel.service';
import { FriendsService } from 'src/friends/friends.service';
import { ChannelRelationService } from '../channel/channel-relation.service';
import { UserMessagesService } from '../user/user-messages/user-messages.service';
import { UserModule } from 'src/user/user.module';
import { ChannelModule } from 'src/channel/channel.module';

@Module({
  providers: [
    ChatGateway,
    ChatService,
    RoomsService,
    UserService,
    ChannelService,
    FriendsService,
    UserMessagesService,
    ChannelRelationService,
  ],
})
export class ChatModule {}
