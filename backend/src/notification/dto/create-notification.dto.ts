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

//postman test

// {
//   "content": "FriendRequest_Recieved";
//   "read": "true";
//   "senderId": "2699479c-379b-4d96-8b43-fdabe2178aef";
//   "userId": "7872e1aa-4958-41b3-a53c-84374934bc9b";
// }
