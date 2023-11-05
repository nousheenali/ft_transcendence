import { Module } from '@nestjs/common';
import { GatewayNotifGateway } from './gateway-notif.gateway';

@Module({
  providers: [GatewayNotifGateway],
})
export class GatewayNotifModule {}
