var astro = astro || {};

astro.Planet2 = function (game, config) {
    var key = config.key || 'moon',
        mass = config.mass || 1000000,
        scale = config.scale || 1.0,
        parentBody = config.parentBody || null,
        orbitRadius = config.orbitRadius || 0.0,
        orbitSpeed = config.orbitSpeed || 0.0,
        spinSpeed = config.spinSpeed || 0.0;
        x = parentBody ? parentBody.x + orbitRadius : game.world.width/2,
        y = parentBody ? parentBody.y : game.world.height/2;

    Phaser.Sprite.call(this, game, x, y, key);

    this.scale.setTo(scale);

    game.physics.p2.enable(this);
    var body = this.body;
    body.setCircle((this.width - 400*scale) / 2, 0, 0, 0);
    body.collideWorldBounds = false;
    body.mass = mass;
    body.setZeroDamping();
    body.angularVelocity = spinSpeed;

    body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
    body.collides(game.physics.p2.collisionGroups[0]);

    this.orbitAngle = 0;
    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    this.spinSpeed = spinSpeed;
    this.parentBody = parentBody;
};

astro.Planet2.prototype = Object.create(Phaser.Sprite.prototype);
astro.Planet2.prototype.constructor = astro.Planet2;

astro.Planet2.prototype.update = function () {
    Phaser.Sprite.prototype.update.call(this);

    var rocketBody = this.game.rocket.body,
        body = this.body,
        parentBody = this.parentBody,
        orbitSpeed = this.orbitSpeed,
        orbitAngle = this.orbitAngle,
        orbitRadius = this.orbitRadius,
        spinSpeed = this.spinSpeed;

    // Orbit parent and maintain spin
    body.angularVelocity = spinSpeed;
    if (parentBody) {
        orbitAngle += orbitSpeed % (Math.PI*2);
        body.x = parentBody.x + Math.cos(orbitAngle) * orbitRadius;
        body.y = parentBody.y - Math.sin(orbitAngle) * orbitRadius;
    }

    // Apply gravity to rocket.
    var toRocket = new Phaser.Point(
        rocketBody.x - body.x,
        rocketBody.y - body.y
    );
    var g = 9.8 * (body.mass * rocketBody.mass) / toRocket.getMagnitudeSq();
    var force = toRocket.clone().setMagnitude(g);
    rocketBody.force.x -= force.x;
    rocketBody.force.y -= force.y;

/*
 * Let's try relying on friction while landing and not having this fake atmo for a while.
    // Apply "atmo spin" to rocket.
    var spinSpeedAtRocket = body.angularVelocity * toRocket.getMagnitude();
    var spinDistanceScale = 1 / Math.max(1, (toRocket.getMagnitude() - atmoRadius) * 0.05);
    if (spinDistanceScale < 0.01)
        spinDistanceScale = 0;
    var spinVelocityAtRocket = toRocket.clone().perp().setMagnitude(spinSpeedAtRocket * spinDistanceScale);

    rocketBody.x += spinVelocityAtRocket.x * this.game.time.physicsElapsed;
    rocketBody.y += spinVelocityAtRocket.y * this.game.time.physicsElapsed;
    rocketBody.rotation += body.angularVelocity * spinDistanceScale * this.game.time.physicsElapsed;
*/

    this.orbitAngle = orbitAngle;
};

