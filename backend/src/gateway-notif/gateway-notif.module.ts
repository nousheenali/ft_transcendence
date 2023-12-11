import { Module } from '@nestjs/common';
import { GatewayNotifGateway } from './gateway-notif.gateway';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthModule } from 'src/auth/jwt/jwt.module';

@Module({
  providers: [GatewayNotifGateway, UserService, JwtService],
  imports: [JwtAuthModule],
})
export class GatewayNotifModule {}
