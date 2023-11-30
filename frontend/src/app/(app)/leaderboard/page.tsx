'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import TopPlayer from '@/components/LeaderBoard/TopPlayer/TopPlayer';
import ResponsiveTable from '@/components/Table/Table';
import Image from 'next/image';
import { generateLeaderboardData } from '@/data/Table/leaderBoard';
import { AuthContext } from '@/context/AuthProvider';
import { TableRowData } from '@/components/Table/types';
import { userInformation } from '@/components/Profile/types';
import { API_ENDPOINTS } from '../../../../config/apiEndpoints';
import { getAllUsersData } from '../../../../services/user';
import { leaderboardHeadings } from '@/data/Table/profileTableHeadings';

export default function Leaderboard() {

  const [leaderboardData, setleaderboardData] = useState<TableRowData[]>([]);
  const [topPlayers, setTopPlayers] = useState<userInformation[]>([]);
  const [maxHeight, setMaxHeight] = useState("none");
  const containerRef1 = useRef<HTMLDivElement>(null);
  const { user } = useContext(AuthContext);
  const login: string = user.login!;

  const fetchTableData = async () => {
    const data = await generateLeaderboardData(login);
    setleaderboardData(data);
    const users: userInformation[] = await getAllUsersData(
      login,
      API_ENDPOINTS.getAllUsers
    );
    setTopPlayers(users.slice(0,3)); //get top 3 players
  }

  useEffect(() => {
    fetchTableData();
    if (containerRef1.current) {
      const containerHeight = containerRef1.current.clientHeight;
      setMaxHeight(`${containerHeight}px`);
       console.log("Container Height:", containerHeight);
    }
  },[login]);


  return (
    <div className=" h-full mx-auto p-6">
      <div className="h-1/5 items-center justify-center">
        <TopPlayer data={topPlayers} />
      </div>
      <div className="h-4/5 border-b border-main-yellow rounded-xl overflow-hidden">
        <div className="flex flex-row justify-center items-center space-x-2 h-[30px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke mt-3">
          <div>
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              LeaderBoard
            </h1>
          </div>
          <div>
            <Image
              height={25}
              width={25}
              src="/Leader_Icon.svg"
              alt="LeaderBoard icon"
            />
          </div>
        </div>
        <div ref={containerRef1} className="h-full overflow-y-scroll ">
          <ResponsiveTable
            searchBar={false}
            header=""
            headerImage=""
            headings={leaderboardHeadings}
            data={leaderboardData}
            maxHeight={maxHeight}
            activeButton=""
            reloadPageData={fetchTableData}
          />
        </div>
      </div>
    </div>
  );
}
