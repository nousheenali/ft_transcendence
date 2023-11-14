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
  } = useGameState(); //for the time being im saving the colors in the context store

  const joinQueue = isQueue;
  const accept = isAccepted; //check this

  const { user } = useContext(AuthContext);
  const login: string = user.login!;
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_GAME_GATEWAY_URL;
  const world: WorldDimensions = {
    width: (window.innerWidth * 2) / 3,
    height: (window.innerHeight * 2) / 3,
  };
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
      // currentSocket.emit("newNotif", )
      socket.on("connect", () => {
        if (joinQueue) {
          socket.emit("addToQueue", world);
        } else {
          if (login === inviter) {
            const input: WaitingRoom = {
              invitee: invitee,
              worldDimensions: world,
            };
            socket.emit("createWaitingRoom", input);
          } else if (login === invitee) {
            socket.emit("joinWaitingRoom", {
              inviter: inviter,
              worldDimensions: world,
              accept: accept,
            });
          }
        }
        socket.on("inviterDisconnected", () => {
          alert("Inviter disconnected the game");
          socket.disconnect();
          router.push("/");
        });
        socket.on("invitationDeclined", () => {
          if (login === inviter) alert("Other player Declined your invitation");
          socket.disconnect();
          router.push("/");
        });
        socket.on("matched", (data: joiningData) => {
          // setupGame();
          const loadingText = document.getElementById("loading-text");
          loadingText?.remove();

          var config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: "game-container",
            width: data.worldDimensions.width,
            height: data.worldDimensions.height,
            // backgroundColor: bgColor,//"#6495ED",//"#87CEEB",//, "#60b922", "#44b18b",
            scene: [Preloader, Game],
            physics: {
              default: "arcade",
            },
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

      // user clicks back navigation in browswer
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
