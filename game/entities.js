import Entity from './entity.js'
import Jump from './traits/jump.js'
import Move from './traits/move.js'
import { loadSpriteSheet } from './loaders.js'
import { createAnimation } from './animation.js'

export const createMario = () => {
  return loadSpriteSheet('mario') 
    .then(sprite => {
      const mario = new Entity()
      mario.size.set(14, 16)

      mario.addTrait(new Move())
      mario.addTrait(new Jump())

      const runAnimation = createAnimation(['run-1', 'run-2', 'run-3'], 10)
      const routeFrame = (mario) => {
        if (mario.move.distance > 0) {
          return runAnimation(mario.move.distance)
        }

        return 'idle'
      }

      mario.draw = function drawMario(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.move.head < 0)
    
      }
    
      return mario
    })
}