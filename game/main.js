import SpriteSheet from './sprite_sheet.js'
import * as loaders from './loaders.js'

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

loaders.loadImage('/images/tileset.png')
  .then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23)

    loaders.loadLevel('1-1')
      .then(level => {
        level.background.forEach(background => {
          drawBackground(background, context, sprites)
        })
      })
  })