import { Injectable } from '@nestjs/common';
import { CreateChannelMemberDto } from './dto/create-channel_member.dto';
import { UpdateChannelMemberDto } from './dto/update-channel_member.dto';
import { PrismaService } from '../prisma/prisma.service'; // 👈 Import PrismaService 

@Injectable()
export class ChannelMemberService {
  constructor(private prisma: PrismaService) {} // 👈 Inject PrismaService class into the constructor.

  create(createChannelMemberDto: CreateChannelMemberDto) {
    return 'This action adds a new channelMember';
  }

  /**
   * Returns all members tables of a specific channel.
   * @param channelId the id of the    channel to find members of.
   * @returns 
   */
  findChannelMembers(channelId: number) {
    return this.prisma.channelRelation.findMany({ 
      where: { channelId: channelId},
      include: {
        user: true,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} channelMember`;
  }

  update(id: number, updateChannelMemberDto: UpdateChannelMemberDto) {
    return `This action updates a #${id} channelMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} channelMember`;
  }
}
