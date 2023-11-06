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
} from '@nestjs/common';
import { ChannelService } from './channel.service'; // 👈 Import ChannelService
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  //================================================================================================
  // 👇 get all channels according to the channel type
  @Get('/private-channels/:login')
  GetPrivateChannels(@Param('login') login: string) {
    try {
      return this.channelService.getPrivateChannels(login);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while Getting The Private Channels of the user ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

    //================================================================================================
  // 👇 get all channels according to the channel type
  @Get('/public-channels/:login')
  GetPublicChannels() {
    try {
      return this.channelService.getPublicChannels();
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while Getting The Public Channels of the server ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 👇 delete a channel relation between a user table and a channel.
  // @Delete('/deleteChannelRelation/:userID/:channelID')
  // remove(
  //   @Param('userID') userID: string,
  //   @Param('channelID') channelID: string,
  // ) {
  //   return this.channelService.remove(userID, channelID);
  // }

  /**
   * create a new channel.
   */
  @Post('create')
  
  //================================================================================================
  // 👇 create a new channel
  @Post('/create')
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
  //================================================================================================
}
