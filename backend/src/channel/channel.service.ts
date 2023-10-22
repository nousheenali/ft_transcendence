import { Channel } from './entities/channel.entity';
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

  /**--------------------------------------------------------------------------------------------
   * 
   * 🌼 Helper function that will extract all the channelRelations according to the type
   *   of the channel, which is either "public" or "private" and the login of the user, 
   *   from the User table.
   * * @returns The User object with the channelRelations array.
   * * @param login: string, the login of the user
   * * @param channelType: Type, an enum that can be either "public" or "private"
   */
  async getUserRelationsByChannelType(login: string, channelType: Type) {
    const channelsRelation = await this.prisma.user.findUnique({
      where: {
        login: login,
      },
      include: {
        channelRelation: {
          include: {
            Channel: true,
          },
          where: {
            Channel: {
              channelType: channelType,
            },
          },
        },
      },
    });
    return channelsRelation;
  }


  /** -------------------------------------------------------------------------------------------
   * 🌼 Method that return all channels according to the channel type, from the Relations array
   * * @param channelType: Type, which is an enum that can be either "public" or "private"
   */

  async getChannels(login: string, channelType: Type) {
    const channels: Channel[] = [];
    const userRelations = await this.getUserRelationsByChannelType(login, channelType);
    userRelations.channelRelation.forEach((relation) => {
      channels.push(relation.Channel);
    });
    return channels;
  }
  /** ------------------------------------------------------------------------------------------- **/
}



