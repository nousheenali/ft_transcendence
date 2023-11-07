import { useChannelInfo } from "@/context/store";
import React from "react";
import { Input } from "react-daisyui";

export default function ChannelPasswordTextBox(isPrivate: {
  isPrivate: boolean;
}) {
  const { channelPassword, setChannelPassword } = useChannelInfo();
  return (
    <>
      {isPrivate.isPrivate ? (
        <div className="flex flex-row items-center justify-evenly w-full">
          <h1 className="text-main-text font-saira-condensed text-l font-bold">
            Password
          </h1>
          <Input
            value={channelPassword}
            onChange={(e) => {
              setChannelPassword(e.target.value);
            }}
            className="bg-heading-fill w-32 h-8 rounded-xl"
          />
        </div>
      ) : null}
    </>
  );
}
