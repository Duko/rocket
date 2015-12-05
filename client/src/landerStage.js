var astro = astro || {};

astro.LanderStage = function(game) {
    this.game = game;
    this.worldScale = 1;
    this.debugSprite = null;
    game.time.advancedTiming = true;
};

astro.LanderStage.prototype.preload = function() {

    this.load.image('bg_stars', 'sprites/bg/stars.jpg');

    astro.Planet.preload(this);
    astro.Rocket.preload(this);
};

astro.LanderStage.prototype.create = function() {
    var starfield = this.game.add.tileSprite(0, 0, 20000, 20000, 'bg_stars');
    starfield.fixedToCamera = true;
    // setup stage
    this.world.setBounds(-1000, -1000, 500000, 500000);
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.restitution = 0.0;
    this.physics.p2.createCollisionGroup();

    // add "planets"

    var sun = new astro.Planet(this, {
        key: 'sun',
        mass: 10000000
    });

    var planet0 = new astro.Planet(this, {
        key: 'black',
        mass: 3600000,
        scale: 0.6,
        parentBody: sun.body,
        orbitRadius: 3000,
        orbitSpeed: 0.00008,
        spinSpeed: 0.0003,
        atmoRadius: 600
    });

    var planet1 = new astro.Planet(this, {
        key: 'orange',
        mass: 4200000,
        scale: 0.7,
        parentBody: sun.body,
        orbitRadius: 8000,
        orbitSpeed: -0.00001,
        spinSpeed: 0.0003,
        atmoRadius: 700
    });

    var moonA = new astro.Planet(this, {
        key: 'moon',
        mass: 1000000,
        scale: 0.35,
        parentBody: planet1.body,
        orbitRadius: 2000,
        orbitSpeed: 0.0004,
        spinSpeed: 0.0001,
        atmoRadius: 350
    });

    var planet2 = new astro.Planet(this, {
        key: 'purple',
        mass: 16000000,
        scale: 1.5,
        parentBody: sun.body,
        orbitRadius: 18000,
        orbitSpeed: -0.000001,
        spinSpeed: 0.00009,
        atmoRadius: 1500
    });

    var moon2A = new astro.Planet(this, {
        key: 'moon',
        mass: 1400000,
        scale: 0.5,
        parentBody: planet2.body,
        orbitRadius: 3000,
        orbitSpeed: 0.00004,
        spinSpeed: 0.00015,
        atmoRadius: 500
    });

    var moon2B = new astro.Planet(this, {
        key: 'moon',
        mass: 1200000,
        scale: 0.4,
        parentBody: planet2.body,
        orbitRadius: 4500,
        orbitSpeed: -0.00001,
        spinSpeed: -0.0001,
        atmoRadius: 400
    });

    var planet3 = new astro.Planet(this, {
        key: 'green',
        mass: 46000000,
        scale: 2.5,
        parentBody: sun.body,
        orbitRadius: 32000,
        orbitSpeed: -0.0000001,
        spinSpeed: 0.00005,
        atmoRadius: 2500
    });

    planets = this.planets = [sun, planet0, planet1, planet2, planet3, moonA, moon2A, moon2B];

    // Add rocket
    var r = new astro.Rocket(this, {
        maxThrust: 140
    });
    this.game.camera.follow(r.sprite, Phaser.Camera.FOLLOW_LOCKON);
    this.game.camera.roundPx = false;

    this.starfield = starfield;
    player = this.rocket = r;

    this.enableDebug();
};

astro.LanderStage.prototype.addDebugToObject = function (object) {
    object.sprite.inputEnabled = true;
    object.sprite.events.onInputDown.add(this.addDebugToSprite, this);
};

astro.LanderStage.prototype.addDebugToSprite = function (item) {
    this.debugSprite = item;
};

astro.LanderStage.prototype.update = function() {
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

astro.LanderStage.prototype.render = function() {
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
    this.game.debug.text(game.time.fps, this.game.width - 30, 20);
};

astro.LanderStage.prototype.enableDebug = function() {
    var stage = this;

    this.planets.forEach(function (p) { stage.addDebugToObject(p); });
    this.addDebugToObject(this.rocket);
};

