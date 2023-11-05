import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChannelRelationService } from './channel-relation.service'; // 👈 Import ChannelRelationService
import { CreateChannelRelationDto } from './dto/create-channel-relation.dto'; // 👈 Import CreateChannelRelationDto

@Controller('channel_relation')
export class ChannelRelationController {
  constructor(private readonly channelRelationService: ChannelRelationService) {}
  
  // 👇 create a new channel relation between a user table and a certain channel.
  @Post('/createChannelRelation/')
  create(@Body() createChannelRelationDto: CreateChannelRelationDto) {
    return this.channelRelationService.createChannelRelation(createChannelRelationDto);
  }

  // 👇 get all members of a channel.
  @Get('/getMembers/:id')
  findAll(@Param('id') id: string) {
    return this.channelRelationService.findChannelMembers(id);
  }

  // 👇 delete a channel relation between a user table and a channel.
  @Delete('/deleteChannelRelation/:userID/:channelID')
  remove(
    @Param('userID') userID: string,
    @Param('channelID') channelID: string,
  ) {
    return this.channelRelationService.remove(userID, channelID);
  }
}
