import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameRoomService } from './game-room/game-room.service';
import { PlayerService } from './player/player.service';
import { GameLogicService } from './game-logic/game-logic.service';
import { GameService } from './game.service';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GamesController } from './game.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthModule } from 'src/auth/jwt/jwt.module';

@Module({
  providers: [
    GameGateway,
    GameRoomService,
    PlayerService,
    GameLogicService,
    GameService,
    JwtService,
  ],
  exports: [GameService],
  controllers: [GamesController],
  imports: [UserModule, PrismaModule, JwtAuthModule],
})
export class GameModule {}
