import * as math from './math.js'

export class Trait {
  constructor(name) {
    this.NAME = name
  }

  update() {
    console.warn('unhandled update call in Trait')
  }
}

export default class Entity {
  constructor() {
    this.pos = new math.Vec2(0, 0)
    this.vel = new math.Vec2(0, 0)

    this.traits = []
  }

  addTrait(trait) {
    this.traits.push(trait)
    this[trait.NAME] = trait

    
  }

  update(deltaTime) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime)
    })
  }
}