import { Module } from '@nestjs/common';
import { CreateChannelService } from './create-channel.service';
import { CreateChannelController } from './create-channel.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CreateChannelController],
  providers: [CreateChannelService],
  imports: [PrismaModule], // 👈 Import PrismaModule so PrismaService is available in this module.
})
export class CreateChannelModule {}
