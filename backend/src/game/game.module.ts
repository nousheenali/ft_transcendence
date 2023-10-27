import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameRoomService } from './game-room/game-room.service';
import { GameController } from './game.controller';
import { GameService } from './game.service';


@Module({
  providers: [GameGateway, GameRoomService, GameService],
  exports: [],
  controllers: [GameController]
})
export class GameModule {}
