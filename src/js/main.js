import {loadLevel} from './helpers.js';
import {loadBackGroundSprites, loadMarioSprites} from './sprites.js';

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([xStart,xEnd,yStart,yEnd]) => {
        for (let x = xStart; x < xEnd; x++) 
            for (let y = yStart; y < yEnd; y++) 
                sprites.draw(background.tile, context, x*16, y*16);
    });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

class Compositor {
    constructor() {
        this.layers = []
    }

    draw(context) {
        this.layers.forEach(layer => {
           layer(context); 
        });
    }
}

function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites);
    })

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}

Promise.all([
    loadBackGroundSprites(),
    loadMarioSprites(),
    loadLevel('1-1'),
])
.then(([sprites, marioSprite, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
    comp.layers.push((backgroundLayer));

    const pos = {
        x: 64,
        y: 64,
    }

    function update() {
        comp.draw(context);
        marioSprite.draw('idle', context, pos.x, pos.y);
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(update);
    }
    update();
});

