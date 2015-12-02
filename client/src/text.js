/**
 * Created by Duko on 02-12-2015.
 */
var rocket = rocket || {};

rocket.createText = function(game, size, string) {
    var text = game.add.text(0, 0, string);

    text.font = 'Roboto Mono';
    text.fontSize = size;
    text.align = 'right';
    text.fill = '#7ac8ff';
    text.setShadow(0, 0, '#00d2ff', 8);

    return text;
};
