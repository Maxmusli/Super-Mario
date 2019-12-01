export const loadImage = (url) => {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    })
    image.src = url;
  })
}

export const loadLevel = (name) => {
  return fetch(`levels/${name}.json`)
    .then(r => r.json());
}