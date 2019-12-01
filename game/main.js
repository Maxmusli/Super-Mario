import * as loaders from './loaders.js'
import * as spritesLoader from './sprite_loader.js'
import Compositor from './compositor.js'
import * as layers from './layers.js'
import { createMario } from './entities.js'
import Timer from './timer.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario(),
  spritesLoader.loadBackgroundSprites(),
  loaders.loadLevel('1-1'),
])
  .then(([mario, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = layers.createBackgroundLayer(level.backgrounds, backgroundSprites)
    comp.layers.push(backgroundLayer)

    const gravity = 30
    mario.pos.set(64, 180)
    mario.vel.set(200, -600)

    const spriteLayer = layers.createSpriteLayer(mario)
    comp.layers.push(spriteLayer)

    const timer = new Timer(1/60)
    timer.update = function update(deltaTime) {
        comp.draw(context)
        mario.update(deltaTime)
        mario.vel.y += gravity
    }

    timer.start()    
  })

