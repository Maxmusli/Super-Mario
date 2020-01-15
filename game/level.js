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
      entity.update(deltaTime, this);

    })
    
    this.entities.forEach(entity => {
      this.entityCollider.check(entity);
    })
    
    this.entities.forEach(entity => {
      entity.finalize();
    })

    this.totalTime += deltaTime
  }
}