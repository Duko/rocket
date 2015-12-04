var astro = astro || {};

astro.Planet = function (game, config) {
    var key = config.key || 'moon',
        mass = config.mass || 1000000,
        scale = config.scale || 1.0,
        parentBody = config.parentBody || null,
        orbitRadius = config.orbitRadius || 0.0,
        orbitSpeed = config.orbitSpeed || 0.0,
        spinSpeed = config.spinSpeed || 0.0;
        atmoRadius = config.atmoRadius || 0;

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
    body.mass = mass;
    body.dynamic = true;

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
    this.atmoRadius = atmoRadius;
};

astro.Planet.preload = function (game) {
    game.load.image('orange', 'sprites/bodies/orange.png');
    game.load.image('moon', 'sprites/bodies/moon.png');
    game.load.image('sun', 'sprites/bodies/sun.png');
};

astro.Planet.prototype.update = function () {
    var rocketBody = this.game.rocket.body,
        body = this.body,
        parentBody = this.parentBody,
        orbitSpeed = this.orbitSpeed,
        orbitAngle = this.orbitAngle,
        orbitRadius = this.orbitRadius,
        spinSpeed = this.spinSpeed,
        atmoRadius = this.atmoRadius;

    // Orbit parent and spin
    if (parentBody) {
        orbitAngle += orbitSpeed % (Math.PI*2);
        body.x = parentBody.x + Math.cos(orbitAngle) * orbitRadius;
        body.y = parentBody.y - Math.sin(orbitAngle) * orbitRadius;
    }
    body.rotation += spinSpeed;

    var toRocket = new Phaser.Point(
        rocketBody.x - body.x,
        rocketBody.y - body.y
    );

    // Apply gravity to rocket.
    var g = 9.8 * (this.mass * rocketBody.mass) / toRocket.getMagnitudeSq();
    var force = toRocket.clone().setMagnitude(g);
    rocketBody.force.x -= force.x;
    rocketBody.force.y -= force.y;

    // Apply "atmo spin" to rocket.
    var spinSpeedAtRocket = spinSpeed * toRocket.getMagnitude();
    var spinDistanceScale = 1 / Math.max(1, (toRocket.getMagnitude() - atmoRadius) * 0.05);
    if (spinDistanceScale < 0.01)
        spinDistanceScale = 0;
    var spinVelocityAtRocket = toRocket.clone().perp().setMagnitude(spinSpeedAtRocket * spinDistanceScale);

    rocketBody.x += spinVelocityAtRocket.x;
    rocketBody.y += spinVelocityAtRocket.y;
    rocketBody.rotation += this.spinSpeed * spinDistanceScale;
};
