var rocket = rocket || {};

rocket.LanderStage = function(game) {
    this.game = game;
    this.worldScale = 1;
    this.debugSprite = null;
};

rocket.LanderStage.prototype.preload = function() {

    this.load.image('bg_stars', 'sprites/bg/stars.jpg');

    rocket.Sun.preload(this);
    rocket.Planet.preload(this);
    rocket.Rocket.preload(this);
};

rocket.LanderStage.prototype.create = function() {
    var starfield = this.game.add.tileSprite(0, 0, 1920, 1920, 'bg_stars');
    starfield.fixedToCamera = true;
    // setup stage
    this.world.setBounds(-10000, -10000, 20000, 20000);
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.restitution = 0.0;
    this.physics.p2.createCollisionGroup();

    // add actors
    var sun = new rocket.Sun(this, {
        mass: 1000000000
    });

    var planet = new rocket.Planet(this, {
        key: 'orange',
        mass: 4500000,
        scale: 0.7,
        parentBody: sun.body,
        orbitRadius: 6000,
        orbitSpeed: -0.00001,
        spinSpeed: 0.0001
    });
    var moon = new rocket.Planet(this, {
        key: 'moon',
        mass: 2500000,
        scale: 0.5,
        parentBody: planet.body,
        orbitRadius: 3000,
        orbitSpeed: 0.0001,
        spinSpeed: 0.001
    });

    var r = new rocket.Rocket(this);
    this.game.camera.follow(r.sprite, Phaser.Camera.FOLLOW_TOPDOWN);
    this.game.camera.roundPx = false;

    this.sun = sun;
    this.starfield = starfield;
    this.planet = planet;
    this.moon = moon;
    this.rocket = r;

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
    this.worldScale = Phaser.Math.clamp(this.worldScale, 0.05, 2);

    // set our world scale as needed
    game.world.scale.set(this.worldScale);

    this.planet.update();
    this.moon.update();
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
    if (this.debugSprite != null) {
        this.game.debug.spriteCoords(this.debugSprite, 32, this.game.height - 50);
    }
    this.game.debug.body(this.rocket.body);
    this.game.debug.body(this.planet.body);
    this.game.debug.body(this.moon.body);
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
};

rocket.LanderStage.prototype.enableDebug = function() {
    this.addDebugToObject(this.sun);
    this.addDebugToObject(this.planet);
    this.addDebugToObject(this.moon);
    this.addDebugToObject(this.rocket);
};

