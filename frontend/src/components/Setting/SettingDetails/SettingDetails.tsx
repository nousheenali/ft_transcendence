"use client";
import React from "react";
import { SettingDetailsProps } from "@/components/Setting/types";

function SettingDetails({ name, email, Auth }: SettingDetailsProps) {
  const handleClick = (buttonId: string) => {
    console.log(buttonId + " button clicked");
  };

  return (
    <div className="flex flex-col ml-10 mb-10 font-saira-condensed font-bold text-main-text justify-start pl-6">
      <div className="grid grid-cols-5">
        <div className="text-xl ml-10"> Name:</div>
        <div className="text-md truncate">{name}</div>
        <div className="col-span-1" />
        <button
          className="w-40 h-7 rounded-md items-center text-md bg-button-background"
          onClick={() => handleClick("Edit username")}
        >
          Edit username
        </button>
      </div>
      <div className="grid grid-cols-5 mt-10">
        <div className="text-xl ml-10"> Email:</div>
        <div className="text-md truncate">{email}</div>
        <div className="col-span-1" />
        <button
          className="w-40 h-7 rounded-md items-center text-md bg-button-background"
          onClick={() => handleClick("Edit email")}
        >
          Edit email
        </button>
      </div>
      <div className="grid grid-cols-5 mt-10">
        <div className="text-xl ml-10"> 2FA:</div>
        <div className="text-md truncate ">{Auth}</div>
        <div className="col-span-1" />
        <button
          className="w-40 h-7 rounded-md items-center text-md bg-button-background"
          onClick={() => handleClick("Activate 2FA")}
        >
          Activate 2FA
        </button>
      </div>
      <div className="grid grid-cols-5 mt-10">
        <div className="text-xl ml-10"> Wallpaper:</div>
        <div className="col-span-2" />
        <button
          className="w-40 h-7 rounded-md items-center text-md bg-button-background"
          onClick={() => handleClick("Edit wallpaper")}
        >
          Edit Game wallpaper
        </button>
      </div>
    </div>
  );
};

export default SettingDetails;
