import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          login: dto.login,
          email: dto.email,
          name: dto.name,
          avatar: dto.avatar,
        },
      });
    } catch (error) {
      throw new BadRequestException('Unable to create user');
    }
  }

  /* Get user information using uuid */
  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException('Unable to get user by ID');
    }
  }

  /* Get user information using login */
  async getUserByLogin(login: string) {
    try{
      const user = await this.prisma.user.findUnique({
        where: {
          login: login,
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException('Unable to get user by Login');
    }
  }

  async updateUserScore(login: string, score: number, win: boolean) {
    const user = await this.getUserByLogin(login);
    if (!user) throw new NotFoundException('User Id does not exist');

    try {
      var newScore = 0;

      if (!(score == -1 && user.score == 0)) newScore = user.score + score;
      if (win) {
        await this.prisma.user.updateMany({
          where: {
            login: login,
          },
          data: {
            score: newScore,
            wins: {
              increment: 1, // Increment the wins by 1
            },
          },
        });
      } else {
        await this.prisma.user.updateMany({
          where: {
            login: login,
          },
          data: {
            score: newScore,
            losses: {
              increment: 1, // Increment the losses by 1
            },
          },
        });
      }
    } catch (error) {
      throw new BadRequestException('Unable to update user Score');
    }
  }
}
