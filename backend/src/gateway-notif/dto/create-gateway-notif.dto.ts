import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';

export class CreateGatewayNotifDto extends CreateNotificationDto {}

export class newLiveGameDto {
  player1: string;
  player1Image: string;
  player2: string;
  player2Image: string;
  startedTime: Date;
}
