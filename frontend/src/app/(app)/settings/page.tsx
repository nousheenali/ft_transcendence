import React from "react";

export default function Settings() {
  return (
    <div className="w-full flex p-6">
      <div className="top-[18px] right-[88px] w-[931px] h-[496px] absolute bg-[#0E1211] bg-opacity-70 rounded-[10px] border-b border-[#7E8937]">
        <div className="w-[931px] h-[27px] left-0 top-0 absolute bg-[#22272E] bg-opacity-80 rounded-tl-[10px] rounded-tr-[10px] border border-[#696D7D]" />
        <div className="w-[760px] left-[36px] top-[69px] absolute gap-[74px]"></div>
        <div className="h-[27px] left-[407px] top-0 absolute gap-[13px]">
          <div className="text-center text-[#9E9FA4] text-[20px] font-normal">
            Settings
          </div>
        </div>
        <div className="w-[665px] h-[205px] top-[60px] relative flex-col gap-[27px]">
          NAME Email 2FA Wallpaper
        </div>
      </div>
    </div>
  );
}
