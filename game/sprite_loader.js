import SpriteSheet from './sprite_sheet.js'
import * as loaders from './loaders.js'

export const loadBackgroundSprites = () => {
  return loaders.loadImage('/images/tileset.png')
    .then(image => {
      const sprites = new SpriteSheet(image, 16, 16);
      sprites.defineTile('ground', 0, 0)
      sprites.defineTile('sky', 3, 23)
      return sprites
    })
}

export const loadMarioSprite = () => {
  return loaders.loadImage('/images/characters.gif')
    .then(image => {
      const sprites = new SpriteSheet(image, 16, 16);
      sprites.define('idle', 276, 106, 16, 16)
      return sprites
    })
}