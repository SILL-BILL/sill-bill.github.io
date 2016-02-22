/*
* おまじない
*/
enchant();


/*
* 定数
*/
//パラメータ
var SCREEN_WIDTH  = 640; //スクリーンの幅
var SCREEN_HEIGHT = 640; //スクリーンの高さ


/*
* グローバル変数
*/
var game = null;


/*
* 汎用処理
*/
//ランダム値生成
var randfloat = function(min, max){
	return Math.random()*(max-min)+min;
};


/*
* メイン処理
*/
window.onload = function(){
	//ゲームオブジェクト生成
	game = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	//ゲーム開始時の処理
	game.onload = function(){
		//3D用シーン生成
		var scene = new Scene3D();
		
		//ライト生成
		var light = new DirectionalLight();	//平行光源生成
		light.directionZ = 1;				//向き
		light.color = [1.0, 1.0, 1.0];		//色
		scene.setDirectionalLight(light);	//sceneにセット
		
		//カメラ生成
		var camera = new Camera3D();	//カメラ生成
		camera.x = 0;					//カメラ位置をセット
		camera.y = 0;					//カメラ位置をセット
		camera.z = 32;					//カメラ位置をセット
		//注視点をセット
		scene.setCamera(camera);		//sceneにセット
		
		//球体
		var sphere = new Sphere();		//生成
		scene.addChild(sphere);			//sceneにセット
		
		//立方体
		var cube = new Cube();			//生成
		cube.translate(-4, 0, 0);		//移動
		scene.addChild(cube);			//sceneにセット
		
		//円柱
		var cylinder = new Cylinder();	//生成
		cylinder.translate(4, 0, 0);	//移動
		scene.addChild(cylinder);		//sceneにセット
		
		//シーン更新処理
		game.rootScene.onenterframe = function(){
			//変換用変数
			var base_num   = Math.sin(game.frame*10 * Math.PI/180);
			var trans_num  = base_num*0.5;
			var rotate_num = game.frame * Math.PI/180;
			var scale_num  = 1+base_num*0.1;
			
			//移動
			sphere.translate(0, trans_num, 0);
			//回転
			cube.rotatePitch(rotate_num);
			//拡縮
			cylinder.scale(scale_num, scale_num, scale_num);
		};
	};
	
	game.start();
};