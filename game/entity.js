import * as math from './math.js';
import BoundingBox from './bounding_box.js';

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right')
}

export class Trait {
  constructor(name) {
    this.NAME = name;
    this.tasks = [];
  }

  finalize() {
    this.tasks.forEach(task => task());
    this.tasks.length = 0;
  }

  queue(task) {
    this.tasks.push(task);
  }

  collides(us, them) {
  }

  obstruct() {

  }

  update() {
  }
}

export default class Entity {
  constructor() {
    this.canCollide = true;

    this.pos = new math.Vec2(0, 0);
    this.vel = new math.Vec2(0, 0);
    this.size = new math.Vec2(0, 0);
    this.offset = new math.Vec2(0, 0);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    this.lifeTime = 0;

    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  collides(candidate) {
    this.traits.forEach(trait => {
      trait.collides(this, candidate);
    })
  }

  obstruct(side, match) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side, match);
    })
  }

  draw() {

  }

  finalize() {
    this.traits.forEach(trait => {
      trait.finalize();
    })
  }

  update(deltaTime, level) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime, level);
    });

    this.lifeTime += deltaTime;
  }
}