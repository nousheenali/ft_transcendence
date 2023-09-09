import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannelMemberService } from './channel_member.service';
import { CreateChannelMemberDto } from './dto/create-channel_member.dto';
import { UpdateChannelMemberDto } from './dto/update-channel_member.dto';

@Controller('channel-member')
export class ChannelMemberController {
  constructor(private readonly channelMemberService: ChannelMemberService) {}

  @Post()
  create(@Body() createChannelMemberDto: CreateChannelMemberDto) {
    return this.channelMemberService.create(createChannelMemberDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.channelMemberService.findChannelMembers(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelMemberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannelMemberDto: UpdateChannelMemberDto) {
    return this.channelMemberService.update(+id, updateChannelMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelMemberService.remove(+id);
  }
}
