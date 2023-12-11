import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { RoomsService } from './rooms.service';
import { UserService } from '../user/user.service';
import { ChannelService } from '../channel/channel.service';
import { FriendsService } from 'src/friends/friends.service';
import { ChannelRelationService } from '../channel/channel-relation.service';
import { UserMessagesService } from '../user/user-messages/user-messages.service';
import { JwtAuthModule } from 'src/auth/jwt/jwt.module';
import { JwtService } from '@nestjs/jwt';

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
    JwtService,
  ],
  imports: [JwtAuthModule],
})
export class ChatModule {}
