import Level from '../level.js'
import * as layers from '../layers.js'
import { loadJSON, loadSpriteSheet } from '../loaders.js'
 
export const loadLevel = (name) => {
  return loadJSON(`/levels/${name}.json`)
    .then(levelSpec => Promise.all([
      levelSpec,
      loadSpriteSheet(levelSpec.spriteSheet),
    ]))
    .then(([levelSpec, backgroundSprites]) => {
      const level = new Level()

      createTiles(level, levelSpec.tiles, levelSpec.patterns)

      const backgroundLayer = layers.createBackgroundLayer(level, backgroundSprites)
      level.comp.layers.push(backgroundLayer)

      const spriteLayer = layers.createSpriteLayer(level.entities)
      level.comp.layers.push(spriteLayer)

      return level
    })
}

const expandSpan = (xStart, xLength, yStart, yLength) => {
  let coord = []
  const xEnd = xStart + xLength
  const yEnd = yStart + yLength
  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      coord.push({x, y})
    }
  }

  return coord
}

export const createTiles = (level, tiles, patterns, offsetX = 0, offsetY = 0) => {

  const applyRange = (tile, xStart, xLength, yStart, yLength) => {
    for (const {x, y} of expandSpan(xStart, xLength, yStart, yLength)) {
        const derivedX = x + offsetX
        const derivedY = y + offsetY
        if (tile.pattern) {
          console.log('pattern detected', patterns[tile.pattern])
          const tiles = patterns[tile.pattern].tiles
          createTiles(level, tiles, patterns, derivedX, derivedY)
        } else {

          level.tiles.set(derivedX, derivedY, {
            name: tile.name,
            type: tile.type,
          })
        }
    }
  }

  tiles.forEach(tile => {
    tile.ranges.forEach(range => {
      if (range.length === 4) {
        const [xStart, xLength, yStart, yLength] = range
        applyRange(tile, xStart, xLength, yStart, yLength)
      } else if (range.length === 3) {
        const [xStart, xLength, yStart] = range
        applyRange(tile, xStart, xLength, yStart, 1)
      } else if (range.length === 2) {
        const [xStart, yStart] = range
        applyRange(tile, xStart, 1, yStart, 1)
      }
    })
  })
}