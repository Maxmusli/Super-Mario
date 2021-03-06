import Entity, {Sides, Trait} from '../entity.js';
import CreepWalk from '../traits/creepWalk.js';
import Creep from '../traits/creep.js';
import Solid from '../traits/solid.js';
import Physics from '../traits/physics.js'
import { loadSpriteSheet } from '../loaders.js';

export function loadGoomba() {
  return loadSpriteSheet('goomba')
    .then(createGoombaFactory);
}

class Behavior extends Trait {
  constructor() {
    super('behavior')

  }

  collides(us, them) {
    if (us.creep.dead) return;

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        us.creep.kill();
        us.creepWalk.speed = 0;
      } else {
        them.creep.kill();
      }
    }
  }
}

function createGoombaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function routeAnim(goomba) {
    if (goomba.creep.dead) {
      return 'flat';
    }
    return walkAnim(goomba.lifeTime);
  }

  function drawGoomba(context) {
    sprite.draw(routeAnim(this), context, 0, 0);
  }

  return function createGoomba() {
    const goomba = new Entity();
    goomba.size.set(16, 16);

    goomba.addTrait(new CreepWalk())
    goomba.addTrait(new Behavior())
    goomba.addTrait(new Creep())
    goomba.addTrait(new Solid())
    goomba.addTrait(new Physics())

    goomba.draw = drawGoomba;
    return goomba;
  }
}