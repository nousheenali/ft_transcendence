/*-------------------------------------------------------------------*/
/*----------All the Types required in LatestMsgsBox------------------*/
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
