import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { AccessTokenGuard } from './jwt.guard';

@Controller('auth/jwt')
export class JwtAuthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @UseGuards(AccessTokenGuard)
  @Get('validate')
  async validateToken() {
    return { msg: 'Valid token' };
  }
}
