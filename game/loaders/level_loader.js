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

      for (const {tile, x, y} of expandTiles(levelSpec.tiles, levelSpec.patterns)) {
        level.tiles.set(x, y, {
          name: tile.name,
          type: tile.type,
        })
      }

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

const expandRange = (range) => {
  if (range.length === 4) {
    const [xStart, xLength, yStart, yLength] = range
    return expandSpan(xStart, xLength, yStart, yLength)
  } else if (range.length === 3) {
    const [xStart, xLength, yStart] = range
    return expandSpan(xStart, xLength, yStart, 1)
  } else if (range.length === 2) {
    const [xStart, yStart] = range
    return expandSpan(xStart, 1, yStart, 1)
  }
}

function* expandRanges(ranges) {
  for (const range of ranges) {
    for (const item of expandRange(range)) {
      yield item
    }
  }
}

export const expandTiles = (tiles, patterns) => {
  const expandedTiles = []
  const walkTiles = (tiles, offsetX, offsetY) => {
    tiles.forEach(tile => {
      for (const { x, y } of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX
        const derivedY = y + offsetY
        if (tile.pattern) {
          const tiles = patterns[tile.pattern].tiles
          walkTiles(tiles, derivedX, derivedY)
        } else {
          expandedTiles.push({
            tile,
            x: derivedX,
            y: derivedY
          })
        }
      }
    })
  }

  walkTiles(tiles, 0, 0)
  return expandedTiles
}