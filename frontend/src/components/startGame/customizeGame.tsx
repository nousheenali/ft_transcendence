import React from 'react'
import { Dropdown } from 'react-daisyui'
import Image from "next/image";
export default function CustomizeGame() {
  return (
	<div className="bg-Customize-game-bg p-10 mx-8  flex flex-col gap-12 border-2 border-aside-border rounded-2xl">
              <div className="flex flex-row items-center justify-around gap-14">
                <h1 className="text-main-text font-saira-condensed text-xl">
                  Ball Color
                </h1>
                <Dropdown.Details>
                  <Dropdown.Details.Toggle className=" text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-heading-fill border-2 border-aside-border rounded-2xl w-60 flex flex-col gap-20">
                    <h1>Default Color</h1>
                    <Image
                      src="/DropDown_icon.svg"
                      width={20}
                      height={20}
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
              <div className="flex flex-row justify-around gap-8">
                <h1 className="text-main-text font-saira-condensed text-xl">
                  Racket Color
                </h1>
                <Dropdown.Details>
                  <Dropdown.Details.Toggle className=" text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-heading-fill border-2 border-aside-border rounded-2xl w-60 flex flex-col gap-20">
                    Default Color
                    <Image
                      src="/DropDown_icon.svg"
                      width={20}
                      height={20}
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
              <div className="flex flex-row justify-around gap-8">
                <h1 className="text-main-text font-saira-condensed text-xl">
                  Background
                </h1>
                <Dropdown.Details>
                  <Dropdown.Details.Toggle className=" text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-heading-fill border-2 border-aside-border rounded-2xl w-60 flex flex-col gap-18">
                    <h1 className="pr-6">Default Background</h1>
                    <Image
                      src="/DropDown_icon.svg"
                      width={20}
                      height={20}
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
              <div className="flex flex-row justify-around gap-8">
                <h1 className="text-main-text font-saira-condensed text-xl">
                  Game Level
                </h1>
                <Dropdown.Details>
                  <Dropdown.Details.Toggle className=" text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-heading-fill border-2 border-aside-border rounded-2xl w-60 flex flex-col gap-20">
                    <h1 className="pr-12">Easy</h1>
                    <Image
                      src="/DropDown_icon.svg"
                      width={20}
                      height={20}
                      className="inline-block ml-2"
                      alt="DropDown_icon"
                    />
                  </Dropdown.Details.Toggle>
                  <Dropdown.Menu className="w-52">
                    <Dropdown.Item className="text-main-text">Easy</Dropdown.Item>
                    <Dropdown.Item className="text-main-text">Medium</Dropdown.Item>
                    <Dropdown.Item className="text-main-text">Hard</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Details>
              </div>
            </div>
  )
}
