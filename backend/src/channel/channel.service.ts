import { Type } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';

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

  /**==============================================================================================
   * ╭── 🌼
   * ├ 👇 get all private channels according to the user login
   * └── 🌼
   * @param login: string, the login of the user
   * @returns all the private channels that the user have relation with.
   * @throws BadRequestException if there is an error while getting the private channels
   * ==============================================================================================*/
  async getPrivateChannels(login: string) {
    try {
      const privateChannels = [];
      const data = await this.prisma.user.findMany({
        where: {
          login: login,
        },
        select: {
          channelRelation: {
            where: {
              channel: {
                channelType: Type.PRIVATE,
              },
            },
            select: {
              channel: {
                select: {
                  channelName: true,
                  channelType: true,
                },
              },
            },
          },
        },
      });
      data[0].channelRelation.forEach((element) => {
        privateChannels.push(element.channel);
      });
      return privateChannels;
    } catch (error) {
      throw new BadRequestException('UNABLE TO GET PRIVATE CHANNELS');
    }
  }

  /**==============================================================================================
   * ╭── 🌼
   * ├ 👇 get all the public channels according to the user login
   * └── 🌼
   * @param login: string, the login of the user
   * @returns all the public channels that the user have relation with.
   * @throws BadRequestException if there is an error while getting the public channels
   * ==============================================================================================*/
  async getPublicChannels(login: string) {
    try {
      const publicChannels = [];
      const data = await this.prisma.user.findMany({
        where: {
          login: login,
        },
        select: {
          channelRelation: {
            where: {
              channel: {
                channelType: Type.PUBLIC,
              },
            },
            select: {
              channel: {
                select: {
                  channelName: true,
                  channelType: true,
                },
              },
            },
          },
        },
      });
      data[0].channelRelation.forEach((element) => {
        publicChannels.push(element.channel);
      });
      return publicChannels;
    } catch (error) {
      throw new BadRequestException('UNABLE TO GET PUBLIC CHANNELS');
    }
  }
  
  /**==============================================================================================
   * ╭── 🌼
   * ├ 👇 get channel users according to the channel name
   * └── 🌼
   * @param channelName: string, the name of the channel
   * @returns all the users that are members of the channel
   * @throws BadRequestException if there is an error while getting the channel users
   * ==============================================================================================*/
  async getChannelUsers(channelName: string) {
    try {
      const channelUsers = [];
      const data = await this.prisma.channel.findMany({
        where: {
          channelName: channelName,
        },
        select: {
          channelMembers: {
            select: {
              user: {
                select: {
                  login: true,
                  avatar: true,
                  name: true,
                  isOnline: true,
                },
              },
            },
          },
        },
      });
      data[0].channelMembers.forEach((element) => {
        channelUsers.push(element.user);
      });
      return channelUsers;
    } catch (error) {
      throw new BadRequestException('UNABLE TO GET CHANNEL USERS');
    }
  }

  /**==============================================================================================
   * ╭── 🌼
   * ├ 👇 get channel messages according to the channel name
   * └── 🌼
   * @param channelName: string, the name of the channel
   * @returns all the messages of the channel
   * @throws BadRequestException if there is an error while getting the channel messages
   * ==============================================================================================*/
  async getChannelMessages(channelName: string) {
    try {
      const channelMessages = [];
      const data = await this.prisma.channel.findMany({
        where: {
          channelName: channelName,
        },
        select: {
          Messages: {
            select: {
              content: true,
              createdAt: true,
              sender: {
                select: {
                  login: true,
                  avatar: true,
                  name: true,
                  isOnline: true,
                },
              },
            },
          },
        },
      });
      data[0].Messages.forEach((element) => {
        channelMessages.push(element);
      });
      return channelMessages;
    } catch (error) {
      throw new BadRequestException('UNABLE TO GET CHANNEL MESSAGES');
    }
  }
}
