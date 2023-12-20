import { userInformation } from "../Profile/types";

/*-------------------------------------------------------------------*/
/*------------ All the Types required in Chat page ------------------*/
/*-------------------------------------------------------------------*/

export interface MessagesProps {
  id: integer;
  senderId: string;
  sender: userInformation;
  receiverId?: string;
  reciever: userInformation;
  channelId?: string;
  channel: ChannelsProps;
  content: string;
  createdAt: string;
}

/*-------------------------------------------------------------------*/
export interface channelRelationProps {
  id: string;
  channelId: string;
  userId: string;
  user: ChannelUserProps;
  isAdmin: boolean;
  isMuted: boolean;
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
  id: string;
  channelName: string;
  channelType: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  channelMembers: channelRelationProps[];
  Messages: MessagesProps[];
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
export interface SocketMessage {
  socketId: string;
  sender: string;
  receiver?: string;
  channel?: string;
  channelType?: string;
  message: string;
}

/*-------------------------------------------------------------------*/
