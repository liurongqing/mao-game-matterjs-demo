/**
 * 当前用户，主要就是改变方式
 */
import { defineQuery, defineSystem } from 'bitecs'

import { Velocity, Rotation, Player, Input, Direction } from 'components'

export const createPlayerSystem = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
) => {
  const playerQuery = defineQuery([Player, Velocity, Rotation, Input])

  return (world: any) => {
    const entities = playerQuery(world)

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i]
      if (cursors.left.isDown) {
        Input.direction[id] = Direction.Left
      } else if (cursors.right.isDown) {
        Input.direction[id] = Direction.Right
      } else if (cursors.up.isDown) {
        Input.direction[id] = Direction.Up
      } else if (cursors.down.isDown) {
        Input.direction[id] = Direction.Down
      } else {
        Input.direction[id] = Direction.None
      }
    }

    return world
  }
}
