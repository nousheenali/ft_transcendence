import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Type } from '@prisma/client';
import { ChannelService } from './channel.service'; // 👈 Import ChannelService
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  //================================================================================================
  // 👇 create a new channel
  @Post('/create')
  @UsePipes(ValidationPipe)
  CreateChannel(@Body() CreateChannelDto: CreateChannelDto) {
    try {
      return this.channelService.createChannel(CreateChannelDto);
    } catch (error) {
      throw new HttpException(
        'Error while Creating Channel.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //================================================================================================
  // 👇 delete a channel
  @Delete('/delete/:id')
  DeleteChannel(@Param('id') id: string) {
    return this.channelService.DeleteChannel(id);
  }

  /**===============================================================================================
   * ╭── 🟣
   * ├ 👇 get all private channels according to the user login
   * └── 🟣
   * @param login: string, the login of the user
   * @returns all the private channels that the user have relation with.
   * @throws HttpException if there is an error while getting the private channels
   * @throws HttpStatus.INTERNAL_SERVER_ERROR if there is an error while getting the private channels
   * @example GET /channels/private-channels/:login
   * ==============================================================================================*/
  @Get('/all-channels/:channelType/:login')
  GetALLChannels(
    @Param('channelType') channelType: Type,
    @Param('login') login: string,
  ) {
    try {
      return this.channelService.getAllChannels(channelType, login);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while Getting All Channels of the server ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**===============================================================================================
   * ╭── 🟣
   * ├ 👇 get all private channels according to the user login
   * └── 🟣
   * @param login: string, the login of the user
   * @returns all the private channels that the user have relation with.
   * @throws HttpException if there is an error while getting the private channels
   * @throws HttpStatus.INTERNAL_SERVER_ERROR if there is an error while getting the private channels
   * @example GET /channels/private-channels/:login
   * ==============================================================================================*/
  @Get('/private-channels/:login')
  GetPrivateChannels(@Param('login') login: string) {
    try {
      return this.channelService.getUserPrivateChannels(login);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while Getting The Private Channels of the user ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**===============================================================================================
   * ╭── 🟣
   * ├ 👇 get all the public channels according to the user login
   * └── 🟣
   * @param login: string, the login of the user
   * @returns all the public channels that the user have relation with.
   * @throws HttpException if there is an error while getting the public channels
   * @throws HttpStatus.INTERNAL_SERVER_ERROR if there is an error while getting the public channels
   * @example GET /channels/public-channels/:login
   * ==============================================================================================*/
  //================================================================================================
  // 👇 get all channels according to the channel type
  @Get('/public-channels/:login')
  GetPublicChannels(@Param('login') login: string) {
    try {
      return this.channelService.getUserPublicChannels(login);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while Getting The Public Channels of the server ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /**===============================================================================================
   * ╭── 🟣
   * ├ 👇 get channel users according to the user login and the channel name
   * └── 🟣
   * @param login: string, the login of the user
   * @param channelName: string, the name of the channel
   * @returns all the users that are members of the channel
   * @throws HttpException if there is an error while getting the channel's users
   * @throws HttpStatus.INTERNAL_SERVER_ERROR
   * @example GET /channels/users/:channelName/:login
   * ==============================================================================================*/
  @Get('/users/:channelName/:login')
  GetPrivateChannelUsers(
    @Param('login') login: string,
    @Param('channelName') channelName: string,
  ) {
    try {
      return this.channelService.getChannelUsers(channelName);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while Getting The Channels of the user ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**===============================================================================================
   * ╭── 🟣
   * ├ 👇 get private channel messages according to the user login and the channel name
   * └── 🟣
   * @param login: string, the login of the user
   * @param channelName: string, the name of the channel
   * @returns all the messages of the channel
   * @throws HttpException if there is an error while getting the channel's messages
   * @throws HttpStatus.INTERNAL_SERVER_ERROR
   * @example GET /channels/messages/:channelName/:login
   * ==============================================================================================*/
  @Get('/messages/:channelName/:login')
  GetPrivateChannelMessages(
    @Param('login') login: string,
    @Param('channelName') channelName: string,
  ) {
    try {
      return this.channelService.getChannelMessages(channelName);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while Getting The Private Channels of the user ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**===============================================================================================*/
}
