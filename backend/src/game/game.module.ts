import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { PlayersService } from './players/players.service';


@Module({
  providers: [GameGateway, PlayersService],
  exports: [PlayersService]
})
export class GameModule {}
