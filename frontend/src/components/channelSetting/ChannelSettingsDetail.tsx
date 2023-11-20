"use client";
import React, { useState } from "react";
import { Button, Input } from "react-daisyui";

function ChannelSettingDetails({ ChannelName }: { ChannelName: string }) {
  const [channelName, setChannelName] = useState<string>("");
  const [currentChannelPassword, setCurrentChannelPassword] =
    useState<string>("");
  const [newChannelPassword, setNewChannelPassword] = useState<string>("");

  const [updateChannelPasswordStatus, setUpateChannelPasswordStatus] =
    useState<boolean>(true);
  const [newChannelPasswordStatus, setNewChannelPasswordStatus] =
    useState<boolean>(true);
  const [channelNameStatus, setChannelNameStatus] = useState<boolean>(true);

  const handleInput = (buttonId: string, value: string) => {
    if (buttonId === "Edit Channel Name") {
      if (value.length > 4) setChannelNameStatus(false);
      else setChannelNameStatus(true);
      setChannelName(value);
    } else if (buttonId === "Edit Old Password") {
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
  const handleSubmit = (buttonId: string) => {
    console.log(buttonId + " button clicked");
    console.log("channelName ", channelName);
    console.log("currentChannelPassword", currentChannelPassword);
    console.log("newChannelPassword", newChannelPassword);
  };

  return (
    <div className="flex flex-col ml-10 mb-80 font-saira-condensed font-bold text-main-text justify-center ">
      <div className="grid grid-cols-5">
        <div className="text-xl ml-10"> Channel Name:</div>
        <Input
          className="w-40 h-7 rounded-md items-center text-md  decoration-none border-0 border-b-[1px] border-main-yellow  focus:outline-none outline-none bg-transparent placeholder-aside-border"
          size="lg"
          placeholder={ChannelName + "..."}
          onChange={(e) => handleInput("Edit Channel Name", e.target.value)}
        ></Input>
        <div className="col-span-1" />
        <Button
          size="sm"
          className="w-40 h-7 rounded-md items-center text-md bg-button-background p-2 hover:bg-"
          onClick={() => handleSubmit("Edit Channel Name")}
          disabled={channelNameStatus}
        >
          Update Name
        </Button>
      </div>

      {/* channel password update */}
      <div className="flex flex-cols gap-20 mt-10 ">
        <div className="text-xl ml-10"> Channel Password:</div>
        <div className="grid grid-cols-2 gap-12">
          <Input
            className="w-40 h-7 rounded-md items-center text-md  decoration-none border-0 border-b-[1px] border-main-yellow  focus:outline-none outline-none bg-transparent placeholder-aside-border"
            size="lg"
            placeholder="Old Password..."
            onChange={(e) => handleInput("Edit Old Password", e.target.value)}
          ></Input>
          <Input
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
            onClick={() => handleSubmit("Edit Password")}
            disabled={updateChannelPasswordStatus}
          >
            Update Password
          </Button>
          <Button
            size="sm"
            className="w-40 h-7 rounded-md items-center text-md bg-button-background "
            onClick={() => handleSubmit("Edit Password")}
            disabled={newChannelPasswordStatus}
          >
            Remove Password
          </Button>
        </div>
      </div>
      {/* <Button className="">Complete</Button> */}
    </div>
  );
}

export default ChannelSettingDetails;
