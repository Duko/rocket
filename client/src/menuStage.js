var rocket = rocket || {};

rocket.MenuStage = function() {
};

rocket.MenuStage.prototype.preload = function() {
    console.log('menustage preload');

};

rocket.MenuStage.prototype.create = function() {
    console.log('menustage create');

    var startText = this.add.button(100, 100, 'start');
    startText.onInputDown.add(this.startGameClick, this);

    var optionsButton = this.add.button(100, 200, 'start');
    optionsButton.onInputDown.add(this.showOptions, this);
};

rocket.MenuStage.prototype.update = function() {
    console.log('menustage update');
};

rocket.MenuStage.prototype.startGameClick = function () {
    this.state.start('lander');
};

rocket.MenuStage.prototype.showOptions = function () {
    this.state.start('options');
};
