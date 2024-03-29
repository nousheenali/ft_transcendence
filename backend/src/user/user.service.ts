import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';
import { NotFoundError } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ValidationError } from 'class-validator';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
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

  //------------------------------------------------------------------------------------------------
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

  //------------------------------------------------------------------------------------------------
  /* Get user information using login */
  async getUserByLogin(login: string) {
    try {
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

  //------------------------------------------------------------------------------------------------
  /* Get user information using full name */
  async getUserByName(fullName: string) {
    try {
      const user = await this.prisma.user.findMany({
        where: {
          name: {
            equals: fullName,
            mode: 'insensitive',
          },
        },
      });
      return user[0];
    } catch (error) {
      throw new BadRequestException('Unable to get user by Full Name');
    }
  }

  //------------------------------------------------------------------------------------------------
  async updateUserScore(login: string, score: number, win: boolean) {
    const user = await this.getUserByLogin(login);
    if (!user) throw new NotFoundException('User Id does not exist');

    try {
      var newScore = 0;
      //if user score is zero nothing will be deducted on losing the a game
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
      throw new BadRequestException('Unable to update User Score');
    }
  }

  //------------------------------------------------------------------------------------------------
  async updateUserGameStatus(login: string, status: boolean) {
    const user = await this.getUserByLogin(login);
    if (!user) throw new NotFoundException('User Id does not exist');

    try {
      await this.prisma.user.updateMany({
        where: {
          login: login,
        },
        data: {
          inAGame: status,
        },
      });
    } catch (error) {
      throw new BadRequestException('Unable to update User Status');
    }
  }

  //------------------------------------------------------------------------------------------------
  async update(login: string, updateUserDto: UpdateUserDto) {
    try {
      console.log('updatedt', updateUserDto);

      const updatedUser = await this.prisma.user.update({
        where: { login: login },
        data: {
          name: updateUserDto.name,
          avatar: updateUserDto.avatar,
          updatedAt: new Date(),

          TFAKey: updateUserDto.TFAKey,
          TFAEnabled: updateUserDto.TFAEnabled,
        },
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        console.error('Prisma error:', error.message);
        throw error;
      }

      // Handle any other errors
      console.error('Unexpected error occurred:', error);
      throw new Error('An unexpected error occurred while updating the user');
    }
  }

  //------------------------------------------------------------------------------------------------
  /* Gets all users */
  async getAllUsers() {
    try {
      return this.prisma.user.findMany({
        orderBy: {
          score: 'desc', // highest score first
        },
      });
    } catch (error) {
      throw new BadRequestException('Unable to get all users');
    }
  }

  //------------------------------------------------------------------------------------------------
  async updateName(login: string, dto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        name: {
          equals: dto.name,
          mode: 'insensitive',
        },
        login: { not: login },
      },
    });
    if (existingUser) {
      throw new BadRequestException('Not a unique name.');
    }

    const updatedName = await this.prisma.user.update({
      where: {
        login: login,
      },
      data: { name: dto.name },
    });
    if (!updatedName) throw new BadRequestException('Unable to update name');
    return updatedName;
  }
  //------------------------------------------------------------------------------------------------
  async getSavedFileURL(login: string, img: Express.Multer.File) {
    if (!img) {
      throw new Error('Invalid file object received.');
    }
    const filePath = `${img.filename}`;
    const fileURL = `${process.env.FILE_STORAGE_URL}` + filePath; //server URL
    const updatedName = await this.prisma.user.update({
      where: {
        login: login,
      },
      data: { avatar: fileURL },
    });
    return updatedName;
  }
  //------------------------------------------------------------------------------------------------
  async setTFAVerificationRequired(login: string) {
    try {
      const user = await this.prisma.user.update({
        where: { login: login },
        data: { TFAVerified: false },
      });
      return user;
    } catch (error) {
      throw new BadRequestException('Unable to update TFA verification status');
    }
  }
  //------------------------------------------------------------------------------------------------
}
