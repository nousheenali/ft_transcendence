export default class GameObjects {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
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

  showText(x: number, y: number, message: string, fontSize: number, fontColor: string) {
    return this.scene.add
      .text(x, y, message)
      .setFontSize(fontSize)
      .setColor(fontColor);
  }

  addKey(key: number) {
    return this.scene.input.keyboard.addKey(key);
  }
}
