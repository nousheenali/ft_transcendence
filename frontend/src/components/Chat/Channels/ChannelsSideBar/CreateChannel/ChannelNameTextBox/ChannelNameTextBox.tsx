"use client";
import { useChannelCreateValidate, useChannelInfo } from "@/context/store";
import React, { useEffect } from "react";
import { Input } from "react-daisyui";

export default function ChannelNameTextBox() {
  const { channelName, setChannelName } = useChannelInfo();
  const { setValidChannelName } = useChannelCreateValidate();

  const HandleInput = (e: any) => {
    if (e.target.value.length >= 4) setValidChannelName(true);
    else setValidChannelName(false);
    if (e.target.value.length > 20) return;
    setChannelName(e.target.value);
  };
  return (
    <div className="flex flex-row items-center justify-evenly w-full">
      <h1 className="text-main-text font-saira-condensed text-l font-bold">
        Name
      </h1>
      <Input
        value={channelName}
        onChange={(e) => {
          HandleInput(e);
        }}
        className="bg-heading-fill w-32 h-8 rounded-xl text-main-text"
      />
    </div>
  );
}
