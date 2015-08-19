/*
* main.js
*/

//ブラウザがWebGLに対応しているかCheck!
if(!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var mesh, geometry;
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
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

	controls = new THREE.DeviceOrientationControls(camera);

	scene = new THREE.Scene();

	var geometry = new THREE.SphereGeometry( 500, 16, 8 );

	var material = new THREE.MeshBasicMaterial( {
		map: THREE.ImageUtils.loadTexture( '../three.js_r71/textures/2294472375_24a3b8ef46_o.jpg')
	} );

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	//windowResize時にメソッドが走るようにイベントをセット
	window.addEventListener('resize', onWindowResize, false);

	render();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	render();

}

function animate() {

	requestAnimationFrame(animate);
	controls.update();
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