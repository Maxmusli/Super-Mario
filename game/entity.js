import * as math from './math.js'

export default class Entity {
  constructor() {
    this.pos = new math.Vec2(0, 0)
    this.vel = new math.Vec2(0, 0)

  }
}