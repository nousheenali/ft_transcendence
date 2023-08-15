import React from "react";
import Image from "next/image";
import PlayerInfo from "./PlayerInfo/PlayerInfo";

export default function TopPlayer() {
  const scores = [1950, 1900, 1820];
  const ranks = [1, 2, 3];

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-center items-center space-x-2 h-[40px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke">
          <div>
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              Top Players
            </h1>
          </div>
          <div>
            <Image height={25} width={25} src="/crown.svg" alt="crown" />
          </div>
        </div>
        <div className="flex flex-row space-x-20 justify-center items-center h-[130px] border-b rounded-b-lg border-[#7a8a27]">
          <PlayerInfo
            name="Player 2"
            score={scores[1]}
            rank={ranks[1]}
            img="/av1.svg"
            medal="/silver.svg"
          />
          <PlayerInfo
            name="Player 1"
            score={scores[0]}
            rank={ranks[0]}
            img="/av1.svg"
            medal="/gold.svg"
          />
          <PlayerInfo
            name="Player 3"
            score={scores[2]}
            rank={ranks[2]}
            img="/av1.svg"
            medal="/bronze.svg"
          />
        </div>
      </div>
    </>
  );
}
