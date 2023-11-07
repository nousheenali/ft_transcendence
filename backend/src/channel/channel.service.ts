import { Channel } from './entities/channel.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateChannelRelationDto } from './dto/create-channel-relation.dto'; // 👈 Import CreateChannelRelationDto
import { PrismaService } from '../prisma/prisma.service'; // 👈 Import PrismaService
import { Type } from '@prisma/client';
import { hashPassword } from 'src/utils/bcrypt';

/** ------------------------------------------------------------------------------------------- **/
@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {} // 👈 Inject PrismaService class into the constructor.

  /*
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
  }

  /*
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

  /** ------------------------------------------------------------------------------------------- *
   * 🌼 Method that return all the private channels that the users have relations with.
   * * @param login: string, the login of the user
   */
  async getPrivateChannels(login: string) {
    const channels = await this.prisma.user.findMany({
      where: {
        login: login,
      },
      select: {
        channelRelation: {
          select: {
            channel: {
              select: {
                channelName: true,
                channelType: true,
                createdBy: true,
                channelMembers: {
                  select: {
                    user: {
                      select: {
                        login: true,
                        isOnline: true,
                        name: true,
                        avatar: true,
                      },
                    },
                  },
                },
                // Messages: {
                //   select: {
                //     sender: {
                //       select: {
                //         login: true,
                //         isOnline: true,
                //         name: true,
                //         avatar: true,
                //       },
                //     },
                //     content: true,
                //     createdAt: true,
                //   },
                // },
              },
            },
          },
        },
      },
    });
    return channels;
  }
  // async getPrivateChannels(login: string) {
  //   const channels: Channel[] = [];
  //   const userRelations = await this.prisma.user.findUnique({
  //     where: {
  //       login: login,
  //     },
  //     include: {
  //       channelRelation: {
  //         include: {
  //           channel: {
  //             include: {
  //               channelMembers: {
  //                 include: {
  //                   user: true,
  //                 },
  //               },
  //               Messages: {
  //                 include: {
  //                   sender: true,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  //   userRelations.channelRelation.forEach((relation) => {
  //     channels.push(relation.channel);
  //   });
  //   return channels;
  // }
  /** ------------------------------------------------------------------------------------------- *
   * 🌼 Method that return all the public channels from the database.
   */
  async getPublicChannels() {
    const publicChannels = await this.prisma.channel.findMany({
      where: {
        channelType: 'PUBLIC',
      },
      include: {
        Messages: {
          include: {
            sender: true,
          },
        },
      },
    });
    return publicChannels;
  }
  /** ------------------------------------------------------------------------------------------- **/
}
