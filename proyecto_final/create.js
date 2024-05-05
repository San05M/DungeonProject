function createWorld() {
    map = this.make.tilemap({ key: "map" });

    scale *= Math.max(screenWidth/map.widthInPixels, screenHeight/map.heightInPixels);

    worldWidth = map.widthInPixels * scale;
    worldHeight = map.heightInPixels * scale;
    speed *= scale;
    joystickSize *= scale;

    let tilesetNames = ["tileset", "tileset2"];

    // Array que contendrá las referencias a los tilesets
    let tilesets = [];
    
    // Cargar cada tileset y almacenarlo en el array 'tilesets'
    for (let i = 0; i < tilesetNames.length; i++) {
        tilesets.push(map.addTilesetImage(tilesetNames[i], tilesetNames[i]));
    }
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    belowLayer = map.createLayer("Below Player", tilesets, 0, 0).setScale(scale).setDepth(1);
    objetLayer = map.createLayer("Object Player", tilesets, 0, 0).setScale(scale).setDepth(1);
    worldLayer = map.createLayer("World", tilesets, 0, 0).setScale(scale).setDepth(2);
    aboveLayer = map.createLayer("Above Player", tilesets, 0, 0).setScale(scale).setDepth(3);


    worldLayer.setCollisionByProperty({ collides: true });

    // Find empty tiles where new zombies, coins or health can be created
    emptyTiles = worldLayer.filterTiles(tile => (tile.index === -1 || !tile.collides));
}

function createAnims(){
    this.anims.create({
        key: 'left',
        frames:
            this.anims.generateFrameNumbers('player-run', {
                start: 0, end: 8
            }),
            frameRate: 10,
            repetear: -1
    })
    this.anims.create({
        key: 'right',
        frames:
            this.anims.generateFrameNumbers('player-run', {
                start: 8, end: 15
            }),
            frameRate: 10,
            repetear: -1
    })
}

function createPlayer(){
        // spawnPont
        const spawnPoint = map.findObject("Objectos", obj => obj.name === "Player");
        player = this.physics.add
            .sprite(spawnPoint.x * scale, spawnPoint.y * scale, "player")
            .setSize(16, 24).setOffset(24, 32).setScale(scale)
            .setCollideWorldBounds(true).setDepth(2);
    
        // Watch the player and worldLayer for collisions, for the duration of the scene
        this.physics.add.collider(player, worldLayer);
    
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

function create(){
    createWorld.call(this);
    createAnims.call(this);
    createPlayer.call(this);
}