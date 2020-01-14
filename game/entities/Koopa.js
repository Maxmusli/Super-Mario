import Entity, { Sides } from '../entity.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadKoopa() {
  return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

function createKoopaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function drawKoopa(context) {
    sprite.draw(walkAnim(this.lifeTime), context, 0, 0);
  }

  return function createKoopa() {
    const koopa = new Entity();
    koopa.size.set(16, 16);

    koopa.addTrait({
      NAME: 'walk',
      speed: -30,
      obstruct(koopa, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
          this.speed = -this.speed;
        }
      },
      update(koopa) {
        koopa.vel.x = this.speed;
      }
    })

    koopa.draw = drawkoopa;
    return koopa;
  }
}