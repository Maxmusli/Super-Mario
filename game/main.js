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
    
        const goomba1 = createGoomba();
        goomba1.pos.x = 580;

        const goomba2 = createGoomba();
        goomba2.pos.x = 600;

        const goomba3 = createGoomba();
        goomba3.pos.x = 700;

        const goomba4 = createGoomba();
        goomba4.pos.x = 900;

        const goomba5 = createGoomba();
        goomba5.pos.x = 1500;

        const goomba6 = createGoomba();
        goomba6.pos.x = 1550;

        const goomba7 = createGoomba();
        goomba7.pos.x = 1800;

        const goomba8 = createGoomba();
        goomba8.pos.x = 2300;

        const goomba9 = createGoomba();
        goomba9.pos.x = 2330;

        const goomba10 = createGoomba();
        goomba10.pos.x = 3000;

        const goomba11 = createGoomba();
        goomba11.pos.x = 3300;

        const goomba12 = createGoomba();
        goomba12.pos.x = 4000;

        const goomba13 = createGoomba();
        goomba13.pos.x = 4030;

        const goomba14 = createGoomba();
        goomba14.pos.x = 4060;
    
        const koopa1 = createKoopa();
        koopa1.pos.x = 850;
    
        const koopa2 = createKoopa();
        koopa2.pos.x = 1050;
    
        const koopa3 = createKoopa();
        koopa3.pos.x = 1240;
    
        const koopa4 = createKoopa();
        koopa4.pos.x = 1530;
    
        const koopa5 = createKoopa();
        koopa5.pos.x = 1700;
    
        const koopa6 = createKoopa();
        koopa6.pos.x = 1770;
    
        const koopa7 = createKoopa();
        koopa7.pos.x = 2350;
    
        const koopa8 = createKoopa();
        koopa8.pos.x = 3100;
    
        const koopa9 = createKoopa();
        koopa9.pos.x = 3500;
    
        const koopa10 = createKoopa();
        koopa10.pos.x = 4500;
    
        const koopa11 = createKoopa();
        koopa11.pos.x = 5300;
    
        level.entities.add(goomba1);
        level.entities.add(goomba2);
        level.entities.add(goomba3);
        level.entities.add(goomba4);
        level.entities.add(goomba5);
        level.entities.add(goomba6);
        level.entities.add(goomba7);
        level.entities.add(goomba8);
        level.entities.add(goomba9);
        level.entities.add(goomba10);
        level.entities.add(goomba11);
        level.entities.add(goomba12);
        level.entities.add(goomba13);
        level.entities.add(goomba14);
        level.entities.add(koopa1);
        level.entities.add(koopa2);
        level.entities.add(koopa3);
        level.entities.add(koopa4);
        level.entities.add(koopa5);
        level.entities.add(koopa6);
        level.entities.add(koopa7);
        level.entities.add(koopa8);
        level.entities.add(koopa9);
        level.entities.add(koopa10);
        level.entities.add(koopa11);
    
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

