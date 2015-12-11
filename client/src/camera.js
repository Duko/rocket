var astro = astro || {};

astro.Camera = function (game, target) {
    game.camera.roundPx = false;

    this.worldScale = 1;
    this.target = target;
    this.game = game;
};

astro.Camera.prototype.update = function () {
    var game = this.game,
        starfield = this.starfield,
        target = this.target;

    // zoom
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        this.worldScale += 0.007;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        this.worldScale -= 0.007;
    }

    // set a minimum and maximum scale value
    this.worldScale = Phaser.Math.clamp(this.worldScale, 0.08, 1);

    // set our world scale as needed
    game.world.scale.set(this.worldScale);
    game.camera.x = target.x * this.worldScale - game.camera.width/2;
    game.camera.y = target.y * this.worldScale - game.camera.height/2;
};
