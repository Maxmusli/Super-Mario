import Timer from './timer.js';
import Camera from './camera.js';
import { setupKeyboard } from './input.js';
import { loadLevel } from './loaders/level_loader.js';
import { loadEntities } from './entities.js';

import Entity from './entity.js';
import PlayerController from './traits/player_controller.js';

export default class GameMain {
  start() {
    function createPlayerEnv(playerEntity) {
      const playerEnv = new Entity();
      const playerControl = new PlayerController();
      playerControl.checkpoint.set(64, 64);
      playerControl.setPlayer(playerEntity);
      playerEnv.addTrait(playerControl);
      return playerEnv;
    }
    
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
    
        const goomba = createGoomba();
        // goomba.pos.x = 220;
    
        const koopa = createKoopa();
        // koopa.pos.x = 250;
    
        level.entities.add(goomba);
        level.entities.add(koopa);
    
        const playerEnv = createPlayerEnv(mario);
        level.entities.add(playerEnv);
    
        const input = setupKeyboard(mario);
        input.listenTo(window)
        
        const timer = new Timer(1/60)
        timer.update = function update(deltaTime) {
          level.update(deltaTime)
          level.comp.draw(context, camera)
          camera.pos.x = Math.max(0, mario.pos.x - 100)
        }
    
        timer.start()    
      })
  }
  
}

