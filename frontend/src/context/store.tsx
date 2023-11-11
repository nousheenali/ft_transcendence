import { create } from "zustand";
import { ChannelsProps, SocketMessage } from "@/components/Chat/types";
import { Socket, io } from "socket.io-client";

/*🌼🌼🌼🌼───────────────────────────────────────────────────────────────────────────────🌼🌼🌼🌼*/

/**
 * a global store for the game elements
 */
type TGameColor = {
  ballColor: string;
  racketColor: string;
  bgColor: string;
  setBallColor: (ballColor: string) => void;
  setRacketColor: (racketColor: string) => void;
  setBgColor: (bgColor: string) => void;
};

export const useGameColor = create<TGameColor>((set) => ({
  ballColor: "0xd0f223",
  racketColor: "0xd0f223",
  bgColor: "0xd0f223",

  setBallColor: (ballColor: string) => set({ ballColor }),
  setRacketColor: (racketColor: string) => set({ racketColor }),
  setBgColor: (bgColor: string) => set({ bgColor }),
}));

/*🌼🌼🌼🌼───────────────────────────────────────────────────────────────────────────────🌼🌼🌼🌼*/

export type ChannelType = "PUBLIC" | "PRIVATE";

type TchannelInfo = {
  channelName: string;
  channelType: ChannelType;
  channelPassword?: string;

  setChannelName: (channelName: string) => void;
  setChannelType: (channelType: ChannelType) => void;
  setChannelPassword: (channelPassword: string) => void;
};

/*🌼🌼🌼🌼───────────────────────────────────────────────────────────────────────────────🌼🌼🌼🌼*/
export const useChannelInfo = create<TchannelInfo>((set) => ({
  channelName: "",
  channelType: "PUBLIC",
  channelPassword: "",

  setChannelName: (channelName: string) => set({ channelName }),
  setChannelType: (channelType: ChannelType) => set({ channelType }),
  setChannelPassword: (channelPassword: string) => set({ channelPassword }),
}));

/*🌼🌼🌼🌼───────────────────────────────────────────────────────────────────────────────🌼🌼🌼🌼*/
type SocketState = {
  currentSocket: Socket;
  setCurrentSocket: (socket: any) => void;
};

export const useSocket = create<SocketState>((set) => ({
  currentSocket: {} as Socket,
  setCurrentSocket: (currentSocket: Socket) => set({ currentSocket }),
}));

/**==============================================================================================
 * ╭── 🌼
 * ├ 👇 State to handle the active and clicked channel globally
 * └── 🌼
 **/
type AppState = {
  activeChannel: ChannelsProps;
  setActiveChannel: (channel: ChannelsProps) => void;
};

export const activateClickedChannel = create<AppState>((set) => ({
  activeChannel: {
    channelName: "",
    channelType: "",
    createdBy: "",
    createdAt: "",
    updatedAt: "",
    channelMembers: [],
    Messages: [],
  } as ChannelsProps,

  setActiveChannel: (channel) => set({ activeChannel: channel }),
}));

/**==============================================================================================
 * ╭── 🌼
 * ├ 👇 State to handle the active tab (Messages, Channels) globally
 * └── 🌼
 **/
