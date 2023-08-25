import React from "react";
import Image from "next/image";
import { PlayerInfoProps } from "../../types";


const PlayerInfo: React.FC<PlayerInfoProps> = ({userData, medal}) => {
  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <div className="relative flex-shrink-0">
          <div className="flex flex-row justify-center items-center">
            <div className="relative flex-shrink-0">
              <Image
                height={100}
                width={100}
                src={userData.profileImage.src}
                alt={userData.profileImage.alt}
              />
              <div className="absolute bottom-0 right-0">
                <Image height={40} width={40} src={medal} alt="medal" />
                <div className="absolute top-1 left-4">
                  <p className="text-subheading-one text-l font-bold">
                    {userData.rank}
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-5 font-saira-condensed text-lg text-main-text">
              <p className="truncate max-w-[100px] font-semibold">
                {userData.username}
              </p>
              <p className="font-semibold">{userData.score}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerInfo;
