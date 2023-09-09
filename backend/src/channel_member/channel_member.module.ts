import { Module } from '@nestjs/common';
import { ChannelMemberService } from './channel_member.service';
import { ChannelMemberController } from './channel_member.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ChannelMemberController],
  providers: [ChannelMemberService],
  imports: [PrismaModule], // 👈 Import PrismaModule so PrismaService is available in this module.
})
export class ChannelMemberModule {}
