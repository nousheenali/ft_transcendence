import React from "react";
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";

export default function Profile() {

  return (
    <>
      <div className="w-full h-full text-center text-white flex flex-col p-6">
        <ProfileInfo name="UserName" email="username@email.com" rank="12" />
        <div className="h-full mt-[10px] overflow-y-scroll scroll-mr-6 border rounded-b-lg border-grid-border">
          CONTENT CHANGED ON BUTTON CLICK
        </div>
      </div>
    </>
  );
}
