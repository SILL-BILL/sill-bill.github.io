var cv_wrap  = document.getElementById("cv_wrap");
var cvWidth  = cv_wrap.offsetWidth | 0;
var cvHeight = cv_wrap.offsetHeight | 0;

/*
console.dir(cv_wrap);
console.log('cvWidth：'+cvWidth);
console.log('cvHeight：'+cvHeight);
*/

var renderer = PIXI.autoDetectRenderer(cvWidth, cvHeight, { transparent: true });

cv_wrap.appendChild(renderer.view);

// create the root of the scene graph
var container = new PIXI.Container();

var emitter = new cloudkid.Emitter(
	container,

	[
		PIXI.Texture.fromImage('/common/img/kv-particles/bubble.png'),
		PIXI.Texture.fromImage('/common/img/kv-particles/bubble2.png'),
		PIXI.Texture.fromImage('/common/img/kv-particles/bubble3.png')
	],

	{
		"alpha": {
			"start": 0,
			"end": 0.22
		},
		"scale": {
			"start": 0.25,
			"end": 0.5,
			"minimumScaleMultiplier": 0.5
		},
		"color": {
			"start": "#ffffff",
			"end": "#ffffff"
		},
		"speed": {
			"start": 50,
			"end": 50
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
		"maxParticles": 300,
		"pos": {
			"x": 0,
			"y": 0
		},
		"addAtBack": false,
		"spawnType": "rect",
		"spawnRect": {
			"x": -450,
			"y": 200,
			"w": 2048,
			"h": 0
		}
	}
);

/*
console.log('cvWidth / 2 = '+(cvWidth / 2));
console.log('cvHeight / 2 = '+(cvHeight / 2));
*/

emitter.updateOwnerPos((cvWidth / 2), (cvHeight / 2));
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