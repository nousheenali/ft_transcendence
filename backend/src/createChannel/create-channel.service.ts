import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // 👈 Import PrismaService 

@Injectable()
export class CreateChannelService {
  constructor(private prisma: PrismaService) { } // 👈 Inject PrismaService class into the constructor.
  async createChannel(CreateChannel) {
    const create_channel = await this.prisma.channel.create({
      data: {
        channelName: CreateChannel.channelName,
        channelType: CreateChannel.channelType,
        createdBy: CreateChannel.createdBy
      }
    })
    const res = await this.prisma.channelRelation.create({
      data: {
        channelId: create_channel.id,
        userId: CreateChannel.createdBy,
      }
    })
    return create_channel;
  }


  async DeleteChannel(id : string) {
    await this.prisma.channelRelation.deleteMany({
      where: {
        channelId: id
      }
    });

    await this.prisma.channel.deleteMany({
      where: { 
        id: id
      },
    });
    return `This action removes all channelMember and channels`;
  }
}
