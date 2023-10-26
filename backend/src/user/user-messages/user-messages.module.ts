import { Module } from '@nestjs/common';
import { UserMessagesService } from './user-messages.service';
import { UserMessagesController } from './user-messages.controller';
import { UserModule } from '../user.module';
@Module({
  controllers: [UserMessagesController],
  providers: [UserMessagesService],
})
export class UserMessagesModule {}
