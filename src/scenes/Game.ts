import { createWorld, addEntity, addComponent, pipe } from 'bitecs'

import { IWorld, System } from 'bitecs'

import {
  Input,
  Position,
  CPU,
  Player,
  Sprite,
  Velocity,
  Rotation
} from 'components'

import {
  createSpriteSystem,
  createMovementSystem,
  createPlayerSystem,
  createCPUSystem
} from 'systems'

enum Textures {
  TankBlue,
  TankGreen,
  TankRed
}

export class Game extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private pipeline: Function

  private world: IWorld

  constructor() {
    super('game')
  }

  init() {
    // console.log('init...')
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    this.load.image('tank-blue', 'images/tank_blue.png')
    this.load.image('tank-green', 'images/tank_green.png')
    this.load.image('tank-red', 'images/tank_red.png')
  }

  create() {
    this.world = createWorld()
    this.createEntitys()
    this.pipeline = this.createSystems()
  }

  createEntitys() {
    const { width, height } = this.scale
    const blueTank = addEntity(this.world)
    addComponent(this.world, Position, blueTank)
    addComponent(this.world, Velocity, blueTank)
    addComponent(this.world, Sprite, blueTank)
    addComponent(this.world, Rotation, blueTank)
    addComponent(this.world, Input, blueTank)
    addComponent(this.world, Player, blueTank)

    Position.x[blueTank] = 100
    Position.y[blueTank] = 100
    Sprite.texture[blueTank] = Textures.TankBlue
    Input.speed[blueTank] = 10

    // create random cpu tanks
    for (let i = 0; i < 10; ++i) {
      const tank = addEntity(this.world)

      addComponent(this.world, Position, tank)
      Position.x[tank] = Phaser.Math.Between(width * 0.25, width * 0.75)
      Position.y[tank] = Phaser.Math.Between(height * 0.25, height * 0.75)

      addComponent(this.world, Velocity, tank)
      addComponent(this.world, Rotation, tank)

      addComponent(this.world, Sprite, tank)
      Sprite.texture[tank] = Phaser.Math.Between(1, 2)

      addComponent(this.world, CPU, tank)
      CPU.timeBetweenActions[tank] = Phaser.Math.Between(0, 500)

      addComponent(this.world, Input, tank)
      Input.speed[tank] = 10
    }
  }

  createSystems() {
    const spriteSystem = createSpriteSystem(this, [
      'tank-blue',
      'tank-green',
      'tank-red'
    ])
    const movementSystem = createMovementSystem()
    const playerSystem = createPlayerSystem(this.cursors)
    const cpuSystem = createCPUSystem(this)
    return pipe(playerSystem, cpuSystem, movementSystem, spriteSystem)
  }

  update(t: number, dt: number) {
    this.pipeline(this.world)
  }
}
