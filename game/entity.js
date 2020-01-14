import * as math from './math.js'

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right')
}

export class Trait {
  constructor(name) {
    this.NAME = name
  }

  obstruct() {

  }

  update() {
    console.warn('unhandled update call in Trait')
  }
}

export default class Entity {
  constructor() {
    this.pos = new math.Vec2(0, 0);
    this.vel = new math.Vec2(0, 0);
    this.size = new math.Vec2(0, 0);
    this.lifeTime = 0;

    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  obstruct(side) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side);
    })
  }

  update(deltaTime) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime);
    });

    this.lifeTime += deltaTime;
  }
}