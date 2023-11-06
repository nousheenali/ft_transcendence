import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendsDto } from './dto/friends.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FriendsService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAllFriends(login: string) {
    const userData = await this.userService.getUserByLogin(login);
    if (!userData) throw new NotFoundException('User Id does not exist');

    /*gets list of friends to whom the user has sent a request to */
    const userToFriend = await this.prisma.friendRelation.findMany({
      where: {
        userId: userData.id,
        friendStatus: 'ACCEPTED',
      },
      select: {
        friend: true,
      },
    });

    /*gets list of friends from whom the user received a request from */
    const friendtoUser = await this.prisma.friendRelation.findMany({
      where: {
        friendId: userData.id,
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
    if (relation1) return relation1;
    else if (relation2) return relation2;
    else return null;
  }

  /* creates an outgoing friend request from the user to a friend 
  (if not already sent) */
  async createFriendRelation(dto: FriendsDto) {
    const userData = await this.userService.getUserByLogin(dto.userLogin);
    if (!userData) throw new NotFoundException('User Id does not exist');
    const friendData = await this.userService.getUserByLogin(dto.friendLogin);
    if (!friendData) throw new NotFoundException('Friend Id does not exist');

    const relation = await this.relationExists(userData.id, friendData.id);

    if (!relation) {
      const newRelation = await this.prisma.friendRelation.create({
        data: {
          userId: userData.id,
          friendId: friendData.id,
          friendStatus: 'PENDING',
        },
      });
      return 'Friend Request Sent';
    } else {
      throw new BadRequestException('Friend Request already sent or Received');
    }
  }

  /*------------------------------------------------------------------------------------*/

  async getAllNonFriends(login: string) {
    /*get user info to retuieve their id*/
    const userData = await this.userService.getUserByLogin(login);
    if (!userData) throw new NotFoundException('User Id does not exist');

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
                    id: userData.id,
                  },
                },
              },
            },
            {
              friendToUser: {
                some: {
                  user: {
                    id: userData.id,
                  },
                },
              },
            },
          ],
        },
      },
    });

    /* The output above includes the incoming userid also, so removing that entry */
    const result = usersWithoutFriendship.filter(
      (user) => user.id !== userData.id,
    );
    return result;
  }

  /*------------------------------------------------------------------------------------*/

  /* To cancel friend request sent. This can be done only if record in friendRelations table 
  is in 'PENDING' state */
  async cancelFriendRelation(userLogin: string, friendLogin: string) {
    const userData = await this.userService.getUserByLogin(userLogin);
    if (!userData) throw new NotFoundException('User Id does not exist');
    const friendData = await this.userService.getUserByLogin(friendLogin);
    if (!friendData) throw new NotFoundException('friend Id does not exist');

    /*check if relation exists between users */
    const relation = await this.getRelation(userData.id, friendData.id);
    if (!relation) {
      throw new NotFoundException('No friend request was sent');
    }

    if (relation.friendStatus === 'PENDING') {
      await this.prisma.friendRelation.deleteMany({
        where: {
          userId: userData.id,
          friendId: friendData.id,
        },
      });
      return 'Friend Request Cancelled';
    } else {
      throw new BadRequestException('Friend Request already Accepted/Blocked');
    }
  }

  /*------------------------------------------------------------------------------------*/

  /* To accept friend request received. This can be done only if record in friendRelations 
  table is in 'PENDING' state */
  async acceptRequest(userLogin: string, requestfromLogin: string) {
    const userData = await this.userService.getUserByLogin(userLogin);
    if (!userData) throw new NotFoundException('User Id does not exist');
    const reqFromData = await this.userService.getUserByLogin(requestfromLogin);
    if (!reqFromData) throw new NotFoundException('friend Id does not exist');

    const relation = await this.getRelation(reqFromData.id, userData.id);
    if (!relation) {
      throw new NotFoundException('No friend request received');
    }

    if (relation.friendStatus === 'PENDING') {
      await this.prisma.friendRelation.updateMany({
        where: {
          userId: reqFromData.id,
          friendId: userData.id,
        },
        data: {
          friendStatus: 'ACCEPTED',
        },
      });
      return 'Friend Request Accepted';
    } else {
      throw new BadRequestException('Friend Request already Accepted/Blocked');
    }
  }

  /*------------------------------------------------------------------------------------*/

  /* To reject friend request received. This can be done only if record in friendRelations 
  table is in 'PENDING' state */
  async declineRequest(userLogin: string, requestfromLogin: string) {
    const userData = await this.userService.getUserByLogin(userLogin);
    if (!userData) throw new NotFoundException('User Id does not exist');
    const reqFromData = await this.userService.getUserByLogin(requestfromLogin);
    if (!reqFromData) throw new NotFoundException('Friend Id does not exist');

    const relation = await this.getRelation(reqFromData.id, userData.id);
    if (!relation) {
      throw new BadRequestException('No friend request received');
    }

    if (relation.friendStatus === 'PENDING') {
      await this.prisma.friendRelation.deleteMany({
        where: {
          userId: reqFromData.id,
          friendId: userData.id,
        },
      });
      return 'Friend Request Declined';
    } else {
      throw new BadRequestException('Friend Request already Accepted/Blocked');
    }
  }

  /*------------------------------------------------------------------------------------*/

  /* get all friend requests sent by the user*/
  async getOutgoingRequests(login: string) {
    const userData = await this.userService.getUserByLogin(login);
    if (!userData) throw new NotFoundException('User Id does not exist');

    const result = await this.prisma.friendRelation.findMany({
      where: {
        userId: userData.id,
        friendStatus: 'PENDING',
      },
      select: {
        friend: true,
      },
    });
    /*remove nesting of the json output*/
    const flattenedJSON = result.map((item) => item.friend);
    return flattenedJSON;
  }

  /*------------------------------------------------------------------------------------*/

  /* get all friend requests received by the user*/
  async getIncomingRequests(login: string) {
    const userData = await this.userService.getUserByLogin(login);
    if (!userData) throw new NotFoundException('User Id does not exist');
    const result = await this.prisma.friendRelation.findMany({
      where: {
        friendId: userData.id,
        friendStatus: 'PENDING',
      },
      select: {
        user: true,
      },
    });

    /*remove nesting of the json output*/
    const flattenedJSON = result.map((item) => item.user);
    return flattenedJSON;
  }

  /*------------------------------------------------------------------------------------*/

  async blockFriend(dto: FriendsDto) {
    const userData = await this.userService.getUserByLogin(dto.userLogin);
    if (!userData) throw new NotFoundException('User Id does not exist');
    const friendData = await this.userService.getUserByLogin(dto.friendLogin);
    if (!friendData) throw new NotFoundException('Friend Id does not exist');

    const relation = await this.relationExists(userData.id, friendData.id);

    if (!relation)
      throw new NotFoundException('You are not friends with the user');

    if (
      relation.friendStatus === 'BLOCKED' &&
      relation.blockedBy === userData.id
    ) {
      throw new BadRequestException('The friend is already blocked');
    } else if (relation.friendStatus === 'ACCEPTED') {
      await this.prisma.friendRelation.updateMany({
        where: {
          id: relation.id,
        },
        data: {
          friendStatus: 'BLOCKED',
          blockedBy: userData.id,
        },
      });
      return 'Friend has been Blocked';
    } else {
      /* User will not be able to block the other user, if friendStatus is 
      PENDING/BLOCKED(by other user) */
      throw new BadRequestException('This user is not a friend');
    }
  }

  /*------------------------------------------------------------------------------------*/

  async unBlockFriend(dto: FriendsDto) {
    const userData = await this.userService.getUserByLogin(dto.userLogin);
    if (!userData) throw new NotFoundException('User Id does not exist');
    const friendData = await this.userService.getUserByLogin(dto.friendLogin);
    if (!friendData) throw new NotFoundException('Friend Id does not exist');

    const relation = await this.relationExists(userData.id, friendData.id);
    if (!relation)
      throw new NotFoundException('You are not friends with the user');

    if (
      relation.friendStatus === 'BLOCKED' &&
      relation.blockedBy === userData.id
    ) {
      await this.prisma.friendRelation.updateMany({
        where: {
          id: relation.id,
        },
        data: {
          friendStatus: 'ACCEPTED',
          blockedBy: '',
        },
      });
      return 'Friend has been un-blocked';
    } else {
      throw new BadRequestException('This user is not blocked');
    }
  }

  /*------------------------------------------------------------------------------------*/

  /* get list of all blocked friends*/
  async getBlockedFriends(login: string) {
    const userData = await this.userService.getUserByLogin(login);
    if (!userData) throw new NotFoundException('User Id does not exist');

    const result1 = await this.prisma.friendRelation.findMany({
      where: {
        userId: userData.id,
        friendStatus: 'BLOCKED',
        blockedBy: userData.id,
      },
      select: {
        friend: true,
      },
    });

    const result2 = await this.prisma.friendRelation.findMany({
      where: {
        friendId: userData.id,
        friendStatus: 'BLOCKED',
        blockedBy: userData.id,
      },
      select: {
        user: true,
      },
    });
    /*combine the result , but change the label in json result from user to friend */
    const fullResult = [
      ...result1,
      ...result2.map((item) => ({ friend: item.user })),
    ];

    /*remove nesting of the json output*/
    const friends = fullResult.map((item) => item.friend);
    return friends;
  }

  /*------------------------------------------------------------------------------------*/

  /* To unfriend a friend.  */
  async deleteFriendRelation(userLogin: string, friendLogin: string) {
    const userData = await this.userService.getUserByLogin(userLogin);
    if (!userData) throw new NotFoundException('User Id does not exist');
    const friendData = await this.userService.getUserByLogin(friendLogin);
    if (!friendData) throw new NotFoundException('friend Id does not exist');

    /*check if relation exists between users */
    const relation = await this.relationExists(userData.id, friendData.id);
    if (!relation) {
      throw new NotFoundException('You are not friends with the user');
    }

    if (
      relation.friendStatus === 'ACCEPTED' ||
      relation.friendStatus === 'BLOCKED'
    ) {
      await this.prisma.friendRelation.deleteMany({
        where: {
          id: relation.id,
        },
      });
      return 'Unfriended the user';
    } else {
      throw new BadRequestException('You are not friends with the user');
    }
  }
}
