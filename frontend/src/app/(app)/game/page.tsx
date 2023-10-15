"use client";
import React, { useEffect, useState } from "react";

export default function GamePage() {
  
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

      var config: any = {
        type: Phaser.AUTO,
        parent: "game-container",
        width: 1000,
        height: 750,
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

      var phaserGame = new Phaser.Game(config);
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
    </div>
  );
}
