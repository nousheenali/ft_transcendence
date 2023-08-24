/*-------------------------------------------------------------------*/
/*---------- All the Types required in Notification Window ----------*/
/*-------------------------------------------------------------------*/

export type NotificationItem = {
  username: string;
  profileImage: {
    alt: string;
    src: string;
  };
  messageContent: string;
  messageTime: string;
}

/*-------------------------------------------------------------------*/

export interface NotificationDropdownProps {
  NotificationList: NotificationItem[];
}