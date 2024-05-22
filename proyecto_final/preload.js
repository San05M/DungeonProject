function preload() {
    this.load.spritesheet("playerLeftRun", "assets/playerRunLeft.png", { frameWidth: 32, fremaHeight: 48})
    this.load.tilemapTiledJSON("map", "assets/mapa_mazmorra.json");
    this.load.plugin('rexvirtualjoystickplugin', 'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins@1.1.39/dist/rexvirtualjoystickplugin.min.js', true);
    this.load.image("tiles1", "assets/mainlevbuild.png");
    this.load.image("tiles2", "assets/decorative.png");
    this.load.image("heart", "assets/heart.png");
    this.load.image("potionScore", "assets/potionScore.png");
    this.load.image("potionScoreHalf", "assets/potionScoreHalf.png");
    this.load.image("potionScoreEmpty", "assets/potionScoreEmpty.png");
    this.load.spritesheet("potion", "assets/potionObject.png", { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet("playerRightRun", "assets/playerRunRight", { frameWidth: 32, fremaHeight: 48});
    this.load.spritesheet("playerWaiting", "assets/playerWaiting", { frameWidth: 32, fremaHeight: 48});
    this.load.spritesheet("potionPower", "assets/potionViolet", { frameWidth: 16, frameHeight: 16});
}