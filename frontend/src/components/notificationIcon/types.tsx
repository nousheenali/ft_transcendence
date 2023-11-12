/*-------------------------------------------------------------------*/
/*---------- All the Types required in Notification Window ----------*/
/*-------------------------------------------------------------------*/

import { userInformation } from "../Profile/types";
import { playerData } from "../commonTypes/types";

// export type NotificationItem = {
//   userInfo: playerData;
//   messageContent: string;
//   messageTime: string;
// };

/*-------------------------------------------------------------------*/

export interface NotificationDropdownProps {
  NotificationList: NotificationItems[];
  GameInviteNotificationList: NotificationItems[];
}

export interface NotificationItems {
  id: string;
  content: Content;
  read: boolean;
  recivedAt: string; // You can use a Date type if you prefer
  sender: userInformation;
  isAccepted: boolean;
}

export enum Content {
  DirectMessage_Recieved = "DirectMessage_Recieved",
  ChannelInvite_Recieved = "ChannelInvite_Recieved",
  GameInvite_Recieved = "GameInvite_Recieved",
  FriendRequest_Recieved = "FriendRequest_Recieved",
}

export interface SendNotification {
  content: string;
  userId: string;
  senderId: string;
  read: boolean;
}
