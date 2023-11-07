import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { GameService } from './game.service';
import { GameDto } from './dto/game.dto';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('createGame')
  createGame(@Body() dto: GameDto) {
    try {
        return this.gameService.createGameEntry(dto);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while creating Game.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
