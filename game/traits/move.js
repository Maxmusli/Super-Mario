import { Trait } from '../entity.js'

export default class Move extends Trait {
  constructor() {
    super('move')

    this.dir = 0
    this.speed = 6000
  }

  update(entity, deltaTime) {
    entity.vel.x = this.speed * this.dir * deltaTime
  }
}