/*
* main.js
*/

//ブラウザがWebGLに対応しているかCheck!
if(!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var mesh;
var stats;
var clock = new THREE.Clock();
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
	camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(-5, -5, 5);
	camera.up.set(0, 0, 1);

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

	controls.addEventListener('change', render);

	scene = new THREE.Scene();

	// lights

	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, -4, -4);
	scene.add(light);

	light = new THREE.AmbientLight(0x222222);
	scene.add(light);

	// collada load & Add
	var loader = new THREE.ColladaLoader();
	loader.load("../three.js_r71/models/collada/avatar.dae", function(collada){

		collada.scene.traverse(function(child){

			if(child instanceof THREE.SkinnedMesh){

				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();

//				camera.lookAt(child.position);

			}

		});

		scene.add(collada.scene);

	});

	//windowResize時にメソッドが走るようにイベントをセット
	window.addEventListener('resize', onWindowResize, false);

	render();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	controls.handleResize();

	render();

}

function animate() {

	requestAnimationFrame(animate);
	THREE.AnimationHandler.update(clock.getDelta());
	controls.update();

}

function render(){

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