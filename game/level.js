import Compositor from "./compositor.js"
import { Matrix } from './math.js'
import TileCollider from './tile_collider.js'

export default class Level {
  constructor() {
    this.comp = new Compositor()
    this.entities = new Set()
    this.tiles = new Matrix()

    this.tileCollider = new TileCollider(this.tiles)
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime)

      this.tileCollider.test(entity)
    })
  }
}