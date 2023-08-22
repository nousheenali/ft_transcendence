"use client";

import React, { useState } from "react";
import MsgChannelBtn from "@/components/Chat/MsgChannelBtn/MsgChannelBtn";
import MessagesSideBar from "@/components/Chat/MessagesSideBar/MessagesSideBar";
import ChannelsSideBar from "@/components/Chat/ChannelsSideBar/ChannelsSideBar";
import FriendsChatBox from "@/components/Chat/ChatBox/FriendsChatBox/FriendsChatBox";

/**
 * The Chat component is the main component of the Chat page, it is responsible for rendering
 * the whole page and it is also responsible for managing the state of the page.
 *
 * The state of the page is managed by the {activeTab} state, which is a string that can be either
 * "Messages" or "Channels". The {activeTab} state is passed to the MsgChannelBtn component as a prop
 * and it is used to determine which tab is active and render the appropriate tab. The {activeTab} state
 * is also passed to the UserMessages component as a prop and it is used to determine which component to
 * render, the Messages component or the Channels component.
 */
export default function Chat() {
  const [activeTab, setActiveTab] = useState<string>("Messages");

  return (
    <div className="flex w-full h-screen px-4 justify-center">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Render the Messages and the Channels(public, private) part */}
        {activeTab === "Messages" && <MessagesSideBar />}
        {activeTab === "Channels" && <ChannelsSideBar />}
      </div>

      <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <FriendsChatBox />
      </div>
    </div>
  );
}
