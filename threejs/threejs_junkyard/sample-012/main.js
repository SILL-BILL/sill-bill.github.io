/*
* main.js
*/

//ブラウザがWebGLに対応しているかCheck!
if(!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var stats;
var axis;
var controls;
var models = { 
	'sphere-001':'',
	'icosahedron-001':'',
	'icosahedron-002':'',
	'icosahedron-003':'',
	'icosahedron-003':''
 };
var fullscreenbtn;


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


//	camera.position.set(300, 300, 300);
//	camera.lookAt({x:0,y:0,z:0});

	//デバイス
	controls = new THREE.DeviceOrientationControls(camera);

	scene = new THREE.Scene();

	// lights
/*
	var light = new THREE.PointLight(0xffffff, 1, 500);
	light.position.set(0, 10, 0);
	scene.add( light );
*/


	//軸オブジェクトの生成
	axis = new THREE.AxisHelper(300);
	//軸オブジェクトのシーンへの追加
	scene.add(axis);

	//球体オブジェクトの生成
	models['sphere-001'] = new THREE.Mesh(
		new THREE.SphereGeometry(500, 30, 30),
		new THREE.MeshBasicMaterial({
			color: 0x00ffff,
			wireframe: true,
			wireframeLinewidth: 3
		})
	);
	scene.add(models['sphere-001']);

	models['icosahedron-001'] = new THREE.Mesh(
		new THREE.IcosahedronGeometry(100),
		new THREE.MeshBasicMaterial({
			color: 0x00ffff,
			wireframe: true,
			wireframeLinewidth: 3
		})
	);
	models['icosahedron-001'].position.z = -280;
	scene.add(models['icosahedron-001']);

	models['icosahedron-002'] = new THREE.Mesh(
		new THREE.IcosahedronGeometry(100),
		new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true,
			wireframeLinewidth: 3
		})
	);
	models['icosahedron-002'].position.x = 280;
	scene.add(models['icosahedron-002']);

	models['icosahedron-003'] = new THREE.Mesh(
		new THREE.IcosahedronGeometry(100),
		new THREE.MeshBasicMaterial({
			color: 0xff00ff,
			wireframe: true,
			wireframeLinewidth: 3
		})
	);
	models['icosahedron-003'].position.z = 280;
	scene.add(models['icosahedron-003']);

	models['icosahedron-004'] = new THREE.Mesh(
		new THREE.IcosahedronGeometry(100),
		new THREE.MeshBasicMaterial({
			color: 0xffff00,
			wireframe: true,
			wireframeLinewidth: 3
		})
	);
	models['icosahedron-004'].position.x = -280;
	scene.add(models['icosahedron-004']);

	//フルスクリーンボタン生成(DOM)
	setFullscreenButton();

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

	models['sphere-001'].rotation.x += 0.005;
	models['icosahedron-001'].rotation.x += 0.005;
	models['icosahedron-001'].rotation.y += 0.01;
	models['icosahedron-002'].rotation.x += 0.005;
	models['icosahedron-002'].rotation.y += 0.01;
	models['icosahedron-003'].rotation.x += 0.005;
	models['icosahedron-003'].rotation.y += 0.01;
	models['icosahedron-004'].rotation.x += 0.005;
	models['icosahedron-004'].rotation.y += 0.01;

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

function setFullscreenButton() {
	fullscreenbtn = document.createElement("div");
	fullscreenbtn.id = "fullscreenbtn";
	fullscreenbtn.innerHTML = "Fullscreen";
	document.body.appendChild(fullscreenbtn);
	fullscreenbtn.addEventListener("click", fullscreen, false);

}