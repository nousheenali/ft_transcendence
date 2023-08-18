"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function MsgChannelBtn() {
  const [activeTab, setActiveTab] = useState("Messages");

  return (
    <div className="w-full h-11 flex justify-between rounded-xl bg-main-theme text-main-texts font-saira-condensed border-b border-main-yellow">
    
      <div
        className={`flex flex-row flex-grow h-full justify-center items-center gap-2 rounded-xl hover:cursor-pointer select-none 
                      ${
                        activeTab === "Messages"
                          ? "bg-chat-btn-click border-b border-b-main-yellow border-0"
                          : "bg-transparent"
                      }`}
        onClick={() => setActiveTab("Messages")}
      >
        <span className="text-xl">Messages</span>
        <Image
          alt="messages-icon"
          src="chat/message-notif.svg"
          width={25}
          height={25}
        />
      </div>

      <div
        className={`flex flex-row flex-grow h-full justify-center items-center gap-2 rounded-xl hover:cursor-pointer select-none
                      ${
                        activeTab === "Channels"
                          ? "bg-chat-btn-click border-b border-b-main-yellow border-0"
                          : "bg-transparent"
                      }`}
        onClick={() => setActiveTab("Channels")}
      >
        <span className="text-xl">Channels</span>
        <Image
          alt="messages-icon"
          src="chat/people.svg"
          width={25}
          height={25}
        />
      </div>
    
    </div>
  );
}
