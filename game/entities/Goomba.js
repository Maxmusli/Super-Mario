import Entity, {Sides} from '../entity.js';
import CreepWalk from '../traits/creepWalk.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadGoomba() {
  return loadSpriteSheet('goomba')
    .then(createGoombaFactory);
}

function createGoombaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function drawGoomba(context) {
    sprite.draw(walkAnim(this.lifeTime), context, 0, 0);
  }

  return function createGoomba() {
    const goomba = new Entity();
    goomba.size.set(16, 16);

    goomba.addTrait(
      new CreepWalk()
    )

    goomba.draw = drawGoomba;
    return goomba;
  }
}