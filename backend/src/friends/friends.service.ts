import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendsDto } from './dto/friends.dto';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async getAllFriends(id: string) {
    /*gets list of friends to whom the user has sent a request to */
    const userToFriend = await this.prisma.friendRelation.findMany({
      where: {
        userId: id,
        friendStatus: 'ACCEPTED',
      },
      select: {
        friend: true,
      },
    });

    /*gets list of friends from whom the user received a request from */
    const friendtoUser = await this.prisma.friendRelation.findMany({
      where: {
        friendId: id,
        friendStatus: 'ACCEPTED',
      },
      select: {
        user: true,
      },
    });

    /*combine the result , but change the label in json result from user to friend */
    const allFriends = [
      ...userToFriend,
      ...friendtoUser.map((item) => ({ friend: item.user })),
    ];

    /*remove nesting of the json output*/
    const flattenedFriends = allFriends.map(({ friend }) => friend);
    return flattenedFriends;
  }

  /*------------------------------------------------------------------------------------*/

  /* gets a relationship record from friend relations table*/
  getRelation(userId: string, friendId: string) {
    return this.prisma.friendRelation.findFirst({
      where: {
        userId: userId,
        friendId: friendId,
      },
    });
  }

  /* Checks the FriendRelation table, if a request has already been 
    sent from user-to-friend or from friend-to-user */
  async relationExists(userId: string, friendId: string) {
    const relation1 = await this.getRelation(userId, friendId);
    const relation2 = await this.getRelation(friendId, userId);

    if (relation1 || relation2) {
      return true;
    }
    return false;
  }

  /* creates an outgoing friend request from the user to a friend 
  (if not already sent) */
  async createFriendRelation(dto: FriendsDto) {
    const relationExists = await this.relationExists(dto.userId, dto.friendId);

    if (!relationExists) {
      const newRelation = await this.prisma.friendRelation.create({
        data: {
          userId: dto.userId,
          friendId: dto.friendId,
          friendStatus: 'PENDING',
        },
      });
      return newRelation;
    } else {
      throw new BadRequestException('Friend Relation already exists.');
    }
  }
}
