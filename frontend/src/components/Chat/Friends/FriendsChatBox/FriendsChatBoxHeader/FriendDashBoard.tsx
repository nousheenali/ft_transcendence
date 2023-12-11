"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import ResponsiveTable from "@/components/Table/Table";
import { activateClickedFriend } from "@/context/store";
import { Game } from "@/components/GameComponents/types";
import GameStatus from "@/components/GameStatus/Gamestatus";
import { userInformation } from "@/components/Profile/types";
import { getUserData } from "../../../../../../services/user";
import { getGamesHistory } from "../../../../../../services/games";
import { generateGameHistoryData } from "@/data/Table/gameHistory";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";

/**======================================================================================================**/
export default function FriendDashBoard() {
  const gameHistoryHeading = ["Player 1", "Score", "Date", "Moves", "Result"];
  const gameHistoryData = generateGameHistoryData();
  const { activeFriend, setActiveFriend } = activateClickedFriend();
  const [isLoading, setLoading] = React.useState(true);
  const [friendData, setFriendData] = React.useState<userInformation>();
  const [gameHistory, setGameHistory] = React.useState<Game[]>();

  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (activeFriend) {
      const fetchData = async () => {
        const userData: userInformation = await getUserData(
          activeFriend,
          API_ENDPOINTS.getUserbyLogin
        );
        setFriendData(userData);

        const games: Game[] = await getGamesHistory(
          activeFriend,
          API_ENDPOINTS.gamesHistory
        );
        setGameHistory(games);
        setLoading(false);
      };
      fetchData();
    }
  }, [activeFriend]);

  //------------------------------------------------------------------------------------------------
  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  //------------------------------------------------------------------------------------------------

  return (
    <div className="p-2 h-full flex flex-col mr-[35px]">
      <GameStatus
        score={1420}
        games={42}
        wins={12}
        loses={30}
        archivement="broze"
      />
      <div className="text-white grid grid-cols-2 gap-10 h-full">
        <div className="col-span-2 w-full items-center justify-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
          <div className="flex flex-row justify-center items-center space-x-2 h-[30px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke ">
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
            maxHeight="540px"
            activeButton={""}
            reloadPageData={function (buttonId: string): void {
              throw new Error("Function not implemented.");
            }}
          ></ResponsiveTable>
        </div>
      </div>
    </div>
  );
}

/**======================================================================================================**/
