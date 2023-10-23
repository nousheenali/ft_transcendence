"use client";

import React, { useState } from "react";
import { ChannelsProps } from "../../types";
import Image from "next/image";

export default function Channel(data: { channel: ChannelsProps }) {
  // const [activeChannel, setActiveChannel] = useState<ChannelsProps>();

  // const handleClick = () => {
  // 	console.log('Component clicked');
  // 	setActiveChannel(data.channel);
  //   };

  return (
    <div className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer">
      {/* [1] */}
      <div className="w-36 h-12 basis-1/6 rounded-xl overflow-hidden">
        <Image
          alt={data.channel.channelName}
          src={"https://i.imgur.com/6VBx3io.png"}
          width={55}
          height={55}
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
