import { Module } from '@nestjs/common';
import { IntraController } from './intra.controller';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from '../jwt/jwt.module';
import { IntraService } from './intra.service';
import { IntraStrategy } from './intra.strategy';
import { RoomsService } from 'src/chat/rooms.service';
import { ChatService } from 'src/chat/chat.service';

@Module({
  imports: [UserModule, HttpModule, PassportModule, JwtAuthModule],
  providers: [IntraService, IntraStrategy, RoomsService, ChatService],
  controllers: [IntraController],
  exports: [],
})
export class IntraModule {}

// imports : modules intramodule depends on (importing makes services , controller available to this module)
// exports : export providers to make it available to other modules
