import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateChannelRelationDto } from './dto/create-channel-relation.dto'; // 👈 Import CreateChannelRelationDto
import { PrismaService } from '../prisma/prisma.service'; // 👈 Import PrismaService
import { ChannelService } from './channel.service';
import { UserService } from 'src/user/user.service';

/** ------------------------------------------------------------------------------------------- **/
@Injectable()
export class ChannelRelationService {
  constructor(
    private prisma: PrismaService,
    private channelService: ChannelService,
    private userService: UserService,
  ) {} // 👈 Inject PrismaService class into the constructor.

  /** -------------------------------------------------------------------------------------------
   * 👉 Helper function.
   * 👉 Returns if a specific user is a member of a specific channel or not.
   * @param channelId the id of the channel to find member from.
   * @param userId the id of the user to check if he is a member of the channel.
   * @returns
   */
  async isRelationExist(channelId: string, userId: string) {
    try {
      const userChannelRelation = await this.prisma.channelRelation.findFirst({
        where: {
          channelId: channelId,
          userId: userId,
        },
      });
      if (userChannelRelation) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new BadRequestException(
        'UNABLE TO CHECK IF THE USER IS A MEMBER OF THE CHANNEL',
      );
    }
  }

  /** -------------------------------------------------------------------------------------------**/
  async isUserMuted(channelId: string, userId: string) {
    // Getting the current value of the isMuted field from the relation table
    try {
      const isRelationExist = await this.isRelationExist(channelId, userId);
      if (!isRelationExist) {
        return false;
      }
      const isUserMuted = await this.prisma.channelRelation.findFirst({
        where: {
          userId: userId,
          channelId: channelId,
        },
        select: {
          isMuted: true,
        },
      });
      return isUserMuted.isMuted;
    } catch (error) {
      throw new BadRequestException(
        'UNABLE TO CHECK IF THE USER IS MUTED OR NOT',
      );
    }
  }

  /** -------------------------------------------------------------------------------------------
   * 👉 update the isMuted field in the channel relation table
   * @param channelId the id of the channel to find member from.
   * @param userId the id of the user to check if he is a member of the channel.
   * @param isMuted the value of the isMuted field
   * @returns
   * @throws BadRequestException if the user is not a member of the channel.
   * @example
   * updateChannelRelation(13, 14224, true)
   */
  async updateIsMutedInChannelRelation(userId: string, channelId: string) {
    try {
      const isUserMuted = await this.isUserMuted(channelId, userId);

      // if the user is already muted, then unmute him, and vice versa
      if (isUserMuted) {
        await this.prisma.channelRelation.updateMany({
          where: {
            userId: userId,
            channelId: channelId,
          },
          data: {
            isMuted: false,
          },
        });
        return false;
      } else {
        await this.prisma.channelRelation.updateMany({
          where: {
            userId: userId,
            channelId: channelId,
          },
          data: {
            isMuted: true,
          },
        });
        return true;
      }
    } catch (error) {
      throw new BadRequestException('UNABLE TO UPDATE THE CHANNEL RELATION');
    }
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
    try {
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
    } catch (error) {
      throw new BadRequestException('UNABLE TO CREATE THE CHANNEL RELATION');
    }
  }

  /** -------------------------------------------------------------------------------------------
   * 👉 Returns all members tables of a specific channel.
   * @param channelId the id of the    channel to find members of.
   * @returns
   */
  async findChannelMembers(channelId: string) {
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
      throw new BadRequestException(
        'UNABLE TO GET USER RELATIONS WITH CHANNELS',
      );
    }
  }

  /** -------------------------------------------------------------------------------------------
   * 👉 Delete a channel relation between a user and a channel according to the id of
   * the channel and the id of the user.
   * @param userID the id of the user that is a member of the channel.
   * @param channelID the id of the channel that the user is a member of.
   */

  async deleteChannelRelation(userID: string, channelID: string) {
    try {
      const isRelationExist = await this.isRelationExist(channelID, userID);
      if (!isRelationExist) {
        throw new BadRequestException('User is not a member of the channel.');
      } else {
        await this.prisma.channelRelation.deleteMany({
          where: {
            userId: userID,
            channelId: channelID,
          },
        });
        return;
      }
    } catch (error) {
      throw new BadRequestException('UNABLE TO DELETE THE CHANNEL RELATION');
    }
  }

  /** ---------------------------------------------------------------------------------------- **/
}
