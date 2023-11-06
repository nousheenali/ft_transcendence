import React, { useState } from "react";
import { Dropdown } from "react-daisyui";
import Image from "next/image";
import { ChannelType, useChannelInfo } from "@/context/store";
import ChannelPasswordTextBox from "@/components/Chat/ChannelsSideBar/CreateChannel/ChannelPassword/ChannelPassword";

export default function ChannelTypeDD() {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const { setChannelType } = useChannelInfo();

  const handleButtonClick = (channelType: ChannelType) => {
    setChannelType(channelType);
    if (channelType === "PRIVATE") {
      setIsPrivate(true);
    } else {
      setIsPrivate(false);
    }
  };

  const dropdownStyles = {
    select:
      "hover-bg-heading text-placeholder-text font-saira-condensed normal-case bg-main bg-heading-fill border-[0.3px] border-aside-border rounded-xl w-32 h-8 p-1 flex flex-row justify-between",
    option: "text-main-text",
  };
  const channelTypes = {
    PUBLIC: "Public",
    PRIVATE: "Private",
  };

  return (
    <>
      <div className="flex flex-row items-center justify-evenly w-full">
        <h1 className="text-main-text font-saira-condensed text-l font-bold">
          Type
        </h1>
        <div className="relative">
          <select
            onChange={(e) => handleButtonClick(e.target.value as ChannelType)}
            className={dropdownStyles.select}
          >
            {Object.entries(channelTypes).map(([value, label]) => (
              <option
                key={value}
                value={value}
                className={dropdownStyles.option}
              >
                {label}
              </option>
            ))}
          </select>
          <Image
            src="/DropDown_icon.svg"
            width={10}
            height={10}
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            alt="DropDown_icon"
          />
        </div>
      </div>
      <ChannelPasswordTextBox isPrivate={isPrivate} />
    </>
  );
}
