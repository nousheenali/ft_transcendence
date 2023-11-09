"use client";

import React from "react";
import { activateClickedChannel } from "@/context/store";

import MsgChannelBtn from "@/components/Chat/MsgChannelBtn/MsgChannelBtn";
import ChannelsSideBar from "@/components/Chat/Channels/ChannelsSideBar/ChannelsSideBar";
import ChannelsChatBox from "@/components/Chat/Channels/ChannelsChatBox/ChannelsChatBox";

//============================================================================================//
export default function Channels() {
  const activeChannel = activateClickedChannel((state) => state.activeChannel);

  return (
    <div className="flex w-full h-screen px-4 justify-center">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn />
        <ChannelsSideBar />
      </div>
      <ChannelsChatBox channel={activeChannel} />
    </div>
  );
}

//============================================================================================//
