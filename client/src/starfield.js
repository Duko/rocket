var astro = astro || {};

astro.Starfield = function (game) {
    var sprite = game.add.tileSprite(0, 0, 20000, 20000, 'bg_stars');
    sprite.fixedToCamera = true;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.cameraOffset.x = game.camera.width/2;
    sprite.cameraOffset.y = game.camera.height/2;

    this.game = game;
    this.sprite = sprite;
};

astro.Starfield.preload = function (game) {
    game.load.image('bg_stars', 'sprites/bg/stars.jpg');
};

astro.Starfield.prototype.update = function () {
    var game = this.game,
        sprite = this.sprite;

    sprite.tilePosition.x = game.camera.width - game.rocket.body.x;
    sprite.tilePosition.y = game.camera.height - game.rocket.body.y;
};

