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
  /**
   * Get all received user messages from other users
   * First, get the user by the login name,
   * Second get all the messages that the user received.
   */
  async getUserMessages(login: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          login: login,
        },
        include: {
          recievedMessages: true,
        },
      });
      if (user) {
        const userMessages = user.recievedMessages;
        return userMessages;
      }
    } catch (error) {
      throw new BadRequestException('Unable to get user messages');
    }
  }

  //===============================================================================
}
