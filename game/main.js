import Timer from './timer.js'
import Camera from './camera.js'
import { loadMario } from './entities/Mario.js'
import { setupKeyboard } from './input.js'
import { createCollisionLayer, createCameraLayer } from './layers.js'
import { setupMouseControl } from './debug.js'
import { loadLevel } from './loaders/level_loader.js' 

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  loadMario(),
  loadLevel('1-1'),
])
  .then(([createMario, level]) => {
    const camera = new Camera();
    window.camera = camera;

    const mario = createMario();
    mario.pos.set(64, 64);

    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window)

    setupMouseControl(canvas, mario, camera)

    
    const timer = new Timer(1/60)
    timer.update = function update(deltaTime) {
      level.update(deltaTime)
      level.comp.draw(context, camera)
      if (mario.pos.x > 100) camera.pos.x = mario.pos.x - 100
    }

    timer.start()    
  })
