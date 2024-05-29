const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const numPotion = 3;
const numHealth = 3;
const numPower = 2; // Más adelante.
const numEnemies = 10; // Más adelante.
const numPoison = 3;

let config = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
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
let belowLayer, worldLayer, aboveLayer, objectLayer, tileset, tileset2, emptyTiles;
let map, player, cursors, audioRed, audioGreen, audioViolet, audioDamage, dead, timeout;
let joyStick = joyStick2 = { up: false, down: false, left: false, right: false };
let potionIcon = null, heartIcon = null, score = 0, lives = 3, scoreText = null, gameOver = false;