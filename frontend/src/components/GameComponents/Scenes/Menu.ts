import { Scene } from 'phaser';


export default class Menu extends Scene {

  constructor() {
    super({ key: "menu" });
  }

  preload() {
  }

  create() {
    let gameLogo = this.physics.add.sprite(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 3,
      "logo"
    );
    gameLogo.setScale(2);
    this.physics.add
      .sprite(
        this.physics.world.bounds.width / 2,
        (this.physics.world.bounds.height * 2) / 3,
        "play"
      ).setInteractive()
      .on("pointerdown", () => 
      {this.scene.start('game')});
  }

  update() {
  }
}
