var rocket = rocket || {};

rocket.OptionsStage = function() {
    this.scaleWorld = 1;
    this.wsProperty;
};

rocket.OptionsStage.prototype.preload = function() {
    console.log('optionsstage preload');

    this.load.image('bg_stars', 'sprites/bg/stars.jpg');
};

rocket.OptionsStage.prototype.create = function() {
    this.add.sprite(0, 0, 'bg_stars');

    var wsText = this.add.text(100, 100, "World Scale:",  { font: "Bold 24px Arial", fill: '#ffffff' });
    var wsPlus = this.add.text(300, 100, "+",  { font: "Bold 24px Arial", fill: '#ffffff' });
    this.wsProperty = this.add.text(400, 100, this.scaleWorld,  { font: "Bold 24px Arial", fill: '#ffffff' });
    var wsMinus = this.add.text(500, 100, "-",  { font: "Bold 24px Arial", fill: '#ffffff' });
    wsPlus.inputEnabled = true;
    wsMinus.inputEnabled = true;
    wsPlus.input.start(0, true);
    wsMinus.input.start(0, true);
    wsPlus.events.onInputDown.add(this.scaleUp);
    wsMinus.events.onInputDown.add(this.scaleDown);
    console.log(this.wsProperty);
};

rocket.OptionsStage.prototype.update = function() {
    console.log('optionsstage update');
};

rocket.OptionsStage.prototype.scaleUp = function(item) {
    console.log('optionsstage scaleUp', item, this);
    this.scaleWorld += 0.1;
    this.wsProperty.text = this.scaleWorld;
}.bind(this);

rocket.OptionsStage.prototype.scaleDown = function(item) {
    console.log('optionsstage scaleDown', item, this);
    this.scaleWorld -= 0.1;
    this.wsProperty.text = this.scaleWorld;
}.bind(this);

