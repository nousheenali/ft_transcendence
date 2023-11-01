import { Injectable } from '@nestjs/common';
import { CreateGatewayNotifDto } from './dto/create-gateway-notif.dto';
import { UpdateGatewayNotifDto } from './dto/update-gateway-notif.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GatewayNotifService {
  constructor(private prisma: PrismaService) {}
  // create(createGatewayNotifDto: CreateGatewayNotifDto) {
  //   return 'This action adds a new gatewayNotif';
  // }

  // newNotification() {
  //   return `This action returns all gatewayNotif`;
  // }
}
