var astro = astro || {};

astro.LanderStage = function(game) {
    this.game = game;
    this.debugSprite = null;
    game.time.advancedTiming = true;
};

astro.LanderStage.prototype.preload = function() {
    astro.Planet2.preload(this);
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
    var addplanet = function (g, c) {
        var planet = new astro.Planet2(g, c);
        g.add.existing(planet);
        if (c.children) {
            c.children.forEach(function (p) {
                p.parentBody = planet.body;
                addplanet(g, p);
            });
        }
    };
    addplanet(this, astro.config.sun);

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

