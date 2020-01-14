import Entity from '../entity.js'
import Jump from '../traits/jump.js'
import Move from '../traits/move.js'
import { loadSpriteSheet } from '../loaders.js'
import { createAnimation } from '../animation.js'

const FAST = 1 / 5000
const SLOW = 1 / 1000

export const loadMario = () => {
  return loadSpriteSheet('mario')
    .then(createMarioFactory)
}

function createMarioFactory(sprite) {
  const runAnimation = sprite.animations.get('run');
  const routeFrame = (mario) => {
    if (!mario.jump.readyToJump) {
      return 'jump'
    }
  
    if (mario.move.distance > 0) {
      if ((mario.vel.x > 0 && mario.move.dir < 0) || (mario.vel.x < 0 && mario.move.dir > 0)) {
        return 'break'
      }
      return runAnimation(mario.move.distance)
    }
  
    return 'idle'
  }

  function setSprintState(sprintOn) {
    this.move.forceDrag = sprintOn ? FAST : SLOW
  }
  
  function drawMario(context) {
    sprite.draw(routeFrame(this), context, 0, 0, this.move.head < 0)
  
  }

  return function createMario() {
    const mario = new Entity()
    mario.size.set(14, 16)

    mario.addTrait(new Move())
    mario.addTrait(new Jump())

    mario.sprint = setSprintState;

    mario.draw = drawMario;

    mario.sprint(false)

    return mario
  }
}