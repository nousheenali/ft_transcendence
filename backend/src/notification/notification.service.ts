import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async update(id: string) {
    const res = await this.prisma.notification.update({
      where: {
        id: id,
      },
      data: {
        isAccepted: true,
      },
    });
    return res;
    // console.log('res: ', res);
  }

  async create(createNotificationDto: CreateNotificationDto) {
    const notif = await this.prisma.notification.findMany({
      where: {
        userId: createNotificationDto.userId,
        content: createNotificationDto.content,
        senderId: createNotificationDto.senderId,
      },
    });
    if (notif.length === 0) {
      return this.prisma.notification.create({
        data: createNotificationDto,
      });
    } else {
      return this.prisma.notification.update({
        where: {
          id: notif[0].id,
        },
        data: {
          read: false,
          isAccepted: false,
        },
      });
    }
  }

  findNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: {
        userId: userId,
      },
      include: {
        sender: true,
        User: true,
      },
    });
  }
}
