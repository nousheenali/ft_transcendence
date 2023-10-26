"use client";

import React, { useState } from "react";
import MsgChannelBtn from "@/components/Chat/MsgChannelBtn/MsgChannelBtn";
import MessagesSideBar from "@/components/Chat/MessagesSideBar/MessagesSideBar";
import ChannelsSideBar from "@/components/Chat/ChannelsSideBar/ChannelsSideBar";
import FriendsChatBox from "@/components/Chat/ChatBox/FriendsChatBox/FriendsChatBox";
import ChannelsChatBox from "@/components/Chat/ChatBox/ChannelsChatBox/ChannelsChatBox";
import { ChannelsProps } from "./types";

import { activateClickedChannel } from "@/context/store";


export default function ChatElements({ channels, login }: { channels: ChannelsProps[], login: string }) {
  console.log(channels[0].Messages)
  // ⚡ define the active channel and the function to set the active channel from the store context of zustand
  // ⚡ define the activeTab state and the function to set the activeTab state
  const activeChannel = activateClickedChannel((state) => state.activeChannel);


  const [activeTab, setActiveTab] = useState<string>("Messages");

  return (
    <div className="flex w-full h-screen px-4 justify-center">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Render the Messages and the Channels(public, private) part */}
        {activeTab === "Messages" && <MessagesSideBar />}
        {activeTab === "Channels" && (
          <ChannelsSideBar channels={channels} />
        )}
      </div>
      {/* Render the FriendsChatBox or ChannelsChatBox depending on the activeTab state */}
      {activeTab === "Messages" && <FriendsChatBox />}
      {activeTab === "Channels" && <ChannelsChatBox channel={activeChannel} login={login}/>}
    </div>
  );
}
