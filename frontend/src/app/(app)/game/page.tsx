"use client";
import { useSession } from "next-auth/react";
import { useGameColor } from "@/context/store";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Image from "next/image";

export default function GamePage() {

  const { ballColor, racketColor, bgColor } = useGameColor() //for the time being im saving the colors in the context store

  const { data: session } = useSession();
  const login: string = session?.user.login!;
  const joinQueue = true;

  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");
      const { default: Preloader } = await import(
        "../../../components/GameComponents/Scenes/Preloader"
      );
      const { default: Menu } = await import(
        "../../../components/GameComponents/Scenes/Menu"
      );
      const { default: Game } = await import(
        "../../../components/GameComponents/Scenes/Game"
      );
      const worldWidth = 1000;
      const worldHeight = 750;

      var config: any = {
        type: Phaser.AUTO,
        parent: "game-container",
        width: worldWidth,
        height: worldHeight,
        // width: window.innerWidth * window.devicePixelRatio,
        // height: window.innerHeight * window.devicePixelRatio,
        // backgroundColor: "#000000",
        scene: [Preloader, Menu, Game],
        physics: {
          default: "arcade",
          arcade: {
            gravity: false,
          },
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };
      
      const socket = io("http://localhost:3001/game", {
        withCredentials: true, // If you need to include credentials
        transports: ["websocket"],
        query: {
            "username": login,
        },
      });
      socket.on("connect", () => {  
        if(joinQueue){
          socket.emit("addToQueue", worldWidth, worldHeight);
          socket.on("matched", (roomID) => {
            const loadingText = document.getElementById("loading-text");
            loadingText?.remove();
            var phaserGame = new Phaser.Game(config);
            phaserGame.registry.set("roomID", roomID);
            phaserGame.registry.set('socket', socket);
          });
        }
      });
    }
    initPhaser();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        id="game-container"
        key="game-container"
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
  );
}
