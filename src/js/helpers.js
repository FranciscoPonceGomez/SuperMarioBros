export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);   
        });
        image.src = url;
    });
}

export function loadLevel(level) {
    return fetch(`/levels/${level}.json`).then(x => x.json());
}
