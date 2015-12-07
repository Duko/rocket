var astro = astro || {};

astro.LanderStage = function(game) {
    this.game = game;
    this.debugSprite = null;
    game.time.advancedTiming = true;
};

astro.LanderStage.prototype.preload = function() {
    astro.Planet.preload(this);
    astro.Rocket.preload(this);
    astro.Starfield.preload(this);
};

astro.LanderStage.prototype.create = function() {
    // setup stage
    this.world.setBounds(-1000, -1000, 500000, 500000);
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.restitution = 0.0;
    this.physics.p2.createCollisionGroup();

    var starfield = new astro.Starfield(this);

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

    var planet4 = new astro.Planet(this, {
        key: 'blue',
        mass: 33000000,
        scale: 2.0,
        parentBody: sun.body,
        orbitRadius: 45000,
        orbitSpeed: -0.0000005,
        spinSpeed: 0.00005,
        atmoRadius: 2500
    });

    var moon4A = new astro.Planet(this, {
        key: 'moon',
        mass: 1400000,
        scale: 0.55,
        parentBody: planet4.body,
        orbitRadius: 4000,
        orbitSpeed: 0.00008,
        spinSpeed: 0.00015,
        atmoRadius: 500
    });

    var moon4B = new astro.Planet(this, {
        key: 'moon',
        mass: 1200000,
        scale: 0.4,
        parentBody: planet4.body,
        orbitRadius: 5500,
        orbitSpeed: -0.0001,
        spinSpeed: -0.0001,
        atmoRadius: 400
    });

    var moon4C = new astro.Planet(this, {
        key: 'moon',
        mass: 1450000,
        scale: 0.58,
        parentBody: planet4.body,
        orbitRadius: 9000,
        orbitSpeed: 0.00006,
        spinSpeed: 0.00015,
        atmoRadius: 500
    });

    planets = this.planets = [sun, planet0, planet1, planet2, planet3, planet4, moonA, moon2A, moon2B, moon4A, moon4B, moon4C];

    // Add rocket and camera following it
    var rocket = new astro.Rocket(this, {
        maxThrust: 140
    });
    var rocketCamera = new astro.Camera(this, rocket.body);

    player = this.rocket = rocket;
    this.rocketCamera = rocketCamera;
    this.starfield = starfield;

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
    this.planets.forEach(function (p) { p.update(); });
    this.rocket.update();
    this.rocketCamera.update();
    this.starfield.update();
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
    this.rocket.render(this);
};

astro.LanderStage.prototype.enableDebug = function() {
    var stage = this;

    this.planets.forEach(function (p) { stage.addDebugToObject(p); });
    this.addDebugToObject(this.rocket);
};

