"use client";
import { useSession } from "next-auth/react";
import { useGameColor } from "@/context/store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const { ballColor, racketColor, bgColor } = useGameColor(); //for the time being im saving the colors in the context store

  const { data: session } = useSession();
  const login: string = session?.user.login!;
  const joinQueue = true;
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  var socket: Socket;

  // const confirmBack = (socket: Socket) => {
  //   if (confirm("Your current game progress will be lost!")) {
  //     socket.disconnect();
  //     window.removeEventListener("popstate", () => confirmBack(socket));
  //   } 
  //   else
  //     return false;
  // };

  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");
      const { default: Preloader } = await import(
        "../../../components/GameComponents/Scenes/Preloader"
      );
      const { default: Game } = await import(
        "../../../components/GameComponents/Scenes/Game"
      );
      const backendUrl = process.env.NEXT_PUBLIC_GAME_GATEWAY_URL;
      socket = io(backendUrl!, {
        query: {
          username: login,
        },
      });
      socket.on("connect", () => {
        if (joinQueue) {
          socket.emit("addToQueue", {
            width: (window.innerWidth * 2) / 3,
            height: (window.innerHeight * 2) / 3,
          });
        } else {
          const userID = "tester";
          socket.emit("matchFriend", {
            friendName: userID,
            width: (window.innerWidth * 2) / 3,
            height: (window.innerHeight * 2) / 3,
          });
          //create a room with the user id
        }
        socket.on("matched", (data) => {
          const loadingText = document.getElementById("loading-text");
          loadingText?.remove();

          var config: any = {
            type: Phaser.AUTO,
            parent: "game-container",
            width: data.worldWidth,
            height: data.worldHeight,
            // backgroundColor: bgColor, // "#87CEEB",//, "#60b922", "#44b18b",
            scene: [Preloader, Game],
            physics: {
              default: "arcade",
              arcade: {
                gravity: false,
              },
              // fps: 30,
              scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
              },
            },
          };
          var phaserGame = new Phaser.Game(config);
          phaserGame.registry.merge({
            roomID: data.roomID,
            player0: data.p0Name,
            player1: data.p1Name,
            socket,
            paddleColor: racketColor,
            ballColor: ballColor,
            worldWidth: data.worldWidth,
            worldHeight: data.worldHeight,
            router,
          });
        });
      });
      // window.addEventListener("popstate", () => confirmBack(socket));
      // return () => {
      //   window.removeEventListener("popstate", () => confirmBack(socket));
      // };

      // user clicks back navigation in browswer
      const handlePopstate = () => {
        socket.disconnect();
      };
      window.addEventListener("popstate", handlePopstate);
      return () => {
        window.removeEventListener("popstate", handlePopstate);
      };
    }
    initPhaser();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div
          id="game-container"
          key="game-container"
          ref={gameContainerRef}
          className="border-[#D0F223] border-[1px]"
        >
          {/* Phaser Game window appears here.*/}
        </div>
        <div
          id="loading-text"
          className="flex flex-col font-saira-condensed font-bold text-xl text-main-text items-center justify-center w-2/3 h-2/3 border-[#D0F223] border-[2px] bg-black"
        >
          <div className="font-saira-condensed text-5xl">
            <span className="text-main-yellow">Spin</span>
            <span className="text-main-text">Masters</span>
          </div>
          <Image alt="Logo" src="./Logo.svg" width={200} height={200} />
          <span className="mt-10 border-2 loading loading-ring loading-lg text-main-yellow"></span>
          <div className="mt-2"> Matching Players...</div>
        </div>
      </div>
    </div>
  );
}
