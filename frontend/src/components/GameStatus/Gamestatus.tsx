import React from "react";
import Image from "next/image";

interface GameStatusProps {
  score: number;
  games: number;
  wins: number;
  loses: number;
  archivement: string;
}

export default function GameStatus({
  score,
  games,
  wins,
  loses,
  archivement,
}: GameStatusProps) {
  return (
    <div className=" text-white border-b-2  border-heading-stroke-30 rounded-b-2xl rounded-t-2xl stroke-slate-200 flex flex-col bg-box-fill mb-6 h-[200px]">
      {/* Game Status Header */}{" "}
      <div className="flex flex-row justify-center items-center space-x-2 h-[30px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke ">
        <div className="font-saira-condensed font-bold text-xl text-main-text">
          <h1>Game Status</h1>
        </div>
        <div>
          <Image
            src="/Game_status_icon.svg"
            width={25}
            height={25}
            alt="Game Status"
          />
        </div>
      </div>
      {/* Game Status Body */}
      <div className="grid grid-cols-[200px,200px,100px,auto] space-x-5 h-[130px] pb-4  pr-4 pl-4 m-4 ">
        {/* Game And score box */}
        <div className="bg-game-status-bg p-2 rounded-2xl flex flex-col pt-7 ">
          <div className="text-main-yellow flex justify-evenly font-saira-condensed text-xl">
            Games :{" "}
            <span className="text-main-text font-saira-condensed text-xl">
              {games}
            </span>
          </div>
          <div className="text-main-yellow flex justify-evenly font-saira-condensed text-xl">
            Score :{" "}
            <span className="text-main-text font-saira-condensed text-xl">
              {score}
            </span>
          </div>
        </div>
        {/* Wins And loses box */}
        <div className="bg-game-status-bg p-2 rounded-2xl flex flex-col pt-7">
          <div className="text-main-yellow flex justify-evenly font-saira-condensed text-xl">
            Wins :{" "}
            <span className="text-main-text font-saira-condensed text-xl">
              {wins}
            </span>
          </div>
          <div className="text-main-yellow flex justify-evenly font-saira-condensed text-xl">
            Loses :{" "}
            <span className="text-main-text font-saira-condensed text-xl">
              {loses}
            </span>
          </div>
        </div>
        {/* Archivements section */}
        <div className="bg-game-status-bg col-start-3 col-span-4 rounded-2xl overflow-hidden p-2">
          <div className="flex flex-row items-center justify-around">
            <div className="font-saira-condensed text-2xl text-main-yellow text-bold">
              Archivement :
            </div>
            {/* -------------------------------------------------------------------------------------------------- */}
            {/* Bronze */}
            <div
              className={`flex flex-col justify-center items-center gap-1 ${
                archivement === "bronze" ||
                archivement === "silver" ||
                archivement === "gold" ||
                archivement === "champion"
                  ? "opacity-100"
                  : "opacity-25"
              }`}
            >
              <h1 className="text-main-text font-saira-condensed font-bold text-2xl">
                Bronze
              </h1>
              <Image
                src="/Bronze_icon.svg"
                width={70}
                height={70}
                alt="Game Status"
              />
            </div>
            {/* -------------------------------------------------------------------------------------------------- */}

            {/* Silver */}
            <div
              className={`flex flex-col justify-center items-center gap-1 ${
                archivement === "silver" ||
                archivement === "gold" ||
                archivement === "champion"
                  ? "opacity-100"
                  : "opacity-25"
              }`}
            >
              <div className="text-main-text font-saira-condensed font-bold text-2xl">
                <h1>Silver</h1>
              </div>
              <div>
                <Image
                  src="/Silver_icon.svg"
                  width={70}
                  height={70}
                  // className="inline-block ml-2"
                  alt="Game Status"
                />
              </div>
            </div>
            {/* -------------------------------------------------------------------------------------------------- */}

            {/* Gold */}
            <div
              className={`flex flex-col justify-center items-center gap-1 ${
                archivement === "gold" || archivement === "champion"
                  ? "opacity-100"
                  : "opacity-25"
              }`}
            >
              {" "}
              <div className="text-main-text font-saira-condensed font-bold text-2xl">
                <h1>Gold</h1>
              </div>
              <div>
                <Image
                  src="/Gold_icon.svg"
                  width={70}
                  height={70}
                  // className="inline-block ml-1"
                  alt="Game Status"
                />
              </div>
            </div>
            {/* -------------------------------------------------------------------------------------------------- */}

            {/* Champion */}
            <div
              className={`flex flex-col justify-center items-center gap-1 ${
                archivement === "champion" ? "opacity-100" : "opacity-25"
              }`}
            >
              {" "}
              <div className="text-main-text font-saira-condensed font-bold text-2xl">
                <h1>Champion</h1>
              </div>
              <div>
                <Image
                  src="/GoldStar_icon.svg"
                  width={60}
                  height={60}
                  // className="inline-block ml-4"
                  alt="Game Status"
                />
              </div>
            </div>
            {/* -------------------------------------------------------------------------------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}
