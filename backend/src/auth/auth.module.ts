import { Module } from '@nestjs/common';
import { IntraModule } from './intra/intra.module';
import { JwtAuthModule } from './jwt/jwt.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [IntraModule, JwtAuthModule], // MultiFactorAuthModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
