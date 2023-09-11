import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateChannelService } from './create-channel.service';
import { CreateChannel } from './dto/create-channel.dto';

@Controller('channel')
export class CreateChannelController {
  constructor(private readonly CreateChannelService: CreateChannelService) {}

  @Post('/join')
  CreateChannel(@Body() CreateChannel: CreateChannel) {
    return this.CreateChannelService.createChannel(CreateChannel);
  }

  @Delete('/delete/:id')
  DeleteChannel(@Param('id') id : string) {
    return this.CreateChannelService.DeleteChannel(id);
  }
}
