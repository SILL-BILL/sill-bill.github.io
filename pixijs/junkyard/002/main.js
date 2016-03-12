
var windowWidth  = window.innerWidth | 0;
var windowHeight = window.innerHeight | 0;

console.log('windowWidth：'+windowWidth);
console.log('windowHeight：'+windowHeight);


var renderer = PIXI.autoDetectRenderer(windowWidth, windowHeight, { transparent: true });

document.body.appendChild(renderer.view);

// create the root of the scene graph
var container = new PIXI.Container();

var emitter = new cloudkid.Emitter(
	container,

	[
		PIXI.Texture.fromImage('../src/img/particles/bubble.png'),
		PIXI.Texture.fromImage('../src/img/particles/bubble2.png'),
		PIXI.Texture.fromImage('../src/img/particles/bubble3.png')
	],

	{
		"alpha": {
			"start": 0.3,
			"end": 0
		},
		"scale": {
			"start": 0.5,
			"end": 1,
			"minimumScaleMultiplier": 0.3
		},
		"color": {
			"start": "#ffffff",
			"end": "#ffffff"
		},
		"speed": {
			"start": 100,
			"end": 100
		},
		"acceleration": {
			"x": 0,
			"y": 0
		},
		"startRotation": {
			"min": 260,
			"max": 280
		},
		"rotationSpeed": {
			"min": 0,
			"max": 50
		},
		"lifetime": {
			"min": 5,
			"max": 10
		},
		"blendMode": "normal",
		"frequency": 0.016,
		"emitterLifetime": -1,
		"maxParticles": 50,
		"pos": {
			"x": 0,
			"y": 0
		},
		"addAtBack": false,
		"spawnType": "ring",
		"spawnCircle": {
			"x": 0,
			"y": 0,
			"r": 360,
			"minR": 0
		}
	}
);

console.log('windowWidth / 2 = '+(windowWidth / 2));
console.log('windowHeight / 2 = '+(windowHeight / 2));

emitter.updateOwnerPos((windowWidth / 2), (windowHeight / 2));
//emitter.updateOwnerPos(250, 380);

var elapsed = Date.now();
 
var update = function(){

	var now = Date.now();
	emitter.update((now - elapsed) * 0.001);
	elapsed = now;
 
	renderer.render(container);

	requestAnimationFrame(update);
};

emitter.emit = true;
 
update();