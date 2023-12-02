"use client";

import { useGameState } from "@/context/store";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUserData } from "../../../../services/user";
import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import { AuthContext } from "@/context/AuthProvider";
import {
  WaitingRoom,
  WorldDimensions,
  joiningData,
} from "@/components/GameComponents/types";


export default function GamePage() {
  const {
    ballColor,
    racketColor,
    bgColor,
    invitee,
    inviter,
    isAccepted,
    isQueue,
    setInviter,
    setInvitee,
  } = useGameState();

  const { user } = useContext(AuthContext);
  const login: string = user.login!;
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_GAME_GATEWAY_URL;
  var socket: Socket;
  var phaserGame: Phaser.Game;

  useEffect(() => {
    async function initPhaser() {
      if (!login) {
        return;
      }
      const userData = await getUserData(login, API_ENDPOINTS.getUserbyLogin);
      if (userData.inAGame) {
        alert("You are already in a game");
        router.back();
        return;
      }
      const Phaser = await import("phaser");
      const { default: Preloader } = await import(
        "../../../components/GameComponents/Scenes/Preloader"
      );
      const { default: Game } = await import(
        "../../../components/GameComponents/Scenes/Game"
      );

      socket = io(backendUrl!, {
        query: { login: userData.login, username: userData.name },
      });
      socket.on("connect", () => {
        const world: WorldDimensions = {
          width: (window.innerWidth * 2) / 3,
          height: (window.innerHeight * 2) / 3,
        };
        /* When user selects queue option */
        if (isQueue) {
          socket.emit("addToQueue", world);
        } else {
          if (login === inviter) {
            /* Inviter creates a game room and waits for the invitee */
            const input: WaitingRoom = {
              invitee: invitee,
              worldDimensions: world,
            };
            socket.emit("createWaitingRoom", input);
          } else if (login === invitee) {
            /* Invitee creates socket and either accepts/declines the invite */
            socket.emit("joinWaitingRoom", {
              inviter: inviter,
              worldDimensions: world,
              accept: isAccepted,
            });
          }
        }

        /* When inviter disconnects before the invitee joins */
        socket.on("inviterDisconnected", () => {
          if (isAccepted) alert("Inviter disconnected the game");
          socket.disconnect();
          router.back();
        });

        /* When invitee declines invitation */
        socket.on("invitationDeclined", () => {
          if (login === inviter) alert("Other player Declined your invitation");
          socket.disconnect();
          router.back();
        });

        /* game room created and both players joined */
        socket.on("matched", (data: joiningData) => {
          const loadingText = document.getElementById("loading-text");
          loadingText?.remove();

          /* Phaser game config */
          var config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: "game-container",
            width: data.worldDimensions.width,
            height: data.worldDimensions.height,
            backgroundColor: bgColor,
            scene: [Preloader, Game],
            physics: {
              default: "arcade",
            },
            fps: {target : 120}
          };
          phaserGame = new Phaser.Game(config);
          /* Global Variables for Phaser Game */
          phaserGame.registry.merge({
            roomID: data.roomID,
            player0: data.p0Name,
            player1: data.p1Name,
            socket,
            paddleColor: racketColor,
            ballColor: ballColor,
            worldWidth: data.worldDimensions.width,
            worldHeight: data.worldDimensions.width,
            router,
          });
        });
      });

      /* user clicks back navigation in browswer */
      const handlePopstate = () => {
        socket.disconnect();
        if (phaserGame) phaserGame.destroy(true);
      };
      window.addEventListener("popstate", handlePopstate);
      return () => {
        window.removeEventListener("popstate", handlePopstate);
      };
    }
    initPhaser();
  }, [login]);

  const exitGame = () => {
    socket.disconnect();
    router.back();
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
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
        <div className="text-start-game font-saira-condensed font-bold text-2xl h-18 w-64 text-center border-2 border-aside-border rounded-2xl p-4 mt-4 bg-heading-fill hover:bg-[#111417] opacity-90">
          <button onClick={exitGame}>Exit Game</button>
        </div>
      </div>
    </div>
  );
}
