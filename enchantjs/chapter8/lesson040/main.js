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
		camera.z = 10;					//カメラ位置をセット
		//注視点をセット
		scene.setCamera(camera);		//sceneにセット
		
		//シーン切替時処理
		game.rootScene.onenter = function(){
			//フレーム数をリセット
			game.frame = 0;
		};
		
		//シーン更新処理
		game.rootScene.onenterframe = function(){
			if(game.frame % 15 == 0){
				//キューブ生成
				var cube = new Cube();
				cube.x = randfloat(-5, 5);
				cube.y = randfloat(-5, 5);
				cube.z = -60;
				//キューブ更新処理
				cube.onenterframe = function(){
					//移動
					this.z += 1;
					
					//カメラより後ろに来たら削除する
					if(this.z > 10){
						this.parentNode.removeChild(this);
					}
				};
				scene.addChild(cube);
			}
		};
		
	};
	
	game.start();
};