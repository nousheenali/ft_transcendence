"use client";

import React, { useState } from "react";
import MsgChannelBtn from "@/components/Chat/MsgChannelBtn/page";
import UserMessages from "@/components/Chat/UserMessages/UserMessages";
import ChatSearch from "@/components/Chat/ChatSearch/ChatSearch";
import LatestMessage from "@/components/Chat/LatestMessage/LatestMessage";

export default function Chat() {
  return (
    <div className="flex w-full h-screen px-4 justify-start">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn />
        <ChatSearch />
        <LatestMessage
          sender={{
            name: "user-1",
            profileImage: {
              alt: "User 1 Profile Picture",
              src: "av1.svg",
            },
            isOnline: false,
          }}
          messageTime="12:30 AM"
          messageContent="Hello! How are you?"
        />
        <LatestMessage
          sender={{
            name: "user-1",
            profileImage: {
              alt: "User 2 Profile Picture",
              src: "av1.svg",
            },
            isOnline: true,
          }}
          messageTime="11:30 AM"
          messageContent="Hi!!"
        />
      </div>
      
      <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <UserMessages />
      </div>
    </div>
  );
}
