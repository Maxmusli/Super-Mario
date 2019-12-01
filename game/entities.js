import Entity from './entity.js'
import * as spritesLoader from './sprite_loader.js'

export const createMario = () => {
  return spritesLoader.loadMarioSprite() 
    .then(sprite => {
      const mario = new Entity()

    
      mario.draw = function drawMario(context) {
        sprite.draw('idle', context, this.pos.x, this.pos.y)
    
      }
    
      mario.update = function updateMario(deltaTime) {
        this.pos.x += this.vel.x * deltaTime
        this.pos.y += this.vel.y * deltaTime
      }
    
      return mario
    })
}