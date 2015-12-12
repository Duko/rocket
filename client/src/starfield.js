var astro = astro || {};

astro.Starfield = function (game, target) {
    Phaser.TileSprite.call(this, game, 0, 0, 20000, 20000, 'bg_stars');

    this.fixedToCamera = true;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.cameraOffset.x = game.camera.width/2;
    this.cameraOffset.y = game.camera.height/2;

    this.target = target;
};

astro.Starfield.prototype = Object.create(Phaser.TileSprite.prototype);
astro.Starfield.prototype.constructor = astro.Starfield;

astro.Starfield.preload = function (game) {
    game.load.image('bg_stars', 'sprites/bg/stars2.jpg');
};

astro.Starfield.prototype.update = function () {
    Phaser.Sprite.prototype.update.call(this);

    var camera = this.game.camera,
        target = this.target;

    if (target) {
        this.tilePosition.x = camera.width - target.x;
        this.tilePosition.y = camera.height - target.y;
    }
};

