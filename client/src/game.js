var astro = astro || {};

astro.Game = function(divName) {
    this.divName = divName;
    this.config = {
        preload: this.preload,
        create: this.create,
        update: this.update,
        render: this.render
    };
};

astro.Game.prototype.run = function() {
    //this.game = new Phaser.Game(1224, 768, Phaser.AUTO, this.divName, this.config);
    this.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, this.divName, this.config);

};

astro.Game.prototype.preload = function(game) {
    game.load.bitmapFont('roboto_mono', 'fonts/roboto_mono/mono_0.png', 'fonts/roboto_mono/mono.fnt');
};

astro.Game.prototype.create = function() {

    var game = this.game;

    game.state.add('menu', new astro.MenuStage());
    game.state.add('lander', new astro.LanderStage(game));

    game.state.start('lander');
};

astro.Game.prototype.update = function() {
};

astro.Game.prototype.render = function() {
};
