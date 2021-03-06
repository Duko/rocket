var astro = astro || {};

astro.MenuStage = function() {
};

astro.MenuStage.prototype.preload = function(game) {

    astro.Starfield.preload(this);
    game.load.image('planet', 'sprites/bodies/blue.png');
    game.load.image('blackHole', 'sprites/bodies/blackhole.png');
    game.load.image('logo','sprites/misc/logo.png');
    game.load.image('btnStart','sprites/misc/btn_start.png');

    game.load.audio('musicTitle', ['sounds/menu_ambient.mp3']);

};

astro.MenuStage.prototype.create = function(game) {
    // console.log('menustage create');

    //Menu music
    music = game.add.audio('musicTitle');
    music.volume = 0.1;
    music.play();

    var starfield = new astro.Starfield(this);
    this.add.existing(starfield);

    logo = game.add.sprite(game.width/2,game.height*0.2, 'logo');
    logo.alpha = 0;
    logo.anchor.setTo(0.5, 0.5);
    logo.scale.setTo(((100/1080)*game.height)/100,((100/1080)*game.height)/100);
    game.add.tween(logo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

    planet = game.add.sprite(game.width/2,(game.height*1.4), 'planet');
    planet.anchor.setTo(0.5, 0.5);
    planet.scale.setTo(((100/1080)*game.height)/100,((100/1080)*game.height)/100);

    blackHole = game.add.sprite(game.width/4,(game.height*0.4), 'blackHole');
    blackHole.anchor.setTo(0.5, 0.5);
    blackHole.scale.setTo(((50/1080)*game.height)/100,((50/1080)*game.height)/100);

    btnStart = game.add.sprite(game.width/2,game.height*0.55, 'btnStart');
    btnStart.alpha = 0;
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(((100/1080)*game.height)/100,((100/1080)*game.height)/100);
    game.add.tween(btnStart).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 1400);
    btnStart.inputEnabled = true;
    btnStart.input.useHandCursor = true;
    btnStart.events.onInputDown.add(this.startGameClick, this);

};

astro.MenuStage.prototype.update = function(game) {
    // console.log('menustage update');

    planet.angle += 0.01;
    blackHole.angle += -0.1;


};

astro.MenuStage.prototype.startGameClick = function (game) {
    console.log("clicked");
    this.state.start('lander');
};
