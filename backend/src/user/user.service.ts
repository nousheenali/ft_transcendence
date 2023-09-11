import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';

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
}
