import SpriteSheet from './sprite_sheet.js'
import { createAnimation } from './animation.js'


export const loadImage = (url) => {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    })
    image.src = url;
  })
}

export const loadJSON = (url) => {
  return fetch(url)
    .then(r => r.json())

}

export const loadSpriteSheet = (name) => {
  return loadJSON(`/elements/${name}.json`)
    .then(sheetSpec => Promise.all([
      sheetSpec,
      loadImage(sheetSpec.imageURL),
    ]))
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheet(
        image, 
        sheetSpec.tileWidth, 
        sheetSpec.tileHeight
      );

      if (sheetSpec.tiles) {
        sheetSpec.tiles.forEach(tileSpec => {
          sprites.defineTile(
            tileSpec.name, 
            tileSpec.index[0], 
            tileSpec.index[1]
          )
        })
      }

      if (sheetSpec.frames) {
        sheetSpec.frames.forEach(frameSpec => {
          sprites.define(frameSpec.name, ...frameSpec.rect)
        })
      }
      if (sheetSpec.animations) {
        sheetSpec.animations.forEach(animationSpec => {
          const anim = createAnimation(animationSpec.frames, animationSpec.frameLength)
          sprites.defineAnimation(animationSpec.name, anim)
        })
      }
      console.log(sprites)
      return sprites
    })
}