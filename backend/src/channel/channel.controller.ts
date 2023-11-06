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
import { CreateChannelRelationDto } from './dto/create-channel-relation.dto'; // 👈 Import CreateChannelRelationDto
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  // 👇 create a new channel relation between a user table and a certain channel.
  @Post('/createChannelRelation/')
  create(@Body() createChannelRelationDto: CreateChannelRelationDto) {
    return this.channelService.createChannelRelation(createChannelRelationDto);
  }

  // 👇 get all members of a channel.
  @Get('/getMembers/:id')
  findAll(@Param('id') id: string) {
    return this.channelService.findChannelMembers(id);
  }

  // 👇 delete a channel relation between a user table and a channel.
  @Delete('/deleteChannelRelation/:userID/:channelID')
  remove(
    @Param('userID') userID: string,
    @Param('channelID') channelID: string,
  ) {
    return this.channelService.remove(userID, channelID);
  }

  /**
   * create a new channel.
   */
  @Post('/create')
  CreateChannel(@Body() CreateChannelDto: CreateChannelDto) {
    return this.channelService.createChannel(CreateChannelDto);
  }

  @Delete('/delete/:id')
  DeleteChannel(@Param('id') id: string) {
    return this.channelService.DeleteChannel(id);
  }
}
