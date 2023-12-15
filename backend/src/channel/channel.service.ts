import { Type } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { comparePassword, hashPassword } from 'src/utils/bcrypt';
import {
  UpdateChannelNameDto,
  UpdateChannelPasswordDto,
} from './dto/update-channel.dto';


/** ------------------------------------------------------------------------------------------- **/
@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  /**==============================================================================================
  /*
   * create channel and add the creator as a member
   */
  async createChannel(CreateChannelDto: any) {
    try {
      const find_duplicate = await this.prisma.channel.findMany({
        where: {
          channelName: CreateChannelDto.channelName,
        },
      });
  
      if (find_duplicate.length > 0) {
        return;
        // throw new BadRequestException('Channel already exists');
      }
      const password = hashPassword(CreateChannelDto.channelPassword);
      const create_channel = await this.prisma.channel.create({
        data: {
          channelName: CreateChannelDto.channelName,
          channelType: CreateChannelDto.channelType,
          createdBy: CreateChannelDto.createdBy,
          channelPassword: password,
        },
      });
      const res = await this.prisma.channelRelation.create({
        data: {
          channelId: create_channel.id,
          userId: CreateChannelDto.createdBy,
        },
      });
      return create_channel;
    } catch (error) {
      throw new BadRequestException('UNABLE TO CREATE CHANNEL');
    }
  }

  /**==============================================================================================
  /*
   * delete channel
   */
  async DeleteChannel(id: string) {
    await this.prisma.messages.deleteMany({
      where: {
        channelId: id,
      },
    });
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

  /**==============================================================================================*/
  async getChannelByName(channelName: string) {
    try {
      const channel = await this.prisma.channel.findUnique({
        where: {
          channelName: channelName,
        },
        include: {
          channelMembers: {
            include: {
              user: true,
            }
          },
        },
      });
      return channel;
    } catch (error) {
      throw new BadRequestException('UNABLE TO GET CHANNEL');
    }
  }

  /**==============================================================================================
   * ╭── 🟣
   * ├ 👇 get all channels in the server according to the type of the channel.
   * ├    this method will pull all the channels from the database, then compare them with the channels
   * ├    that the user have relation with, and filter the channels that the user dont have any relation
   * ├    with.
   * └── 🟣
   * @returns all the private channels in the server according to the type of the channel.
   * @throws BadRequestException if there is an error while getting the private channels
   * ==============================================================================================*/
  async getAllChannels(channelType: Type, login: string) {
    try {
      let joinedChannels = [];
      if (channelType == Type.PRIVATE)
        joinedChannels = await this.getUserPrivateChannels(login);
      else if (channelType == Type.PUBLIC)
        joinedChannels = await this.getUserPublicChannels(login);

      const allChannels = await this.prisma.channel.findMany({
        where: {
          channelType: channelType,
        },
        select: {
          channelMembers: {
            select: {
              user: true,
              isAdmin: true,
              isMuted: true,
            },
          },
          channelName: true,
          channelType: true,
          createdBy: true,
        },
      });
      const channels = allChannels.filter((channel) => {
        return !joinedChannels.some((joinedChannel) => {
          return joinedChannel.channelName == channel.channelName;
        });
      });
      return channels;
    } catch (error) {
      throw new BadRequestException('UNABLE TO GET ALL CHANNELS');
    }
  }

  /**
   *
   * @param id id of the channel
   * @param channelPassword the updated channel password
   * @returns the updated channel
   */
  async updateChannelPassword(channelInfoDto: UpdateChannelPasswordDto) {
    const findChannel = await this.prisma.channel.findMany({
      where: {
        id: channelInfoDto.channelId,
      },
    });
    const matchPasswor = comparePassword(
      channelInfoDto.oldChannelPassword,
      findChannel[0].channelPassword,
    );
    if (!matchPasswor) {
      throw new BadRequestException('Incorrect password');
    }
    const password = hashPassword(channelInfoDto.newChannelPassword);
    const update_channel = await this.prisma.channel.update({
      where: {
        id: channelInfoDto.channelId,
      },
      data: {
        channelPassword: password,
      },
    });
    return update_channel;
  }
  /**==============================================================================================*/
  /**
   *
   * @param channelInfoDto information of the channel to be updated
   * @returns the updated channel
   */
  async removeChannelPassword(channelInfoDto: UpdateChannelPasswordDto) {
    const findChannel = await this.prisma.channel.findMany({
      where: {
        id: channelInfoDto.channelId,
      },
    });
    const matchPasswor = comparePassword(
      channelInfoDto.oldChannelPassword,
      findChannel[0].channelPassword,
    );
    if (!matchPasswor) {
      throw new BadRequestException('Incorrect password');
    }
    const update_channel = await this.prisma.channel.update({
      where: {
        id: channelInfoDto.channelId,
      },
      data: {
        channelPassword: null,
        channelType: Type.PUBLIC,
      },
    });
    return update_channel;
  }

  /**==============================================================================================
   * ╭── 🟣
   * ├ 👇 get all private channels according to the user login
   * └── 🟣
   * @param login: string, the login of the user
   * @returns all the private channels that the user have relation with.
   * @throws BadRequestException if there is an error while getting the private channels
   * ==============================================================================================*/
  async getUserPrivateChannels(login: string) {
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
                  id: true,
                  channelMembers: {
                    select: {
                      user: true,
                      isAdmin: true,
                      isMuted: true,
                    },
                  },
                  channelName: true,
                  channelType: true,
                  createdBy: true,
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
   * ╭── 🟣
   * ├ 👇 get all the public channels according to the user login
   * └── 🟣
   * @param login: string, the login of the user
   * @returns all the public channels that the user have relation with.
   * @throws BadRequestException if there is an error while getting the public channels
   * ==============================================================================================*/
  async getUserPublicChannels(login: string) {
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
                  id: true,
                  channelMembers: {
                    select: {
                      user: true,
                      isAdmin: true,
                      isMuted: true,
                    },
                  },
                  channelName: true,
                  channelType: true,
                  createdBy: true,
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
   * ╭── 🟣
   * ├ 👇 get channel users according to the channel name
   * └── 🟣
   * @param channelName: string, the name of the channel
   * @returns all the users that are members of the channel
   * @throws BadRequestException if there is an error while getting the channel users
   * ==============================================================================================*/
  async getChannelUsers(channelName: string) {
    try {
      const channelUsers = [];
      const data = await this.prisma.channel.findFirst({
        where: {
          channelName: channelName,
        },
        select: {
          channelMembers: {
            select: {
              user: {
                select: {
                  id: true,
                  login: true,
                  avatar: true,
                  name: true,
                  isOnline: true,
                },
              },
              isAdmin: true,
              isMuted: true,
            },
          },
        },
      });
      data.channelMembers.forEach((element) => {
        channelUsers.push(element.user);
      });
      return channelUsers;
    } catch (error) {
      throw new BadRequestException('UNABLE TO GET CHANNEL USERS');
    }
  }

  /**==============================================================================================
   * ╭── 🟣
   * ├ 👇 get channel messages according to the channel name
   * └── 🟣
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

  /**==============================================================================================
   * ╭── 🟣
   * ├ 👇 These two methods is to update the admin of the channel according to the oldest
   * ├    member of the channel
   * └── 🟣
   * @param channelName: string, the name of the channel
   * @returns the new admin of the channel
   * @throws BadRequestException if there is an error while updating the channel admin
   *
   * ==============================================================================================*/
  async getNewChannelCreatorId(channelId: string) {
    try {
      const channel = await this.prisma.channel.findUnique({
        where: {
          id: channelId,
        },
        select: {
          channelMembers: {
            orderBy: {
              createdAt: 'asc',
            },
            take: 1,
            select: {
              user: {
                select: {
                  id: true,
                  login: true,
                },
              },
            },
          },
        },
      });
      if (!channel) throw new Error('Channel not found');
      if (channel.channelMembers.length > 0)
        return channel.channelMembers[0].user.id;
    } catch (error) {
      throw new BadRequestException('UNABLE TO GET NEW CHANNEL ADMIN');
    }
  }

  /**==============================================================================================**/
  async updateChannelCreator(channelId: string) {
    try {
      const newAdminId = await this.getNewChannelCreatorId(channelId);
      if (!newAdminId) throw new Error('New admin not found');
      await this.prisma.channel.update({
        where: {
          id: channelId,
        },
        data: {
          createdBy: newAdminId,
        },
      });
    } catch (error) {
      throw new BadRequestException('UNABLE TO UPDATE CHANNEL ADMIN');
    }
  }

  /**==============================================================================================*
   * ╭── 🟣
   * ├ 👇 Helper method to check if the user is already an admin
   * └── 🟣
   */
  async isAlreadyAdmin(channelId: string, userId: string) {
    try {
      // ------------------ get the channel ------------------
      const channelMember = await this.prisma.channelRelation.findFirst({
        where: {
          channelId: channelId,
          userId: userId,
        },
        select: {
          isAdmin: true,
        },
      });
      if (!channelMember) throw new Error('User not found');
      return channelMember.isAdmin;
    } catch (error) {
      throw new BadRequestException('UNABLE TO CHECK IF USER IS ADMIN');
    }
  }

  /**==============================================================================================*
   * ╭── 🟣
   * ├ 👇 Add admin to the channel
   * └── 🟣
   * @param channelId: string, the id of the channel
   * @param userId: string, the id of the new admin
   * @returns the new admin of the channel
   *
   * ==============================================================================================
   * ## STEPS:
   * ==============================================================================================
   * 1. get the channel
   * 2. check if the user is a member of the channel // from the relation service class
   * 3. check if the user is already an admin
   * 4. update the channel admin
   * ==============================================================================================
   */
  async addAdminToChannel(channelId: string, userId: string) {
    try {
      // ------------------ check if the user is a member of the channel ------------------
      const userChannelRelation = await this.prisma.channelRelation.findFirst({
        where: {
          channelId: channelId,
          userId: userId,
        },
      });

      if (!userChannelRelation)
        throw new Error('User is not a member of the channel');

      // ------------------ check if the user is already an admin ------------------
      const isAlreadyAdmin = await this.isAlreadyAdmin(channelId, userId);
      if (isAlreadyAdmin) throw new Error('User is already an admin');

      // ------------------ get the channel relation ------------------
      const requestedRelation = await this.prisma.channelRelation.findFirst({
        where: {
          channelId: channelId,
          userId: userId,
        },
      });
      if (!requestedRelation) throw new Error('Relation not found');

      // ------------------ update the channel admin ------------------
      await this.prisma.channelRelation.update({
        where: {
          id: requestedRelation.id,
        },
        data: {
          isAdmin: true,
        },
      });

      // ------------------ return the channel admin ------------------
      const updatedRelation = await this.prisma.channelRelation.findFirst({
        where: {
          channelId: channelId,
          userId: userId,
        },
        include: {
          user: true,
        },
      });
      if (!updatedRelation) throw new Error('Relation not found');

      return updatedRelation.user;
    } catch (error) {
      throw new BadRequestException('UNABLE TO ADD ADMIN TO CHANNEL');
    }
  }
  /**==============================================================================================**/
}
