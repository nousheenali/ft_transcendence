import React from 'react'
import Image from "next/image";
import { Input } from 'react-daisyui';


export default function QueueAndInvite() {
  return (
	<div className="text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-aside-fill border-2 border-aside-border rounded-2xl flex flex-row gap-4  mx-8 p-4">
              <div className="text-main-yellow font-saira-condensed font-bold text-4xl py-10 px-4">
                OR
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <button className="text-main-text font-saira-condensed font-bold text-3xl flex flex-row gap-4">
                  <Image
                    src="/Queue_icon.svg"
                    width={18}
                    height={18}
                    className="inline-block ml-2 mt-2"
                    alt="DropDown_icon"
                  />
                  <h1>Join A queue</h1>
                </button>
                <div className=" text-main-text text-3xl font-saira-condensed flex items-center space-x-4">
                    <Image
                      src="/InviteFriends_icon.svg"
                      width={24}
                      height={24}
                      className="inline-block ml-2 "
                      alt="DropDown_icon"
                    />
                    <h1 className="">Invite :</h1>
                    <Input className="w-30" />
                </div>
              </div>
            </div>
  )
}
