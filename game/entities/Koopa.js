import Entity, { Sides } from '../entity.js';
import CreepWalk from '../traits/creepWalk.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadKoopa() {
  return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

function createKoopaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function drawKoopa(context) {
    sprite.draw(walkAnim(this.lifeTime), context, 0, 0, this.vel.x < 0);
  }

  return function createKoopa() {
    const koopa = new Entity();
    koopa.size.set(16, 24);
    // koopa.offset.y = -8;

    koopa.addTrait(new CreepWalk());

    koopa.draw = drawKoopa;
    return koopa;
  }
}