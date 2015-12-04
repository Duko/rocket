var astro = astro || {};

astro.Planet = function (game, config) {
    var key = config.key || 'moon',
        mass = config.mass || 1000000,
        scale = config.scale || 1.0,
        parentBody = config.parentBody || null,
        orbitRadius = config.orbitRadius || 0.0,
        orbitSpeed = config.orbitSpeed || 0.0,
        spinSpeed = config.spinSpeed || 0.0;
        atmo = config.atmo || 100;

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
    this.scale = scale;
};

astro.Planet.preload = function (game) {
    game.load.image('orange', 'sprites/bodies/orange.png');
    game.load.image('moon', 'sprites/bodies/moon.png');
    game.load.image('sun', 'sprites/bodies/sun.png');
};

astro.Planet.prototype.update = function () {

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
    var force = toRocket.clone().setMagnitude(g);
    this.game.rocket.body.force.x -= force.x;
    this.game.rocket.body.force.y -= force.y;

    var r = (this.sprite.width - 400*this.scale) / 2;
    var surfaceSpeed = this.spinSpeed * r;
    var effect = 1.0 / Math.max(1, toRocket.getMagnitude() - r - atmo);
    if (effect < 0.01)
        effect = 0;
    var spinDrag = toRocket.clone().perp().setMagnitude(surfaceSpeed * effect);

    this.game.rocket.body.x += spinDrag.x;
    this.game.rocket.body.y += spinDrag.y;
    this.game.rocket.body.roation += this.spinSpeed * effect;
};
