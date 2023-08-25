/*-------------------------------------------------------------------*/
/*---------- All the Types required in Notification Window ----------*/
/*-------------------------------------------------------------------*/

import { playerInformation } from "../commonTypes/types";

export type NotificationItem = {
  userInfo: playerInformation;
  messageContent: string;
  messageTime: string;
};

/*-------------------------------------------------------------------*/

export interface NotificationDropdownProps {
  NotificationList: NotificationItem[];
}