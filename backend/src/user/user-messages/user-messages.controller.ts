import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserMessagesService } from './user-messages.service';
import { HttpException, HttpStatus } from '@nestjs/common'; // 👈 Import HttpException and HttpStatus

@Controller('user-messages')
export class UserMessagesController {
  constructor(private readonly userMessagesService: UserMessagesService) {}
  //================================================================================================
  // 👇 get all received user messages from other users
  @Get('/received/:login/')
  getUserReceivedMessages(@Param('login') login: string) {
    try {
      return this.userMessagesService.getUserMessages(login);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while Getting user received messages',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //================================================================================================
}
