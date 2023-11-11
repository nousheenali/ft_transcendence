import React from "react";
import { Modal } from "react-daisyui";
import Image from "next/image";
export default function Header() {
  return (
    <>
      <div className="flex flex-row justify-center items-center space-x-2 h-[30px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke p-5">
        <div className="font-saira-condensed font-bold text-xl text-main-text">
          <h1>Customize your game</h1>
        </div>
        <div>
          <Image
            src="/StartGame_icon.svg"
            width={25}
            height={25}
            // className="inline-block ml-2"
            alt="Game Status"
          />
        </div>
      </div>
    </>
  );
}
