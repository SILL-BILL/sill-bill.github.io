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
	'tetrahedron-001':'',
	'octahedron-001':'',
	'cube-001':''
 };
var video;
var texture;
var playbtn, fullscreenbtn;


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

	//トラックボールオブジェクトの宣言
//	controls = new THREE.TrackballControls(camera);
	//トラックボールの回転無効化と回転速度の設定
//	controls.noRotate = false;
//	controls.rotateSpeed = 4.0;
	//トラックボールの拡大無効化と拡大速度の設定
//	controls.noZoom = false;
//	controls.zoomSpeed = 4.0;
	//トラックボールのカメラ中心移動の無効化と中心速度の設定
//	controls.noPan = false;
//	controls.panSpeed = 1.0;
//	controls.target = new THREE.Vector3(0, 0, 0);
	//トラックボールのスタティックムーブの有効化
//	controls.staticMoving = true;
	//トラックボールのダイナミックムーブ時の減衰定数
//	controls.dynamicDampingFactor = 0.3;

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

	video = document.createElement('video');
	video.width = 1280;
	video.height = 720;
	video.autoplay = true;
	video.loop = true;
	video.src = "../three.js_r71/textures/digbulid/digbulid.webm";

	texture = new THREE.VideoTexture(video);
	texture.minFilter = THREE.LinearFilter;

	models['sphere-001'] = new THREE.Mesh(
//		new THREE.SphereGeometry(500, 16, 8),
		new THREE.SphereGeometry(500, 30, 30),
		new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide
		})
	);

	scene.add(models['sphere-001']);

	//windowをクリック時にフルスクリーン
//	window.addEventListener('click', fullscreen, false);

	//フルスクリーンボタン生成(DOM)
	setFullscreenButton();

	//動画再生ボタン生成(DOM)
	setPlayButton();

//	window.addEventListener('click', playVideo, false);

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

console.log('fullscreen!');
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	render();

}

function playVideo(){
	video.play();

console.log('play!');
}

function animate() {

	requestAnimationFrame(animate);

//	THREE.AnimationHandler.update(clock.getDelta());

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

function setPlayButton() {
	playbtn = document.createElement("a");
	playbtn.id = "playbtn";
	playbtn.innerHTML = "Play";
	playbtn.addEventListener("click", playVideo(), false);
	document.body.appendChild(playbtn);

console.dir(playbtn);
}

function setFullscreenButton() {
	fullscreenbtn = document.createElement("a");
	fullscreenbtn.id = "fullscreenbtn";
	fullscreenbtn.innerHTML = "Fullscreen";
	fullscreenbtn.addEventListener("click", fullscreen(), false);
	document.body.appendChild(fullscreenbtn);

console.dir(fullscreenbtn);
}