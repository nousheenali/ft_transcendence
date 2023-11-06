import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { FriendsModule } from './friends/friends.module';
import { IntraModule } from './auth/intra/intra.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    ChannelModule,
    FriendsModule,
    IntraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
