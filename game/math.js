const matrix = new Matrix();

matrix.set(5, 4, {name: 'ground'})

const tile = matrix.get(mario.pos.x * TILE_SIZE, mario.pos.y * TILE_SIZE)
if (tile === 'ground') {
  moveMario()
}

export class Matrix {

}

export class Vec2 {
  constructor(x, y) {
    this.set(x, y)
  }

  set(x, y) {
    this.x = x
    this.y = y
  }
}