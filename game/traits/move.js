import { Trait } from '../entity.js'

export default class Move extends Trait {
  constructor() {
    super('move')

    this.dir = 0
    this.accel = 400
    this.decel = 300
    this.forceDrag = 1/5000

    this.head = 1
    this.distance = 0
  }

  update(entity, deltaTime) {
    const absVelX = Math.abs(entity.vel.x)
    if (this.dir !== 0) {
      entity.vel.x += this.accel * this.dir * deltaTime
      this.head = this.dir
    } else if (entity.vel.x !== 0) {
      const deceleration = Math.min(absVelX, this.decel * deltaTime)
      entity.vel.x += entity.vel.x > 0 ? -deceleration : deceleration
    } else {
      this.distance = 0
    }
    
    const drag = this.forceDrag * entity.vel.x * absVelX
    entity.vel.x -= drag
    this.distance += absVelX * deltaTime
  }
}