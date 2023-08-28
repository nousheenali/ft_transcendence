"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PlayerInfo from "./PlayerInfo/PlayerInfo";
import { playerData } from "@/components/commonTypes/types";


const fetchData = async () => {
  try {
    const data = await import("../../../data/playersInformation.json")
    return data.playersInformation;
  } catch (error) {
    return [];
  }
}

export default function TopPlayer() {

  const [topPlayersData, setTopPlayersData] = useState<playerData[]>([])

  useEffect(() => {
    fetchData().then((data) => {
      setTopPlayersData(data);
    });
  },[])

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
        <div className="flex justify-center items-center h-[130px] border-b rounded-b-lg border-main-yellow">
          {topPlayersData.length === 1 && (
            <div>
              <PlayerInfo userData={topPlayersData[0]} medal="gold.svg" />
            </div>
          )}

          {topPlayersData.length === 2 && (
            <div className="flex flex-row space-x-20">
              <PlayerInfo userData={topPlayersData[0]} medal="gold.svg" />
              <PlayerInfo userData={topPlayersData[1]} medal="silver.svg" />
            </div>
          )}

          {topPlayersData.length > 2 && (
            <div className="flex flex-row space-x-20">
              <PlayerInfo userData={topPlayersData[1]} medal="silver.svg" />
              <PlayerInfo userData={topPlayersData[0]} medal="gold.svg" />
              <PlayerInfo userData={topPlayersData[2]} medal="bronze.svg" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}