var rocket = rocket || {};

rocket.LanderStage = function() {
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

    // setup debug camera
    this.cursors = this.input.keyboard.createCursorKeys();

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

    //this.camera.x = this.rocket.body.x - 400;
    //this.camera.y = this.rocket.body.y - 300;

    var cursors = this.cursors;

/*
    if (cursors.left.isDown) {
        this.camera.x -= 40;
    }
    if (cursors.right.isDown) {
        this.camera.x += 40;
    }
    if (cursors.up.isDown) {
        this.camera.y -= 40;
    }
    if (cursors.down.isDown) {
        this.camera.y += 40;
    }
*/
    if (cursors.left.isDown && cursors.right.isDown) {
        this.world.scale.set(0.2);
    }

    if (cursors.up.isDown && cursors.down.isDown) {
        this.world.scale.set(1);
    }

    this.planet.update();
    this.moon.update();
    this.rocket.update();
};
