var astro = astro || {};

astro.Planet = function (game, config) {
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

    if (parentBody) {
        var graphics = game.make.graphics(0,0);
        graphics.lineStyle(1, 0x2c5372, 1);
        graphics.drawCircle(0, 0, 2 * orbitRadius / parentBody.sprite.scale.x);
        parentBody.sprite.addChild(graphics);
    }

    this.orbitAngle = 0;
    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    this.spinSpeed = spinSpeed;
    this.parentBody = parentBody;
};

astro.Planet.preload = function (game) {
    game.load.image('orange', 'sprites/bodies/orange.png');
    game.load.image('moon', 'sprites/bodies/moon.png');
    game.load.image('sun', 'sprites/bodies/sun.png');
    game.load.image('black', 'sprites/bodies/black.png');
    game.load.image('purple', 'sprites/bodies/purple.png');
    game.load.image('green', 'sprites/bodies/green.png');
    game.load.image('blue', 'sprites/bodies/blue.png');
    game.load.image('white', 'sprites/bodies/white.png');
};

astro.Planet.prototype = Object.create(Phaser.Sprite.prototype);
astro.Planet.prototype.constructor = astro.Planet;

astro.Planet.prototype.update = function () {
    Phaser.Sprite.prototype.update.call(this);

    var gravityTargets = this.game.gravityTargets,
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

    // Apply gravity pull
    gravityTargets.forEach(function (targetBody) {
        var toTarget = new Phaser.Point(targetBody.x - body.x, targetBody.y - body.y);
        var g = 9.8 * (body.mass * targetBody.mass) / toTarget.getMagnitudeSq();
        var force = toTarget.clone().setMagnitude(g);
        targetBody.force.x -= force.x;
        targetBody.force.y -= force.y;
    });

    this.orbitAngle = orbitAngle;
};

