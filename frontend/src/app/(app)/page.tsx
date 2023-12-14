"use client";

import Image from "next/image";
import React, { useEffect, useContext, useState } from "react";
import { getUserData } from "../../services/user";
import ResponsiveTable from "@/components/Table/Table";
import { Game } from "@/components/GameComponents/types";
import { getGamesHistory } from "../../services/games";
import GameStatus from "@/components/GameStatus/Gamestatus";
import { userInformation } from "@/components/Profile/types";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";
import { generateGameHistoryData } from "@/data/Table/gameHistory";
import { AuthContext } from "@/context/AuthProvider";
import { useSocket } from "@/context/store";
import { formatDistanceToNow } from "date-fns";

/**======================================================================================================**/
export default function DashBoardPage() {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = React.useState(true);
  const [gameHistory, setGameHistory] = React.useState<Game[]>();
  const [userData, setUserData] = React.useState<userInformation>();
  //------------------------------------------------------------------------------------------------
  const gameHistoryHeading = ["Player VS ", "Score", "Date", "Result"];
  const LiveGamesHeading = ["Player 1", "Time", "Player 2"];
  //------------------------------------------------------------------------------------------------
  const gameHistoryData = generateGameHistoryData(user.login, gameHistory);
  // const gameHistoryData = generateGameHistoryData();
  //------------------------------------------------------------------------------------------------
  //Notification socket to use for live games

  // state to keep track of live games
  const [liveGamesData, setLiveGamesData] = useState<any>([]);
  const { currentSocket } = useSocket();
  useEffect(() => {
    if (currentSocket && currentSocket.connected) {
      currentSocket.on("newLiveGame", (data) => {
        const formattedTime = formatDistanceToNow(new Date(data.startedTime), {
          addSuffix: true,
        });
        const records: any = [];
        liveGamesData.forEach((game: any) => {
          if (game[0].name !== data.player1) records.push(game);
        });
        const temp = [
          {
            playerName: data.player1,
            img: data.player1Image,
            name: data.player1,
          },
          formattedTime,
          {
            playerName: data.player2,
            img: data.player2Image,
            name: data.player2,
          },
        ];
        records.push(temp);
        if (records.length > 0) {
          setLiveGamesData(records);
        }
      });
      currentSocket.on("finishedLiveGame", (data) => {
        const records: any = [];
        liveGamesData.forEach((game: any) => {
          if (game[0].name !== data.player1) records.push(game);
        });
        setLiveGamesData(records);
      });
      return () => {
        currentSocket.off("newLiveGame");
        currentSocket.off("finishedLiveGame");
      };
    }
  }, [currentSocket, liveGamesData]);

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

  // console.log("userData => ", userData);
  // console.log("gameHistory => ", gameHistory);

  //------------------------------------------------------------------------------------------------
  const numberOfWins = gameHistory?.filter(
    (game) => game.winnerId === user.login
  ).length;
  const numberOfLoses = gameHistory?.filter(
    (game) => game.winnerId !== user.login
  ).length;
  //------------------------------------------------------------------------------------------------
  const archivement = () => {
    if (numberOfWins! >= 30) return "champion";
    else if (numberOfWins! >= 20) return "gold";
    else if (numberOfWins! >= 10) return "silver";
    else if (numberOfWins! >= 5) return "bronze";
    else return "none";
  };


  //------------------------------------------------------------------------------------------------
  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  //------------------------------------------------------------------------------------------------

  return (
    <div className="p-2 grid grid-rows-6 grid-cols-3 grid-flow-col gap-4 mr-[35px]  h-full">
      {/*  current user game status header */}
      <div className=" h-full col-span-3">
        <GameStatus
          score={userData?.score!}
          games={gameHistory?.length!}
          wins={numberOfWins as number}
          loses={numberOfLoses as number}
          archivement={archivement()}
        />
      </div>
      {/* current user dashboard */}
      <div className=" h-full row-start-2 row-end-7 col-span-2 border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
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
      {/* live game section */}
      <div className=" h-full row-start-2 row-end-7 border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
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
    </div>
  );
}
