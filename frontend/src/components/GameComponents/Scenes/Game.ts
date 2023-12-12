import { Scene } from "phaser";
import Sprite from "../Helpers/GameObjects";
import GameObjects from "../Helpers/GameObjects";
import { Socket } from "socket.io-client";
import {
  GameOver,
  InitialData,
  BallPosition,
  UpdateSpritePositions,
} from "../types";

export default class Game extends Scene {
  private socket!: Socket;
  private currentSocket!: Socket;
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
  private paddleHitAudio!: Phaser.Sound.BaseSound;
  private wallHitAudio!: Phaser.Sound.BaseSound;
  private gameOver!: Phaser.Sound.BaseSound;
  private setupComplete = false; //to make sure everything is setup correctly before starting update()

  constructor() {
    super({ key: "game" });
  }

  preload() {}

  create() {
    var ballWidth = 0;
    const wH = this.physics.world.bounds.height; //world height
    const wW = this.physics.world.bounds.width; //world width

    this.socket = this.registry.get("socket");
    this.roomID = this.registry.get("roomID");
    this.currentSocket = this.registry.get("currentSocket");

    const gameObj = new GameObjects(this);
    /* display texts */
    this.messages = gameObj.initialDisplay(wH, wW, this.messages);
    this.controls = gameObj.displayControls(wH, wW, this.controls);
    this.results = gameObj.displayResults(wH, wW, this.results);
    this.line = gameObj.createBackgroundLine(wW / 2, wH * 2);
    this.circle = gameObj.createBackgroundCircle(wW / 2, wH / 2);

    this.game.renderer.type = Phaser.WEBGL;

    /* render sprites */
    this.ball = gameObj.renderBall(wW / 2, wH / 2);
    this.paddlespeed = 600;
    if (this.ball.body) {
      ballWidth = this.ball.body.width;
      this.player[0] = gameObj.renderPaddle(wW - ballWidth / 2, wH / 2);
      this.player[1] = gameObj.renderPaddle(ballWidth / 2, wH / 2);

      /* update game room sprite positions on server*/
      this.initilaiseSprites(ballWidth);

      /* Setup keyboard keys to use */
      this.addKeys();

      /* Add Audio */
      this.paddleHitAudio = this.sound.add("ballHit");
      this.wallHitAudio = this.sound.add("wallHit");
      this.gameOver = this.sound.add("gameOver");

      /* to activate update() */
      this.setupComplete = true;
    }
  }

  /* update() is called by game engine on each frame */
  /* delta - time elapsed between the current frame and the previous frame(milliseconds) */
  update(time: number, delta: number) {
    
    if (this.setupComplete) {
      /*check if space is pressed and game not started yet*/
      if (this.keys.space.isDown && !this.gameStarted) 
        this.initilaiseGame();

      /*space pressed and game started */
      if (this.gameStarted) {

        /*  optimizes the sound playback logic by ensuring that the sound is played once per collision event
         rather than potentially being triggered continuously in each frame. */
        let collision = false;
        
        this.currentSocket.emit("newLiveGame", {
          player1: this.registry.get("player0"),
          player1Image: this.registry.get("player0Image"),
          player2: this.registry.get("player1"),
          player2Image: this.registry.get("player1Image"),
          startedTime: new Date(),
        });
        
        /*plays audio based on the surface hit*/
        this.socket.on("hitPaddle", (surface: boolean) => {
          if (!collision) {
            collision = true;
            // Play the appropriate sound
            if (surface) this.paddleHitAudio.play();
            else this.wallHitAudio.play();
          }
        });

        this.socket
          .emit("ballPosition", { roomID: this.roomID, delta })
          .on("updateBallPosition", (data: BallPosition) => {
            this.ball.setPosition(data.position.x, data.position.y);
            this.displayScore(data.p0_score, data.p1_score);
          });

        /* prevents paddle from moving continuously on one key press */
        this.player[0].setVelocityY(0);
        this.player[1].setVelocityY(0);

        /* when arrows are used paddle moves for player on right side */
        if (this.keysAssigned === "arrows") this.movePlayerZero();

        /* when 'W' and 'S' keys are used paddle moves for player on left side */
        if (this.keysAssigned === "ws") this.movePlayerOne();
      }

      /* game Over */
      this.socket.on("gameOver", (data: GameOver) => {
        this.currentSocket.emit("finishedLiveGame", {
          player1: this.registry.get("player0"),
          player2: this.registry.get("player1"),
          startedTime: new Date(),
        });
        this.gameOverContent(data);
      });
    }
  }

  /* Initialise Sprites */
  initilaiseSprites(ballWidth: number) {
    if (this.player[0].body) {
      const data: UpdateSpritePositions = {
        roomID: this.roomID,
        ballPosition: { x: this.ball.x, y: this.ball.y },
        p0Position: { x: this.player[0].x, y: this.player[0].y },
        p1Position: { x: this.player[1].x, y: this.player[1].y },
        paddle: {
          width: this.player[0].body.width,
          height: this.player[0].body.height,
        },
        ballWidth: ballWidth,
      };
      this.socket.emit("updateSpritePositions", data);
    }
  }

  /* Setup Keys */
  addKeys() {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.keys.w = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.W
      );
      this.keys.s = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.S
      );
      this.keys.space = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
    }
  }

  /* Initialise Game */
  initilaiseGame() {
    this.socket.emit("playerReady");
    this.messages[0].setVisible(false);
    this.controls[0].setVisible(false);
    this.controls[1].setVisible(false);
    this.socket
      .on("ready", () => this.messages[1].setVisible(true))
      .emit("initSettings", this.roomID)
      .on("initialise", (initialData: InitialData) => {
        this.messages[1].setVisible(false);
        this.keysAssigned = initialData.controls;
        this.ball.setPosition(initialData.x, initialData.y);
      });
    this.gameStarted = true;
  }

  /* Player Zero Movement Logic */
  movePlayerZero() {
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

  /* Player One Movement Logic */
  movePlayerOne() {
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

  /* Display Score */
  displayScore(p0_score: number, p1_score: number) {
    this.p0_score = p0_score;
    this.p1_score = p1_score;
    this.results[0].setText(
      this.registry.get("player0") + " : " + this.p0_score.toString()
    );
    this.results[1].setText(
      this.registry.get("player1") + " : " + this.p1_score.toString()
    );
  }

  /* Game Over */
  gameOverContent(data: GameOver) {
    this.gameOver.play();
    this.line.setVisible(false);
    this.circle.setVisible(false);
    this.ball.setVisible(false);
    this.player[0].setVisible(false);
    this.player[1].setVisible(false);
    this.results[3].setText(data.message).setVisible(true);
    this.messages[2].setVisible(true);
    this.messages[0].setVisible(false);
    this.messages[1].setVisible(false);
    this.controls[0].setVisible(false);
    this.controls[1].setVisible(false);
    this.displayScore(data.p0_score, data.p1_score);
    if (data.name !== null)
      this.results[2].setText(data.name + " WINS!").setVisible(true);
    const router = this.registry.get("router");
    this.socket.disconnect();
    setTimeout(() => {
      this.game.destroy(true);
      router.push("/");
    }, 3000);
  }
}
