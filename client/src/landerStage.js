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
    astro.RocketMenu.preload(this);
};

astro.LanderStage.prototype.create = function() {
    // setup stage
    this.world.setBounds(-1000, -1000, 500000, 500000);
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.restitution = 0.0;
    this.physics.p2.friction = 1;
    this.physics.p2.createCollisionGroup();

    var starfield = new astro.Starfield(this);

    // add "planets"

    var sun = new astro.Planet2(this, {
        key: 'sun',
        mass: 8000000,
        spinSpeed: 0.02
    });
    this.add.existing(sun);

    var planet0 = new astro.Planet2(this, {
        key: 'black',
        mass: 4600000,
        scale: 0.6,
        parentBody: sun.body,
        orbitRadius: 3000,
        orbitSpeed: 0.00008,
        spinSpeed: 0.1
    });
    this.add.existing(planet0);

    var planet1 = new astro.Planet2(this, {
        key: 'orange',
        mass: 4200000,
        scale: 0.7,
        parentBody: sun.body,
        orbitRadius: 8000,
        orbitSpeed: -0.00001,
        spinSpeed: 0.1
    });
    this.add.existing(planet1);

    var moonA = new astro.Planet2(this, {
        key: 'moon',
        mass: 1000000,
        scale: 0.35,
        parentBody: planet1.body,
        orbitRadius: 2000,
        orbitSpeed: 0.0004,
        spinSpeed: 0.1
    });
    this.add.existing(moonA);

    var planet2 = new astro.Planet2(this, {
        key: 'purple',
        mass: 16000000,
        scale: 1.5,
        parentBody: sun.body,
        orbitRadius: 18000,
        orbitSpeed: -0.000001,
        spinSpeed: 0.1
    });
    this.add.existing(planet2);

    var moon2A = new astro.Planet2(this, {
        key: 'moon',
        mass: 1400000,
        scale: 0.5,
        parentBody: planet2.body,
        orbitRadius: 3000,
        orbitSpeed: 0.00004,
        spinSpeed: 0.1
    });
    this.add.existing(moon2A);

    var moon2B = new astro.Planet2(this, {
        key: 'moon',
        mass: 1200000,
        scale: 0.4,
        parentBody: planet2.body,
        orbitRadius: 4500,
        orbitSpeed: -0.00001,
        spinSpeed: -0.1
    });
    this.add.existing(moon2B);

    var planet3 = new astro.Planet2(this, {
        key: 'green',
        mass: 46000000,
        scale: 2.5,
        parentBody: sun.body,
        orbitRadius: 32000,
        orbitSpeed: -0.0000001,
        spinSpeed: 0.1
    });
    this.add.existing(planet3);

    var planet4 = new astro.Planet2(this, {
        key: 'blue',
        mass: 33000000,
        scale: 2.0,
        parentBody: sun.body,
        orbitRadius: 45000,
        orbitSpeed: -0.0000005,
        spinSpeed: 0.1
    });
    this.add.existing(planet4);

    var moon4A = new astro.Planet2(this, {
        key: 'moon',
        mass: 1400000,
        scale: 0.55,
        parentBody: planet4.body,
        orbitRadius: 4000,
        orbitSpeed: 0.00008,
        spinSpeed: 0.1
    });
    this.add.existing(moon4A);

    var moon4B = new astro.Planet2(this, {
        key: 'moon',
        mass: 1200000,
        scale: 0.4,
        parentBody: planet4.body,
        orbitRadius: 5500,
        orbitSpeed: -0.0001,
        spinSpeed: -0.1
    });
    this.add.existing(moon4B);

    var moon4C = new astro.Planet2(this, {
        key: 'moon',
        mass: 1450000,
        scale: 0.58,
        parentBody: planet4.body,
        orbitRadius: 9000,
        orbitSpeed: 0.00006,
        spinSpeed: 0.1
    });
    this.add.existing(moon4C);

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
    this.game.debug.cameraInfo(this.game.camera, 32, 32);

    this.game.debug.text("TH: " + this.rocket.thrust + " On: " + this.rocket.thrustOn, 100, 380 );
    this.game.debug.text("VX: " + this.rocket.body.velocity.x, 100, 400 );
    this.game.debug.text("VY: " + this.rocket.body.velocity.y, 100, 420 );
    this.game.debug.text(game.time.fps, this.game.width - 30, 20);
    this.rocket.render(this);
};

astro.LanderStage.prototype.enableDebug = function() {
    var stage = this;

    this.addDebugToObject(this.rocket);
};

