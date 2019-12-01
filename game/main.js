import * as loaders from './loaders.js'
import * as spritesLoader from './sprite_loader.js'

const drawBackground = (background, context, sprites) => {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTiles(background.tile, context, x, y);
      }
    }
  })
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  spritesLoader.loadMarioSprite(),
  spritesLoader.loadBackgroundSprites(),
  loaders.loadLevel('1-1'),
])
  .then(([marioSprite, sprites, level]) => {
    level.background.forEach(background => {
      drawBackground(background, context, sprites)
    })
    
    marioSprite.draw('idle', context, 64, 64)
  })

