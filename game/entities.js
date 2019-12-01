import Entity from './entity.js'
import * as spritesLoader from './sprite_loader.js'
import Velocity from './traits/velocity.js'
import Jump from './traits/jump.js'



export const createMario = () => {
  return spritesLoader.loadMarioSprite() 
    .then(sprite => {
      const mario = new Entity()

      mario.addTrait(new Velocity())
      mario.addTrait(new Jump())

      mario.draw = function drawMario(context) {
        sprite.draw('idle', context, this.pos.x, this.pos.y)
    
      }
    
      
    
      return mario
    })
}