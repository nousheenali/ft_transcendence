import { BadRequestException, Injectable } from '@nestjs/common';
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

  async setTFAVerificationRequired(login: string) {
    try {
      await this.prisma.user.update({
        where: { login: login },
        data: { TFAVerified: false },
      });
    } catch (error) {
      throw new BadRequestException('Unable to update TFA verification status');
    }
  }

  async updateName(login: string, name: string) {
    const updatedName = await this.prisma.user.update({
      where: {
        login: login,
      },
      data:  { name },
    });
    if (!updatedName) {
      throw new BadRequestException(`Unable to update name`);
    }
    return updatedName;
  }

  async getSavedFileURL(login: string, img: Express.Multer.File) {
    if (!img) {
    throw new Error("Invalid file object received.");
  }
  const filePath = `${img.filename}`;
  const fileURL = `http://localhost:3001/user/getfile?avatar=` + filePath;
  const updatedName = await this.prisma.user.update({
    where: {
      login: login,
    },
    data:  { avatar: fileURL },
  });
  return updatedName;
  }  
}
