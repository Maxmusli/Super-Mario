import TileResolver from './tile_resolver.js'
import { Sides } from './entity.js'

export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix)
  }

  checkX(entity) {
    let x 
    if (entity.vel.x > 0) {
      x = entity.pos.x + entity.size.x
    } else if (entity.vel.x < 0) {
      x = entity.pos.x
    } else {
      return
    }

    const matches = this.tiles.searchByRange(
      x, x,
      entity.pos.y, entity.pos.y + entity.size.y)

    matches.forEach(match => {
      if (match.tile.type !== 'ground') return
      if (entity.vel.x > 0) {
        if (entity.pos.x + entity.size.x > match.x1) {
          entity.obstruct(Sides.RIGHT, match)
        }
      } else if (entity.vel.x < 0) {
        if (entity.pos.x < match.x2) {
          entity.obstruct(Sides.LEFT, match)
        }
      }
       
    })
  }

  checkY(entity) {
    let y
    if (entity.vel.y > 0) {
      y = entity.pos.y + entity.size.y
    } else if (entity.vel.y < 0) {
      y = entity.pos.y
    } else {
      return
    }

    const matches = this.tiles.searchByRange(
      entity.pos.x, entity.pos.x + entity.size.x,
      y, y)

    matches.forEach(match => {
      if (match.tile.type !== 'ground') return
      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.size.y > match.y1) {
          entity.obstruct(Sides.BOTTOM, match)
        }
      } else if (entity.vel.y < 0) {
        if (entity.pos.y < match.y2) {
          entity.obstruct(Sides.TOP, match)
        }
      }
       
    })
  }

  test(entity) {
    this.checkY(entity)
  }
}