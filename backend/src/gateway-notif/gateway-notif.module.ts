import { Module } from '@nestjs/common';
import { GatewayNotifGateway } from './gateway-notif.gateway';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [GatewayNotifGateway, UserService, JwtService],
})
export class GatewayNotifModule {}
