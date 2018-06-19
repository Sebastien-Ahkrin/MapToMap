import { createCanvas, loadImage, Image } from 'canvas'
import { join } from 'path'

import * as fs from 'fs'

export default class MapToMap {

  constructor (config) {
    this._infos = config.infos
    this._root = config.root;
    this._textures = config.textures;
    this._output = config.output
  }

  async newMap (map) {

    this._canvas = createCanvas(this._infos.width * map[0].length, this._infos.height * map.length)
    this._ctx = this._canvas.getContext('2d')

    this.images = (async () => {
      const frame = new Image()
      frame.src = this._canvas.toBuffer()
      return { frame, textures: await Promise.all(this._textures.map(async (data) => ({ key: data.tag, texture: await loadImage(join(this._root, data.texture)) }))) }
    })
    await this.draw(map)
  }

  async draw (map) {
    const { frame, textures } = await this.images()
    map.forEach((data, y) => {
      data.forEach((key, x) => {
        this.drawTexture(key, y, x, this._ctx, textures)
      })
    })

    this._ctx.drawImage(frame, 0, 0, 330, 286)

    return this._canvas.createPNGStream().pipe(fs.createWriteStream(join(this._output.dir, this._output.name)))
  }

  drawTexture (key, y, x, ctx, textures) {
    textures.forEach(data => {
      if(data.key === key){
        ctx.drawImage(data.texture, (data.texture.width * x), (data.texture.width * y), data.texture.width, data.texture.height)
      }
    })
  }

}