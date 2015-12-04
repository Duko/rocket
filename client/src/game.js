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
    this.game = new Phaser.Game(1224, 768, Phaser.AUTO, this.divName, this.config);
};

astro.Game.prototype.preload = function() {

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
