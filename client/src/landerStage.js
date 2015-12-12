var astro = astro || {};

astro.LanderStage = function() {
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

    var rocket = new astro.Rocket(this, {maxThrust: 140 });
    var rocketMenu = new astro.RocketMenu(this, rocket);
    var starfield = new astro.Starfield(this, rocket.body);
    var rocketCamera = new astro.Camera(this, rocket.body);

    // create planets
    var planetConfigs = [astro.config.sun];
    var planets = [];
    while (planetConfigs.length > 0) {
        var c = planetConfigs.pop();
        var p = new astro.Planet(this, c);
        planets.push(p);
        if (c.children) {
            c.children.forEach(function (ch) {
                ch.parentBody = p.body;
                planetConfigs.push(ch);
            });
        }
    }

    // add stuff to stage.
    this.add.existing(starfield);
    for (var i=0; i<planets.length; i++) {
        this.add.existing(planets[i]);
    }
    this.add.existing(rocket);
    this.add.existing(rocketMenu);

    // save references
    this.rocketCamera = rocketCamera;
    this.gravityTargets = [rocket.body];
};

astro.LanderStage.prototype.update = function() {
    this.rocketCamera.update();
};

