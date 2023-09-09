import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChannelMemberModule } from './channel_member/channel_member.module';

@Module({
  imports: [PrismaModule, ChannelMemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
