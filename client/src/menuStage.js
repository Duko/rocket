var astro = astro || {};

astro.MenuStage = function() {
};

astro.MenuStage.prototype.preload = function(game) {

    astro.Starfield.preload(this);
    game.load.image('menuplanet', 'sprites/bodies/blue.png');
    game.load.image('logo','sprites/misc/logo.png');
    game.load.image('btnStart','sprites/misc/btn_start.png');

};

astro.MenuStage.prototype.create = function(game) {
    // console.log('menustage create');


    var starfield = new astro.Starfield(this);
    this.add.existing(starfield);

    logo = game.add.sprite(game.width/2,game.height*0.2, 'logo');
    logo.alpha = 0;
    logo.anchor.setTo(0.5, 0.5);
    logo.scale.setTo(((100/1080)*game.height)/100,((100/1080)*game.height)/100);
    game.add.tween(logo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

    menuplanet = game.add.sprite(game.width/2,(game.height*1.4), 'menuplanet');
    menuplanet.anchor.setTo(0.5, 0.5);
    menuplanet.scale.setTo(((100/1080)*game.height)/100,((100/1080)*game.height)/100);

    btnStart = game.add.sprite(game.width/2,game.height*0.55, 'btnStart');
    btnStart.alpha = 0;
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(((100/1080)*game.height)/100,((100/1080)*game.height)/100);
    game.add.tween(btnStart).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    btnStart.inputEnabled = true;
    btnStart.input.useHandCursor = true;
    btnStart.events.onInputDown.add(this.startGameClick, this);

    // var posX = 0,
    //     menu = this.add.group();

    // this.menu = menu;



    // var startText = astro.createText(this, 20, "START GAME");
    //     startText.x = this.world.centerX;
    //     startText.y = 0;
    //     startText.inputEnabled = true;
    //     startText.input.useHandCursor = true;
    //     startText.anchor.setTo(.5,.5);
    //     startText.events.onInputDown.add(this.startGameClick, this);
    //     startText.alpha = 0;
    //     game.add.tween(startText).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);



    // menu.add(startText);
    // menu.x = 0;
    // menu.y = game.height*0.55;


};

astro.MenuStage.prototype.update = function(game) {
    // console.log('menustage update');

    menuplanet.angle += 0.01;

};

astro.MenuStage.prototype.startGameClick = function (game) {
    console.log("clicked");
    this.state.start('lander');
};
