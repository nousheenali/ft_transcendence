import { Scene } from "phaser";

export default class Preloader extends Scene {
  constructor() {
    super({ key: "preloader" });
  }

  preload() {
    this.load.image("ball", "/GameAssets/ball.png");
    this.load.image("paddle", "/GameAssets/paddle1.png");
    this.load.image("logo", "/GameAssets/Game_logo.png");
    this.load.image("player1keys", "/GameAssets/keys5.png");
    this.load.image("player2keys", "/GameAssets/keys6.png");
    this.load.audio("ballHit", "/GameAssets/ballHit.mp3");
    this.load.audio("wallHit", "/GameAssets/wallHit.mp3");
    this.load.audio("gameOver", "/GameAssets/gameOver2.mp3");
  }

  create() {
    this.scene.start("game");
  }
}