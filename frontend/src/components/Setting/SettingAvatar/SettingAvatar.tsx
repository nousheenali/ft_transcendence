"use client";
import React from "react";

export default function SettingAvatar() {
  const handleClick = (buttonId: string) => {
    console.log(buttonId + " button clicked");
  };

  return (
    <div className="flex flex-row mt-10">
      <div className="flex w-1/5 justify-center">
        <img height={100} width={117} src="/av1.svg" alt="avatar" />
      </div>
      <button
        className="w-32 h-7 mt-10 rounded-md font-saira-condensed font-bold text-main-text bg-button-background"
        onClick={() => handleClick("Edit avatar")}
      >
        Edit Avatar
      </button>
    </div>
  );
}
