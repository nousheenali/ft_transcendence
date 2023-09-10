import { Injectable } from '@nestjs/common';
import { CreateChannelRelationDto } from './dto/create-channel-relation.dto';
import { PrismaService } from '../prisma/prisma.service'; // 👈 Import PrismaService

/** ------------------------------------------------------------------------------------------- **/
@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {} // 👈 Inject PrismaService class into the constructor.

  /** -------------------------------------------------------------------------------------------
   * 👉 Creates a new channel relation between a user table and a channel.
   * @param createChannelRelationDto the data to create a new channel relation, 
   * including the user id and channel id.
   * @returns the newly created channel relation.
   * @example
   * createChannelRelation({ userId: 1, channelId: 1 })
   */
  async createChannelRelation(createChannelRelationDto: CreateChannelRelationDto) {
    const { userId, channelId } = createChannelRelationDto;
    const newChannelRelation = await this.prisma.channelRelation.create({
      data: {
        userId,
        channelId,
      }
    })
    return newChannelRelation;
  }

  /** -------------------------------------------------------------------------------------------
   * 👉 Returns all members tables of a specific channel.
   * @param channelId the id of the    channel to find members of.
   * @returns
   */
  findChannelMembers(channelId: number) {
    return this.prisma.channelRelation.findMany({
      where: { channelId: channelId },
      include: {
        user: true,
      },
    });
  }

  /** -------------------------------------------------------------------------------------------
   * 👉 Delete a channel relation between a user table and a channel according to the id of 
   * the channel relation.
   * @param id the id of the channel relation to remove.
   */
  remove(id: number) {
    return this.prisma.channelRelation.delete({
      where: { id: id }
    })
  }
}

/** ------------------------------------------------------------------------------------------- **/