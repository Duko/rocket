var rocket = rocket || {};

rocket.MenuStage = function() {
};

rocket.MenuStage.prototype.preload = function() {
    console.log('menustage preload');

};

rocket.MenuStage.prototype.create = function() {
    console.log('menustage create');

    var titleText = rocket.createText(this, 70, "Rocket");
    titleText.x = this.world.centerX;
    titleText.y = 100;
    titleText.anchor.setTo(.5,.5);

    var posX = 0,
        menu = this.add.group();

    this.menu = menu;

    var startText = rocket.createText(this, 30, "Start Game");
    startText.x = posX;
    startText.y = 0;
    startText.inputEnabled = true;
    startText.events.onInputDown.add(this.startGameClick, this);

    menu.add(startText);
    menu.x = 100;
    menu.y = 200;

};

rocket.MenuStage.prototype.update = function() {
    console.log('menustage update');
};

rocket.MenuStage.prototype.startGameClick = function () {
    console.log("clicked");
    this.state.start('lander');
};
