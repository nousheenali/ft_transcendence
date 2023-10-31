import { Module } from '@nestjs/common';
import { GatewayNotifService } from './gateway-notif.service';
import { GatewayNotifGateway } from './gateway-notif.gateway';

@Module({
  providers: [GatewayNotifGateway, GatewayNotifService],
})
export class GatewayNotifModule {}
