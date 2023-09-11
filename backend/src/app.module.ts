import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CreateChannelModule } from './createChannel/create-channel.module';

@Module({
  imports: [PrismaModule, CreateChannelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
