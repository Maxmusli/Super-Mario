import Entity, { Sides, Trait } from '../entity.js';
import CreepWalk from '../traits/creepWalk.js';
import Creep from '../traits/creep.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadKoopa() {
  return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');

class Behavior extends Trait {
  constructor() {
    super('behavior')
    this.state = STATE_WALKING;
    this.hideTime = 0;
    this.hideDuration = 5;
  }

  collides(us, them) {
    if (us.creep.dead) return;

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        this.handleStomp(us, them);
      } else {
        them.creep.kill();
      }
    }
  }

  handleStomp(us, them) {
    if (this.state === STATE_WALKING) {
      this.hide(us);
    } else if (this.state === STATE_HIDING) {
      us.creep.kill();
      us.vel.set(100, -200);
    }
  }

  hide(us) {
    us.vel.x = 0;
    us.creepWalk.enabled = false;
    this.hideTime = 0;
    this.state = STATE_HIDING;
  }

  unhide(us) {
    us.creepWalk.enabled = true;
    this.state = STATE_WALKING;
  }

  update(us, deltaTime) {
    if (this.state === STATE_HIDING) {
      this.hideTime += deltaTime;
      if (this.hideTime > this.hideDuration) {
        this.unhide(us);
      }
    } 
  }
}

function createKoopaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function routeAnim(koopa) {
    if (koopa.behavior.state === STATE_HIDING) {
      return 'hiding';
    }
    return walkAnim(koopa.lifeTime);
  }

  function drawKoopa(context) {
    sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
  }

  return function createKoopa() {
    const koopa = new Entity();
    koopa.size.set(16, 24);
    // koopa.offset.y = -8;

    koopa.addTrait(new CreepWalk());
    koopa.addTrait(new Behavior());
    koopa.addTrait(new Creep());

    koopa.draw = drawKoopa;
    return koopa;
  }
}