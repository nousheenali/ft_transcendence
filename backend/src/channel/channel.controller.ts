import {Controller,Get,Post,Body,Patch,Param,Delete,} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelRelationDto } from './dto/create-channel-relation.dto';

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
  findAll(@Param('id') id: number) {
    return this.channelService.findChannelMembers(+id);
  }

  // 👇 delete a channel relation between a user table and a channel.
  @Delete('/deleteChannelRelation/:id')
  remove(@Param('id') id: number) {
    return this.channelService.remove(+id);
  }
}
