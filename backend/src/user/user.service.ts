import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    
    try {
      const newUser = await this.prisma.uSERS.create({
        data:{
          LOGIN_ID: dto.login_id,
          EMAIL: dto.email,
          NAME: dto.name,
          PROFILE_PIC: dto.profile_pic
        }
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {
    const user = await this.prisma.uSERS.findUnique({
      where: {
        LOGIN_ID: id,
      },
    });
    return user;
  }
}