type BtnState = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const activateClickedTab = create<BtnState>((set) => ({
  activeTab: "Messages",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

/**==============================================================================================
 * ╭── 🌼
 * ├ 👇 State to handle the selected friend box globally
 * └── 🌼
 **/
type clickedFriendState = {
  activeFriend: string;
  setActiveFriend: (login: string) => void;
};

export const activateClickedFriend = create<clickedFriendState>((set) => ({
  activeFriend: "",
  setActiveFriend: (login) => set({ activeFriend: login }),
}));

/**==============================================================================================
 * ╭── 🌼
 * ├ 👇 State to handle the chat socket connection globally
 * └── 🌼
 **/
type ChatSocketState = {
  socket: Socket;
  setSocket: (socket: Socket) => void;
};

export const useChatSocket = create<ChatSocketState>((set) => ({
  socket: io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
    autoConnect: false,
  }),
  setSocket: (socket: Socket) => set({ socket }),
}));

/**==============================================================================================
 * ╭── 🌼
 * ├ 👇 State to handle the active channel type globally
 * └── 🌼
 **/
type ChannelTypeState = {
  activeChannelType: string;
  setActiveChannelType: (channelType: string) => void;
};

export const useChannelType = create<ChannelTypeState>((set) => ({
  activeChannelType: "Public",
  setActiveChannelType: (channelType: string) =>
    set({ activeChannelType: channelType }),
}));

/**==============================================================================================
 * ╭── 🌼
 * ├ 👇 State to handle the message comming from the server to the client's socket globaly
 * └── 🌼
 **/
type ReceivedMessageState = {
  receivedMessage: SocketMessage;
  setReceivedMessage: (message: SocketMessage) => void;
};

export const useReceivedMessageState = create<ReceivedMessageState>((set) => ({
  receivedMessage: {} as SocketMessage,
  setReceivedMessage: (message: SocketMessage) =>
    set({ receivedMessage: message }),
}));

/**==============================================================================================
 * ╭── 🌼
 * ├ 👇 State to handle the message sent from the client's socket to the server globaly
 * └── 🌼
 **/
type SentMessageState = {
  sentMessage: SocketMessage;
  setSentMessage: (message: SocketMessage) => void;
};

export const useSentMessageState = create<SentMessageState>((set) => ({
  sentMessage: {} as SocketMessage,
  setSentMessage: (message: SocketMessage) => set({ sentMessage: message }),
}));

/**==============================================================================================
 * ╭── 🌼
 * ├ 👇 State to handle if some user joined the channel globaly
 * └── 🌼
 **/
type ChannelUsersState = {
  userJoined: boolean;
  setUserJoined: (userJoined: boolean) => void;
};

export const useChannelUsersState = create<ChannelUsersState>((set) => ({
  userJoined: false,
  setUserJoined: (userJoined: boolean) => set({ userJoined }),
}));

/**==============================================================================================
 * ╭── 🌼
 * ├ 👇 State to handle if the user joined the channel globaly
 * └── 🌼
 **/
type NewChannelType = {
  newChannel: boolean;
  setNewChannel: (newChannel: boolean) => void;
};

export const useNewChanelState = create<NewChannelType>((set) => ({
  newChannel: false,
  setNewChannel: (newChannel: boolean) => set({ newChannel }),
}));
/**==============================================================================================
 * ╭── 🌼
 * ├ 👇 State to handle if the user left the channel globaly
 * └── 🌼
 **/
type LeaveChannelType = {
  leftChannel: boolean;
  setUserLeft: (leftChannel: boolean) => void;
};

export const useLeaveChannelState = create<LeaveChannelType>((set) => ({
  leftChannel: false,
  setUserLeft: (leftChannel: boolean) => set({ leftChannel }),
}));
/*🌼🌼🌼🌼───────────────────────────────────────────────────────────────────────────────🌼🌼🌼🌼*/
/**
 * a global store for the create channel state 
 * (channel name and password)
 */

type TCreateChannelValidate = {
  validPassword: boolean;
  validChannelName: boolean;

  setValidPassword: (validInput: boolean) => void;
  setValidChannelName: (validInput: boolean) => void;
};

export const useChannelCreateValidate = create<TCreateChannelValidate>(
  (set) => ({
    validPassword: false,
    validChannelName: false,

    setValidPassword: (validPassword: boolean) => set({ validPassword }),
    setValidChannelName: (validChannelName: boolean) =>
      set({ validChannelName }),
  })
);

/*🌼🌼🌼🌼───────────────────────────────────────────────────────────────────────────────🌼🌼🌼🌼*/