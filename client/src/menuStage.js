var rocket = rocket || {};

rocket.MenuStage = function() {
};

rocket.MenuStage.prototype.preload = function() {
    console.log('menustage preload');

};

rocket.MenuStage.prototype.create = function() {
    console.log('menustage create');

    var titleText = rocket.createText(this, 35, "ASTRONOMER");
    titleText.x = this.world.centerX;
    titleText.y = 100;
    titleText.anchor.setTo(.5,.5);

    var posX = 0,
        menu = this.add.group();

    this.menu = menu;

    var startText = rocket.createText(this, 20, "START GAME");
    startText.x = this.world.centerX;
    startText.y = 0;
    startText.inputEnabled = true;
    startText.anchor.setTo(.5,.5);
    startText.events.onInputDown.add(this.startGameClick, this);

    menu.add(startText);
    menu.x = 0;
    menu.y = 200;


};

rocket.MenuStage.prototype.update = function() {
    console.log('menustage update');
};

rocket.MenuStage.prototype.startGameClick = function () {
    console.log("clicked");
    this.state.start('lander');
};
