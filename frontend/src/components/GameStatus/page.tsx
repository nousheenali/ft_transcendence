import React from "react";
import Image from "next/image";

export default function GameStatus() {
  return (
    <div className=" text-white border-b-2 border-heading-stroke-30 rounded-b-2xl rounded-t-2xl stroke-slate-200 flex flex-col bg-box-fill mb-10 h-[200px]">
      <div className="flex flex-row bg-heading-stroke-30 border-2 rounded-t-2xl border-aside-border p-1 items-center justify-center font-saira-condensed font-bold text-20 text-2xl text-main-text space-x-2">
        <div className="mt-1">
          <h1>Game Status</h1>
        </div>
        <div>
          <Image
            src="/Game_status_icon.svg"
            width={40}
            height={40}
            className="inline-block ml-2"
            alt="Game Status"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 space-x-5 h-[130px] pb-4  pr-6 pl-6 m-4">
        <div className="bg-game-status-bg p-2 rounded-2xl flex flex-col pt-4">
          <div className="text-main-yellow flex justify-evenly font-saira-condensed text-xl">
            Games :{" "}
            <span className="text-main-text font-saira-condensed text-xl">
              42
            </span>
          </div>
          <div className="text-main-yellow flex justify-evenly ml-1 font-saira-condensed text-xl">
            Score :{" "}
            <span className="text-main-text font-saira-condensed text-xl">
              1420
            </span>
          </div>
        </div>
        <div className="bg-game-status-bg p-2 rounded-2xl flex flex-col pt-4">
          <div className="text-main-yellow flex justify-evenly font-saira-condensed text-xl">
            Wins :{" "}
            <span className="text-main-text font-saira-condensed text-xl">
              12
            </span>
          </div>
          <div className="text-main-yellow flex justify-evenly ml-1 font-saira-condensed text-xl">
            Loses :{" "}
            <span className="text-main-text font-saira-condensed text-xl">
              30
            </span>
          </div>
        </div>


        {/* Archivements section */}
        <div className="bg-game-status-bg col-start-3 col-span-4 rounded-2xl overflow-hidden p-2">
          <div className="flex flex-row items-center justify-around">
            <div className="font-saira-condensed text-2xl text-main-yellow text-bold">Archivement :</div>
            <div className="flex flex-col justify-center items-center gap-1">
              <h1 className="text-main-text font-saira-condensed font-bold text-2xl">Bronze</h1>
                <Image
                  src="/Bronze_icon.svg"
                  width={70}
                  height={70}
                  // className="inline-block ml-2"
                  alt="Game Status"
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="text-main-text font-saira-condensed font-bold text-2xl"><h1>Silver</h1></div>
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
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="text-main-text font-saira-condensed font-bold text-2xl"><h1>Gold</h1></div>
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
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="text-main-text font-saira-condensed font-bold text-2xl"><h1>Champion</h1></div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
