import { Scene } from "phaser";
import Sprite from "../Helpers/GameObjects";
import GameObjects from "../Helpers/GameObjects";

export default class Game extends Scene {
  private socket: any;
  private roomID!: string;
  private ball!: Phaser.Physics.Arcade.Sprite;
  private player: Phaser.Physics.Arcade.Sprite[] = [];
  private gameStarted: boolean = false;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys: Record<string, Phaser.Input.Keyboard.Key> = {};
  private paddlespeed = 350;
  private messages: Phaser.GameObjects.Text[] = [];
  private controls: Phaser.Physics.Arcade.Sprite[] = [];
  private player_score = [];
  private scoreText: Phaser.GameObjects.Text[] = [];
  // private p1_score = 0;
  // private p1ScoreText!: Phaser.GameObjects.Text;
  // private p2_score = 0;
  // private p2ScoreText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "game" });
  }

  preload() {}

  create() {
    const wH = this.physics.world.bounds.height; //world height
    const wW = this.physics.world.bounds.width; //world width

    this.socket = this.registry.get("socket");
    this.roomID = this.registry.get("roomID");

    const gameObj = new GameObjects(this);
    // display text messages
    this.messages = gameObj.initialDisplay(wH, wW, this.messages);
    this.controls = gameObj.displayControls(wH, wW, this.controls);
    this.scoreText = gameObj.displayScoreTexts(wH, wW, this.scoreText);

    //render sprites
    this.ball = gameObj.renderBall(wW / 2, wH / 2);
    const ballWidth = this.ball.body.width;
    this.player[0] = gameObj.renderPaddle(wW - (ballWidth / 2 + 1), wH / 2);
    this.player[1] = gameObj.renderPaddle(ballWidth / 2 + 1, wH / 2);

    this.physics.add.collider(this.ball, this.player[0]);
    this.physics.add.collider(this.ball, this.player[1]);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys.w = gameObj.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keys.s = gameObj.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keys.space = gameObj.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    //check if space is pressed and game not started yet
    if (this.keys.space.isDown && !this.gameStarted) {
      this.socket.emit("playerReady");
      this.messages[0].setVisible(false);
      this.controls[0].setVisible(false);
      this.controls[1].setVisible(false);

      this.socket
        .on("ready", () => this.messages[1].setVisible(true))
        .emit("initBallVelocity", this.roomID)
        .on("initialVelocity", (initialVelocity: any) => {
          this.messages[1].setVisible(false);
          this.ball?.setVelocityX(initialVelocity.x);
          this.ball?.setVelocityY(initialVelocity.y);
        });

      this.gameStarted = true;
    }
    if (this.gameStarted) {
      this.socket
        .emit("updateBallPosition", { x: this.ball.x, y: this.ball.y , roomID: this.roomID})
        .on("ballMove", (position: any) => {
            this.ball?.setPosition(position.x, position.y);
        });
      this.player[0].setVelocityY(0);
      if (this.cursors.up.isDown) {
        this.player[0].setVelocityY(-this.paddlespeed);
      }
      if (this.cursors.down.isDown) {
        this.player[0].setVelocityY(+this.paddlespeed);
      }
    }

    // if (this.gameStarted) {
    //   this.player1?.setVelocityY(0);
    //   if (this.cursors.up.isDown) {
    //     this.player1?.setVelocityY(-this.paddlespeed);
    //   }

    //   if (this.cursors.down.isDown) {
    //     this.player1?.setVelocityY(+this.paddlespeed);
    //   }

    //   this.player2?.setVelocityY(0);
    //   if (this.keys.w.isDown) {
    //     this.player2?.setVelocityY(-this.paddlespeed);
    //   }

    //   if (this.keys.s.isDown) {
    //     this.player2?.setVelocityY(+this.paddlespeed);
    //   }

    //   if (this.ball.body.velocity.y < -this.paddlespeed) {
    //     this.ball.setVelocityY(this.paddlespeed);
    //   }

    //   if (this.ball.body.x > this.player1.body.x) {
    //     this.p2_score += 1;
    //     this.p2ScoreText.setText(this.p2_score.toString());
    //   }

    //   if (this.ball.body.x < this.player2.body.x) {
    //     this.p1_score += 1;
    //     this.p1ScoreText.setText(this.p1_score.toString());
    //   }
    // }
  }
}
