import React, { ReactElement, Dispatch, SetStateAction } from "react";
import { Dropdown } from "react-daisyui";
import Image from "next/image";
import { useGameColor } from "@/context/store";


const colors: { [key: string]: string } = {
  "0xff0000": "Red",
  "0xd0f223": "Yellow",
  "0x0000ff": "Blue",
};

const changeColor = () => {
  const { ballColor, racketColor, bgColor } = useGameColor();

  const tmpColor = {
    ballColor: colors[ballColor] || "0xd0f223",
    racketColor: colors[racketColor] || "0xd0f223",
    bgColor: colors[bgColor] || "0xd0f223",
  };

  return tmpColor;
};


export default function CustomizeGame() {
  const { setBallColor, setBgColor, setRacketColor } = useGameColor();
  const { ballColor, racketColor, bgColor } = useGameColor();
  const colorsCollection = changeColor();

  return (
    <div className="bg-Customize-game-bg mx-8  flex flex-col gap-6 rounded-2xl w-[304px] h-auto py-4 font-bold">
      {/* Ball Color Dropdown */}
      <div className="flex flex-row items-center justify-around gap-2">
        <h1 className="text-main-text font-saira-condensed">Ball Color</h1>
        <Dropdown.Details>
          <Dropdown.Details.Toggle className="hover:bg-heading-fill text-placeholder-text font-saira-condensed normal-case bg-main bg-heading-fill border-1 border-aside-border rounded-2xl w-40 h-4 p-0 flex flex-row justify-evenly">
            {colorsCollection.ballColor}
            <Image
              src="/DropDown_icon.svg"
              width={10}
              height={10}
              className="inline-block ml-2"
              alt="DropDown_icon"
            />
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="w-52 z-10 bg-heading-fill">
            <Dropdown.Item
              onClick={() => setBallColor("0xff0000")}
              className=" text-main-text"
            >
              Red
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setBallColor("0xd0f223")}
              className="text-main-text"
            >
              Yellow
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setBallColor("0x0000ff")}
              className="text-main-text"
            >
              Blue
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Details>
      </div>

      {/* Racket Color Dropdown */}
      <div className="flex flex-row items-center justify-around gap-2">
        <h1 className="text-main-text font-saira-condensed">Racket Color</h1>
        <Dropdown.Details>
          <Dropdown.Details.Toggle className="hover-bg-heading-fill  text-placeholder-text font-saira-condensed normal-case bg-main bg-heading-fill border-1 border-aside-border rounded-2xl w-40 h-4 p-0 flex flex-row justify-evenly">
            {colorsCollection.racketColor}
            <Image
              src="/DropDown_icon.svg"
              width={10}
              height={10}
              className="inline-block ml-2"
              alt="DropDown_icon"
            />
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="w-52 z-10">
            <Dropdown.Item
              onClick={() => setRacketColor("0xff0000")}
              className="text-main-text"
            >
              Red
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setRacketColor("0xd0f223")}
              className="text-main-text"
            >
              Yellow
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setRacketColor("0x0000ff")}
              className="text-main-text"
            >
              Blue
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Details>
      </div>

      {/* Background Color Dropdown */}
      <div className="flex flex-row items-center justify-around gap-2">
        <h1 className="text-main-text font-saira-condensed">Background</h1>
        <Dropdown.Details>
          <Dropdown.Details.Toggle className="hover-bg-heading-fill  text-placeholder-text font-saira-condensed normal-case bg-main bg-heading-fill border-1 border-aside-border rounded-2xl w-40 h-4 p-0 flex flex-row justify-evenly">
            {colorsCollection.bgColor}
            <Image
              src="/DropDown_icon.svg"
              width={10}
              height={10}
              className="inline-block ml-2"
              alt="DropDown_icon"
            />
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="w-52 z-10">
            <Dropdown.Item
              onClick={() => setBgColor("0xff0000")}
              className="text-main-text"
            >
              Red
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setBgColor("0xd0f223")}
              className="text-main-text"
            >
              Yellow
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setBgColor("0x0000ff")}
              className="text-main-text"
            >
              Blue
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Details>
      </div>
    </div>
  );
}
