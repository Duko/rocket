var rocket = rocket || {};

rocket.LanderStage = function() {
};

rocket.LanderStage.prototype.preload = function() {
    console.log('landerstage preload');

    this.load.image('bg_stars', 'sprites/bg/stars.jpg');
};

rocket.LanderStage.prototype.create = function() {
    console.log('landerstage create');

    this.add.sprite(0, 0, 'bg_stars');
};

rocket.LanderStage.prototype.update = function() {
    console.log('landerstage update');
};
