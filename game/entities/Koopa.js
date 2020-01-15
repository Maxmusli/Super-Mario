import Entity, { Sides, Trait } from '../entity.js';
import CreepWalk from '../traits/creepWalk.js';
import Creep from '../traits/creep.js';
import Solid from '../traits/solid.js';
import Physics from '../traits/physics.js'
import { loadSpriteSheet } from '../loaders.js';

export function loadKoopa() {
  return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');

class Behavior extends Trait {
  constructor() {
    super('behavior')
    this.state = STATE_WALKING;
    this.hideTime = 0;
    this.hideDuration = 5;

    this.walkSpeed = null;
    this.panicSpeed = 300;
  }

  collides(us, them) {
    if (us.creep.dead) return;

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        this.handleStomp(us, them);
      } else {
        this.handleSlide(us, them);
      }
    }
  }

  handleStomp(us, them) {
    if (this.state === STATE_WALKING) {
      this.hide(us);
    } else if (this.state === STATE_HIDING) {
      us.creep.kill();
      us.vel.set(100, -200);
      us.solid.obstructs = false;
    } else if (this.state === STATE_PANIC) {
      this.hide(us);
    }
  }

  handleSlide(us, them) {
    if (this.state === STATE_WALKING) {
      them.creep.kill();
    } else if (this.state === STATE_HIDING) {
      this.panic(us, them);
    } else if (this.state === STATE_PANIC) {
      const travelDir = Math.sign(us.vel.x);
      const impactDir = Math.sign(us.pos.x - them.pos.x);
      if (travelDir !== 0 && travelDir !== impactDir) {
        them.creep.kill();
      }
    }
  }

  hide(us) {
    us.vel.x = 0;
    us.creepWalk.enabled = false;
    if (this.walkSpeed === null) {
      this.walkSpeed = us.creepWalk.speed;
    }

    this.hideTime = 0;
    this.state = STATE_HIDING;
  }

  unhide(us) {
    us.creepWalk.enabled = true;
    us.creepWalk.speed = this.walkSpeed;
    this.state = STATE_WALKING;
  }

  panic(us, them) {
    us.creepWalk.enabled = true;
    us.creepWalk.speed = this.panicSpeed * Math.sign(them.vel.x);
    this.state = STATE_PANIC;
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
  const wakeAnim = sprite.animations.get('wake');

  function routeAnim(koopa) {
    if (koopa.behavior.state === STATE_HIDING) {
      if (koopa.behavior.hideTime > 3) {
        return wakeAnim(koopa.behavior.hideTime)
      }
      return 'hiding';
    }

    if (koopa.behavior.state === STATE_PANIC) {
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
    koopa.addTrait(new Solid());
    koopa.addTrait(new Physics());

    koopa.draw = drawKoopa;
    return koopa;
  }
}