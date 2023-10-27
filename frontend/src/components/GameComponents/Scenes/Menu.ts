import { Scene } from 'phaser';


export default class Menu extends Scene {

  constructor() {
    super({ key: "menu" });
  }

  preload() {
  }

  create() {
    const plyr1: string = this.registry.get("player1");
    const plyr2: string = this.registry.get("player2");

    const message = `${plyr2} vs ${plyr1}`
    const msg = this.add.text(
      this.physics.world.bounds.width / 2,
      (this.physics.world.bounds.height * 2) / 3,
      message,
      {
        fontSize: "32px",
        fontFamily: "Arial", 
        color: "#D0F223", 
      }
    );
    msg.setOrigin(0.5);
    let gameLogo = this.physics.add.sprite(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 3,
      "logo"
    );
    gameLogo.setScale(2);
    this.physics.add
      .sprite(
        this.physics.world.bounds.width / 2,
        (this.physics.world.bounds.height * 2) / 3 + 100,
        "play"
      ).setInteractive()
      .on("pointerdown", () => 
      {this.scene.start('game')});
  }

  update() {
  }
}
