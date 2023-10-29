import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: createNotificationDto
    });
  }

  findAll() {
    return "this returns all notifications";
  }

  findNotifications(userId: string) {
    return this.prisma.notification.findMany(
      {
        where: {
          userId: userId
        },
        include:{
          sender: true,
          User: true
        }
      }
    );
    // return `This action returns a #${userId} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}


//TODO  CHANGE FONT