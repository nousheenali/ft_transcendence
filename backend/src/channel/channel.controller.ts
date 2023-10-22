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
import { Type } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common'; // 👈 Import HttpException and HttpStatus

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  //================================================================================================
  // 👇 get all channels according to the channel type
  @Get('/all-channels/:channelType/:login')
  GetChannels(
    @Param('login') login: string, 
    @Param('channelType') channelType: Type
    ) {
    try {
      return this.channelService.getChannels(login, channelType);
    } catch (error) {
      throw new HttpException(
      'Unexpected Error while Getting Channels of the user ',
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