import React from "react";
import MsgChannelBtn from "@/components/MsgChannelBtn/page";
import UserMessages from "@/components/UserMessages/UserMessages";
import ChatSearch from "@/components/ChatSearch/ChatSearch";

export default function Chat() {
  return (
    <div className="flex w-full h-screen px-4 justify-start">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn />
        <ChatSearch />
      </div>
      <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <UserMessages />
      </div>
    </div>
  );
}
