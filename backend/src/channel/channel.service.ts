import { Injectable, BadRequestException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateChannelRelationDto } from './dto/create-channel-relation.dto';
import { PrismaService } from '../prisma/prisma.service'; // 👈 Import PrismaService

/** ------------------------------------------------------------------------------------------- **/
/**
 * TODO:
 *  1. Before creating new relation between the user and the channel, check if the user is already
 *    have relation with the channel.
 */

/** ------------------------------------------------------------------------------------------- **/
@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {} // 👈 Inject PrismaService class into the constructor.

  /** -------------------------------------------------------------------------------------------
   * 👉 Helper function.
   * 👉 Returns if a specific user is a member of a specific channel or not.
   * @param channelId the id of the channel to find member from.
   * @param userId the id of the user to check if he is a member of the channel.
   * @returns
   */
  async isChannelMember(channelId: string, userId: string) {
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
   * NOTE:
   * -------------------------------------------------------------------------------------------
   * @ApiCreatedResponse, @ApiBadRequestResponse,
   * is only for swagger documentation, to show the user what is the result the request.
   */
  @ApiCreatedResponse({ description: 'Channel relation created successfully.' })
  @ApiBadRequestResponse({ description: 'User is already a member of this channel.' })
  async createChannelRelation(createChannelRelationDto: CreateChannelRelationDto) {
    const { userId, channelId } = createChannelRelationDto;
    const isMember = await this.isChannelMember(channelId, userId); // Await the result

    if (isMember) {
      throw new BadRequestException('User is already a member of this channel.');
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
   * 👉 Delete a channel relation between a user table and a channel according to the id of
   * the channel relation.
   * @param id the id of the channel relation to remove.
   */
  remove(id: string) {
    return this.prisma.channelRelation.delete({
      where: { id: id },
    });
  }
}

/** ------------------------------------------------------------------------------------------- **/
