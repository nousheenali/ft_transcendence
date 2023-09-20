import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendsDto } from './dto/friends.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FriendsService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

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
    const friends = allFriends.map(({ friend }) => friend);
    return friends;
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
      return 'Friend Request Sent';
    } else {
      throw new BadRequestException('Friend Request already sent or Received');
    }
  }

  /*------------------------------------------------------------------------------------*/

  async getAllNonFriends(id: string) {
    /*check if valid user*/
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException('User ID is invalid');

    /* Get all users that do not have a corresponding entry against the
    incoming userid in 'friendRelations' table */
    const usersWithoutFriendship = await this.prisma.user.findMany({
      where: {
        NOT: {
          OR: [
            {
              userToFriend: {
                some: {
                  friend: {
                    id: id,
                  },
                },
              },
            },
            {
              friendToUser: {
                some: {
                  user: {
                    id: id,
                  },
                },
              },
            },
          ],
        },
      },
    });

    /* The output above includes the incoming userid also, so removing that entry */
    const result = usersWithoutFriendship.filter((user) => user.id !== id);
    return result;
  }

  /*------------------------------------------------------------------------------------*/

  /* To cancel friend request sent. This can be done only if record in friendRelations table 
  is in 'PENDING' state */
  async deleteFriendRelation(userId: string, friendId: string) {
    /*check if relation exists between users */
    const relation = await this.getRelation(userId, friendId);
    if (!relation) {
      throw new NotFoundException('No friend request was sent');
    }

    if (relation.friendStatus === 'PENDING') {
      await this.prisma.friendRelation.deleteMany({
        where: {
          userId: userId,
          friendId: friendId,
        },
      });
      return 'Friend Request Cancelled';
    } else {
      throw new BadRequestException(
        'Friend Request already Accepted/Declined/Blocked',
      );
    }
  }

  /*------------------------------------------------------------------------------------*/

  /* To accept friend request received. This can be done only if record in friendRelations 
  table is in 'PENDING' state */
  async acceptRequest(userId: string, requestfromId: string) {
    const relation = await this.getRelation(requestfromId, userId);
    if (!relation) {
      throw new NotFoundException('No friend request received');
    }

    if (relation.friendStatus === 'PENDING') {
      await this.prisma.friendRelation.updateMany({
        where: {
          userId: requestfromId,
          friendId: userId,
        },
        data: {
          friendStatus: 'ACCEPTED',
        },
      });
      return 'Friend Request Accepted';
    } else {
      throw new BadRequestException(
        'Friend Request already Accepted/Declined/Blocked',
      );
    }
  }

  /*------------------------------------------------------------------------------------*/

  /* To reject friend request received. This can be done only if record in friendRelations 
  table is in 'PENDING' state */
  async declineRequest(userId: string, requestfromId: string) {
    const relation = await this.getRelation(requestfromId, userId);
    if (!relation) {
      throw new BadRequestException('No friend request received');
    }

    if (relation.friendStatus === 'PENDING') {
      await this.prisma.friendRelation.updateMany({
        where: {
          userId: requestfromId,
          friendId: userId,
        },
        data: {
          friendStatus: 'DECLINED',
        },
      });
      return 'Friend Request Declined';
    } else {
      throw new BadRequestException(
        'Friend Request already Accepted/Declined/Blocked',
      );
    }
  }
}
