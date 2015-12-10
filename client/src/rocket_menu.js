var astro = astro || {};

astro.RocketMenu = function (game, target) {
    this.offset = 70;
    this.itemOffset = 25;
    this.selectedItem = 0;
    Phaser.Sprite.call(this,
        game,
        target.sprite.x, target.sprite.y - this.offset,
        'interface',
        'opt_build'
    );
    this.anchor.setTo(1, 1);
    this.target = target;
    this.game = game;

    //  Register the keys.
    this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    //  Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ESC ]);

    this.up.onDown.add(function () {
        if (this.selectedItem < this.children.length - 1) {
            this.setInactiveItem(this.selectedItem);
            this.selectedItem += 1;
            this.setActiveItem(this.selectedItem);
        }
    }.bind(this));
    this.down.onDown.add(function () {
        if (this.selectedItem > 0) {
            this.setInactiveItem(this.selectedItem);
            this.selectedItem -= 1;
            this.setActiveItem(this.selectedItem);
        }
    }.bind(this));
    this.esc.onDown.add(function () {
        this.visible = this.visible ? false : true;
    }.bind(this));

    this.addMenuItem('LAUNCH');
    this.addMenuItem('REFUEL (100%)', true);
    this.addMenuItem('BUILD');
    this.addMenuItem('MANAGEMENT', true);
    this.addMenuItem('PRODUCTION', true);
    this.addMenuItem('--- EMPTY ---', true);
    this.addMenuItem('--- EMPTY ---', true);
    this.addMenuItem('--- EMPTY ---', true);

    this.setActiveItem(this.selectedItem);
    this.visible = false;
};

astro.RocketMenu.prototype = Object.create(Phaser.Sprite.prototype);
astro.RocketMenu.prototype.constructor = astro.RocketMenu;

astro.RocketMenu.preload = function (game) {
    console.log("preload rocketMenu");
    game.load.atlasJSONHash('interface', 'sprites/sheets/interface.png', 'sprites/sheets/interface.json');
};

astro.RocketMenu.prototype.update = function () {
    console.log("update rocketMEnu");
    this.x = this.target.sprite.x;
    this.y = this.target.sprite.y - this.offset;
};

astro.RocketMenu.prototype.render = function () {
    console.log("render rocketMEnu");
};

astro.RocketMenu.prototype.addMenuItem = function (string, disable) {
    var item = this.game.make.sprite(0, -this.itemOffset - (22*this.children.length), 'interface', 'optmenu');
    item.disabled = disable;
    item.anchor.setTo(0,.15);

    if (disable) {
        item.alpha = .2;
    }

    var text = this.game.make.bitmapText(40, 0, 'roboto_mono', string, 64);

    text.tint = 0x6fc4ff;
    text.fontSize = 15;
    text.align = 'right';
    text.anchor.setTo(0,0);
    item.addChild(text);
    this.addChild(item);
};

astro.RocketMenu.prototype.setActiveItem = function (index) {
    var item = this.getChildAt(index);
    item.loadTexture('interface', 'optmenu_selected');
};

astro.RocketMenu.prototype.setInactiveItem = function (index) {
    var item = this.getChildAt(index);
    item.loadTexture('interface', 'optmenu');
};