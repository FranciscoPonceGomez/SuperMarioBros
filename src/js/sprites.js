import {loadImage} from './helpers.js';
import SpriteSheet from './SpriteSheet.js'

export function loadBackGroundSprites() {
    return loadImage('/img/tiles.png').then(image => {
        const sprites = new SpriteSheet(image,16,16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        console.log('sprites loaded', sprites);
        return sprites;
    });
}

export function loadMarioSprites() {
    return loadImage('/img/characters.gif').then(image => {
        const sprites = new SpriteSheet(image,16,16);
        sprites.define('idle', 276, 44, 16, 16);
        return sprites;
    });
}