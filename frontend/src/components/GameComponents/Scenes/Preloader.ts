import { Scene } from 'phaser';


export default class Preloader extends Scene {
  constructor() {
    super({ key: "preloader" });
  }

  preload() {
    this.load.image("ball", "/gameAssets/ball.png");
    this.load.image("paddle", "/gameAssets/paddle1.png");
    this.load.image("logo", "/gameAssets/game_logo.png");
    this.load.image("play", "/gameAssets/play_button.png");
    this.load.image("player1keys", "/gameAssets/keys1.png");
    this.load.image("player2keys", "/gameAssets/keys2.png");
    this.load.audio("ballHit", "/gameAssets/ballHit.mp3");
    this.load.audio("wallHit", "/gameAssets/wallHit.mp3");
    this.load.audio("gameOver", "/gameAssets/gameOver2.mp3");
  }

  create() {
    this.scene.start("game");
  }
}