var astro = astro || {};

astro.Rocket = function (game, config) {
    var maxThrust = config.maxThrust || 0;

    fireEmitter = game.add.emitter(0, 0, 100);
    smokeEmitter = game.add.emitter(0, 0, 100);

    smokeEmitter.enableBody = true;

    smokeEmitter.physicsBodyType = Phaser.Physics.P2JS;

    smokeEmitter.enableBodyDebug = true;

    fireEmitter.makeParticles( [ 'fire0', 'fire1', 'fire2' ], undefined, undefined, true );
    smokeEmitter.makeParticles( [ 'smoke' ] );

    smokeEmitter.setAlpha(0.1, 1, 3000);
    smokeEmitter.setScale(0.1, 1, 0.1, 1, 6000, Phaser.Easing.Quintic.Out);

    console.log(smokeEmitter);

    //setAll('body.setCollisionGroup', game.physics.p2.collisionGroups[0], false, false, 0, true);
    //setAll('body.setCollisionGroup', game.physics.p2.collisionGroups[0], false, false, 0, true);
    //
    //smokeEmitter.Group.forEach(function(particle) {
    //    particle.sprite.body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
    //    particle.sprite.body.collides(game.physics.p2.collisionGroups[0]);
    //}, this)

    for (var i = 0; i < smokeEmitter.children.length; i++) {
        var particle = smokeEmitter.children[i];
        console.log(particle);
        //particle.body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
        //particle.body.collides(game.physics.p2.collisionGroups[0]);
    }

    var sprite = game.add.sprite(game.world.width/2, (game.world.height /2) + 5000, 'rocket');

    game.physics.p2.enable(sprite, true);
    var body = sprite.body;

    var w = sprite.width, h = sprite.height;
    body.clearShapes();
    body.addPolygon({}, [0,-h/2,  w/2,h/2, 0,0, -w/2,h/2]);

    body.collideWorldBounds = false;
    body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
    body.collides(game.physics.p2.collisionGroups[0]);
    body.mass = 1;

    this.game = game;
    this.sprite = sprite;
    this.body = body;
    this.thrust = 0;
    this.maxThrust = maxThrust;
    this.thrustOn = false;
    this.fireEmitter = fireEmitter;
    this.smokeEmitter = smokeEmitter;
};

astro.Rocket.preload = function (game) {
    game.load.image('rocket', 'sprites/rockets/s1.png');
    game.load.image('fire0', 'sprites/particles/flame0.png');
    game.load.image('fire1', 'sprites/particles/flame1.png');
    game.load.image('fire2', 'sprites/particles/flame2.png');
    game.load.image('smoke', 'sprites/particles/smoke.png');
};

SmokeParticle = function (game, x, y) {
    Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('particleShade'));
};

SmokeParticle.prototype = Object.create(Phaser.Particle.prototype);
SmokeParticle.prototype.constructor = SmokeParticle;

astro.Rocket.prototype.update = function () {
    var game = this.game,
        body = this.body,
        cursors = game.input.keyboard.createCursorKeys(),
        sprite = this.sprite,
        fireEmitter = this.fireEmitter,
        smokeEmitter = this.smokeEmitter;

    fireEmitter.setRotation(sprite.rotation/(2*Math.PI), sprite.rotation);

    //console.log(Math.abs(sprite.rotation/(2*Math.PI)*360)%360);

    fireEmitter.emitX = sprite.x + 0 - Math.sin(sprite.rotation) * 40;
    fireEmitter.emitY = sprite.y + 0 + Math.cos(sprite.rotation) * 40;

    smokeEmitter.x = sprite.x - Math.sin(sprite.rotation) * 40;
    smokeEmitter.y = sprite.y + Math.cos(sprite.rotation) * 40;

    var px = body.velocity.x;
    var py = body.velocity.y;

    px *= -1;
    py *= -1;

    fireEmitter.minParticleSpeed.set(px, py);
    fireEmitter.maxParticleSpeed.set(px, py);

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

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        fireEmitter.start(true, 80, null, this.thrust/this.maxThrust);
        smokeEmitter.start(true, 700, null, this.thrust/this.maxThrust);
        body.thrust(this.thrust);
        this.thrustOn = true;
    } else {
        this.thrustOn = false;
    }
    // Thrust End

    if (cursors.left.isDown) {
        body.angularForce -= 4;
    }

    if (cursors.right.isDown) {
        body.angularForce += 4;
    }
};

astro.Rocket.prototype.postUpdate = function () {

};
