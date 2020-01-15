import { Trait, Sides } from '../entity.js'

export default class Stomper extends Trait {
  constructor() {
    super('stomper');
    this.queueBounce = false;
    this.bounceSpeed = 400;
  }

  bounce(us, them) {
    us.bounds.bottom = them.bounds.top;
    us.vel.y = -this.bounceSpeed;
  }

  collides(us, them) {
    if (them.creep && us.vel.y > them.vel.y) {
      this.bounce(us, them);
    }
  }
}