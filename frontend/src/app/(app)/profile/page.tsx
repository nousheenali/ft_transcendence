import React from "react";

export default function Profile() {
  return (
    <>
      <div className="w-full h-full text-center text-white flex flex-col">
        <div className="bg-black h-[156px] border-2 border-[#667030]">
          PROFILE
        </div>
        <div className="bg-black mt-[10px] h-[37px] border-2 border-[#667030]">
          PROFILE_NAV
        </div>
        <div className="bg-black h-full mt-[10px] overflow-y-scroll max-h-[450px] scroll-mr-6 border-2 border-[#667030]">
          FRIENDS
        </div>
      </div>
    </>
  );
}
