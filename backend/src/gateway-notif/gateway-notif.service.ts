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

  newNotification() {
    return `This action returns all gatewayNotif`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} gatewayNotif`;
  // }

  // update(id: number, updateGatewayNotifDto: UpdateGatewayNotifDto) {
  //   return `This action updates a #${id} gatewayNotif`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} gatewayNotif`;
  // }
}
