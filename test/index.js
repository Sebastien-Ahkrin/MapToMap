import MapToMap from '../src'
import { join } from 'path'

const mtm = new MapToMap({
  root: join(__dirname, 'textures/'),
  infos: {
    width: 31,
    height: 32
  },
  textures: [
    { tag: 'w', texture: 'wall.png' },
    { tag: 'd', texture: 'door.png' },
    { tag: 'g', texture: 'ground.png' }
  ],
  output: {
    dir: join(__dirname, 'output/'),
    name: 'try3.png'
  }
})

mtm.newMap(
  [
    ['w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'g', 'g', 'g', 'w', 'g'],
    ['w', 'g', 'g', 'g', 'w', 'g'],
    ['w', 'g', 'g', 'g', 'w', 'g'],
    ['w', 'g', 'g', 'g', 'w', 'g'],
    ['w', 'w', 'd', 'w', 'w', 'g'],
    ['w', 'w', 'd', 'w', 'w', 'g'],
    ['w', 'w', 'd', 'w', 'w', 'g']
  ]
)