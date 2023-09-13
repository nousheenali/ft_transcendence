import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannel } from './dto/create-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly ChannelService: ChannelService) {}

  @Post('/create')
  CreateChannel(@Body() CreateChannel: CreateChannel) {
    return this.ChannelService.createChannel(CreateChannel);
  }

  @Delete('/delete/:id')
  DeleteChannel(@Param('id') id : string) {
    return this.ChannelService.DeleteChannel(id);
  }
}
