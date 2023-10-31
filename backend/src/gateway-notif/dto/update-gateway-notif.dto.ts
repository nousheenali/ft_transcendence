import { PartialType } from '@nestjs/mapped-types';
import { CreateGatewayNotifDto } from './create-gateway-notif.dto';

export class UpdateGatewayNotifDto extends PartialType(CreateGatewayNotifDto) {
  id: number;
}
