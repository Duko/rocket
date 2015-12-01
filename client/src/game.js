var rocket = rocket || {};

rocket.Game = function(divName) {
    this.divName = divName;
    this.config = {
        preload: this.preload,
        create: this.create,
        update: this.update
    };
};

rocket.Game.prototype.run = function() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, this.divName, this.config);

}

rocket.Game.prototype.preload = function() {
};

rocket.Game.prototype.create = function() {
    console.log('game create');

    var game = this.game;

    game.state.add('menu', new rocket.MenuStage());
    game.state.add('lander', new rocket.LanderStage());
    game.state.add('options', new rocket.OptionsStage());

    game.state.start('menu');
};

rocket.Game.prototype.update = function() {
    console.log('game update');
};

