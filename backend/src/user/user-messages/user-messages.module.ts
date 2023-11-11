import { Module } from '@nestjs/common';
import { UserMessagesService } from './user-messages.service';
import { UserMessagesController } from './user-messages.controller';
import { UserModule } from '../user.module';
import { ChannelService } from 'src/channel/channel.service';

@Module({
  controllers: [UserMessagesController],
  providers: [UserMessagesService, ChannelService],
})
export class UserMessagesModule {}
