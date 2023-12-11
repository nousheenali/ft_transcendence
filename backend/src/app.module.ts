import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { FriendsModule } from './friends/friends.module';
import { UserMessagesModule } from './user/user-messages/user-messages.module';
import { NotificationModule } from './notification/notification.module';
import { GatewayNotifModule } from './gateway-notif/gateway-notif.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { TwoFaModule } from './auth/mfa/two-fa.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'),
      serveStaticOptions: {
        index: false,
      },
    }),
    AuthModule,
    UserModule,
    ChatModule,
    GameModule,
    PrismaModule,
    ChannelModule,
    FriendsModule,
    NotificationModule,
    GatewayNotifModule,
    UserMessagesModule,
    TwoFaModule,
    /** ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
     *  RATE LIMTING
     */
    // PROTECT FROM BRUTE FORCE ATTACKS
    // apply the throttler configuration globally
    // it defined that , within 60 seconds a user can make 10 requests
    // to prevent from overloadig the system
    // when the user limit exceeds , subsequent requests will be denied untill the time resets
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1000,
      },
    ]),
    /** ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●*/
  ],
  controllers: [],
  providers: [
    AppService,
    /** ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
     *  RATE LIMTING
     */
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // RESPONSIBLE FOR ENFORCING THE RATELIMTING TO ALL THE ROUTES IN THE APPLICATION
    },
    /** ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●*/
  ],
})
export class AppModule {}
