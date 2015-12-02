var rocket = rocket || {};

rocket.LanderStage = function(game) {
    this.game = game;
    this.worldScale = 1;
};

rocket.LanderStage.prototype.preload = function() {

    this.load.image('bg_stars', 'sprites/bg/stars.jpg');

    rocket.Sun.preload(this);
    rocket.Planet.preload(this);
    rocket.Rocket.preload(this);
};

rocket.LanderStage.prototype.create = function() {

    // setup stage
    this.world.setBounds(-10000, -10000, 20000, 20000);
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.createCollisionGroup();

    // add actors
    var sun = new rocket.Sun(this);
    var planet = new rocket.Planet(this, 0.7, sun.body, 4000, -0.0001, 0.001);
    var moon = new rocket.Planet(this, 0.3, planet.body, 1000, 0.001, 0.01);

    var r = new rocket.Rocket(this);

    this.sun = sun;
    this.planet = planet;
    this.moon = moon;
    this.rocket = r;
};

rocket.LanderStage.prototype.update = function() {
    var game = this.game;

    // zoom
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        this.worldScale += 0.01;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        this.worldScale -= 0.01;
    }

    // set a minimum and maximum scale value
    this.worldScale = Phaser.Math.clamp(this.worldScale, 0.05, 2);

    // set our world scale as needed
    game.world.scale.set(this.worldScale);

    this.planet.update();
    this.moon.update();
    this.rocket.update();
};
