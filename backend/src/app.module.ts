import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { FriendsModule } from './friends/friends.module';
import { NotificationModule } from './notification/notification.module';
import { GatewayNotifModule } from './gateway-notif/gateway-notif.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule , 
    UserModule,
    ChatModule,
    ChannelModule,
    FriendsModule,
    NotificationModule,
    GatewayNotifModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
