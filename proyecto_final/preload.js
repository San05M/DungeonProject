function preload(){
    this.load.spritesheet('player', 'assets/player_run.png',{ frameWidth:162, frameHeight: 24 });
    this.load.tilemapTiledJSON('map', 'assets/mapa_mazmorra.json');
    this.load.plugin('rexvirtualjoystickplugin', 'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins@1.1.39/dist/rexvirtualjoystickplugin.min.js', true);
    this.load.image('tiles1', 'assets/mainlevbuild.png');
    this.load.image('tiles2', 'assets/decorative.png');
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