/*
* main.js
*/
var renderer = PIXI.autoDetectRenderer(320,320,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('avater-hatkadoll02-wh500.png');

// create a new Sprite using the texture
var hatkadoll02 = new PIXI.Sprite(texture);

// center the sprite's anchor point
hatkadoll02.anchor.x = 0.5;
hatkadoll02.anchor.y = 0.5;

// move the sprite to the center of the screen
hatkadoll02.position.x = 160;
hatkadoll02.position.y = 160;
hatkadoll02.scale.x = 0.4;
hatkadoll02.scale.y = 0.4;

stage.addChild(hatkadoll02);

// start animating
animate();
function animate() {
	requestAnimationFrame(animate);

	// just for fun, let's rotate mr rabbit a little
	hatkadoll02.rotation += 0.05;

	// render the container
	renderer.render(stage);
}