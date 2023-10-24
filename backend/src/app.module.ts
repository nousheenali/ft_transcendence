import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { FriendsModule } from './friends/friends.module';
import { GameGateway } from './game/game.gateway';
import { GameModule } from './game/game.module';

@Module({
  imports: [PrismaModule, UserModule, ChannelModule, FriendsModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
