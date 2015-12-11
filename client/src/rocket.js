var astro = astro || {};

astro.Rocket = function (game, config) {
    var maxThrust = config.maxThrust || 0;

    Phaser.Sprite.call(this, game, game.world.width/2, game.world.height/2 + 5000, 'rocket');

    smokeEmitter = game.add.emitter(0, 0, 100);

    smokeEmitter.enableBody = true;

    smokeEmitter.physicsBodyType = Phaser.Physics.P2JS;

    smokeEmitter.enableBodyDebug = true;

    smokeEmitter.makeParticles( [ 'smoke' ] );

    smokeEmitter.setAlpha(0.1, 1, 3000);
    smokeEmitter.setScale(0.1, 1, 0.1, 1, 6000, Phaser.Easing.Quintic.Out);

    flame = game.make.sprite(0, 50, 'flame', 3);
    flame.smoothed = false;
    flame.anchor.setTo(0.5, 0);
    flameAnim = flame.animations.add('powerOn');
    flameAnim.play(10, true);
    this.addChild(flame);

    game.physics.p2.enable(this);
    var body = this.body;

    var w = this.width, h = this.height;
    body.clearShapes();
    body.addPolygon({}, [0,-h/2,  w/2,h/2, 0,0, -w/2,h/2]);

    body.collideWorldBounds = false;
    body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
    body.collides(game.physics.p2.collisionGroups[0]);
    body.mass = 1;
    body.drag = 0;

    this.game = game;
    this.body = body;
    this.thrust = 140;
    this.maxThrust = maxThrust;
    this.flame = flame;
    this.thrustOn = false;
    this.smokeEmitter = smokeEmitter;

    this.menu = game.add.existing(new astro.RocketMenu(game, this));
};

astro.Rocket.prototype = Object.create(Phaser.Sprite.prototype);
astro.Rocket.prototype.constructor = astro.Rocket;

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
    Phaser.Sprite.prototype.update.call(this);

    var game = this.game,
        body = this.body,
        cursors = game.input.keyboard.createCursorKeys(),
        flame = this.flame,
        smokeEmitter = this.smokeEmitter,
        x = this.x,
        y = this.y,
        rotation = this.rotation;

    smokeEmitter.x = x - Math.sin(rotation) * 40;
    smokeEmitter.y = y + Math.cos(rotation) * 40;

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

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        flame.scale.set(this.thrust/this.maxThrust);
        flame.visible = true;
        smokeEmitter.start(true, 700, null, this.thrust/this.maxThrust);
        smokeEmitter.setAlpha(1, 0, 700);
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
