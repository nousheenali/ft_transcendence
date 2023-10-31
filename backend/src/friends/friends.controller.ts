import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsDto } from './dto/friends.dto';
import { NotFoundError } from 'rxjs';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  /*Lists all friends */
  @Get('allFriends/:login')
  getAllFriends(@Param('login') id: string) {
    try {
      return this.friendsService.getAllFriends(id);
    } catch (error) {
      throw new HttpException(
        'Unexpectd Error while Listing Friends.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* When user sends a friend request */
  @Post('sendFriendRequest')
  sendFriendRequest(@Body() dto: FriendsDto) {
    try {
      return this.friendsService.createFriendRelation(dto);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while sending Friend Request.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* Gets all users except friends of the userId */
  @Get('nonFriends/:login')
  getAllNonFriends(@Param('login') login: string) {
    try {
      return this.friendsService.getAllNonFriends(login);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while getting Non-friends',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* When user cancels a friend request already sent*/
  @Delete('cancelFriendRequest')
  cancelFriendRequest(@Body() dto: FriendsDto) {
    try {
      return this.friendsService.cancelFriendRelation(
        dto.userLogin,
        dto.friendLogin,
      );
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while cancelling Friend Request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* When a user accepts a friend request from another user*/
  @Put('acceptRequest')
  acceptRequest(@Body() dto: FriendsDto) {
    try {
      return this.friendsService.acceptRequest(dto.userLogin, dto.friendLogin);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while accepting Friend Request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* When a user declines a request from another user*/
  @Delete('declineRequest')
  declineRequest(@Body() dto: FriendsDto) {
    try {
      return this.friendsService.declineRequest(dto.userLogin, dto.friendLogin);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while declining Friend Request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* Outgoing Friends requests */
  @Get('outgoingRequests/:login')
  outgoingRequests(@Param('login') login: string) {
    try {
      return this.friendsService.getOutgoingRequests(login);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while listing outgoing Friend Requests',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* Incoming Friends requests */
  @Get('incomingRequests/:login')
  incomingRequests(@Param('login') login: string) {
    try {
      return this.friendsService.getIncomingRequests(login);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while listing incoming Friend Requests',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* When User blocks a friend */
  @Put('block')
  blockFriend(@Body() dto: FriendsDto) {
    try {
      return this.friendsService.blockFriend(dto);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while blocking user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* When User un-blocks a blocked friend */
  @Put('unBlock')
  unBlockFriend(@Body() dto: FriendsDto) {
    try {
      return this.friendsService.unBlockFriend(dto);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while un-blocking user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* List all blocked friends */
  @Get('blockedList/:login')
  getBlockedFriends(@Param('login') login: string) {
    try {
      return this.friendsService.getBlockedFriends(login);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while listing blocked users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* When user unfriends a friend/ delete a friend relation*/
  @Delete('deleteFriend')
  deleteFriendRequest(@Body() dto: FriendsDto) {
    try {
      return this.friendsService.deleteFriendRelation(
        dto.userLogin,
        dto.friendLogin,
      );
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while cancelling Friend Request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
