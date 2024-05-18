const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const numPotion = 5;
const numHealth = 5;
const numPower = 5; // Más adelante.
const numEnemies = 15; // Más adelante.
const numFinalBoss = 1; 

let config = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let worldWidth, worldHeight, joystickSize = 30, scale = 1.75, speed = 135;
let belowLayer, worldLayer, aboveLayer, objetLayer, tileset, tileset2, emptyTiles;
let map, player, cursors, bell, bell2, dead, timeout;
let joyStick = joyStick2 = { up: false, down: false, left: false, right: false };
let score = 0, lives = 5, scoreText = null, gameOver = false;