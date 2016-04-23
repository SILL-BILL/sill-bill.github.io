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
		PIXI.Texture.fromImage('/common/img/kv-particles/smoke/001.png'),
		PIXI.Texture.fromImage('/common/img/kv-particles/smoke/002.png')
	],

	{
		"alpha": {
			"start": 0.6,
			"end": 0
		},
		"scale": {
			"start": 5,
			"end": 3,
			"minimumScaleMultiplier": 3
		},
		"color": {
			"start": "#5e9bd9",
			"end": "#419bfc"
		},
		"speed": {
			"start": 10,
			"end": 10
		},
		"acceleration": {
			"x": 0,
			"y": 0
		},
		"startRotation": {
			"min": 0,
			"max": 360
		},
		"rotationSpeed": {
			"min": 0,
			"max": 0
		},
		"lifetime": {
			"min": 2,
			"max": 1.8
		},
		"blendMode": "screen",
		"frequency": 0.08,
		"emitterLifetime": -1,
		"maxParticles": 50,
		"pos": {
			"x": -512,
			"y": -340
		},
		"addAtBack": true,
		"spawnType": "rect",
		"spawnRect": {
			"x": 0,
			"y": 0,
			"w": 1024,
			"h": 680
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