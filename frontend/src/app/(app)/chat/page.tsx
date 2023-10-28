"use client";

import React from "react";
import { activateClickedTab } from "@/context/store";
import Friends from "@/components/Chat/Friends/Friends";
import Channels from "@/components/Chat/Channels/Channels";

//============================================================================================//
export default function Chat() {
  const activeTab = activateClickedTab((state) => state.activeTab);

  return (
    <div className="flex w-full h-screen px-4 justify-center">
      {activeTab === "Channels" && <Channels />}
      {activeTab === "Messages" && <Friends />}
    </div>
  );
}

//============================================================================================//
