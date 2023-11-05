/*-------------------------------------------------------------------*/
/*---------- All the Types required in Notification Window ----------*/
/*-------------------------------------------------------------------*/

import { playerData } from "../commonTypes/types";

export type NotificationItem = {
  userInfo: playerData;
  messageContent: string;
  messageTime: string;
};

/*-------------------------------------------------------------------*/

export interface NotificationDropdownProps {
  NotificationList: NotificationItem[];
}