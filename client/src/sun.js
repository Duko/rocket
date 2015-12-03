var rocket = rocket || {};

rocket.Sun = function (game, mass) {

    var sprite = game.add.sprite(0, 0, 'sun');

    game.physics.p2.enable(sprite);
    var body = sprite.body;
    body.setCircle((sprite.width - 400) / 2, 0, 0, 0);
    body.collideWorldBounds = false;
    body.static = true;

    body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
    body.collides(game.physics.p2.collisionGroups[0]);

    this.mass = mass;
    this.game = game;
    this.sprite = sprite;
    this.body = body;
}

rocket.Sun.preload = function (game) {
    game.load.image('sun', 'sprites/bodies/sun.png');
};
