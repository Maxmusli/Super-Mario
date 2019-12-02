import SpriteSheet from './sprite_sheet.js'
import * as loaders from './loaders.js'

export const loadMarioSprite = () => {
  return loaders.loadImage('/images/characters.gif')
    .then(image => {
      const sprites = new SpriteSheet(image, 16, 16);
      sprites.define('idle', 276, 106, 16, 16)
      return sprites
    })
}