import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './helpers.js';

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([xStart,xEnd,yStart,yEnd]) => {
        for (let x = xStart; x < xEnd; x++) 
            for (let y = yStart; y < yEnd; y++) 
                sprites.draw(background.tile, context, x*16, y*16);
    });
}

function loadBGSprites() {
    return loadImage('/img/tiles.png').then(image => {
        const sprites = new SpriteSheet(image,16,16);
        sprites.define('ground', 0, 0);
        sprites.define('sky', 3, 23);
        console.log('sprites loaded', sprites);
        return sprites;
    });
}

function loadMarioSprites() {
    return loadImage('/img/characters.gif').then(image => {
        const sprites = new SpriteSheet(image,16,16);
        sprites.define('idle', 17, 3);
        return sprites;
    });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadBGSprites(),
    loadMarioSprites(),
    loadLevel('1-1'),
])
.then(([sprites, marioSprite, level]) => {
    console.log('level loaded', level);
    level.backgrounds.forEach(background => {
        drawBackground(background, context, sprites);
    })
    marioSprite.draw('idle', context, 64, 64);
});

