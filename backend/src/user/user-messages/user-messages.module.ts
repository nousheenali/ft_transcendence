import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserMessagesService } from './user-messages.service';
import { ChannelService } from 'src/channel/channel.service';
import { FriendsService } from 'src/friends/friends.service';
import { UserMessagesController } from './user-messages.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from '../user.module';

@Module({
  controllers: [UserMessagesController],
  imports: [UserModule],
  providers: [
    PrismaService,
    UserMessagesService,
    FriendsService,
    ChannelService,
    UserService,
  ],
  exports: [UserMessagesService],
})
export class UserMessagesModule {}
