import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { FriendsModule } from './friends/friends.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [PrismaModule, UserModule, ChannelModule, FriendsModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
