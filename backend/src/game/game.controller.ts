import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {}
//   constructor(private readonly gameService: GameService) {}

//   @Get('initialize')
//   initializeGame() {
//     return this.gameService.getGameState();
//   }

//   @Post('update')
//   updateGame(@Body() playerInput: { player: string; position: number }) {
//     this.gameService.updateGame(playerInput.player, playerInput.position);
//     // You can emit the updated game state to clients via WebSocket here.
//   }
// }
