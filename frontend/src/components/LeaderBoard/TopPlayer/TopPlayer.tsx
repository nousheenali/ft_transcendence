"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PlayerInfo from "./PlayerInfo/PlayerInfo";
import { TopPlayerProps } from "../types";
import { userInformation } from "@/components/Profile/types";

const TopPlayer: React.FC<TopPlayerProps> = ({ data }) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-center items-center space-x-2 h-[30px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke">
          <div>
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              Top Players
            </h1>
          </div>
          <div>
            <Image height={25} width={25} src="/crown.svg" alt="crown icon" />
          </div>
        </div>
        <div className="flex justify-center items-center h-[160px] border-b rounded-b-lg border-main-yellow">
          {data.length === 1 && (
            <div>
              <PlayerInfo userData={data[0]} rank={1} medal="gold.svg" />
            </div>
          )}

          {data.length === 2 && (
            <div className="flex flex-row space-x-20">
              <PlayerInfo userData={data[0]} rank={1} medal="gold.svg" />
              <PlayerInfo userData={data[1]} rank={2} medal="silver.svg" />
            </div>
          )}

          {data.length > 2 && (
            <div className="flex flex-row space-x-20">
              <PlayerInfo userData={data[1]} rank={2} medal="silver.svg" />
              <PlayerInfo userData={data[0]} rank={1} medal="gold.svg" />
              <PlayerInfo userData={data[2]} rank={3} medal="bronze.svg" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopPlayer;
