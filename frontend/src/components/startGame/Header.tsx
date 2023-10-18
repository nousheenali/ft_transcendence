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
      {/* <div className="flex flex-row bg-heading-stroke-30 border-2 rounded-t-2xl border-aside-border p-2 items-center justify-center font-saira-condensed font-bold text-20 text-2xl text-main-text space-x-2 gap-8">
	  <div className="mt-1">
		<h1>Customize your game</h1>
	  </div>
	  <div>
		<Image
		  src="/StartGame_icon.svg"
		  width={40}
		  height={40}
		//   className="inline-block ml-2"
		  alt="Customize your game"
		/>
	  </div>
	</div> */}
    </>
  );
}
