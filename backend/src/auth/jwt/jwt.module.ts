import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { JwtAuthController } from './jwt.controller';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtAuthStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule],
  providers: [JwtAuthService, JwtAuthStrategy],
  controllers: [JwtAuthController],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
