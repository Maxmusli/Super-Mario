import { Trait, Sides } from '../entity.js'

export default class Jump extends Trait {
  constructor() {
    super('jump')
    this.duration = 0.5
    this.velocity = 200
    this.engageTime = 0
    this.readyToJump = false
    this.requestTime = 0
    this.gracePeriod = 0.1
  }

  start() {
    this.requestTime = this.gracePeriod
  }

  cancel() {
    this.engageTime = 0
    this.requestTime = 0
  }

  obstruct(entity, side) {
    if (side === Sides.BOTTOM) {
      this.readyToJump = true
    } else if (side === Sides.TOP) {
      this.cancel()
    }
  }

  update(entity, deltaTime) {
    if (this.requestTime > 0) {
      if (this.readyToJump) {
        this.engageTime = this.duration
        this.requestTime = 0
      }

      this.requestTime -= deltaTime
    }

    if (this.engageTime > 0) {
      entity.vel.y = -this.velocity
      this.engageTime -= deltaTime
    }

    this.readyToJump = false
  }
}