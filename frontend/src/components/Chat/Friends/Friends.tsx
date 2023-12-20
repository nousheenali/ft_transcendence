"use client";

import React from "react";
import MsgChannelBtn from "@/components/Chat/MsgChannelBtn/MsgChannelBtn";
import FriendsChatBox from "@/components/Chat/Friends/FriendsChatBox/FriendsChatBox";
import FriendsSideBar from "@/components/Chat/Friends/FriendsSideBar/FriendsSideBar";

export default function Friends() {
  return (
    <div className="flex w-full h-screen px-4 justify-center">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn />
        <FriendsSideBar />
      </div>
      <FriendsChatBox />
    </div>
  );
}
