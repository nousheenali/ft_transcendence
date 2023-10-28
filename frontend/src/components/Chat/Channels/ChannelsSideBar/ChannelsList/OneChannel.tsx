"use client";

import React, { useState } from "react";
import { ChannelsProps } from "../../../types";
import { activateClickedChannel } from "@/context/store";
import Image from "next/image";

export default function Channel(data: { channel: ChannelsProps }) {
  // define the active channel and the function to set the active channel from the store context of zustand
  // The state of the active channel will change according to the channel that the user clicks on.

  const activeChannel = activateClickedChannel((state) => state.activeChannel);
  const setActiveChannel = activateClickedChannel(
    (state) => state.setActiveChannel
  );

  return (
    <div
      className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer"
      onClick={() => setActiveChannel(data.channel)}
    >
      {/* [1] */}
      <div className="w-36 h-12 basis-1/6 overflow-hidden">
        <Image
          alt={data.channel.channelName}
          src={"/chat/people.svg"}
          width={40}
          height={40}
        />
      </div>

      <div className="flex flex-col overflow-y-hidden basis-4/6 ml-2">
        <span className="font-saira-condensed text-main-text font-light truncate ...">
          {data.channel.channelName}
        </span>
      </div>
    </div>
  );
}
