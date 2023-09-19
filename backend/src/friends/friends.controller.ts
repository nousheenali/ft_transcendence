import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsDto } from './dto/friends.dto';
import { NotFoundError } from 'rxjs';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  /*Lists all friends */
  @Get('allFriends/:id')
  GetAllFriends(@Param('id') id: string) {
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
  CreateFriendRelation(@Body() dto: FriendsDto) {
    try {
      return this.friendsService.createFriendRelation(dto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Unexpected Error while sending Friend Request.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /* Gets all users except friends of the userId */
  @Get('nonFriends/:id')
  allNonFriends(@Param('id') id: string) {
    try {

      return this.friendsService.getAllNonFriends(id);

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Unexpected Error while getting Non-friends',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

    }
  }

  /* When user cancels a friend request already sent*/
  @Delete('deleteFriendRequest')
  DeleteFriendRelation(@Body() dto: FriendsDto) {
    try {

      return this.friendsService.deleteFriendRelation(dto.userId, dto.friendId);

    } catch (error) {

      if (error instanceof NotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof BadRequestException){
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Unexpected Error while cancelling Friend Request',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

    }
  }

  /* When a user accepts a friend request from another user*/
  @Put('acceptRequest')
  AcceptRequest(@Body() dto: FriendsDto) {

    try {

      return this.friendsService.AcceptRequest(dto.userId, dto.friendId);
      
    } catch (error) {

      if (error instanceof NotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Unexpected Error while cancelling Friend Request',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      
    }
  }

  /* When a user declines a request from another user*/
  @Put('declineRequest')
  DeclineRequest(@Body() dto: FriendsDto) {

    try {

      return this.friendsService.DeclineRequest(dto.userId, dto.friendId);
      
    } catch (error) {

      if (error instanceof NotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Unexpected Error while cancelling Friend Request',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      
    }
  }
}
