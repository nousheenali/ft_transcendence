import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsDto } from './dto/friends.dto';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  /*Lists all friends */
  @Get('all/:id')
  GetAllFriends(@Param('id') id: string) {
    return this.friendsService.getAllFriends(id);
  }

  /* When user sends a friend request */
  @Post('sendFriendRequest')
  CreateFriendRelation(@Body() dto: FriendsDto) {
    return this.friendsService.createFriendRelation(dto);
  }
}
