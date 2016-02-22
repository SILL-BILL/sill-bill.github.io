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
//BGM,SE
var MAIN_BGM = "../../sound/3d/bgm03.mp3";
var GAME_OVER_SE = "../../sound/3d/se5.mp3";


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
	//サウンドを読み込む
	game.preload(MAIN_BGM, GAME_OVER_SE);
	
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
		
		//プレイヤー
		var player = new Sphere();
		player.translate(0, 0, -20);
		scene.addChild(player);
		
		//画面タッチ移動時の処理
		game.rootScene.addEventListener("touchmove", function(e){
			//座標変換
			var x = e.x/SCREEN_WIDTH*2 - 1;
			var y = (e.y/SCREEN_HEIGHT*2 -1)*-1;
			
			player.x = x*5;
			player.y = y*5;
		});
		
		//タイムラベル
		var timeLabel = null;
		
		//シーン切替時処理
		game.rootScene.onenter = function(){
			//フレーム数をリセット
			game.frame = 0;
			
			//タイムラベルを生成・表示
			timeLabel = new TimeLabel(20, 20);
			game.rootScene.addChild(timeLabel);
			
			//BGM再生
			game.assets[MAIN_BGM].play();
			game.assets[MAIN_BGM].src.loop = true;
			
		};
		
		//シーン更新処理
		game.rootScene.onenterframe = function(){
			if(game.frame % 5 == 0){
				//キューブ生成
				var cube = new Cube();
				cube.x = randfloat(-5, 5);
				cube.y = randfloat(-5, 5);
				cube.z = -60;
				//キューブ更新処理
				cube.onenterframe = function(){
					//移動
					this.z += 1;
					
					//プレイヤーとの衝突判定
					if(this.intersect(player) === true){
						//MAIN_BGMを停止
						game.assets[MAIN_BGM].stop();
						
						//SE再生
						game.assets[GAME_OVER_SE].play();
						
						var score = timeLabel.time*100;
						var msg = score + "point を獲得しました!!";
						game.end(score, msg);
					}
					
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