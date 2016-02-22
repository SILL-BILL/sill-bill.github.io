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
var CUBE_TOUCH_SE = "../../sound/3d/se9.mp3";


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
	game.preload(MAIN_BGM, CUBE_TOUCH_SE);
	
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
		
		//スコアラベル
		var scoreLabel = null;
		
		//ライフラベル
		var lifeLabel = null;
		
		//シーン切替時処理
		game.rootScene.onenter = function(){
			//フレーム数をリセット
			game.frame = 0;
			
			//スコアラベルを生成・表示
			scoreLabel = new ScoreLabel();
			scoreLabel.score = 0;
			scoreLabel.moveTo(20, 20);
			game.rootScene.addChild(scoreLabel);
			
			//ライフラベルを生成・表示
			lifeLabel = new LifeLabel(450, 20, 5);
			lifeLabel.life = 5;	//ライフをセット
			game.rootScene.addChild(lifeLabel);
			
			//BGM再生
			game.assets[MAIN_BGM].play();
			game.assets[MAIN_BGM].src.loop = true;
			
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
						
						//ライフを減らす
						lifeLabel.life -= 1;
						
						//ゲームオーバーチェック
						if(lifeLabel.life <= 0){
							var score = scoreLabel.score;
							var msg = score + "point を獲得しました!!";
							game.end(score, msg);
						}
					}
				};
				//キューブタッチ開始時の処理
				cube.ontouchstart = function(){
					//スコアアップ
					scoreLabel.score += 100;
					//SE再生
					game.assets[CUBE_TOUCH_SE].clone().play();
					//削除
					this.parentNode.removeChild(this);
				};
				scene.addChild(cube);
			}
		};
		
	};
	
	game.start();
};