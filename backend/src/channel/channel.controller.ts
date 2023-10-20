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

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  // 👇 create a new channel
  @Post('/create')
  CreateChannel(@Body() CreateChannelDto: CreateChannelDto) {
    return this.channelService.createChannel(CreateChannelDto);
  }

  // 👇 delete a channel
  @Delete('/delete/:id')
  DeleteChannel(@Param('id') id: string) {
    return this.channelService.DeleteChannel(id);
  }
}
