export class Bootstrap extends Phaser.Scene {
  constructor() {
    super('bootstrap')
  }

  init() {}

  preload() {}

  create() {
    this.scene.start('game')
  }

  update() {}
}
