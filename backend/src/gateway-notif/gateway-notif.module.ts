import { Module } from '@nestjs/common';
import { GatewayNotifGateway } from './gateway-notif.gateway';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [GatewayNotifGateway, UserService],
})
export class GatewayNotifModule {}
