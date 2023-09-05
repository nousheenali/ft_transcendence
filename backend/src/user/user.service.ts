import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const newUser = await this.prisma.uSER.create({
      data: {
        LOGIN_ID: dto.LOGIN_ID,
        EMAIL: dto.EMAIL,
        NAME: dto.NAME,
        PROFILE_PIC: dto.PROFILE_PIC
      },
    });
    return newUser;
  }

  async getUserById(id: string) {
    const user = await this.prisma.uSER.findUnique({
      where: {
        LOGIN_ID: id,
      },
    });
    return user;
  }
}
