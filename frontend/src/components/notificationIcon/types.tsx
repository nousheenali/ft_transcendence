/*-------------------------------------------------------------------*/
/*---------- All the Types required in Notification Window ----------*/
/*-------------------------------------------------------------------*/

import { playerData } from "../commonTypes/types";

// export type NotificationItem = {
//   userInfo: playerData;
//   messageContent: string;
//   messageTime: string;
// };

/*-------------------------------------------------------------------*/

export interface NotificationDropdownProps {
  NotificationList: NotificationItems[];
}

export interface NotificationItems {
  id: string;
  content: Content;
  read: boolean;
  recivedAt: string; // You can use a Date type if you prefer
  sender: User;
}

export interface User {
  id: string;
  // Define other user fields as needed
}

export enum Content {
  DirectMessage_Recieved = 'DirectMessage_Recieved',
  ChannelInvite_Recieved = 'ChannelInvite_Recieved',
  GameInvite_Recieved = 'GameInvite_Recieved',
  FriendRequest_Recieved = 'FriendRequest_Recieved',
}