"use client"

import React from "react";
import Image from "next/image";
import ProfileNavBar from "../ProfileNavBar/ProfileNavBar";

interface ProfileInfoProps{
    name: string;
    email: string;
    rank: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({name, email, rank}) => {

    return (
      <>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-center items-center space-x-4 h-[40px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke">
            <div>
              <h1 className="font-saira-condensed font-bold text-xl text-main-text">
                Profile
              </h1>
            </div>
            <div>
              <Image
                height={25}
                width={25}
                src="/profile.svg"
                alt="profile icon"
              />
            </div>
          </div>
          <div className="flex flex-row h-[130px] border-b rounded-b-lg border-[#7a8a27]">
            <div className="flex flex-shrink-0 w-1/5 justify-center">
              <img height={100} width={100} src="/av1.svg" alt="avatar" />
            </div>
            <div className="flex flex-col w-4/5 rounded-xl ml-2 mt-5 mb-5 mr-10 font-saira-condensed text-lg text-main-text justify-start pl-6 pt-2">
              <div className="flex flex-row ">
                <div className="text-[#cde924]">Name:</div>
                <div className="ml-10 truncate max-w-[300px]">{name}</div>
              </div>
              <div className="flex flex-row">
                <div className="text-[#cde924]">Email:</div>
                <div className="ml-10 truncate max-w-[300px]">{email}</div>
              </div>
              <div className="flex flex-row">
                <div className="text-[#cde924]">Rank:</div>
                <div className="ml-10">#{rank}</div>
              </div>
            </div>
          </div>
          <div className="border-b rounded-b-lg border-[#7a8a27]">
            <ProfileNavBar />
          </div>
        </div>
      </>
    );
};

export default ProfileInfo;

