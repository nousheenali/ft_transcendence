import { userInformation } from "../Profile/types";

/*-------------------------------------------------------------------*/
/*------------ All the Types required in Chat page ------------------*/
/*-------------------------------------------------------------------*/

export interface MessagesProps {
  id: integer;
  senderId: String;
  sender: userInformation;
  receiverId?: String;
  reciever: userInformation;
  channelId?: String;
  channel: ChannelsProps;
  content: String;
  createdAt: String;
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
  activeChannelType: string;
  setActiveChannelType: React.Dispatch<React.SetStateAction<string>>;
}

/*-------------------------------------------------------------------*/
