"use client";

import Image from "next/image";
import React from "react";
import { ChannelsProps } from "../../../types";
import { activateClickedChannel } from "@/context/store";
export default function Channel({
  channel,
  isJoined,
}: {
  channel: ChannelsProps;
  isJoined: boolean;
}) {
  // define the active channel and the function to set the active channel from the store context of zustand
  // The state of the active channel will change according to the channel that the user clicks on.

  const { setActiveChannel } = activateClickedChannel();

  if (isJoined === false) {
    return (
      <div className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden">
        <div
          className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer"
          onClick={() => setActiveChannel({} as ChannelsProps)}
        >
          {/* [1] Display the avatar of the channel */}

          <div className="w-36 h-12 basis-1/6 overflow-hidden">
            <Image
              alt={channel.channelName}
              src={"/chat/people.svg"}
              width={37}
              height={37}
            />
          </div>

          {/* [2] Display the name of the channel */}

          <div className="flex flex-col overflow-y-hidden basis-4/6 ml-2">
            <span className="font-saira-condensed text-main-text font-light truncate ...">
              {channel.channelName}
            </span>
          </div>
        </div>

        {/* [3] If the user already joined dont show the join button */}

        <div className="flex flex-row  gap-5 pr-2">
          <button className="flex flex-row items-center gap-1 text-dimmed-text font-thin">
            <Image
              alt={"join channel"}
              src={"./chat/user-cirlce-add.svg"}
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden">
        <div
          className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer"
          onClick={() => setActiveChannel(channel)}
        >
          {/* [1] Display the avatar of the channel */}

          <div className="w-36 h-12 basis-1/6 overflow-hidden">
            <Image
              alt={channel.channelName}
              src={"/chat/people.svg"}
              width={37}
              height={37}
            />
          </div>

          {/* [2] Display the name of the channel */}

          <div className="flex flex-col overflow-y-hidden basis-4/6 ml-2">
            <span className="font-saira-condensed text-main-text font-light truncate ...">
              {channel.channelName}
            </span>
          </div>
        </div>

        {/* [3] If the user already joined dont show the join button */}

        <div className="flex flex-row  gap-5 pr-2">
          <button className="flex flex-row items-center gap-1 text-dimmed-text font-thin">
            <Image
              alt={"leave channel"}
              src={"./chat/Sign_out_circle_duotone_line.svg"}
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
    );
  }
}
