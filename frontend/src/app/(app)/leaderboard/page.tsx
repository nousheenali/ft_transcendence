import React from 'react';
import TopPlayer from '@/components/LeaderBoard/TopPlayer/TopPlayer';
import ResponsiveTable from '@/components/Table/Table';
import Image from 'next/image';
import { generateLeaderboardData } from '@/data/Table/leaderBoard';

export default function Leaderboard() {
  const leaderboardHeadings = [
    'Rank',
    'Player',
    'Score',
    'Games',
    'Wins',
    'Losses',
  ];

  const leaderboardData = generateLeaderboardData();

  return (
    <div className="container mx-auto p-6">
      <TopPlayer />
      <div className="flex flex-row justify-center items-center space-x-2 h-[30px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke mt-4">
        <div>
          <h1 className="font-saira-condensed font-bold text-xl text-main-text">
            LeaderBoard
          </h1>
        </div>
        <div>
          <Image height={25} width={25} src="/crown.svg" alt="crown icon" />
        </div>
      </div>
      <ResponsiveTable
        headings={leaderboardHeadings}
        data={leaderboardData}
        maxHeight="595px"
      ></ResponsiveTable>
    </div>
  );
}
