/*
* main.js
*/

//ブラウザがWebGLに対応しているかCheck!
if(!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var mesh;
var stats;
var clock = new THREE.Clock();

init();
animate();

function init() {

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// set stats ---
	setStats();
	// -------------

	camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( -5, -5, 5 );
	camera.up.set( 0, 0, 1 );

	scene = new THREE.Scene();

	var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
	light.position.set( 0, -4, -4 ).normalize();
	scene.add(light);

	var loader = new THREE.ColladaLoader();
		loader.load("../three.js_r71/models/collada/avatar.dae", function(collada){

			collada.scene.traverse(function(child){

				if(child instanceof THREE.SkinnedMesh){

					var animation = new THREE.Animation(child, child.geometry.animation);
					animation.play();

					camera.lookAt(child.position);

				}

			});

			scene.add( collada.scene );

		});

	window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

	requestAnimationFrame(animate);

	THREE.AnimationHandler.update(clock.getDelta());

	renderer.render(scene, camera);

	stats.update();

}

/*
* FPSモニタをセットする関数
* @info 左上に表示するようCSSを記述してbody直下に表示
*/
function setStats(){
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	document.body.appendChild(stats.domElement);
}