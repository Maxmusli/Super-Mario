import * as loaders from './loaders.js'
import Timer from './timer.js'
import { createMario } from './entities.js'
import { setupKeyboard } from './input.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario(),
  loaders.loadLevel('1-1'),
])
  .then(([mario, level]) => {
    mario.pos.set(64, 64)

    level.entities.add(mario)

    const input = setupKeyboard(mario)
    input.listenTo(window)

    const timer = new Timer(1/60)
    timer.update = function update(deltaTime) {
      level.update(deltaTime)
      level.comp.draw(context)
    }

    timer.start()    
  })
