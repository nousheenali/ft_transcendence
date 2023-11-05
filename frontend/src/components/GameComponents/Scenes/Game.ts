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
  private paddlespeed = 0;
  private messages: Phaser.GameObjects.Text[] = [];
  private controls: Phaser.Physics.Arcade.Sprite[] = [];
  private results: Phaser.GameObjects.Text[] = [];
  private keysAssigned!: string;
  private p0_score = 0;
  private p1_score = 0;
  private line!: Phaser.GameObjects.Line;
  private circle!: Phaser.GameObjects.Arc;

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
    this.results = gameObj.displayResults(wH, wW, this.results);
    this.line = gameObj.createBackgroundLine(wW / 2, wH * 2);
    this.circle = gameObj.createBackgroundCircle(wW / 2, wH / 2);

    //render sprites
    this.ball = gameObj.renderBall(wW / 2, wH / 2);
    const ballWidth = this.ball.body.width;
    this.player[0] = gameObj.renderPaddle(wW - ballWidth / 2, wH / 2);
    this.player[1] = gameObj.renderPaddle(ballWidth / 2, wH / 2);

    //update game room sprite positions
    this.socket.emit("updateSpritePositions", {
      roomID: this.roomID,
      ballPosition: { x: this.ball.x, y: this.ball.y },
      p0Position: { x: this.player[0].x, y: this.player[0].y },
      p1Position: { x: this.player[1].x, y: this.player[1].y },
      paddleWidth: this.player[0].body.width,
      paddleHeight: this.player[0].body.height,
      ballWidth: ballWidth,
    });

    this.paddlespeed = 350;

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
        .emit("initSettings", this.roomID)
        .on("initialise", (initialData: any) => {
          this.messages[1].setVisible(false);
          this.keysAssigned = initialData.controls;
          this.ball.setPosition(initialData.x, initialData.y);
        });
      this.gameStarted = true;
    }

    if (this.gameStarted) {
      this.socket
        .emit("ballPosition", { roomID: this.roomID })
        .on(
          "updateBallPosition",
          (
            position: { x: number; y: number },
            p0_score: number,
            p1_score: number
          ) => {
            this.ball.setPosition(position.x, position.y);
            this.p0_score = p0_score;
            this.p1_score = p1_score;
            this.results[0].setText(
              this.registry.get("player0") + " : " + this.p0_score.toString()
            );
            this.results[1].setText(
              this.registry.get("player1") + " : " + this.p1_score.toString()
            );
          }
        );
      this.player[0].setVelocityY(0);
      this.player[1].setVelocityY(0);

      //when arrows are used paddle moves for player on right side
      if (this.keysAssigned === "arrows") {
        if (this.cursors.up.isDown) {
          this.player[0].setVelocityY(-this.paddlespeed);
          this.socket.emit("movePaddle", {
            roomID: this.roomID,
            y: this.player[0].y,
            velocity: -this.paddlespeed,
          });
        }
        if (this.cursors.down.isDown) {
          this.player[0].setVelocityY(+this.paddlespeed);
          this.socket.emit("movePaddle", {
            roomID: this.roomID,
            y: this.player[0].y,
            velocity: +this.paddlespeed,
          });
        }
        this.socket.on("updateRemotePaddle", (y: number, velocity: number) => {
          this.player[1].setVelocityY(velocity);
        });
      }

      //when 'W' and 'S' keys are used paddle moves for player on left side
      if (this.keysAssigned === "ws") {
        if (this.keys.w.isDown) {
          this.player[1].setVelocityY(-this.paddlespeed);
          this.socket.emit("movePaddle", {
            roomID: this.roomID,
            y: this.player[1].y,
            velocity: -this.paddlespeed,
          });
        }
        if (this.keys.s.isDown) {
          this.player[1].setVelocityY(+this.paddlespeed);
          this.socket.emit("movePaddle", {
            roomID: this.roomID,
            y: this.player[1].y,
            velocity: +this.paddlespeed,
          });
        }
        this.socket.on("updateRemotePaddle", (y: number, velocity: number) => {
          this.player[0].setVelocityY(velocity);
        });
      }
    }
    // On game Over
    this.socket.on("gameOver", (message: string, name: string) => {
      this.line.setVisible(false);
      this.circle.setVisible(false);
      this.ball.setVisible(false);
      this.player[0].setVisible(false);
      this.player[1].setVisible(false);
      this.results[3].setText(message).setVisible(true);
      this.messages[2].setVisible(true);
      this.messages[0].setVisible(false);
      this.messages[1].setVisible(false);
      this.controls[0].setVisible(false);
      this.controls[1].setVisible(false);
      if(this.gameStarted)
        this.results[2].setText(name + " WINS!").setVisible(true);
      const router = this.registry.get("router");
      setTimeout(() => {
        this.game.destroy(true);
        router.push("/");
      }, 3000);
    });
  }
}
