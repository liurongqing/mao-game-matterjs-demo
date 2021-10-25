import 'phaser'

// // import { Align } from 'utils'
// // // import * as mainScenes from './main/scenes'
// // // import * as ticTacToeScenes from './modules/tic-tac-toe/scenes'
// // // const scene = [mainScenes, ticTacToeScenes].map((v) => Object.values(v)).flat()

import * as scenes from 'scenes'
const scene = Object.values(scenes)

const { innerWidth: width, innerHeight: height } = globalThis
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width,
  height,
  backgroundColor: 0xffffff,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200
      }
    }
  },
  scene
}

/**
 * 初始化
 */
// Align.width = width
export default new Phaser.Game(config)
