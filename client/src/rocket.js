var rocket = rocket || {};

rocket.Rocket = function (game) {

    var sprite = game.add.sprite(0, 2000, 'rocket');

    game.physics.p2.enable(sprite);
    var body = sprite.body;
    body.collideWorldBounds = false;
    body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
    body.collides(game.physics.p2.collisionGroups[0]);

    this.game = game;
    this.sprite = sprite;
    this.body = body;

    game.camera.follow(this.sprite);
};

rocket.Rocket.preload = function (game) {
    game.load.image('rocket', 'sprites/rockets/s1.png');
};

rocket.Rocket.prototype.update = function () {
    var game = this.game,
        body = this.body,
        cursors = game.input.keyboard.createCursorKeys();

    if (cursors.up.isDown) {
        body.thrust(400);
    }

    if (cursors.left.isDown) {
        body.angularForce -= 14;
    }

    if (cursors.right.isDown) {
        body.angularForce += 14;
    }
};

rocket.Rocket.prototype.postUpdate = function () {

};
