function createWorld() {
    map = this.make.tilemap({ key: "map" });

    scale *= Math.max(screenWidth / map.widthInPixels, screenHeight / map.heightInPixels);

    worldWidth = map.widthInPixels * scale;
    worldHeight = map.heightInPixels * scale;
    speed *= scale;
    joystickSize *= scale;

    // Crear los tilesets
    let tileset1 = map.addTilesetImage("mainlevbuild", "tiles1");
    let tileset2 = map.addTilesetImage("decorative", "tiles2");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    belowLayer = map.createLayer("Bloque", [tileset1, tileset2], 0, 0).setScale(scale).setDepth(2);
    objetLayer = map.createLayer("Decoracion", [tileset1, tileset2], 0, 0).setScale(scale).setDepth(2);
    worldLayer = map.createLayer("Suelo", [tileset1, tileset2], 0, 0).setScale(scale).setDepth(1);
    aboveLayer = map.createLayer("Techo", [tileset1, tileset2], 0, 0).setScale(scale).setDepth(3);

    belowLayer.setCollisionByExclusion([-1]);
    objetLayer.setCollisionByExclusion([-1]);

    emptyTiles = belowLayer.filterTiles(tile => tile.index === -1);
}

function createAnims() {
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers('player_waiting', { start: 0, end: 4 }), // Animación de espera
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "flying",
        frames: this.anims.generateFrameNumbers('potion', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
}

function createPlayer() {
    // spawnPont
    const spawnPoint = map.findObject("Objetos", obj => obj.name === "Player");
    player = this.physics.add
        .sprite(spawnPoint.x * scale, spawnPoint.y * scale, "player")
        .setSize(6, 16).setOffset(4, 2).setScale(scale)
        .setCollideWorldBounds(true).setDepth(2);

    // Watch the player and worldLayer for collisions, for the duration of the scene
    this.physics.add.collider(player, belowLayer);
    this.physics.add.collider(player, objetLayer);

    const camera = this.cameras.main;
    const world = this.physics.world;
    camera.startFollow(player);
    camera.setBounds(0, 0, worldWidth, worldHeight);
    world.setBounds(0, 0, worldWidth, worldHeight);

    cursors = this.input.keyboard.createCursorKeys();

    // Do not show the joysticks on desktop devices
    if (!this.sys.game.device.os.desktop) {
        joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: screenWidth - joystickSize * 2,
            y: screenHeight - joystickSize * 2,
            radius: joystickSize,
            base: this.add.circle(0, 0, joystickSize, 0x888888).setAlpha(0.5).setDepth(4),
            thumb: this.add.circle(0, 0, joystickSize, 0xcccccc).setAlpha(0.5).setDepth(4)
        }).on('update', update, this);

        joyStick2 = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: joystickSize * 2,
            y: screenHeight - joystickSize * 2,
            radius: joystickSize,
            base: this.add.circle(0, 0, joystickSize, 0x888888).setAlpha(0.5).setDepth(4),
            thumb: this.add.circle(0, 0, joystickSize, 0xcccccc).setAlpha(0.5).setDepth(4)
        }).on('update', update, this);
    }
}

function showScore() {
    // Initialize the potion image variable with a default value
    let potionImage = "potionScoreEmpty";

    // Determine the correct potion image based on the score value
    if (score >= 5 && score < 10) potionImage = "potionScoreHalf";
    else if (score >= 10) potionImage = "potionScore";

    // Destroy the existing potion icon if it exists
    if (potionIcon) potionIcon.destroy();

    // Add a new potion icon to the game at specified coordinates and set its properties
    potionIcon = this.add.image(0, 5, potionImage)
        .setScale(scale)  // Set the scale of the image
        .setOrigin(0.5, 0)  // Set the origin point of the image to the middle of its width and the top of its height
        .setScrollFactor(0)  // Fix the image in place relative to the camera
        .setDepth(4);  // Set the depth (layer) of the image

    // Add a heart icon to the game at specified coordinates and set its properties
    heartIcon = this.add.image(0, 5, "heart")
        .setScale(scale)  // Set the scale of the image
        .setOrigin(0.5, 0)  // Set the origin point of the image to the middle of its width and the top of its height
        .setScrollFactor(0)  // Fix the image in place relative to the camera
        .setDepth(4);  // Set the depth (layer) of the image

    // Position the potion and heart icons horizontally at the center minus half its width
    potionIcon.x = screenWidth / 2 - (potionIcon.width * scale);
    heartIcon.x = screenWidth / 2 + (heartIcon.width * scale);

    // If the score text does not exist, create a new text object to display the score and set its properties
    if (!scoreText) {
        scoreText = this.add.text(screenWidth / 2, (potionIcon.height / 2) * scale + 5, '',
                                  { fontSize: (5 * scale) + 'px', fill: '#FFF' });
        
        scoreText.setShadow(3, 3, 'rgba(0,0,0,1)', 3)  // Add shadow to the text
            .setOrigin(0.5, 0.5)  // Set the origin point of the text to the center of the text
            .setScrollFactor(0)  // Fix the text in place relative to the camera
            .setDepth(4);  // Set the depth (layer) of the text
    }

    // Update the score text with the current score and lives
    scoreText.setText(score + ' - ' + lives);
}

function newObject(type, animation, context) {
    let tile = Phaser.Utils.Array.GetRandom(emptyTiles);
    return context.physics.add.sprite(tile.pixelX * scale, tile.pixelY * scale, type).anims.play(animation, true).setDepth(2);
}

function createPotion() {
    //const v = Phaser.Math.Between(speed / 10, speed / 5);
    let potion = newObject('potion', 'flying', this).setSize(16, 16).setScale(0.75 * scale).setBounce(1); //.setVelocity(v, 0);
    potion.body.setAllowGravity(false).setCollideWorldBounds(true);
    this.physics.add.collider(potion, objetLayer, belowLayer);
    this.physics.add.overlap(player, potion, collectPotion, null, this);
}

function collectPotion(player, potion) {
    potion.destroy();
    createPotion.call(this);

    score += 1;
    showScore.call(this);
}

function create() {
    createWorld.call(this);
    createAnims.call(this);
    createPlayer.call(this);
    showScore.call(this);

    for (i = 0; i < numPotion; i++) setTimeout(() => createPotion.call(this), Phaser.Math.Between(0, 5000));
}