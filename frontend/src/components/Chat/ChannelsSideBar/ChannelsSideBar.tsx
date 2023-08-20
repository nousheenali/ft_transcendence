"use client";

import React, { useState } from "react";
import ChannelsSearch from "@/components/Chat/ChannelsSideBar/ChannelsBox/ChannelsSearch";
import PublicPrivateBtn from "@/components/Chat/ChannelsSideBar/ChannelsBox/PublicPrivateBtn";

export default function ChannelsSideBar() {
  const [activeChannel, setActiveChannel] = useState<string>("Public");

  return (
    <>
      <ChannelsSearch />
      <PublicPrivateBtn activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
      <hr className="w-80 border-line-break" />
      {activeChannel === "Public" && <div>Public</div>}
      {activeChannel === "Private" && <div>Private</div>}
      <hr className="w-80 border-line-break" />
    </>
  );
}
