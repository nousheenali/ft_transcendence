import HowTo from "@/components/Help/HowTo";
import WhatIs from "@/components/Help/WhatIs";
import React from "react";

export default function Help() {
  return (
    <div className="flex w-full p-6 space-x-6">
      <div className="w-7/12 bg-box-fill bg-opacity-70 rounded-b-xl border-b border-grid-border border-opacity-80 relative">
        <div className="w-full h-[30px] bg-heading-fill rounded-t-2xl border border-heading-stroke absolute" />
        <div className="text-center font-saira-condensed text-xl font-bold text-main-text relative">
          How to Play?
        </div>
        <HowTo />
      </div>
      <div className="w-5/12 bg-box-fill bg-opacity-70 rounded-b-xl border-b border-grid-border border-opacity-80 relative">
        <div className="w-full h-[30px] bg-heading-fill rounded-t-2xl border border-heading-stroke absolute" />
        <div className="text-center font-saira-condensed text-xl font-bold text-main-text relative">
          What is Spin Masters?
        </div>
        <WhatIs />
      </div>
    </div>
  );
}
