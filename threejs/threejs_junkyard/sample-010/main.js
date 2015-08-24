/*
* main.js
*/

//ブラウザがWebGLに対応しているかCheck!
if(!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var mesh, geometry, icosahedron, plane;
var clock = new THREE.Clock();
var stats;
var controls;
var axis;



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


	camera.position.set(300, 300, 300);
	camera.lookAt({x:0,y:0,z:0});

	//デバイス
//	controls = new THREE.DeviceOrientationControls(camera);

	//トラックボールオブジェクトの宣言
	controls = new THREE.TrackballControls(camera);
	//トラックボールの回転無効化と回転速度の設定
	controls.noRotate = false;
	controls.rotateSpeed = 4.0;
	//トラックボールの拡大無効化と拡大速度の設定
	controls.noZoom = false;
	controls.zoomSpeed = 4.0;
	//トラックボールのカメラ中心移動の無効化と中心速度の設定
	controls.noPan = false;
	controls.panSpeed = 1.0;
	controls.target = new THREE.Vector3(0, 0, 0);
	//トラックボールのスタティックムーブの有効化
	controls.staticMoving = true;
	//トラックボールのダイナミックムーブ時の減衰定数
	controls.dynamicDampingFactor = 0.3;

	scene = new THREE.Scene();

	// lights
/*
	var light = new THREE.PointLight(0xffffff, 1, 500);
	light.position.set(0, 10, 0);
	scene.add( light );
*/

	var light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.position.set(-1000, 1000, -1000).normalize();
	scene.add(light);

	var light2 = new THREE.DirectionalLight(0xffffff, 0.4);
	light2.position.set(1000, 1000, 1000).normalize();
	scene.add(light2);

	var light3 = new THREE.DirectionalLight(0xffffff, 0.2);
	light3.position.set(-1000, -1000, -1000).normalize();
	scene.add(light3);

	light4 = new THREE.AmbientLight(0x222222);
	scene.add(light4);


	//軸オブジェクトの生成
	axis = new THREE.AxisHelper(300);
	//軸オブジェクトのシーンへの追加
	scene.add(axis);

	// collada load & Add
	var loader = new THREE.ColladaLoader();
	loader.load("../three.js_r71/models/collada/pina/pina_sit.dae", function(collada){
/*
		collada.scene.traverse(function(child){

			if(child instanceof THREE.SkinnedMesh){

				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();

				camera.lookAt(child.position);

			}

		});
*/
		scene.add(collada.scene);

		/* model rotate */
		collada.scene.rotation.x = (270 * (Math.PI / 180));

	});

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