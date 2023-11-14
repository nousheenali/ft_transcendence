import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateChannelRelationDto } from './dto/create-channel-relation.dto'; // 👈 Import CreateChannelRelationDto
import { PrismaService } from '../prisma/prisma.service'; // 👈 Import PrismaService

/** ------------------------------------------------------------------------------------------- **/
@Injectable()
export class ChannelRelationService {
  constructor(private prisma: PrismaService) {} // 👈 Inject PrismaService class into the constructor.

  /** -------------------------------------------------------------------------------------------
   * 👉 Helper function.
   * 👉 Returns if a specific user is a member of a specific channel or not.
   * @param channelId the id of the channel to find member from.
   * @param userId the id of the user to check if he is a member of the channel.
   * @returns
   */
  async isRelationExist(channelId: string, userId: string) {
    return await this.prisma.channelRelation
      .findMany({
        where: {
          channelId: channelId,
          userId: userId,
        },
      })
      .then((channelRelations) => {
        return channelRelations.length > 0;
      });
  }
  /** -------------------------------------------------------------------------------------------
   * 👉 Creates a new channel relation between a user table and a channel.
   * @param createChannelRelationDto the data to create a new channel relation,
   * including the user id and channel id.
   * @returns the newly created channel relation.
   * @throws BadRequestException if the user is already a member of the channel.
   * @example
   * createChannelRelation({ userId: 1, channelId: 1 })
   */
  async createChannelRelation(
    createChannelRelationDto: CreateChannelRelationDto,
  ) {
    const { userId, channelId } = createChannelRelationDto;
    const isRelationExist = await this.isRelationExist(channelId, userId);

    if (isRelationExist) {
      throw new BadRequestException(
        'User is already a member of this channel.',
      );
    } else {
      const newChannelRelation = await this.prisma.channelRelation.create({
        data: {
          userId,
          channelId,
        },
      });
      return newChannelRelation;
    }
  }
  /** -------------------------------------------------------------------------------------------
   * 👉 Returns all members tables of a specific channel.
   * @param channelId the id of the    channel to find members of.
   * @returns
   */
  findChannelMembers(channelId: string) {
    return this.prisma.channelRelation.findMany({
      where: { channelId: channelId },
      include: {
        user: true,
      },
    });
  }

  /** -------------------------------------------------------------------------------------------
   * return all the channels that the user have relation with
   * this function is used to get all the channels that the user is a member of
   * so he can join their rooms agin when he reconnect to the server
   */
  async findUserChannels(userId: string) {
    try {
      const channels = await this.prisma.channelRelation.findMany({
        where: {
          userId: userId,
        },
        select: {
          channel: {
            select: {
              channelName: true,
              channelType: true,
            },
          },
        },
      });
      return channels;
    } catch (error) {
      throw new BadRequestException('UNABLE TO GET USER RELATIONS WITH CHANNELS');
    }
  }

  /** -------------------------------------------------------------------------------------------
   * 👉 Delete a channel relation between a user and a channel according to the id of
   * the channel and the id of the user.
   * @param userID the id of the user that is a member of the channel.
   * @param channelID the id of the channel that the user is a member of.
   */

  async remove(userID: string, channelID: string) {
    const isRelationExist = await this.isRelationExist(channelID, userID);

    if (!isRelationExist) {
      throw new BadRequestException('User is not a member of the channel.');
    } else {
      return this.prisma.channelRelation.deleteMany({
        where: {
          userId: userID,
          channelId: channelID,
        },
      });
    }
  }
  /** ---------------------------------------------------------------------------------------- **/
}
