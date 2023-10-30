"use client";

import React from "react";
import MsgChannelBtn from "@/components/Chat/MsgChannelBtn/MsgChannelBtn";
import FriendsChatBox from "@/components/Chat/Friends/FriendsChatBox/FriendsChatBox";
import MessagesSideBar from "@/components/Chat/Friends/FriendsSideBar/MessagesSideBar";

export default function Friends() {
  return (
    <div className="flex w-full h-screen px-4 justify-center">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn />
        <MessagesSideBar />
      </div>
      <FriendsChatBox />
    </div>
  );
}
