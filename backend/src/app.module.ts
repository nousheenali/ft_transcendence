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
import { GameGateway } from './game/game.gateway';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    PrismaModule,
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
