/***************
 main
***************/

var cv = { 
	'width':window.innerWidth,
	'height': window.innerHeight
};

var game = new Phaser.Game(cv.width, cv.height, Phaser.AUTO, '', { preload: preload, create: create });

function preload () {

	game.load.image('logo', 'assets/phaser.png');

}

function create () {

	var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
	logo.anchor.setTo(0.5, 0.5);

}

function update () {

}

