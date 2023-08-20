/*-------------------------------------------------------------------*/
/*------------ All the Types required in Chat page ------------------*/
/*-------------------------------------------------------------------*/
export interface MessageProps {
  sender: {
    name: string;
    profileImage: {
      alt: string;
      src: string;
    };
    isOnline: boolean;
  };
  messageTime: string;
  messageContent: string;
}

/*-------------------------------------------------------------------*/

export interface ChatFriendsProps {
  friend: {
    name: string;
    isOnline: boolean;
    profileImage: {
      alt: string;
      src: string;
    };
  };
}

/*-------------------------------------------------------------------*/
