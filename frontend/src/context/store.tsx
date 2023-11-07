import { create } from "zustand";
import { ChannelsProps } from "@/components/Chat/types";
import { Socket, io } from "socket.io-client";
// ---------------------------------------------------------------------------------------------

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

export type ChannelType = "PUBLIC" | "PRIVATE";

type TchannelInfo = {
  channelName: string;
  channelType: ChannelType;
  channelPassword?: string;

  setChannelName: (channelName: string) => void;
  setChannelType: (channelType: ChannelType) => void;
  setChannelPassword: (channelPassword: string) => void;
};

export const useChannelInfo = create<TchannelInfo>((set) => ({
  channelName: "",
  channelType: "PUBLIC",
  channelPassword: "",

  setChannelName: (channelName: string) => set({ channelName }),
  setChannelType: (channelType: ChannelType) => set({ channelType }),
  setChannelPassword: (channelPassword: string) => set({ channelPassword }),
}));
type SocketState = {
  currentSocket: Socket;
  setCurrentSocket: (socket: any) => void;
};

export const useSocket = create<SocketState>((set) => ({
  currentSocket: {} as Socket,
  setCurrentSocket: (currentSocket: Socket) => set({ currentSocket }),
}));

// ---------------------------------------------------------------------------------------------

type AppState = {
  activeChannel: ChannelsProps;
  setActiveChannel: (channel: ChannelsProps) => void;
};

// Initialize activeChannel with a default value
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

// ---------------------------------------------------------------------------------------------
type BtnState = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const activateClickedTab = create<BtnState>((set) => ({
  activeTab: "Messages",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

// ---------------------------------------------------------------------------------------------
type clickedFriendState = {
  activeFriend: string;
  setActiveFriend: (login: string) => void;
};

export const activateClickedFriend = create<clickedFriendState>((set) => ({
  activeFriend: "",
  setActiveFriend: (login) => set({ activeFriend: login }),
}));

// ---------------------------------------------------------------------------------------------
type ChatSocketState = {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
};

export const useChatSocket = create<ChatSocketState>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket }),
}));

// ---------------------------------------------------------------------------------------------

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
