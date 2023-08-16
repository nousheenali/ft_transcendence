import React from "react";
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";

export default function Profile() {

  return (
    <>
      <div className="w-full h-full text-center text-white flex flex-col p-6">
        <ProfileInfo
          name="UserName"
          email="username@email.com"
          rank="12"
        />
        <div className="bg-black h-full mt-[10px] overflow-y-scroll max-h-[450px] scroll-mr-6 border-2 border-[#667030]">
          FRIENDS
        </div>
      </div>
    </>
  );
}
