import { Scene } from "phaser";
import Sprite from "../Helpers/GameObjects";
import GameObjects from "../Helpers/GameObjects";

export default class Game extends Scene {
  private ball!: Phaser.Physics.Arcade.Sprite;
  private player1!: Phaser.Physics.Arcade.Sprite;
  private player2!: Phaser.Physics.Arcade.Sprite;
  private gameStarted: boolean = false;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys: Record<string, Phaser.Input.Keyboard.Key> = {};
  private paddlespeed = 350;
  private msg!: Phaser.GameObjects.Text;
  private p1_score = 0;
  private p1ScoreText!: Phaser.GameObjects.Text;
  private p2_score = 0;
  private p2ScoreText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "game" });
  }

  preload() {}

  create() {
    const wH = this.physics.world.bounds.height; //world height
    const wW = this.physics.world.bounds.width; //world width
    
    const gameObj = new GameObjects(this);
    gameObj.createBackgroundLine(wW / 2, wH * 2);
    gameObj.createBackgroundCircle(wW / 2, wH / 2);
    
    this.ball = gameObj.renderBall(wW / 2, wH / 2);
    const ballWidth = this.ball.body.width;
    this.player1 = gameObj.renderPaddle(wW - (ballWidth / 2 + 1), wH / 2);
    this.player2 = gameObj.renderPaddle(ballWidth / 2 + 1, wH / 2);

    this.msg = gameObj
      .showText(wW / 2, (wH * 2) / 3, "Press space to START!", 20, "#FFFFFF")
      .setOrigin(0.55);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys.w = gameObj.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keys.s = gameObj.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keys.space = gameObj.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.p1ScoreText = gameObj.showText(wW / 2 + 70, 50, "0", 50, "#D0F223");
    this.p2ScoreText = gameObj.showText(wW / 2 - 100, 50, "0", 50, "#D0F223");

    this.physics.add.collider(this.ball, this.player1);
    this.physics.add.collider(this.ball, this.player2);
  }

  update() {
    //check if space is pressed and game not started yet
    if (this.keys.space.isDown && !this.gameStarted) {
      this.msg.setVisible(false);
      const initialVelocityX = 400;
      const initialVelocityY = 400;

      this.ball?.setVelocityX(initialVelocityX);
      this.ball?.setVelocityY(initialVelocityY);
      this.gameStarted = true;
    }

    if (this.gameStarted) {
      this.player1?.setVelocityY(0);
      if (this.cursors.up.isDown) {
        this.player1?.setVelocityY(-this.paddlespeed);
      }

      if (this.cursors.down.isDown) {
        this.player1?.setVelocityY(+this.paddlespeed);
      }

      this.player2?.setVelocityY(0);
      if (this.keys.w.isDown) {
        this.player2?.setVelocityY(-this.paddlespeed);
      }

      if (this.keys.s.isDown) {
        this.player2?.setVelocityY(+this.paddlespeed);
      }

      if (this.ball.body.velocity.y < -this.paddlespeed) {
        this.ball.setVelocityY(this.paddlespeed);
      }

      if (this.ball.body.x > this.player1.body.x) {
        this.p2_score += 1;
        this.p2ScoreText.setText(this.p2_score.toString());
      }

      if (this.ball.body.x < this.player2.body.x) {
        this.p1_score += 1;
        this.p1ScoreText.setText(this.p1_score.toString());
      }
    }
  }
}
