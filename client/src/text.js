/**
 * Created by Duko on 02-12-2015.
 */
var rocket = rocket || {};

rocket.createText = function(game, size, string) {
    var text = game.add.text(0, 0, string);

    text.font = 'Roboto Mono';
    text.fontSize = size;
    text.align = 'right';
    text.fill = '#6fc4ff';
    text.setShadow(0, 0, '#0070cf', 8);

    return text;
};
