import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { AccessTokenGuard } from 'src/auth/jwt/jwt.guard';
@UseGuards(AccessTokenGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GameService) {}

  @Get('history/:login')
  async getCurrentChannel(@Param('login') login: string) {
    try {
      return await this.gameService.getGameHistory(login);
    } catch (error) {
      throw new HttpException(
        'Error while getting the Games History.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
