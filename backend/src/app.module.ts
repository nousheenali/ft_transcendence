import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [PrismaModule, UserModule, ChannelModule, FriendsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
