import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameDto } from './dto/game.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GameService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createGameEntry(dto: GameDto): Promise<string> {
    const userData = await this.userService.getUserByLogin(dto.userLogin);
    if (!userData) throw new NotFoundException('User Id does not exist');

    const opponentData = await this.userService.getUserByLogin(
      dto.opponentLogin,
    );
    if (!opponentData) throw new NotFoundException('Friend Id does not exist');

    try {
      const game = await this.prisma.game.create({
        data: {
          userId: userData.id,
          opponentId: opponentData.id,
        },
      });
      return game.id;
    } catch (error) {
      throw new BadRequestException('Unable to create game');
    }
  }

  async getGame(gameID: string){
    try {
      const game = await this.prisma.game.findUnique({
        where: {
          id: gameID,
        },
      });
      return game;
    } catch (error) {
      throw new BadRequestException('Unable to find game');
    }
  }

  async updateGameEntry(gameID: string, winner: string, loser: string){
    try {
      await this.prisma.game.update({
        where: {
          id: gameID
        },
        data: {
          gameStatus: 'FINISHED',
          winnerId: winner,
        },
      });
      if(winner != '')
      {
        this.userService.updateUserScore(winner, 2, true);
        this.userService.updateUserScore(loser, -1, false);
      }
    } catch (error) {
      throw new BadRequestException('Unable to update game');
    }
  }
}
