import React from "react";
import { Dropdown } from "react-daisyui";
import Image from "next/image";
{
  /* <div className="bg-Customize-game-bg mx-10  flex flex-col gap-12 border-2 border-aside-border rounded-2xl w-[304px] h-auto"> */
}
export default function CustomizeGame() {
  return (
    <div className="bg-Customize-game-bg mx-8  flex flex-col gap-6 rounded-2xl w-[304px] h-auto py-4 font-bold">
      <div className="flex flex-row items-center justify-around gap-2">
        <h1 className="text-main-text font-saira-condensed">Ball Color</h1>
        <Dropdown.Details>
          <Dropdown.Details.Toggle className="hover:bg-heading-fill text-placeholder-text font-saira-condensed normal-case bg-main bg-heading-fill border-1 border-aside-border rounded-2xl w-40 h-4 p-0 flex flex-row justify-evenly">
            <h1>Default Color</h1>
            <Image
              src="/DropDown_icon.svg"
              width={10}
              height={10}
              className="inline-block ml-2"
              alt="DropDown_icon"
            />
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="w-52 z-10 bg-heading-fill">
            <Dropdown.Item className="hover:bg-aside-fill text-main-text">
              Red
            </Dropdown.Item>
            <Dropdown.Item className="text-main-text">yellow</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Details>
      </div>
      <div className="flex flex-row items-center justify-around gap-2">
        <h1 className="text-main-text font-saira-condensed">Racket Color</h1>
        <Dropdown.Details>
          <Dropdown.Details.Toggle className="hover:bg-heading-fill  text-placeholder-text font-saira-condensed normal-case bg-main bg-heading-fill border-1 border-aside-border rounded-2xl w-40 h-4 p-0 flex flex-row justify-evenly">
            Default Color
            <Image
              src="/DropDown_icon.svg"
              width={10}
              height={10}
              className="inline-block ml-2"
              alt="DropDown_icon"
            />
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="w-52 z-10">
            <Dropdown.Item className="text-main-text">Red</Dropdown.Item>
            <Dropdown.Item className="text-main-text">yellow</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Details>
      </div>
      <div className="flex flex-row items-center justify-around gap-2">
        <h1 className="text-main-text font-saira-condensed">Background</h1>
        <Dropdown.Details>
          <Dropdown.Details.Toggle className="hover:bg-heading-fill  text-placeholder-text font-saira-condensed normal-case bg-main bg-heading-fill border-1 border-aside-border rounded-2xl w-40 h-4 p-0 flex flex-row justify-evenly">
            <h1 className="pr-6">Default</h1>
            <Image
              src="/DropDown_icon.svg"
              width={10}
              height={10}
              className="inline-block ml-2"
              alt="DropDown_icon"
            />
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="w-52 z-10">
            <Dropdown.Item className="text-main-text">Red</Dropdown.Item>
            <Dropdown.Item className="text-main-text">Yellow</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Details>
      </div>
    </div>
  );
}
