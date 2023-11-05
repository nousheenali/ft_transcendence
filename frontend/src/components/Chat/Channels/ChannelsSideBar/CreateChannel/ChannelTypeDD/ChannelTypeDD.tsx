import React from 'react'
import { Dropdown } from 'react-daisyui';
import Image from 'next/image';

export default function ChannelTypeDD() {
  return (
    <div className="flex flex-row items-center justify-around gap-14">
        <h1 className="text-main-text font-saira-condensed text-xl">
            Type
        </h1>
        <Dropdown.Details>
            <Dropdown.Details.Toggle className="text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-heading-fill border-2 border-aside-border rounded-2xl w-60 flex flex-col gap-20">
            <h1>Default Type</h1>
            <Image
                src="/DropDown_icon.svg"
                width={20}
                height={20}
                className="inline-block ml-2"
                alt="DropDown_icon"
            />
            </Dropdown.Details.Toggle>
            <Dropdown.Menu className="w-52 z-10">
            <Dropdown.Item className="text-main-text">
                Public
            </Dropdown.Item>
            <Dropdown.Item className="text-main-text">
                Private
            </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Details>
    </div>
  )
}
