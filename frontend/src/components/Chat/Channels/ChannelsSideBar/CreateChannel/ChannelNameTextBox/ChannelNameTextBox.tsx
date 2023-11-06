import { useChannelInfo } from "@/context/store";
import React from "react";
import { Input } from "react-daisyui";

export default function ChannelNameTextBox() {
  const { setChannelName } = useChannelInfo();
  return (
    <div className="flex flex-row items-center justify-evenly w-full">
      <h1 className="text-main-text font-saira-condensed text-l font-bold">
        Name
      </h1>
      <Input
        onChange={(e) => {
          setChannelName(e.target.value);
        }}
        className="bg-heading-fill w-32 h-8 rounded-xl"
      />
    </div>
  );
}
