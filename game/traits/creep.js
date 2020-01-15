import { Trait, Sides } from '../entity.js'

export default class Creep extends Trait {
  constructor() {
    super('creep');
    this.dead = false;
  }

  kill() {
    this.dead = true;
  }
}