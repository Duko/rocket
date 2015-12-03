var rocket = rocket || {};

rocket.Planet = function (game, scale, parentBody, orbitRadius, orbitSpeed, spinSpeed) {

    var sprite = game.add.sprite(
        parentBody.x + orbitRadius,
        parentBody.y,
        'red'
    );

    sprite.scale.setTo(scale, scale);

    game.physics.p2.enable(sprite);
    var body = sprite.body;
    body.setCircle((sprite.width - 400*scale) / 2, 0, 0, 0);
    body.collideWorldBounds = false;
    body.static = true;

    body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
    body.collides(game.physics.p2.collisionGroups[0]);

    this.orbitAngle = 0;
    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    this.spinSpeed = spinSpeed;
    this.game = game;
    this.sprite = sprite;
    this.body = body;
    this.parentBody = parentBody;
};

rocket.Planet.preload = function (game) {
    game.load.image('red', 'sprites/bodies/moon.png');
};

rocket.Planet.prototype.update = function () {
    this.orbitAngle += this.orbitSpeed % (Math.PI*2);
    this.body.x = this.parentBody.x + Math.cos(this.orbitAngle) * this.orbitRadius;
    this.body.y = this.parentBody.y - Math.sin(this.orbitAngle) * this.orbitRadius;

    this.body.rotation += this.spinSpeed;
};
