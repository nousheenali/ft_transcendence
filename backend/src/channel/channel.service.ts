import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // 👈 Import PrismaService 

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) { } // 👈 Inject PrismaService class into the constructor.
  async createChannel(CreateChannelDto) {
    const find_duplicate = await this.prisma.channel.findMany({
      where: {
        channelName: CreateChannelDto.channelName
      },
    })

    if (find_duplicate) {
      return {
        "status": 400,
        "message": "Channel already exists"
      }
    }
    console.log("result: ", find_duplicate);
    const create_channel = await this.prisma.channel.create({
      data: {
        channelName: CreateChannelDto.channelName,
        channelType: CreateChannelDto.channelType,
        createdBy: CreateChannelDto.createdBy
      }
    })
    const res = await this.prisma.channelRelation.create({
      data: {
        channelId: create_channel.id,
        userId: CreateChannelDto.createdBy,
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
