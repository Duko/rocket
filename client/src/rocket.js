var rocket = rocket || {};

rocket.Rocket = function (game, config) {
    var maxThrust = config.maxThrust || 0;
    var sprite = game.add.sprite(0, 2000, 'rocket');

    game.physics.p2.enable(sprite);
    var body = sprite.body;
    body.collideWorldBounds = false;
    body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
    body.collides(game.physics.p2.collisionGroups[0]);

    this.game = game;
    this.sprite = sprite;
    this.body = body;
    this.thrust = 0;
    this.maxThrust = maxThrust;
};

rocket.Rocket.preload = function (game) {
    game.load.image('rocket', 'sprites/rockets/s1.png');
};

rocket.Rocket.prototype.update = function () {
    var game = this.game,
        body = this.body,
        cursors = game.input.keyboard.createCursorKeys();

    // Thrust Start
    if (game.input.keyboard.isDown(Phaser.Keyboard.X)) {
        this.thrust = 0;
    }

    if (cursors.up.isDown && this.thrust < this.maxThrust) {
        this.thrust += 1;
    }

    if (cursors.down.isDown && this.thrust > 0) {
        this.thrust -= 1;
    }

    body.thrust(this.thrust);
    // Thrust End

    if (cursors.left.isDown) {
        body.angularForce -= 4;
    }

    if (cursors.right.isDown) {
        body.angularForce += 4;
    }
};

rocket.Rocket.prototype.postUpdate = function () {

};
