import Keyboard from './keyboard_state.js'

export const setupKeyboard = (entity) => {
  
  const input = new Keyboard()
  
  input.addMapping('Space', keyState => {
    if (keyState) {
      entity.jump.start()
    } else {
      entity.jump.cancel()
    }
  })
  
  input.addMapping('ArrowRight', keyState => {
    entity.move.dir += keyState ? 1 : -1
  })
  
  input.addMapping('ArrowLeft', keyState => {
    entity.move.dir += keyState ? -1 : 1
  })

  return input
}
