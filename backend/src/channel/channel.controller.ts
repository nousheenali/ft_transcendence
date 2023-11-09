import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChannelService } from './channel.service'; // 👈 Import ChannelService
import { CreateChannelDto } from './dto/create-channel.dto';
import { HttpException, HttpStatus } from '@nestjs/common'; // 👈 Import HttpException and HttpStatus

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
  
  //================================================================================================
  // 👇 create a new channel
  @Post('/create')
  CreateChannel(@Body() CreateChannelDto: CreateChannelDto) {
    return this.channelService.createChannel(CreateChannelDto);
  }

  //================================================================================================
  // 👇 delete a channel
  @Delete('/delete/:id')
  DeleteChannel(@Param('id') id: string) {
    return this.channelService.DeleteChannel(id);
  }
  //================================================================================================
}
