import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelRelationService } from './channel-relation.service';
import { ChannelController } from './channel.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from '../user/user.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, ChannelRelationService, UserService],
  imports: [PrismaModule], // 👈 Import PrismaModule so PrismaService is available in this module.
})
export class ChannelModule {}
