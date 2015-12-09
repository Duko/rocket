var astro = astro || {};

astro.Rocket = function (game, config) {
    var maxThrust = config.maxThrust || 0;

    smokeEmitter = game.add.emitter(0, 0, 100);

    smokeEmitter.enableBody = true;

    smokeEmitter.physicsBodyType = Phaser.Physics.P2JS;

    smokeEmitter.enableBodyDebug = true;

    smokeEmitter.makeParticles( [ 'smoke' ] );

    smokeEmitter.setAlpha(0.1, 1, 3000);
    smokeEmitter.setScale(0.1, 1, 0.1, 1, 6000, Phaser.Easing.Quintic.Out);

    flame = game.add.sprite(game.world.width/2, (game.world.height /2) + 5000, 'flame', 3);
    flame.scale.set(1);
    flame.smoothed = false;
    flame.anchor.setTo(0.5, 0);
    flameAnim = flame.animations.add('powerOn');

    flameAnim.play(10, true);

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

    var sprite = game.add.sprite(game.world.width/2, (game.world.height /2) + 5000, 'rocket');

    game.physics.p2.enable(sprite);
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
    this.thrust = 140;
    this.maxThrust = maxThrust;
    this.flame = flame;
    this.thrustOn = false;
    this.smokeEmitter = smokeEmitter;
};

astro.Rocket.preload = function (game) {
    game.load.image('rocket', 'sprites/rockets/s1.png');
    game.load.spritesheet('flame', 'sprites/particles/sprite_flame.png', 17, 32, 3);
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
        flame = this.flame,
        smokeEmitter = this.smokeEmitter;

    smokeEmitter.x = sprite.x - Math.sin(sprite.rotation) * 40;
    smokeEmitter.y = sprite.y + Math.cos(sprite.rotation) * 40;

    flame.x = sprite.x - Math.sin(sprite.rotation) * 30;
    flame.y = sprite.y + Math.cos(sprite.rotation) * 30;

    // Thrust Start
    if (game.input.keyboard.isDown(Phaser.Keyboard.X)) {
        this.thrust = 0;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        this.thrust = 140;
    }

    if (cursors.up.isDown && this.thrust < this.maxThrust) {
        this.thrust += 1;
    }

    if (cursors.down.isDown && this.thrust > 0) {
        this.thrust -= 1;
    }

    flame.angle += 1;

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        flame.scale.set(this.thrust/this.maxThrust);
        flame.angle = ((sprite.rotation / (Math.PI*2)) * 360) % 360;
        flame.visible = true;
        smokeEmitter.start(true, 700, null, this.thrust/this.maxThrust);
        body.thrust(this.thrust);
        this.thrustOn = true;
    } else {
        flame.visible = false;
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

astro.Rocket.prototype.render = function (game) {

};
