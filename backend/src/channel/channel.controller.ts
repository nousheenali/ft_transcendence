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
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { Type } from '@prisma/client';
import { ChannelService } from './channel.service'; // 👈 Import ChannelService
import { ChannelRelationService } from './channel-relation.service';
import { UserService } from '../user/user.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { AccessTokenGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(AccessTokenGuard)
@Controller('channels')
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
    private readonly channelRelationService: ChannelRelationService,
    private readonly userService: UserService,
  ) {}

  //================================================================================================
  // 👇 create a new channel
  @Post('/create')
  @UsePipes(ValidationPipe)
  CreateChannel(@Body() CreateChannelDto: CreateChannelDto) {
    try {
      return this.channelService.createChannel(CreateChannelDto);
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new HttpException(
          'Unexpected Error while creating a new channel.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
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
   * ├ 👇 get the current channel updated data according to the user login
   * └── 🟣
   * @param login: string, the login of the user
   * @param channelName: string, the name of the channel
   * @returns the current channel updated data
   * @throws HttpException if there is an error while getting the channels
   * @throws HttpStatus.INTERNAL_SERVER_ERROR if there is an error while getting the channels
   * @example GET /channels/current-channel/:channelName/:login
   **/
  @Get('/current-channel/:channelName/:login')
  async GetCurrentChannelData(
    @Param('channelName') channelName: string,
    @Param('login') login: string,
  ) {
    try {
      const currentChannel = await this.channelService.getChannelByName(
        channelName,
      );
      if (!currentChannel) {
        throw new HttpException(
          'Unexpected Error while Getting The Current Channel',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return currentChannel;
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while Getting The Current Channel ',
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
  @Get('/all-channels/:channelType/:login')
  GetALLChannels(
    @Param('channelType') channelType: Type,
    @Param('login') login: string,
  ) {
    try {
      return this.channelService.getAllChannels(channelType, login);
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new HttpException(
          'Unexpected Error while getting all channels.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
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
      if (!(error instanceof BadRequestException)) {
        throw new HttpException(
          'Unexpected Error while getting private channels.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
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
   */
  @Get('/public-channels/:login')
  GetPublicChannels(@Param('login') login: string) {
    try {
      return this.channelService.getUserPublicChannels(login);
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new HttpException(
          'Unexpected Error while getting public channels.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
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
  GetChannelUsers(
    @Param('login') login: string,
    @Param('channelName') channelName: string,
  ) {
    try {
      return this.channelService.getChannelUsers(channelName);
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new HttpException(
          'Unexpected Error while getting channel users.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
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
      if (!(error instanceof BadRequestException)) {
        throw new HttpException(
          'Unexpected Error while getting channel messages.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }

  /**===============================================================================================*/
  // 👇 get if the user is muted in a channel.
  @Get('/channel-property/is-muted/:channelName/:login')
  async isUserMuted(
    @Param('channelName') channelName: string,
    @Param('login') login: string,
  ) {
    try {
      const user = await this.userService.getUserByLogin(login);
      const channel = await this.channelService.getChannelByName(channelName);

      return await this.channelRelationService.isUserMuted(channel.id, user.id);
    } catch (error) {
      //   if (!(error instanceof BadRequestException)) {
      //     throw new HttpException(
      //       'Unexpected Error while checking if the user is muted.',
      //       HttpStatus.INTERNAL_SERVER_ERROR,
      //     );
      //   }
      //   throw error;
      // }
      return false;
    }
  }
  /**===============================================================================================*/
}
