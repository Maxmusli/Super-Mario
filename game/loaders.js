import Level from './level.js'
import * as layers from './layers.js'
import * as spritesLoader from './sprite_loader.js'


export const loadImage = (url) => {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    })
    image.src = url;
  })
}

export const loadLevel = (name) => {
  return Promise.all([
    fetch(`levels/${name}.json`)
      .then(r => r.json()),
    spritesLoader.loadBackgroundSprites(),

  ])
    .then(([levelSpec, backgroundSprites]) => {
      const level = new Level()

      const backgroundLayer = layers.createBackgroundLayer(levelSpec.backgrounds, backgroundSprites)
      level.comp.layers.push(backgroundLayer)

      const spriteLayer = layers.createSpriteLayer(level.entities)
      level.comp.layers.push(spriteLayer)

      return level
    })
}