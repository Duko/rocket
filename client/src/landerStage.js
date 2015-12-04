var rocket = rocket || {};

rocket.LanderStage = function(game) {
    this.game = game;
    this.worldScale = 1;
    this.debugSprite = null;
};

rocket.LanderStage.prototype.preload = function() {

    this.load.image('bg_stars', 'sprites/bg/stars.jpg');

    rocket.Planet.preload(this);
    rocket.Rocket.preload(this);
};

rocket.LanderStage.prototype.create = function() {
    var starfield = this.game.add.tileSprite(0, 0, 20000, 20000, 'bg_stars');
    starfield.fixedToCamera = true;
    // setup stage
    this.world.setBounds(-10000, -10000, 20000, 20000);
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.restitution = 0.0;
    this.physics.p2.createCollisionGroup();

    // add "planets"

    var sun = new rocket.Planet(this, {
        key: 'sun',
        mass: 10000000
    });

    var planet0 = new rocket.Planet(this, {
        key: 'orange',
        mass: 3600000,
        scale: 0.6,
        parentBody: sun.body,
        orbitRadius: 3000,
        orbitSpeed: 0.00001,
        spinSpeed: 0.0001
    });

    var planet1 = new rocket.Planet(this, {
        key: 'orange',
        mass: 4500000,
        scale: 0.7,
        parentBody: sun.body,
        orbitRadius: 8000,
        orbitSpeed: -0.00001,
        spinSpeed: 0.001
    });

    var moonA = new rocket.Planet(this, {
        key: 'moon',
        mass: 1400000,
        scale: 0.35,
        parentBody: planet1.body,
        orbitRadius: 2000,
        orbitSpeed: 0.0001,
        spinSpeed: 0.001
    });

    var planet2 = new rocket.Planet(this, {
        key: 'orange',
        mass: 16000000,
        scale: 1.5,
        parentBody: sun.body,
        orbitRadius: 18000,
        orbitSpeed: -0.000001,
        spinSpeed: 0.00005
    });

    var moon2A = new rocket.Planet(this, {
        key: 'moon',
        mass: 1400000,
        scale: 0.5,
        parentBody: planet2.body,
        orbitRadius: 3000,
        orbitSpeed: 0.00002,
        spinSpeed: 0.00001
    });

    var moon2B = new rocket.Planet(this, {
        key: 'moon',
        mass: 1200000,
        scale: 0.4,
        parentBody: planet2.body,
        orbitRadius: 4500,
        orbitSpeed: -0.00001,
        spinSpeed: -0.0001
    });

    planets = this.planets = [sun, planet0, planet1, planet2, moonA, moon2A, moon2B];

    // Add rocket
    var r = new rocket.Rocket(this, {
        maxThrust: 140
    });
    this.game.camera.follow(r.sprite, Phaser.Camera.FOLLOW_LOCKON);
    this.game.camera.roundPx = false;

    this.starfield = starfield;
    player = this.rocket = r;

    this.enableDebug();
};

rocket.LanderStage.prototype.addDebugToObject = function (object) {
    object.sprite.inputEnabled = true;
    object.sprite.events.onInputDown.add(this.addDebugToSprite, this);
};

rocket.LanderStage.prototype.addDebugToSprite = function (item) {
    this.debugSprite = item;
};

rocket.LanderStage.prototype.update = function() {
    var game = this.game;

    // zoom
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        this.worldScale += 0.007;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        this.worldScale -= 0.007;
    }

    // set a minimum and maximum scale value
    this.worldScale = Phaser.Math.clamp(this.worldScale, 0.2, 1.5);

    // set our world scale as needed
    game.world.scale.set(this.worldScale);

    this.planets.forEach(function (p) { p.update(); });
    this.rocket.update();

    if (!this.game.camera.atLimit.x)
    {
        this.starfield.tilePosition.x -= ((this.rocket.body.velocity.x) * this.game.time.physicsElapsed);
    }

    if (!this.game.camera.atLimit.y)
    {
        this.starfield.tilePosition.y -= ((this.rocket.body.velocity.y) * this.game.time.physicsElapsed);
    }
};

rocket.LanderStage.prototype.render = function() {
    var game = this.game;

    if (this.debugSprite != null) {
        this.game.debug.spriteCoords(this.debugSprite, 32, this.game.height - 50);
    }
    this.game.debug.body(this.rocket.body);
    this.planets.forEach(function (p) { game.debug.body(p.body); });
    this.game.debug.cameraInfo(this.game.camera, 32, 32);

    this.game.debug.text("TH: " + this.rocket.thrust + " On: " + this.rocket.thrustOn, 100, 380 );
    this.game.debug.text("VX: " + this.rocket.body.velocity.x, 100, 400 );
    this.game.debug.text("VY: " + this.rocket.body.velocity.y, 100, 420 );
};

rocket.LanderStage.prototype.enableDebug = function() {
    var stage = this;

    this.planets.forEach(function (p) { stage.addDebugToObject(p); });
    this.addDebugToObject(this.rocket);
};

