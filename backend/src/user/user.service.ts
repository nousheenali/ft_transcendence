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

  /* Get user information using uuid */
  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  /* Get user information using login */
  async getUserByLogin(login: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login: login,
      },
    });
    return user;
  }


  async update(login: string, updateUserDto: UpdateUserDto) {
    try {
      console.log('updatedt', updateUserDto);
      
      const updatedUser = await this.prisma.user.update({
        where: { login: login },
        data: {
          name: updateUserDto.name,
          avatar: updateUserDto.avatar,
          updatedAt: new Date(),
          refreshToken: updateUserDto.refreshToken,
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
  
}
