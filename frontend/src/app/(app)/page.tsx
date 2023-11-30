"use client";

import Image from "next/image";
import React, { useEffect, useContext } from "react";
import { getUserData } from "../../../services/user";
import ResponsiveTable from "@/components/Table/Table";
import { Game } from "@/components/GameComponents/types";
import { getGamesHistory } from "../../../services/games";
import GameStatus from "@/components/GameStatus/Gamestatus";
import { userInformation } from "@/components/Profile/types";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";
import { generateLiveGamesData } from "@/data/Table/liveGames";
import { generateGameHistoryData } from "@/data/Table/gameHistory";
import { AuthContext } from "@/context/AuthProvider";

/**======================================================================================================**/
export default function DashBoardPage() {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = React.useState(true);
  const [gameHistory, setGameHistory] = React.useState<Game[]>();
  const [userData, setUserData] = React.useState<userInformation>();
  //------------------------------------------------------------------------------------------------
  const gameHistoryHeading = ["Player VS ", "Score", "Date", "Moves", "Result"];
  const LiveGamesHeading = ["Player 1", "Time", "Plater 2"];
  //------------------------------------------------------------------------------------------------
  const liveGamesData = generateLiveGamesData();
  const gameHistoryData = generateGameHistoryData(user.login, gameHistory);
  // const gameHistoryData = generateGameHistoryData();
  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (user && user.login) {
      const fetchData = async () => {
        const userData: userInformation = await getUserData(
          user.login,
          API_ENDPOINTS.getUserbyLogin
        );
        setUserData(userData);

        const games: Game[] = await getGamesHistory(
          user.login,
          API_ENDPOINTS.gamesHistory
        );
        setGameHistory(games);
        setLoading(false);
      };
      fetchData();
    }
  }, [user, user.login]);

  console.log("userData => ", userData);
  console.log("gameHistory => ", gameHistory);

  //------------------------------------------------------------------------------------------------
  const numberOfWins = gameHistory?.filter(
    (game) => game.winnerId === user.login
  ).length;
  const numberOfLoses = gameHistory?.filter(
    (game) => game.winnerId !== user.login
  ).length;
  //------------------------------------------------------------------------------------------------
  const archivement = () => {
    if (numberOfWins! >= 20) return "champion";
    else if (numberOfWins! >= 10) return "gold";
    else if (numberOfWins! >= 5) return "silver";
    else return "bronze";
  };

  console.log("achivement => ", archivement());

  //------------------------------------------------------------------------------------------------
  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  //------------------------------------------------------------------------------------------------

  return (
    <div className="p-2 h-full flex flex-col mr-[35px]">
      {/* -------------------------------------------------------------------------------------------------- */}
      <GameStatus
        score={userData?.score!}
        games={gameHistory?.length!}
        wins={numberOfWins as number}
        loses={numberOfLoses as number}
        archivement={archivement()}
      />

      {/* -------------------------------------------------------------------------------------------------- */}

      <div className="text-white grid grid-cols-3 gap-10 h-full">
        <div className="col-span-2 items-center justify-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
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
            activeButton={""}
            reloadPageData={function (buttonId: string): void {
              throw new Error("Function not implemented.");
            }}
          ></ResponsiveTable>
        </div>

        {/* -------------------------------------------------------------------------------------------------- */}
        <div className="col-span-1 items-center justify-center  border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
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
            activeButton={""}
            reloadPageData={function (buttonId: string): void {
              throw new Error("Function not implemented.");
            }}
          ></ResponsiveTable>
        </div>
        {/* -------------------------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
}

/**======================================================================================================**/
