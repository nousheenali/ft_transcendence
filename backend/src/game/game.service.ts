import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameDto } from './dto/game.dto';
import { UserService } from 'src/user/user.service';
import { GameStatus } from '@prisma/client';

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
          gameStatus: dto.gameStatus,
        },
      });
      return game.id;
    } catch (error) {
      throw new BadRequestException('Unable to create game');
    }
  }

  async getGamebyID(gameID: string) {
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

  async getGamebyUsers(player1: string, player2: string): Promise<string> {
    try {
      const game = await this.prisma.game.findMany({
        where: {
          userId: player1,
          opponentId: player2,
          gameStatus: 'WAITING',
        },
      });
      return game[0].id;
    } catch (error) {
      throw new BadRequestException('Unable to find game');
    }
  }

  async updateGameEntry(
    gameID: string,
    status: GameStatus,
    winner: string,
    loser: string,
  ) {
    try {
      await this.prisma.game.update({
        where: {
          id: gameID,
        },
        data: {
          gameStatus: status,
          winnerId: winner,
        },
      });
      if (winner && loser) {
        this.userService.updateUserScore(winner, 2, true);
        this.userService.updateUserScore(loser, -1, false);
      }
    } catch (error) {
      throw new BadRequestException('Unable to update game');
    }
  }

  async deleteGameEntry(gameID: string) {
    try {
      await this.prisma.game.delete({
        where: {
          id: gameID,
        },
      });
    } catch (error) {
      throw new BadRequestException('Unable to delete game entry');
    }
  }

  //------------------------------------------------------------------------------------------------
  async getGameHistory(userLogin: string) {
    try {
      const userData = await this.userService.getUserByLogin(userLogin);
      if (!userData) throw new NotFoundException('User Id does not exist');

      const game = await this.prisma.game.findMany({
        where: {
          OR: [
            { userId: userData.id, gameStatus: 'FINISHED' },
            { opponentId: userData.id, gameStatus: 'FINISHED' },
          ],
        },
        select: {
          gameStatus: true,
          winnerId: true,
          startTime: true,
          opponent: {
            select: {
              id: true,
              login: true,
              name: true,
              avatar: true,
              score: true,
            },
          },
          User: {
            select: {
              id: true,
              login: true,
              name: true,
              avatar: true,
              score: true,
            },
          },
        },
      });
      return game;
    } catch (error) {
      throw new BadRequestException('Unable to find game');
    }
  }
  //------------------------------------------------------------------------------------------------
}
