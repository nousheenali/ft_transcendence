'use client';

import React from 'react';
import Image from 'next/image';
import ResponsiveTable from '@/components/Table/Table';
import GameStatus from '@/components/GameStatus/Gamestatus';
import { generateLiveGamesData } from '@/data/Table/liveGames';
import { generateGameHistoryData } from '@/data/Table/gameHistory';

export default function DashBoardPage() {
  const gameHistoryHeading = ['Player 1', 'Score', 'Date', 'Moves', 'Result'];
  const LiveGamesHeading = ['Player 1', 'Time', 'Plater 2'];

  const gameHistoryData = generateGameHistoryData();
  const liveGamesData = generateLiveGamesData();

  return (
    <div
      className="p-2 h-full flex flex-col mr-[35px]"
      style={{
        height: '100%',
      }}
    >
      <GameStatus
        score={1420}
        games={42}
        wins={12}
        loses={30}
        archivement="broze"
      />
      <div
        className="text-white grid grid-cols-3 gap-10 "
        style={{
          height: '100%',
        }}
      >
        <div
          className="col-span-2   border-b border-main-yellow rounded-xl overflow-hidden"
          style={{
            height: '73%',
          }}
        >
          <div className="flex flex-row justify-center items-center space-x-2 h-[30px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke mt-4">
            <div>
              <h1 className="font-saira-condensed font-bold text-xl text-main-text">
                Game History
              </h1>
            </div>
            <div>
              <Image height={25} width={25} src="/crown.svg" alt="crown icon" />
            </div>
          </div>
          <ResponsiveTable
            searchBar={false}
            header=""
            headerImage=""
            headings={gameHistoryHeading}
            data={gameHistoryData}
            maxHeight="1084px"
          ></ResponsiveTable>
        </div>
        <div
          className="  border-b border-main-yellow rounded-xl overflow-hidden"
          style={{
            height: '73%',
          }}
        >
          <div className="flex flex-row justify-center items-center space-x-2 h-[30px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke mt-4">
            <div>
              <h1 className="font-saira-condensed font-bold text-xl text-main-text">
                Live Games
              </h1>
            </div>
            <div>
              <Image height={25} width={25} src="/crown.svg" alt="crown icon" />
            </div>
          </div>
          <ResponsiveTable
            searchBar={false}
            header=""
            headerImage=""
            headings={LiveGamesHeading}
            data={liveGamesData}
            maxHeight="1084px"
          ></ResponsiveTable>
        </div>
      </div>
    </div>
  );
}
