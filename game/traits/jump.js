import { Trait } from '../entity.js'

export default class Jump extends Trait {
  constructor() {
    super('jump')
    this.duration = 0.5
    this.velocity = 200
    this.engageTime = 0
    this.readyToJump = false
  }

  start() {
    if (this.readyToJump) {
      this.engageTime = this.duration
    }
  }

  cancel() {
    this.engageTime = 0
  }

  obstruct(entity, side) {
    if (side === 'bottom') {
      this.readyToJump = true
    }
  }

  update(entity, deltaTime) {
    // console.log('can jump?', this.readyToJump)
    if (this.engageTime > 0) {
      entity.vel.y = -this.velocity
      this.engageTime -= deltaTime
    }

    this.readyToJump = false
  }
}