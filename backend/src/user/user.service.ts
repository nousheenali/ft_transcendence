import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

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
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login: id,
      },
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async UpdateUser(id: string, dto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: {
        login: id,
      },
      data: {
        name: dto.name,
        email: dto.email,
        avatar: dto.avatar
        // wallpaper: dto.wallpaper
      },
    });
    if (!updatedUser) {
      throw new NotFoundException('User ${id} not found');
    }
    return updatedUser;
  }
}
