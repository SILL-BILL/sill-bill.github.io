////////////////////////////////////////////////////////////////////
// windowイベントの定義
////////////////////////////////////////////////////////////////////
window.addEventListener("load", function () {
	resizeTo(516, 539);
	threeStart(); //Three.jsのスタート関数の実行
});


////////////////////////////////////////////////////////////////////
// Three.jsスタート関数の定義
////////////////////////////////////////////////////////////////////
function threeStart() {
	initThree();  //Three.js初期化関数の実行
	initObject(); //オブジェクト初期化関数の実行
	initCamera(); //カメラ初期化関数の実行
	loop();       //無限ループ関数の実行
}


////////////////////////////////////////////////////////////////////
// Three.js初期化関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var renderer,    //レンダラーオブジェクト
    scene,       //シーンオブジェクト
    canvasFrame; //キャンバスフレームのDOM要素
function initThree() {
	//キャンバスフレームDOM要素の取得
	canvasFrame = document.getElementById('canvas-frame');
	//レンダラーオブジェクトの生成
	renderer = new THREE.WebGLRenderer({ antialias: true });
	if(!renderer){
		alert('Three.js の初期化に失敗しました');
	}
	
	//レンダラーのサイズの設定
	renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight);
	//キャンバスフレームDOM要素にcanvas要素を追加
	canvasFrame.appendChild(renderer.domElement);

	//レンダラークリアーカラーの設定
	renderer.setClearColor(0xEEEEEE, 1.0);

	//シーンオブジェクトの生成
	scene = new THREE.Scene();
}


////////////////////////////////////////////////////////////////////
// カメラ初期化関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var camera;    //カメラオブジェクト
function initCamera() {
	//カメラオブジェクトの生成
	camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth / canvasFrame.clientHeight, 1, 10000);
	//カメラの位置の設定
	camera.position = new THREE.Vector3(100, 100, 100);
	//カメラの上ベクトルの設定
	camera.up = new THREE.Vector3(0, 1, 0);
	//カメラの中心位置ベクトルの設定
	camera.lookAt({ x: 0, y: 0, z: 0 }); //トラックボール利用時は自動的に無効
	
	//トラックボールオブジェクトの宣言
	trackball = new THREE.TrackballControls(camera, canvasFrame);
	
	//トラックボール動作範囲のサイズとオフセットの設定
	trackball.screen.width = canvasFrame.clientWidth;                        //横幅
	trackball.screen.height = canvasFrame.clientHeight;                      //縦幅
	trackball.screen.offsetLeft = canvasFrame.getBoundingClientRect().left;  //左オフセット
	trackball.screen.offsetTop = canvasFrame.getBoundingClientRect().top;    //右オフセット
	
	//トラックボールの回転無効化と回転速度の設定
	trackball.noRotate = false;
	trackball.rotateSpeed = 4.0;
	
	//トラックボールの拡大無効化と拡大速度の設定
	trackball.noZoom = false;
	trackball.zoomSpeed = 4.0;
	
	//トラックボールのカメラ中心移動の無効化と中心速度の設定
	trackball.noPan = false;
	trackball.panSpeed = 1.0;
	trackball.target = new THREE.Vector3(0, 0, 0);
	
	//トラックボールのスタティックムーブの有効化
	trackball.staticMoving = true;
	//トラックボールのダイナミックムーブ時の減衰定数
	trackball.dynamicDampingFactor = 0.3;
}


////////////////////////////////////////////////////////////////////
// 光源初期化関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var directionalLight;  //平行光源オブジェクト
var lighthelper;//平行光源可視化オブジェクト
function initLight() {
	//平行光源オブジェクトの生成
	directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
	//平行光源オブジェクトの位置の設定
	directionalLight.position.set( -20, -20, 50);

	//平行光源オブジェクトのシーンへの追加
	scene.add(directionalLight);

/*
	//平行光源可視化オブジェクトの生成
	lighthelper = new THREE.DirectionalLightHelper(directionalLight, 10);
	//平行光源可視化オブジェクトのシーンへの追加
	scene.add(lighthelper);
*/
}

////////////////////////////////////////////////////////////////////
// オブジェクト初期化関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var axis; //軸オブジェクト
var LeePerrySmith; //3次元オブジェクト
function initObject() {
	//軸オブジェクトの生成
	axis = new THREE.AxisHelper(100);
	//軸オブジェクトのシーンへの追加
	scene.add(axis);
	//軸オブジェクトの位置座標を設定
	axis.position.set(0, 0, 0);
	
	//ローダーオブジェクト
	var loader = new THREE.JSONLoader( true );
	//ローダーステータスの表示要素の追加
	document.body.appendChild( loader.statusDomElement );
	//データロードを実行
	loader.load(
		"../../javascript/obj/leeperrysmith/LeePerrySmith.js",
		function(geometry){
			//材質オブジェクトの宣言と生成
			var material = new THREE.MeshNormalMaterial();
			//スミス氏オブジェクトの生成
			LeePerrySmith = new THREE.Mesh(geometry, material);
			//スケールの指定
			LeePerrySmith.scale.set(10, 10,10);
			//スミス氏オブジェクトのシーンへの追加
			scene.add(LeePerrySmith);
			//ローダーステータスの表示要素の削除
			loader.statusDomElement.style.display = "none";
		}
	);
	
}


////////////////////////////////////////////////////////////////////
// 無限ループ関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var step = 0; //ステップ数
function loop() {
	//トラックボールによるカメラオブジェクトのプロパティの更新
	trackball.update();
	
	//ステップ数のインクリメント
	step++;
	
	//クリアーカラーで初期化
	renderer.clear();
	//レンダリング
	renderer.render(scene, camera);
	
	//「loop()」関数の呼び出し
	requestAnimationFrame(loop);
}