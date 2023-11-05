import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [FriendsService],
  controllers: [FriendsController],
  imports: [UserModule]
})
export class FriendsModule {}
