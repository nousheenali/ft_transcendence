"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "react-daisyui";
import { ChannelsProps } from "../Chat/types";

import {
  useChatSocket,
  useReRenderAllState,
  useSettingToggleVisiblity,
} from "@/context/store";

function ChannelSettingDetails({
  channelInfo,
}: {
  channelInfo: ChannelsProps;
}) {
  const [currentChannelPassword, setCurrentChannelPassword] =
    useState<string>("");
  const [newChannelPassword, setNewChannelPassword] = useState<string>("");

  const [updateChannelPasswordStatus, setUpateChannelPasswordStatus] =
    useState<boolean>(true);
  const [newChannelPasswordStatus, setNewChannelPasswordStatus] =
    useState<boolean>(true);

  const handleInput = (buttonId: string, value: string) => {
    if (buttonId === "Edit Old Password") {
      if (value.length > 4 && newChannelPassword.length > 4) {
        setUpateChannelPasswordStatus(false);
        setNewChannelPasswordStatus(false);
      } else if (value.length > 4) {
        setUpateChannelPasswordStatus(true);
        setNewChannelPasswordStatus(false);
      } else {
        setUpateChannelPasswordStatus(true);
        setNewChannelPasswordStatus(true);
      }
      setCurrentChannelPassword(value);
    } else if (buttonId === "Edit New Password") {
      if (value.length > 4 && currentChannelPassword.length > 4) {
        setUpateChannelPasswordStatus(false);
        setNewChannelPasswordStatus(false);
      } else if (currentChannelPassword.length > 4) {
        setUpateChannelPasswordStatus(true);
        setNewChannelPasswordStatus(false);
      } else {
        setUpateChannelPasswordStatus(true);
        setNewChannelPasswordStatus(true);
      }
      setNewChannelPassword(value);
    }
  };

  const [buttonId, setButtonId] = useState<string>("");
  const { socket } = useChatSocket();
  const { setIsVisible } = useSettingToggleVisiblity();
  useEffect(() => {
    const handleSubmitSync = async (buttonId: string) => {
      if (buttonId === "Update Password") {
        socket.emit("updateChannelPassword", {
          channelId: channelInfo.id,
          oldChannelPassword: currentChannelPassword,
          newChannelPassword: newChannelPassword,
        });
        setIsVisible(false);
      }
      if (buttonId === "Remove Password") {
        socket.emit("removeChannelPassword", {
          channelId: channelInfo.id,
          oldChannelPassword: currentChannelPassword,
          newChannelPassword: newChannelPassword,
        });
        setIsVisible(false);
      }
    };

    handleSubmitSync(buttonId);
    setButtonId("");
    setCurrentChannelPassword("");
    setNewChannelPassword("");
    setNewChannelPasswordStatus(true);
    setUpateChannelPasswordStatus(true);
  }, [buttonId, setButtonId]);
  const handleSubmit = (buttonId: string) => {
    setButtonId(buttonId);
  };

  return (
    <div className="flex flex-col ml-10 mb-80 font-saira-condensed font-bold text-main-text justify-center ">
      {/* channel password update */}
      <div className="flex flex-cols gap-20 mt-10 ">
        <div className="text-xl ml-10"> Channel Password:</div>
        <div className="grid grid-cols-2 gap-12">
          <Input
            value={currentChannelPassword}
            className="w-40 h-7 rounded-md items-center text-md  decoration-none border-0 border-b-[1px] border-main-yellow  focus:outline-none outline-none bg-transparent placeholder-aside-border"
            size="lg"
            placeholder="Old Password..."
            onChange={(e) => handleInput("Edit Old Password", e.target.value)}
          ></Input>
          <Input
            value={newChannelPassword}
            className="w-40 h-7 rounded-md items-center text-md  decoration-none border-0 border-b-[1px] border-main-yellow  focus:outline-none outline-none bg-transparent placeholder-aside-border"
            size="lg"
            placeholder="New Password..."
            onChange={(e) => handleInput("Edit New Password", e.target.value)}
          ></Input>
        </div>
        <div className="" />
        <div className="grid grid-cols-2 gap-8 ">
          <Button
            size="sm"
            className="w-40 h-7 rounded-md items-center text-md bg-button-background "
            onClick={() => handleSubmit("Update Password")}
            disabled={updateChannelPasswordStatus}
          >
            Update Password
          </Button>
          <Button
            size="sm"
            className="w-40 h-7 rounded-md items-center text-md bg-button-background "
            onClick={() => handleSubmit("Remove Password")}
            disabled={newChannelPasswordStatus}
          >
            Remove Password
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChannelSettingDetails;
