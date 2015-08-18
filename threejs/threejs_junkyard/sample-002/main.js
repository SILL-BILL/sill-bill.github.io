/*
* main.js
*/

var camera, scene, renderer;
var mesh;
var stats;

init();
animate();

function init() {

	//ブラウザがWebGLに対応しているかCheck!
	if(!Detector.webgl) Detector.addGetWebGLMessage();

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// set stats ---
	setStats();
	// -------------

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 900;

	scene = new THREE.Scene();

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

	requestAnimationFrame( animate );

	renderer.render( scene, camera );

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