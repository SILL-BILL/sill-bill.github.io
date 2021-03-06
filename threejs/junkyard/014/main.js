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
var particles;

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

	//パーティクル生成
	var geometry = new THREE.Geometry();
	var vertex = new THREE.Vector3(0,0,0);
	geometry.vertices.push(vertex);
	var material = new THREE.PointCloudMaterial({size: 100, color: 0x00ffff, map:createCircleTexture()});
	particles = new THREE.PointCloud(geometry,material);
	scene.add(particles);

	//フルスクリーンボタン生成(DOM)
	setFullscreenButton();

	//windowResize時にメソッドが走るようにイベントをセット
	window.addEventListener('resize', onWindowResize, false);

	render();
}

/*
* 丸のテクスチャ
*/
function createCircleTexture(){

	var canvas = document.createElement('canvas');
	canvas.width = 100;
	canvas.height = 100;

	var context = canvas.getContext('2d');
	context.fillStyle = 'black';
	context.fillRect(0, 0, 100, 100);
	context.fillStyle = 'white';
	context.beginPath();
	context.arc(50, 50, 50, 0, 2*Math.PI, false);
	context.stroke();
	context.closePath();
	context.fill();

	var texture = new THREE.Texture( canvas );
	texture.needsUpdate = true;

	return texture;

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