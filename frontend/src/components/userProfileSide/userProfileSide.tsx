import Breaker from "@/components/br/Br";
import React from "react";
import StartGameCustomize from "../startGame/startGame";

interface UserProfileSideProps {
  image: string;
  name: string;
}

export default function UserProfileSide({ image, name }: UserProfileSideProps) {
  return (
    <>
      {name != "load" && image != "load" ? (
        <div className="flex flex-row items-center justify-stretch px-5 py-5">
          <div className="relative px-3">
            <img className="w-24 h-24 rounded-full object-cover" src={image} />
            <span className="bottom-1 left-16 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>

          <div
            className="text-main-text font-saira-condensed font-bold text-xl"
            style={{ whiteSpace: "pre-wrap" }} // This will make the text break lines
          >
            {name}
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between px-[50px] pt-8 pb-4">
          <div className="relative">
            <span className="loading loading-ring loading-lg text-main-yellow w-24 h-24 rounded-full object-cover"></span>
          </div>
          <div className="text-main-text font-saira-condensed font-bold text-xl">
            <span className="loading loading-ring loading-lg text-main-yellow w-24 h-24 rounded-full object-cover"></span>
          </div>
        </div>
      )}
      <Breaker />
      <StartGameCustomize />
    </>
  );
}
