var rocket = rocket || {};

rocket.Planet = function (game, config) {
    var key = config.key || 'moon',
        mass = config.mass || 1000000,
        scale = config.scale || 1.0,
        parentBody = config.parentBody || null,
        orbitRadius = config.orbitRadius || 0.0,
        orbitSpeed = config.orbitSpeed || 0.0,
        spinSpeed = config.spinSpeed || 0.0;

    var sprite = game.add.sprite(
        parentBody ? parentBody.x + orbitRadius : 0,
        parentBody ? parentBody.y : 0,
        key
    );

    sprite.scale.setTo(scale, scale);

    game.physics.p2.enable(sprite);
    var body = sprite.body;
    body.setCircle((sprite.width - 400*scale) / 2, 0, 0, 0);
    body.collideWorldBounds = false;
    body.static = true;

    body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
    body.collides(game.physics.p2.collisionGroups[0]);

    this.mass = mass;
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
    game.load.image('orange', 'sprites/bodies/orange.png');
    game.load.image('moon', 'sprites/bodies/moon.png');
};

rocket.Planet.prototype.update = function () {

    if (this.parentBody) {
        this.orbitAngle += this.orbitSpeed % (Math.PI*2);
        this.body.x = this.parentBody.x + Math.cos(this.orbitAngle) * this.orbitRadius;
        this.body.y = this.parentBody.y - Math.sin(this.orbitAngle) * this.orbitRadius;
    }

    this.body.rotation += this.spinSpeed;

    var toRocket = new Phaser.Point(
        this.game.rocket.body.x - this.body.x,
        this.game.rocket.body.y - this.body.y
    );
    var g = 9.8 * (this.mass * 1.0 ) / toRocket.getMagnitudeSq();     // "1.0" is ship mass
    var force = toRocket.setMagnitude(g);
    this.game.rocket.body.force.x -= force.x;
    this.game.rocket.body.force.y -= force.y;
};
