import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService],
  imports: [PrismaModule], // 👈 Import PrismaModule so PrismaService is available in this module.
})
export class ChannelModule {}
