import { userInformation } from "../Profile/types";

/*-------------------------------------------------------------------*/
/*------------ All the Types required in Chat page ------------------*/
/*-------------------------------------------------------------------*/

export interface MessagesProps {
  message: {
    id: integer;
    senderId: String;
    sender: userInformation;
    receiverId?: String;
    channelId?: String;
    channel: ChannelsProps;
    content: String;
    createdAt: String;
  };
}

/*-------------------------------------------------------------------*/
export interface channelRelationProps {
  id: string;
  channelId: string;
  userId: string;
  user: ChannelUserProps;
}

/*-------------------------------------------------------------------*/
export interface ChannelUserProps {
  id: string;
  login: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  isOnline: boolean;
  score: number;
}

/*-------------------------------------------------------------------*/
export interface ChannelsProps {
  channelName: string;
  channelType: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  channelMembers: channelRelationProps[];
  Messages: MessagesProps[];
}

/*-------------------------------------------------------------------*/







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
export interface MsgChannelBtnProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

/*-------------------------------------------------------------------*/
export interface ChannelsBtn {
  activeChannel: string;
  setActiveChannel: React.Dispatch<React.SetStateAction<string>>;
}

/*-------------------------------------------------------------------*/
export interface MessageSenderProps {
  senderName: string;
  senderAvatar: {
    alt: string;
    src: string;
  };
  isOnline?: boolean;
  messageTime?: string;
  messageContent?: string;
}

/*-------------------------------------------------------------------*/
export interface MessageReceiverProps {
  receiverName: string;
  receiverAvatar: {
    alt: string;
    src: string;
  };
  messageTime: string;
  messageSeenTime: string;
  messageContent: string;
}

/*-------------------------------------------------------------------*/
export interface ChosenChannelProps {
  ChannelName: string;
  ChannelAvatar: {
    alt: string;
    src: string;
  };
  isPublic: boolean;
}
/*-------------------------------------------------------------------*/
