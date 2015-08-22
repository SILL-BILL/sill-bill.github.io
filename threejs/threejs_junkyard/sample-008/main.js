/*
* main.js
*/

//ブラウザがWebGLに対応しているかCheck!
if(!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var mesh, geometry, icosahedron;
var stats;
var controls;

init();
animate();

function init() {

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// set stats ---
	setStats();
	// -------------

	// camera
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

//	controls = new THREE.DeviceOrientationControls(camera);

	scene = new THREE.Scene();

	// lights
	var light = new THREE.PointLight(0xffffff, 1, 500);
	light.position.set(0, 10, 0);
	scene.add( light );

	light = new THREE.AmbientLight( 0x222222 );
	scene.add( light );

	//sphere(background)
	// collada load & Add
	var loader = new THREE.ColladaLoader();
	loader.load("../three.js_r71/models/collada/fukuya/fukuya_low.dae", function(collada){

		scene.add(collada.scene);

/* model rotate */
collada.scene.rotation.z = (90 * (Math.PI / 180));
console.dir(collada);

	});

	//icosahedron
	geometry = new THREE.IcosahedronGeometry(10);
	material = new THREE.MeshBasicMaterial({ color:0x00ffff, wireframe: true, wireframeLinewidth:3 });
	icosahedron = new THREE.Mesh(geometry, material);
	icosahedron.position.z = 30;
	scene.add(icosahedron);

	//windowをクリック時にフルスクリーン
	window.addEventListener('click', fullscreen, false);

	//windowResize時にメソッドが走るようにイベントをセット
	window.addEventListener('resize', onWindowResize, false);

	render();

}

function fullscreen() {
	if (renderer.domElement.requestFullscreen) {
		renderer.domElement.requestFullscreen();
	} else if (renderer.domElement.msRequestFullscreen) {
		renderer.domElement.msRequestFullscreen();
	} else if (renderer.domElement.mozRequestFullScreen) {
		renderer.domElement.mozRequestFullScreen();
	} else if (renderer.domElement.webkitRequestFullscreen) {
		renderer.domElement.webkitRequestFullscreen();
	}
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	render();

}

function animate() {

	requestAnimationFrame(animate);

	icosahedron.rotation.x += 0.005;
	icosahedron.rotation.y += 0.01;

//	controls.update();

	stats.update();

	render();

}

function render(){

	renderer.render(scene, camera);

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