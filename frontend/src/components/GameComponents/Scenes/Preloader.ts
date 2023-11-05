import { Scene } from 'phaser';


export default class Preloader extends Scene {
  constructor() {
    super({ key: "preloader" });
  }

  preload() {
    this.load.image("ball", "/GameAssets/green_ball.png");
    this.load.image("paddle", "/GameAssets/green_paddle.png");
    this.load.image("logo", "/GameAssets/game_logo.png");
    this.load.image("play", "/GameAssets/play_button.png");
  }

  create() {
    this.scene.start('menu')
  }
}