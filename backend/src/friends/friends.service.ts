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
      return newRelation;
    } else {
      throw new BadRequestException('Friend Request already sent or Received');
    }
  }

  /*------------------------------------------------------------------------------------*/

  async getAllNonFriends(id: string) {
    /*check if valid user*/
    const user = await this.userService.getUserById(id);
    if (!user) 
      throw new NotFoundException('User ID is invalid');

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
}
