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
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

	controls = new THREE.DeviceOrientationControls(camera);

	scene = new THREE.Scene();

	//sphere(background)
	geometry = new THREE.SphereGeometry(500, 16, 8);
	geometry.applyMatrix( new THREE.Matrix4().makeScale(-1, 1, 1));
	material = new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture('../three.js_r71/textures/2294472375_24a3b8ef46_o.jpg')
	});
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	//icosahedron
	geometry = new THREE.IcosahedronGeometry(80);
	material = new THREE.MeshBasicMaterial({ color:0x00ffff, wireframe: true, wireframeLinewidth:3 });
	icosahedron = new THREE.Mesh(geometry, material);
	icosahedron.position.z = 200;
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