import {
  UsePipes,
  Injectable,
  ValidationPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserMessageDto } from './dto/create-user-message.dto';

@Injectable()
export class UserMessagesService {
  constructor(private prisma: PrismaService) {}

  //===============================================================================
  @UsePipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      skipUndefinedProperties: false,
    }),
  )
  async createUserMessage(data: CreateUserMessageDto) {
    try {
      const senderId = await this.getUserIdByLogin(data.sender);
      const receiverId = await this.getUserIdByLogin(data.receiver);
      const message = await this.prisma.messages.create({
        data: {
          senderId: senderId,
          receiverId: receiverId,
          content: data.message,
        },
      });
      return message;
    } catch (error) {
      throw new BadRequestException('Unable to create message');
    }
  }
  //===============================================================================
  /* Helper function to get the user using login */
  async getUserIdByLogin(login: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          login: login,
        },
      });
      return user.id;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
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
  // Get the chat between the user and his friend.
  async userFriendChat(userId: string, friendId: string) {
    try {
      const chat = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          recievedMessages: {
            where: {
              senderId: friendId,
            },
            select: {
              content: true,
              createdAt: true,
              sender: {
                select: {
                  login: true,
                  name: true,
                  avatar: true,
                  isOnline: true,
                },
              },
              reciever: {
                select: {
                  login: true,
                  name: true,
                  avatar: true,
                  isOnline: true,
                },
              },
            },
          },
          sentMessages: {
            where: {
              receiverId: friendId,
            },
            select: {
              content: true,
              createdAt: true,
              sender: {
                select: {
                  login: true,
                  name: true,
                  avatar: true,
                  isOnline: true,
                },
              },
              reciever: {
                select: {
                  login: true,
                  name: true,
                  avatar: true,
                  isOnline: true,
                },
              },
            },
          },
        },
      });
      const friendChat = [...chat.recievedMessages, ...chat.sentMessages];
      friendChat.sort((a, b) => {
        return a.createdAt.getTime() - b.createdAt.getTime();
      });
      return friendChat;
    } catch (error) {
      throw new BadRequestException('Unable to get user messages');
    }
  }

  //===============================================================================
}
