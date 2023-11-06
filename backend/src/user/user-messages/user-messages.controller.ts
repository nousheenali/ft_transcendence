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
import { CreateUserMessageDto } from './dto/create-user-message.dto';

@Controller('user-messages')
export class UserMessagesController {
  constructor(private readonly userMessagesService: UserMessagesService) {}

  //================================================================================================
  // @Post('createMessage')
  // async createUserMessage(@Body() message: CreateUserMessageDto ) {
  //   try {
  //     const { senderId, receiverId, content } = message;
  //     return this.userMessagesService.createUserMessage(
  //       senderId,
  //       receiverId,
  //       content,
  //     );
  //   } catch (error) {
  //     throw new HttpException(
  //       'Unexpected Error while Creating user message',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  //================================================================================================
  // 👇 get the user latest messages from other users.
  @Get('/latest-messages/:login/')
  async getUserLatestMessages(@Param('login') login: string) {
    try {
      const userId = await this.userMessagesService.getUserIdByLogin(login);
      return this.userMessagesService.userLatestMessages(userId);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while Getting user latest messages',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //================================================================================================
    // 👇 get the user latest messages from other users.
    
    @Get('/friend-chat/:friendLogin/:login/')
    async getFriendChat(@Param('login') login: string, @Param('friendLogin') friendLogin: string) {
      try {
        const userId = await this.userMessagesService.getUserIdByLogin(login);
        const friendId = await this.userMessagesService.getUserIdByLogin(friendLogin);

        return this.userMessagesService.userFriendChat(userId, friendId);
      } catch (error) {
        console.log(error);
        throw new HttpException(
          'Unexpected Error while Getting user latest messages',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    //================================================================================================
}
