"use client";

import { ChannelsProps, MessagesProps } from "./types";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { activateClickedChannel } from "@/context/store";
import MsgChannelBtn from "@/components/Chat/MsgChannelBtn/MsgChannelBtn";
import MessagesSideBar from "@/components/Chat/MessagesSideBar/MessagesSideBar";
import ChannelsSideBar from "@/components/Chat/ChannelsSideBar/ChannelsSideBar";
import FriendsChatBox from "@/components/Chat/ChatBox/FriendsChatBox/FriendsChatBox";
import ChannelsChatBox from "@/components/Chat/ChatBox/ChannelsChatBox/ChannelsChatBox";

import { getChannelsData } from "@/../services/channels";
import { API_ENDPOINTS } from "@/../config/apiEndpoints";

export default function ChatElements({
  channels,
  latestMessages,
}: {
  channels: ChannelsProps[];
  latestMessages: MessagesProps[];
}) {
  const session = useSession();
  const login = session.data?.user.login!;
  const activeChannel = activateClickedChannel((state) => state.activeChannel);
  const [activeTab, setActiveTab] = useState<string>("Messages");

  console.log(latestMessages)
  return (
    <div className="flex w-full h-screen px-4 justify-center">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Render the Messages and the Channels(public, private) part */}
        {activeTab === "Messages" && (
          <MessagesSideBar latestMessages={latestMessages} />
        )}
        {activeTab === "Channels" && <ChannelsSideBar channels={channels} />}
      </div>
      {/* Render the FriendsChatBox or ChannelsChatBox depending on the activeTab state */}
      {activeTab === "Messages" && <FriendsChatBox />}
      {activeTab === "Channels" && (
        <ChannelsChatBox channel={activeChannel} login={login} />
      )}
    </div>
  );
}
