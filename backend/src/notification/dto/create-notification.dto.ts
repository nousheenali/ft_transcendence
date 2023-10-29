export class CreateNotificationDto {
  content: Content;
  read: boolean;
  senderId: string;
  userId: string;
}

export enum Content {
  DirectMessage_Recieved = 'DirectMessage_Recieved',
  ChannelInvite_Recieved = 'ChannelInvite_Recieved',
  GameInvite_Recieved = 'GameInvite_Recieved',
  FriendRequest_Recieved = 'FriendRequest_Recieved',
}
