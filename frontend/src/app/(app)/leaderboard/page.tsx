import React from 'react';
import TopPlayer from '@/components/TopPlayer/TopPlayer';
import ResponsiveTable from '@/components/Table/Table';
import Image from 'next/image';

export default function Leaderboard() {
  const leaderboardHeadings = [
    'Rank',
    'Player',
    'Score',
    'Games',
    'Wins',
    'Losses',
  ];
  const generateLeaderboardData = (numRecords = 100) => {
    const records = [];

    for (let i = 1; i <= numRecords; i++) {
      records.push([
        `${i}`, // Position/Number
        { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
        `${1800 + i}`, // This score increases by 1 for each record as an example
        `${Math.floor(Math.random() * 15) + 1}`, // Random number between 1-15
        `${Math.floor(Math.random() * 10) + 1}`, // Random number between 1-10
        `${Math.floor(Math.random() * 5) + 1}`, // Random number between 1-5
      ]);
    }

    return records;
  };

  const leaderboardData = generateLeaderboardData();

  console.log(leaderboardData);

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
        maxHeight="520px"
      ></ResponsiveTable>
    </div>
  );
}
