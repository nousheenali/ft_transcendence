"use client"
import Breaker from "@/components/br";
import React from "react";
import { useState } from 'react';
import { VscBellDot } from "react-icons/vsc";


const AsideBar = () => {
  const [isChecked, setIsChecked] = useState(true);
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <aside className="min-w-[300px] max-w-[220px] my-[18px] ml-[35px] border-2  border-aside-border bg-aside-fill rounded-3xl overflow-hidden">
      <div className=" flex  justify-between w-17 h-17 bg-heading-fill rounded-t-2xl border-b-[1px] border-heading-stroke p-2">
        <button className="">
          <div className="flex items-center justify-center rounded-2xl w-6 h-6 bg-gray-500 hover:bg-gray-900 p-1 ">
            <svg className="" xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="none">
              <path d="M7.51249 2.06128C5.44374 2.06128 3.76249 3.9667 3.76249 6.31128V8.35836C3.76249 8.79045 3.59999 9.4492 3.40624 9.81753L2.68749 11.1704C2.24374 12.0063 2.54999 12.9342 3.36249 13.2459C6.05624 14.2659 8.96249 14.2659 11.6562 13.2459C12.4125 12.9625 12.7437 11.9496 12.3312 11.1704L11.6125 9.81753C11.425 9.4492 11.2625 8.79045 11.2625 8.35836V6.31128C11.2625 3.97378 9.57499 2.06128 7.51249 2.06128Z" stroke="#D5F223" stroke-opacity="0.8" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
              <path d="M8.6687 2.26665C8.47495 2.2029 8.27495 2.15331 8.0687 2.12498C7.4687 2.03998 6.8937 2.08956 6.3562 2.26665C6.53745 1.74248 6.98745 1.37415 7.51245 1.37415C8.03745 1.37415 8.48745 1.74248 8.6687 2.26665Z" stroke="#D5F223" stroke-opacity="0.8" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path opacity="0.4" d="M9.38745 13.5009C9.38745 14.6696 8.5437 15.6259 7.51245 15.6259C6.99995 15.6259 6.52495 15.385 6.18745 15.0025C5.84995 14.62 5.63745 14.0817 5.63745 13.5009" stroke="#D5F223" stroke-opacity="0.8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="12" cy="13" r="3" fill="#CD5555" fill-opacity="0.93" />
            </svg>
          </div>
        </button>
        <h1><span className="text-yellow-300 text-stroke-3 " >Spin</span><span className="text-main-text">Masters</span></h1>
        <input type="checkbox"
          className="toggle w-15 h-6"
          checked={isChecked}
          onChange={handleToggleChange} />
      </div>

      <div className="flex flex-row items-center justify-between px-[50px] pt-8 pb-4 ">
        <div className="avatar online ">
          <div className="w-[66px] h-[66px] rounded-full">
            <img src="/av1.svg" />
          </div>
        </div>
        <div className="text-main-text ">Gab-172</div>
      </div>
      <Breaker />
      <div className="flex items-center justify-center p-4">
        <button className="text-start-game h-[45px] w-[166px] border-aside-border rounded-2xl btn btn-outline p-4 bg-heading-fill">Start Game</button>
      </div>
      <div className="flex flex-col gap-6">
        <button className="bg-red-800 flex justify-between">
          <div><img className="w-[40px]" src="/DashBoard_logo.svg" alt="DashBoard_logo" /></div>
          <div>DashBoard</div>
        </button>
        <button className="bg-red-800 "><img className="w-[40px]" src="/LeaderBoard_logo.svg" alt="DashBoard_logo" />LeaderBoard</button>
        <button className="bg-red-800 "><img className="w-[40px]" src="/chat_logo.svg" alt="DashBoard_logo" />Chat</button>
        <button className="bg-red-800 "><img className="w-[40px]" src="/profile_logo.svg" alt="DashBoard_logo" />Profile</button>
        <button className="bg-red-800 "><img className="w-[40px]" src="/settings_logo.svg" alt="DashBoard_logo" />Settings</button>
        {/* <input type="checkbox" /> */}
      </div>
      {/* <div className="avatar offline">
        <div className="w-24 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div> */}
      {/* <h1 className="text-white">SideBar </h1>
      <h1 className="text-white">SideBar </h1>
      <h1 className="text-white">SideBar </h1>
      <h1 className="text-white">SideBar </h1> */}
    </aside>
  );
};

export default AsideBar;
