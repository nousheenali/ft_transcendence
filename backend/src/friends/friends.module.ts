import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, UserService],
  exports: [FriendsService],
})
export class FriendsModule {}
