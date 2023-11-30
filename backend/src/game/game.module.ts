import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameRoomService } from './game-room/game-room.service';
import { PlayerService } from './player/player.service';
import { GameLogicService } from './game-logic/game-logic.service';
import { GameService } from './game.service';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GamesController } from './game.controller';

@Module({
  providers: [GameGateway, GameRoomService, PlayerService, GameLogicService, GameService],
  exports: [GameService],
  controllers: [GamesController],
  imports: [UserModule, PrismaModule]
})
export class GameModule {}
