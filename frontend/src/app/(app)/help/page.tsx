import React from "react";

export default function Help() {
  return (  
  <div className="gradient-radial h-screen w-screen top-[0px] absolute"> 
      <div className="top-[18px] right-[448px] w-[571px] h-[353px] absolute bg-[#0E1211] bg-opacity-70 rounded-[10px] border-b border-[#7E8937]">
        <div className="w-[571px] h-[27px] absolute left-0 top-0 bg-[#22272E] bg-opacity-80 rounded-tl-[10px] rounded-tr-[10px] border border-[#696D7D]" />
        <div className="h-[27px] absolute left-[239px] top-0 gap-[13px]">
          <div className="text-center text-[#9E9FA4] text-xl font-normal">How to Play?</div>
        </div>
      </div>
      <div className="w-[401px] h-[353px] top-[18px] right-[30px] absolute bg-[#0E1211] bg-opacity-70 rounded-[10px] border-b border-[#7E8937]">
        <div className="w-[401px] h-[27px] absolute left-0 top-0 bg-[#22272E] bg-opacity-80 rounded-tl-[10px] rounded-tr-[10px] border border-[#696D7D]" />
        <div className="h-[27px] absolute left-[121px] top-0 gap-[13px]">
          <div className="text-center text-[#9E9FA4] text-xl font-normal">What is Spin Masters?</div>
        </div>
      </div>
    </div>
  );
};