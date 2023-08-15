import React from "react";
import MsgChannelBtn from "@/components/MsgChannelBtn/page";
import UserMessages from "@/components/UserMessages/page";

export default function Chat() {
  return (
    <div className="flex w-full h-screen px-4 justify-start">
      <div className="w-96 mt-5 mb-14 flex flex-col border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn />
      </div>
      <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <UserMessages />
      </div>
    </div>
  );
}
