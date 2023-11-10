import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameRoomService } from './game-room/game-room.service';
import { PlayerService } from './player/player.service';
import { GameLogicService } from './game-logic/game-logic.service';
import { GameService } from './game.service';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [GameGateway, GameRoomService, PlayerService, GameLogicService, GameService],
  exports: [],
  controllers: [],
  imports: [UserModule]
})
export class GameModule {}
