import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameRoomService } from './game-room/game-room.service';
import { PlayerService } from './player/player.service';

@Module({
  providers: [GameGateway, GameRoomService, PlayerService],
  exports: [],
  controllers: [],
})
export class GameModule {}
