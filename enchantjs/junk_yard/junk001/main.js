/*
* おまじない
*/
enchant();


/*
* 定数
*/
//パラメータ
var SCREEN_WIDTH  = 320;	//スクリーンの幅
var SCREEN_HEIGHT = 320;	//スクリーンの高さ
var SCORE_VALUE = 0;		//スコア値
var LIMIT_TIME = 60;		//残りタイム
//アセット
var ASSETS = [];


/*
* グローバル変数
*/
var game   = null;
var player = null;


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
	//画像の読み込み
	game.preload(ASSETS);
	
	//ゲーム開始時の処理
	game.onload = function(){
		var scene = game.rootScene;
		scene.backgroundColor = "#8c8";
		
		// スコア表示用ラベルの生成, 表示
		var scoreText = new Label("");
		scoreText.font = "18px 'Meiryo', 'メイリオ', 'ヒラギノ角ゴ Pro W3', sans-serif";
		scoreText.color   = "black";
		scoreText.moveTo(10, 10);
		scene.addChild(scoreText);
		
		// タイマー表示用ラベルの生成, 表示
		var timerText = new Label("");
		timerText.font = "18px 'Meiryo', 'メイリオ', 'ヒラギノ角ゴ Pro W3', sans-serif";
		timerText.color   = "black";
		timerText.moveTo(200, 10);
		scene.addChild(timerText);
		
		// タイマーの残り時間を初期化
		game.timer = 0;
		
		//スコア値をセット
		game.scoreValue = SCORE_VALUE;
		
		//ボタンを生成、表示
		var buttonA = new Button("連打！","blue",null,"160");
		buttonA.moveTo(SCREEN_WIDTH/2-buttonA.width/2, SCREEN_HEIGHT-50);
		buttonA.ontouchstart = function(){
			game.scoreValue += 1;
		}
		
		scene.addChild(buttonA);
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			// スコア表示用ラベル更新
			scoreText.text = "SCORE: " + game.scoreValue;
			//タイマーの残り時間を計算
			game.timer = LIMIT_TIME - Math.floor(game.frame/game.fps);
			// タイマー表示用ラベル更新
			timerText.text = "TIME: " + game.timer;
			
			if(game.timer == 0){
				console.log('終了!');
			}
		};
	};
	
	game.start();
};