import * as loaders from './loaders.js'
import * as spritesLoader from './sprite_loader.js'
import Compositor from './compositor.js'
import * as layers from './layers.js'
import { createMario } from './entities.js'
import Timer from './timer.js'
import Keyboard from './keyboard_state.js'



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

    const gravity = 2000
    mario.pos.set(64, 180)

    const SPACE = 32
    const input = new Keyboard()
    input.addMapping(SPACE, keyState => {
      if (keyState) {
        mario.jump.start()
      } else {
        mario.jump.cancel()
      }
      console.log(keyState)
    })
    input.listenTo(window)

    const spriteLayer = layers.createSpriteLayer(mario)
    comp.layers.push(spriteLayer)

    const timer = new Timer(1/60)
    timer.update = function update(deltaTime) {
      mario.update(deltaTime)
      comp.draw(context)
      mario.vel.y += gravity * deltaTime
    }

    timer.start()    
  })

