export default class GameObjects {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  initialDisplay(wH: number, wW: number, msg: Phaser.GameObjects.Text[]) {
    
    msg[0] = this.showText(
      wW / 2,
      (wH * 2) / 3,
      "Press space to START!",
      20,
      "#FFFFFF"
    ).setOrigin(0.55);

    msg[1] = this.showText(
      wW / 2,
      (wH * 2) / 3,
      "Waiting for other player to join...",
      20,
      "#FFFFFF"
    )
      .setOrigin(0.55)
      .setVisible(false);

    msg[2] = this.showText(
      wW / 2,
      (wH * 4) / 5,
      "Exiting Game...",
      30,
      "#FFFFFF"
    )
      .setOrigin(0.55)
      .setVisible(false);

    return msg;
  }

  displayControls(
    wH: number,
    wW: number,
    controls: Phaser.Physics.Arcade.Sprite[]
  ) {
    controls[0] = this.renderImage(wW / 4, (wH * 1) / 3, "player2keys");
    controls[1] = this.renderImage((wW * 3) / 4, (wH * 1) / 3, "player1keys");
    return controls;
  }

  displayResults(wH: number, wW: number, results: Phaser.GameObjects.Text[]) {
    results[0] = this.showText(
      wW / 2 + 70,
      50,
      this.scene.registry.get("player0") + ": 0",
      25,
      "#D0F223"
    ).setOrigin(-0.2, 0);

    results[1] = this.showText(
      wW / 2 - 100,
      50,
      this.scene.registry.get("player1") + ": 0",
      25,
      "#D0F223"
    ).setOrigin(1, 0);

    results[2] = this.showText(wW / 2, (wH * 2) / 3, "", 40, "#D0F223")
      .setOrigin(0.5)
      .setVisible(false);

    results[3] = this.showText(wW / 2, wH / 3, "", 30, "#FFFFFF")
      .setOrigin(0.5)
      .setVisible(false);

    return results;
  }

  createBackgroundLine(x: number, y: number) {
    return this.scene.add.line(x, 0, 0, 0, 0, y, 0xffffff, 1).setLineWidth(2.5, 2.5);
  }

  createBackgroundCircle(x: number, y: number) {
    return this.scene.add.circle(x, y, 80).setStrokeStyle(5, 0xffffff, 1);
  }

  renderBall(x: number, y: number) {
    const ball = this.scene.physics.add
      .sprite(x, y, "ball")
      .setCollideWorldBounds(true)
      .setBounce(1, 1);
    ball.tint = this.scene.registry.get("ballColor");
    return ball;
  }

  renderPaddle(x: number, y: number) {
    const paddle = this.scene.physics.add
      .sprite(x, y, "paddle")
      .setCollideWorldBounds(true)
      .setImmovable(true);
    paddle.tint = this.scene.registry.get("paddleColor");
    return paddle;
  }

  renderImage(x: number, y: number, name: string) {
    return this.scene.physics.add.sprite(x, y, name);
  }

  showText(
    x: number,
    y: number,
    message: string,
    fontSize: number,
    fontColor: string
  ) {
    return this.scene.add
      .text(x, y, message)
      .setFontSize(fontSize)
      .setColor(fontColor);
  }

}
