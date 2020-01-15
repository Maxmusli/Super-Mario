import Compositor from "./compositor.js";
import TileCollider from './tile_collider.js';
import EntityCollider from './entity_collider.js';

export default class Level {
  constructor() {
    this.gravity = 1700
    this.totalTime = 0

    this.comp = new Compositor()
    this.entities = new Set()

    this.entityCollider = new EntityCollider(this.entities)
    this.tileCollider = null
  }

  setCollisionGrid(matrix) {
    this.tileCollider = new TileCollider(matrix)
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);
      
      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);

      this.entityCollider.check(entity);
      
      entity.vel.y += this.gravity * deltaTime;
    })

    this.totalTime += deltaTime
  }
}