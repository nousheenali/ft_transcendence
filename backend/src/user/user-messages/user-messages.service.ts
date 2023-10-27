import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserMessagesService {
  constructor(private prisma: PrismaService) {}

  //===============================================================================
  /* Helper function to get the user using login */
  async getUserIdByLogin(login: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login: login,
      },
    });
    return user.id;
  }

  //===============================================================================
  // 👇 get the user latest messages from other users.
  async userLatestMessages(userId: string) {
    try {
      const latestMessages = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          recievedMessages: {
            orderBy: {
              createdAt: 'desc',
            },
            distinct: ['senderId'],
            include: {
              sender: true,
            },
          },
        },
      });
      return latestMessages.recievedMessages;
    } catch (error) {
      throw new BadRequestException('Unable to get user messages');
    }
  }

  //===============================================================================
}
