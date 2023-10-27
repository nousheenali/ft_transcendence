import { Scene } from 'phaser';


export default class Preloader extends Scene {
  constructor() {
    super({ key: "preloader" });
  }

  preload() {
    this.load.image("ball", "/gameAssets/green_ball.png");
    this.load.image("paddle", "/gameAssets/green_paddle.png");
    this.load.image("logo", "/gameAssets/game_logo.png");
    this.load.image("play", "/gameAssets/play_button.png");
    this.load.image("player1keys", "/gameAssets/keys.png");
    this.load.image("player2keys", "/gameAssets/keys2.png");
  }

  create() {
    this.scene.start('game')
  }
}