/*
* main.js
*/

//ブラウザがWebGLに対応しているかCheck!
if(!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var stats;
var axis;
var controls;
var fullscreenbtn;
var card;

init();
animate();

function init() {

//	renderer = new THREE.WebGLRenderer();
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// set stats ---
	setStats();
	// -------------

	// camera
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

	camera.position.set(800, 300, 800);
	camera.lookAt({x:0,y:0,z:0});

	//オービット
	controls = new THREE.OrbitControls(camera);
//	controls.autoRotate = true;

	//デバイス
//	controls = new THREE.DeviceOrientationControls(camera);

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

	//プレーンオブジェクト生成
	card = new THREE.mesh(
		new THREE.PlaneGeometry(50),
		new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture('../three.js_r71/textures/ffxiv/ffxiv_ava-001.png')
		})
	);
	scene.add(card);

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