import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('create')
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get('/getById/:userId')
  findNotifications(@Param('userId') userId: string) {
    return this.notificationService.findNotifications(userId);
  }

  @Put('/updateClicked/:id')
  update(@Param('id') id: string) {
    return this.notificationService.update(id);
  }
}
