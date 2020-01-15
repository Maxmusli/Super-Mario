import { Trait, Sides } from '../entity.js'

export default class Solid extends Trait {
  constructor() {
    super('solid')
   
    this.obstructs = true;
  }

  obstruct(entity, side, match) {
    if (!this.obstructs) return;
    
    if (side === Sides.BOTTOM) {
      entity.pos.y = match.y1 - entity.size.y
      entity.vel.y = 0
    } else if (side === Sides.RIGHT) {
      entity.pos.x = match.x1 - entity.size.x
      entity.vel.x = 0
    } else if (side === Sides.LEFT) {
      entity.pos.x = match.x2
      entity.vel.x = 0
    } else if (side === Sides.TOP) {
      entity.pos.y = match.y2
      entity.vel.y = 0
    }
  }

 
}