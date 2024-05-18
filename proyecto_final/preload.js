function preload(){
    this.load.spritesheet("player", "assets/player_run.png",{ frameWidth:16, frameHeight: 24 });
    this.load.tilemapTiledJSON("map", "assets/mapa_mazmorra.json");
    this.load.plugin('rexvirtualjoystickplugin', 'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins@1.1.39/dist/rexvirtualjoystickplugin.min.js', true);
    this.load.image("tiles1", "assets/mainlevbuild.png");
    this.load.image("tiles2", "assets/decorative.png");
    this.load.spritesheet("player_waiting", "assets/player_waiting.png", { frameWidth:16, frameHeight: 24});

}