var rocket = rocket || {};

rocket.Rocket = function (game, config) {
    var maxThrust = config.maxThrust || 0;
    var sprite = game.add.sprite(0, 2000, 'rocket');

    game.physics.p2.enable(sprite);
    var body = sprite.body;
    body.collideWorldBounds = false;
    body.setCollisionGroup(game.physics.p2.collisionGroups[0]);
    body.collides(game.physics.p2.collisionGroups[0]);

    fireEmitter = game.add.emitter(sprite.x, sprite.y, 100);
    smokeEmitter = game.add.emitter(sprite.x, sprite.y, 100);

    fireEmitter.makeParticles( [ 'fire0', 'fire1', 'fire2' ] );
    smokeEmitter.makeParticles( [ 'smoke' ] );

    this.game = game;
    this.sprite = sprite;
    this.body = body;
    this.thrust = 0;
    this.maxThrust = maxThrust;
    this.thrustOn = false;
    this.fireEmitter = fireEmitter;
    this.smokeEmitter = smokeEmitter;
};

rocket.Rocket.preload = function (game) {
    game.load.image('rocket', 'sprites/rockets/s1.png');
    game.load.image('fire0', 'sprites/particles/flame0.png');
    game.load.image('fire1', 'sprites/particles/flame1.png');
    game.load.image('fire2', 'sprites/particles/flame2.png');
    game.load.image('smoke', 'sprites/particles/smoke.png');
};

rocket.Rocket.prototype.update = function () {
    var game = this.game,
        body = this.body,
        cursors = game.input.keyboard.createCursorKeys(),
        sprite = this.sprite,
        fireEmitter = this.fireEmitter,
        smokeEmitter = this.smokeEmitter;

    fireEmitter.x = sprite.x + Math.cos(sprite.rotation) * 0 - Math.sin(sprite.rotation) * 50;
    fireEmitter.y = sprite.y + Math.sin(sprite.rotation) * 0 + Math.cos(sprite.rotation) * 50;

    smokeEmitter.x = sprite.x + Math.cos(sprite.rotation) * 0 - Math.sin(sprite.rotation) * 50;
    smokeEmitter.y = sprite.y + Math.sin(sprite.rotation) * 0 + Math.cos(sprite.rotation) * 50;

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
        fireEmitter.start(true, 1000, null, this.thrust/this.maxThrust);
        smokeEmitter.start(true, 1000, null, this.thrust/this.maxThrust);
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

rocket.Rocket.prototype.postUpdate = function () {

};
