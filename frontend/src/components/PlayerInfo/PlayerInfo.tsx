import React from "react";
import Image from "next/image";

interface PlayerInfoProps {
  name: string;
  score: number;
  rank: number;
  img: string;
  medal: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = (props) => {
  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <div className="relative flex-shrink-0">
          <img height={100} width={100} src={props.img} alt="avatar" />
          <div className="absolute bottom-0 right-0">
            <Image height={40} width={40} src={props.medal} alt="medal" />
            <div className="absolute top-1 left-4">
              <p className="text-[#cee821] text-l font-bold">{props.rank}</p>
            </div>
          </div>
        </div>
        <div className="ml-5 font-saira-condensed text-lg text-main-text">
          <p className="font-semibold">{props.name}</p>
          <p className="font-semibold">{props.score}</p>
        </div>
      </div>
    </>
  );
};

export default PlayerInfo;
