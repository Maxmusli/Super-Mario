import Timer from './timer.js';
import Camera from './camera.js';
import { setupKeyboard } from './input.js';
import { createCollisionLayer, createCameraLayer } from './layers.js';
import { setupMouseControl } from './debug.js';
import { loadLevel } from './loaders/level_loader.js';
import { loadEntities } from './entities.js'


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  loadEntities(),
  loadLevel('1-1'),
])
  .then(([[createMario, createGoomba, createKoopa], level]) => {
    const camera = new Camera();
    window.camera = camera;

    const mario = createMario();
    mario.pos.set(64, 64);

    const goomba = createGoomba();
    goomba.pos.x = 220;

    const koopa = createKoopa();
    koopa.pos.x = 250;

    level.entities.add(mario);
    level.entities.add(goomba);
    level.entities.add(koopa);

    // level.comp.layers.push(createCollisionLayer());

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
