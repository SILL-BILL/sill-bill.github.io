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
	draw();       //描画関数の実行
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
	renderer = new THREE.WebGLRenderer();
	//renderer = new THREE.CanvasRenderer();//<-----------------------------------------------------（canvasレンダラー）
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
	camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth / canvasFrame.clientHeight, 1, 1000);
	//カメラの位置の設定
	camera.position = new THREE.Vector3(100, 100, 100);
	//カメラの上ベクトルの設定
	camera.up = new THREE.Vector3(0, 1, 0);
	//カメラの中心位置ベクトルの設定
	camera.lookAt({ x: 0, y: 0, z: 0 }); //トラックボール利用時は自動的に無効
}


////////////////////////////////////////////////////////////////////
// オブジェクト初期化関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var axis; //軸オブジェクト
function initObject() {
	//軸オブジェクトの生成
	axis = new THREE.AxisHelper(100);
	//軸オブジェクトのシーンへの追加
	scene.add(axis);
	//軸オブジェクトの位置座標を設定
	axis.position = new THREE.Vector3(0, 0, 0);
}


////////////////////////////////////////////////////////////////////
// 描画関数の定義
////////////////////////////////////////////////////////////////////
function draw() {
	//レンダリング
	renderer.render(scene, camera);
}