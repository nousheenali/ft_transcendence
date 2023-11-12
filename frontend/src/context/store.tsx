import { create } from "zustand";
import { ChannelsProps } from "@/components/Chat/types";
import { Socket, io } from "socket.io-client";
// ---------------------------------------------------------------------------------------------

type TGameColor = {
  ballColor: string;
  racketColor: string;
  bgColor: string;
  isQueue: boolean;
  inviter: string;
  invitee: string;

  setBallColor: (ballColor: string) => void;
  setRacketColor: (racketColor: string) => void;
  setBgColor: (bgColor: string) => void;
  setIsQueue: (isQueue: boolean) => void;
  setInviter: (inviter: string) => void;
  setInvitee: (invitee: string) => void;
};

export const useGameColor = create<TGameColor>((set) => ({
  ballColor: "0xd0f223",
  racketColor: "0xd0f223",
  bgColor: "0xd0f223",
  isQueue: false,
  invitee: "Default",
  inviter: "Default",

  setBallColor: (ballColor: string) => set({ ballColor }),
  setRacketColor: (racketColor: string) => set({ racketColor }),
  setBgColor: (bgColor: string) => set({ bgColor }),
  setIsQueue: (isQueue: boolean) => set({ isQueue }),
  setInviter: (inviter: string) => set({ inviter }),
  setInvitee: (invitee: string) => set({ invitee }),
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
