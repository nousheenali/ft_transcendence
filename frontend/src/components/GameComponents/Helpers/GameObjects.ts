export default class GameObjects {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  initialDisplay(wH: number, wW: number, msg: Phaser.GameObjects.Text[]) {
    this.createBackgroundLine(wW / 2, wH * 2);
    this.createBackgroundCircle(wW / 2, wH / 2);

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

  displayScoreTexts(wH: number, wW: number, scores: Phaser.GameObjects.Text[]) {
    scores[0] = this.showText(wW / 2 + 70, 50, "0", 50, "#D0F223");
    scores[1] = this.showText(wW / 2 - 100, 50, "0", 50, "#D0F223");
    return scores;
  }

  createBackgroundLine(x: number, y: number) {
    this.scene.add.line(x, 0, 0, 0, 0, y, 0xffffff, 1).setLineWidth(2.5, 2.5);
  }

  createBackgroundCircle(x: number, y: number) {
    this.scene.add.circle(x, y, 80).setStrokeStyle(5, 0xffffff, 1);
  }

  renderBall(x: number, y: number) {
    return this.scene.physics.add
      .sprite(x, y, "ball")
      .setCollideWorldBounds(true)
      .setBounce(1, 1);
  }

  renderPaddle(x: number, y: number) {
    return this.scene.physics.add
      .sprite(x, y, "paddle")
      .setCollideWorldBounds(true)
      .setImmovable(true);
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

  addKey(key: number) {
    return this.scene.input.keyboard.addKey(key);
  }
}
