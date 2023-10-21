import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateChannelRelationDto } from './dto/create-channel-relation.dto'; // 👈 Import CreateChannelRelationDto
import { PrismaService } from '../prisma/prisma.service'; // 👈 Import PrismaService
import { Type } from '@prisma/client';

/** ------------------------------------------------------------------------------------------- **/
@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {} // 👈 Inject PrismaService class into the constructor.

  /** -------------------------------------------------------------------------------------------
   * create channel and add the creator as a member
   */
  async createChannel(CreateChannelDto) {
    const find_duplicate = await this.prisma.channel.findMany({
      where: {
        channelName: CreateChannelDto.channelName,
      },
    });

    if (find_duplicate.length > 0) {
      throw new BadRequestException('Channel already exists');
    }
    const create_channel = await this.prisma.channel.create({
      data: {
        channelName: CreateChannelDto.channelName,
        channelType: CreateChannelDto.channelType,
        createdBy: CreateChannelDto.createdBy,
      },
    });
    const res = await this.prisma.channelRelation.create({
      data: {
        channelId: create_channel.id,
        userId: CreateChannelDto.createdBy,
      },
    });
    return create_channel;
  }

  /** -------------------------------------------------------------------------------------------
   * delete channel
   */
  async DeleteChannel(id: string) {
    await this.prisma.channelRelation.deleteMany({
      where: {
        channelId: id,
      },
    });
    await this.prisma.channel.deleteMany({
      where: {
        id: id,
      },
    });
    return `This action removes all channelMember and channels`;
  }

  /** -------------------------------------------------------------------------------------------
   * Method that return all channels according to the channel type.
   * @param channelType: Type, which is an enum that can be either "public" or "private"
   */
  async getChannels(login: string, channelType: Type) {
    if (channelType == 'PRIVATE') {
      const channels = await this.prisma.user.findUnique({
        where: {
          login: login,
        },
        include: {
          channelRelation: {
            include: {
              Channel: true,
            },
          },
        },
      });
      console.log(channels)
      return channels;
    } else if (channelType == 'PUBLIC') {
      const channels = await this.prisma.channel.findMany({
        where: {
          channelType: channelType,
        },
      });
      return channels;
    }
  }
}
