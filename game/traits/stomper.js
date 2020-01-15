import { Trait, Sides } from '../entity.js'

export default class Stomper extends Trait {
  constructor() {
    super('stomper');
    this.queueBounce = false;
    this.bounceSpeed = 400;
  }

  bounce() {
    this.queueBounce = true;

  }

  update(entity) {
    if (this.queueBounce) {
      entity.vel.y = -this.bounceSpeed;
      this.queueBounce = false;
    }
  }
}