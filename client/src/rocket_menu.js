var astro = astro || {};

astro.RocketMenu = function (game, target) {
    this.activeMenu = 0;
    this.selectedItem = 0;
    this.menues = [];
    Phaser.Group.call(this,
        game,
        null,
        'RocketMenu'
    );
    this.target = target;
    this.game = game;

    //  Register the keys.
    this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    //  Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ESC ]);

    this.down.onDown.add(function () {
        if (this.activeMenu.selectedItem < this.activeMenu.children.length - 1) {
            this.activeMenu.setActiveItem(this.activeMenu.selectedItem + 1);
        }
    }.bind(this));
    this.up.onDown.add(function () {
        if (this.activeMenu.selectedItem > 0) {
            this.activeMenu.setActiveItem(this.activeMenu.selectedItem - 1);
        }
    }.bind(this));
    this.left.onDown.add(function () {
        var selectedMenuItem = this.activeMenu.getChildAt(this.activeMenu.selectedItem);
        console.log(this.activeMenu.parent, selectedMenuItem.parent);
        this.activeMenu = this.mainMenu;
    }.bind(this));
    this.right.onDown.add(function () {
        var selectedMenuItem = this.activeMenu.getChildAt(this.activeMenu.selectedItem);
        if (selectedMenuItem.subMenu) {
            this.activeMenu = selectedMenuItem.subMenu;
        }
    }.bind(this));
    this.esc.onDown.add(function () {
        console.log("esc pressed", this);
        this.visible = this.visible ? false : true;
    }.bind(this));

    var mainMenu = new astro.RocketMenuList(game, this, "MainMenu", astro.config.rocketMenu);
    this.addChild(mainMenu);

    this.mainMenu = this.activeMenu = mainMenu;

    this.activeMenu.setActiveItem(this.activeMenu.selectedItem);

    this.visible = false;
};

astro.RocketMenu.prototype = Object.create(Phaser.Group.prototype);
astro.RocketMenu.prototype.constructor = astro.RocketMenu;

astro.RocketMenu.preload = function (game) {
    game.load.atlasJSONHash('interface', 'sprites/sheets/interface.png', 'sprites/sheets/interface.json');
};

astro.RocketMenu.prototype.update = function () {
    this.x = this.target.x;
    this.y = this.target.y - (this.height + 70);

    for (var i = 0; i < this.children.length; i++) {
        var obj = astro[i];

    }

};

astro.RocketMenu.prototype.render = function () {
    console.log("render rocketMEnu");
};

astro.RocketMenu.prototype.setActiveItem = function (index) {
    var item = this.getChildAt(index);
};

astro.RocketMenu.prototype.setInactiveItem = function (index) {
    var item = this.getChildAt(index);
};

astro.RocketMenuList = function (game, parent, name, config) {
    console.log("RocketMenuList contructor");
    this.selectedItem = 0;
    Phaser.Group.call(this,
        game,
        parent,
        name
    );

    for (var i = 6; i >= 0; i--) {
        if (config[i]) {
            if (config[i].subMenu) {
                var item = this.addMenuItem(config[i].name + ">", config[i].disabled);
                item.subMenu = new astro.RocketMenuList(game, this, config[i].name + 'SubMenu', config[i].subMenu);
                item.subMenu.alpha = 1;
                item.subMenu.x += item.width;
                item.subMenu.visible = false;
                item.parent.parent.addChild(item.subMenu);
                console.log("submenu", item.subMenu, item.parent.parent.menues);
            } else {
                var item = this.addMenuItem(config[i].name, config[i].disabled);
            }
        } else {
            this.addMenuItem('--- EMPTY ---', true);
        }
    }
    this.setActiveItem(this.children.length-1);
};

astro.RocketMenuList.prototype = Object.create(Phaser.Group.prototype);
astro.RocketMenuList.prototype.constructor = astro.RocketMenuList;

astro.RocketMenuList.prototype.update = function (game) {

};

astro.RocketMenuList.prototype.setActiveItem = function (index) {
    var previousItem = this.getChildAt(this.selectedItem);
    var newItem = this.getChildAt(index);
    previousItem.loadTexture('interface', 'optmenu');
    if (previousItem.subMenu) {
        previousItem.subMenu.visible = false;
    }
    newItem.loadTexture('interface', 'optmenu_selected');
    if (newItem.subMenu) {
        newItem.subMenu.visible = true;
    }
    this.selectedItem = index;
};

astro.RocketMenuList.prototype.addMenuItem = function (string, disable) {
    var item = this.create(0, 0, 'interface', 'optmenu');
    item.y = item.height*(this.children.length - 1);
    item.disabled = disable;
    item.anchor.setTo(0,0);

    if (disable) {
        item.alpha = .2;
    }

    var text = this.game.make.bitmapText(40, 0, 'roboto_mono', string, 15);
    text.tint = 0x6fc4ff;
    text.align = 'right';
    text.y = item.height/2 - (text.textHeight/2);
    item.addChild(text);
    return item;
};

