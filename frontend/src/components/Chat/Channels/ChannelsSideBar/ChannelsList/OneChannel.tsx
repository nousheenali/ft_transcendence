"use client";

import Image from "next/image";
import React from "react";
import { ChannelsProps } from "../../../types";
import { MdOutlineGroupAdd, MdGroupRemove } from "react-icons/md";
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

  const { activeChannel, setActiveChannel } = activateClickedChannel();

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

      {!isJoined ? (
        <div className="flex flex-row  gap-5 pr-2">
          <button className="flex flex-row items-center gap-1 text-dimmed-text font-thin">
            <Image
              alt={"invite"}
              src={"./chat/user-cirlce-add.svg"}
              width={30}
              height={30}
            />
          </button>
        </div>
      ) : (
        <div className="flex flex-row  gap-5 pr-2">
          <button className="flex flex-row items-center gap-1 text-dimmed-text font-thin">
            <Image
              alt={"invite"}
              src={"./chat/Sign_out_circle_duotone_line.svg"}
              width={30}
              height={30}
            />
          </button>
        </div>
      )}
    </div>
  );
}
