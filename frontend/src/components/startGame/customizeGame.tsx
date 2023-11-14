import React from "react";
import Image from "next/image";
import { useGameState } from "@/context/store";
import QueueAndInvite from "./queue_invite";

const colors = {
  "0xff0000": "Red",
  "0xd0f223": "Yellow",
  "0x0000ff": "Blue",
};

const dropdownStyles = {
  select:
    "hover-bg-heading text-placeholder-text font-saira-condensed normal-case bg-main bg-heading-fill border-1 border-aside-border rounded-2xl w-40 h-8 p-1 flex flex-row justify-between",
  option: "text-main-text",
};

export default function CustomizeGame() {
  const { setBallColor, setBgColor, setRacketColor } = useGameState();
  const { ballColor, racketColor, bgColor } = useGameState();

  const changeColor = (colorType: string) => {
    switch (colorType) {
      case "ballColor":
        return ballColor;
      case "racketColor":
        return racketColor;
      case "bgColor":
        return bgColor;
      default:
        return "0xd0f223";
    }
  };

  const handleColorChange = (colorType: string, value: string) => {
    switch (colorType) {
      case "ballColor":
        setBallColor(value);
        break;
      case "racketColor":
        setRacketColor(value);
        break;
      case "bgColor":
        setBgColor(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-Customize-game-bg mx-8 flex flex-col gap-6 rounded-2xl w-[304px] h-auto py-4 font-bold">
      <div className="flex flex-row items-center justify-around gap-2">
        <h1 className="text-main-text font-saira-condensed">Ball Color</h1>
        <div className="relative">
          <select
            value={changeColor("ballColor")}
            onChange={(e) => handleColorChange("ballColor", e.target.value)}
            className={dropdownStyles.select}
          >
            {Object.entries(colors).map(([value, label]) => (
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
      <div className="flex flex-row items-center justify-around gap-2">
        <h1 className="text-main-text font-saira-condensed">Racket Color</h1>
        <div className="relative">
          <select
            value={changeColor("racketColor")}
            onChange={(e) => handleColorChange("racketColor", e.target.value)}
            className={dropdownStyles.select}
          >
            {Object.entries(colors).map(([value, label]) => (
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

      <div className="flex flex-row items-center justify-around gap-2">
        <h1 className="text-main-text font-saira-condensed">Background</h1>
        <div className="relative">
          <select
            value={changeColor("bgColor")}
            onChange={(e) => handleColorChange("bgColor", e.target.value)}
            className={dropdownStyles.select}
          >
            {Object.entries(colors).map(([value, label]) => (
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
      <QueueAndInvite />
    </div>
  );
}
