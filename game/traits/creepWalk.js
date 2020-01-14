import { Trait, Sides } from '../entity.js'

export default class CreepWalk extends Trait {
  constructor() {
    super('creepWalk');
    this.speed = -30;
  }

  obstruct(entity, side) {
    if (side === Sides.LEFT || side === Sides.RIGHT) {
      this.speed = -this.speed;
    }
  }

  update(entity, deltaTime) {
    entity.vel.x = this.speed;
  }
}