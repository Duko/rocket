var astro = astro || {};

astro.Hud = function (game) {
    var hudBar = game.add.sprite(0, 0, 'hud_bar');
    hudBar.fixedToCamera = true;
    hudBar.anchor.x = 0.5;
    hudBar.anchor.y = 
    1;
    hudBar.scale.setTo(1, game.width);
    hudBar.cameraOffset.x = game.camera.width/2;
    hudBar.cameraOffset.y = game.camera.height;

    this.game = game;
    this.sprite = sprite;
};

astro.Hud.preload = function (game) {
    game.load.image('hud_bar', 'sprites/interface/hud_bar.png');
};

astro.Hud.prototype.update = function () {
    var game = this.game,
        sprite = this.sprite;
};

