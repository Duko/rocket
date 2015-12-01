var rocket = rocket || {};

rocket.OptionsStage = function() {
    this.scaleWorld = 1;
};

rocket.OptionsStage.prototype.preload = function() {
    this.load.image('bg_stars', 'sprites/bg/stars.jpg');
};

rocket.OptionsStage.prototype.create = function() {
    this.add.sprite(0, 0, 'bg_stars');

    this.add.text(100, 100, "World Scale:",  { font: "Bold 24px Arial", fill: '#ffffff' });
    var wsPlus = this.add.text(300, 100, "+",  { font: "Bold 24px Arial", fill: '#ffffff' });
    this.wsProperty = this.add.text(400, 100, this.scaleWorld,  { font: "Bold 24px Arial", fill: '#ffffff' });
    var wsMinus = this.add.text(500, 100, "-",  { font: "Bold 24px Arial", fill: '#ffffff' });
    wsPlus.inputEnabled = true;
    wsMinus.inputEnabled = true;
    wsPlus.input.start(0, true);
    wsMinus.input.start(0, true);
    wsPlus.events.onInputDown.add(function(){
        this.scaleWorld = Math.round((this.scaleWorld+0.05)*100)/100;
    }.bind(this));
    wsMinus.events.onInputDown.add(function(){
        this.scaleWorld = Math.round((this.scaleWorld-0.05)*100)/100;
    }.bind(this));
};

rocket.OptionsStage.prototype.update = function() {
    this.wsProperty.text = this.scaleWorld;
};