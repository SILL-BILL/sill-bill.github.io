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
// 画像
var FIELD_IMAGE = "../../img/barrage/bg_galaxy.png";
var BUTTON_IMAGE = "../../img/barrage/btn_barrage_ico.png";
//アセット
var ASSETS = [ 
	FIELD_IMAGE,
	BUTTON_IMAGE
];


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
		
		// 背景を生成, 表示
		var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
		bg.image = game.assets[FIELD_IMAGE];
		scene.addChild(bg);
		
		// スコア表示用ラベルの生成, 表示
		var scoreText = new Label("");
		scoreText.font = "18px 'Meiryo', 'メイリオ', 'ヒラギノ角ゴ Pro W3', sans-serif";
		scoreText.color   = "#fff";
		scoreText.moveTo(10, 10);
		scene.addChild(scoreText);
		
		// タイマー表示用ラベルの生成, 表示
		var timerText = new Label("");
		timerText.font = "18px 'Meiryo', 'メイリオ', 'ヒラギノ角ゴ Pro W3', sans-serif";
		timerText.color   = "#fff";
		timerText.moveTo(200, 10);
		scene.addChild(timerText);
		
		// タイマーの残り時間を初期化
		game.timer = 0;
		
		//スコア値をセット
		game.scoreValue = SCORE_VALUE;
		
		//ボタンを生成、表示
		var buttonA = new Sprite(154,32);
		buttonA.image = game.assets[BUTTON_IMAGE];
		buttonA.moveTo(SCREEN_WIDTH/2-buttonA.width/2, SCREEN_HEIGHT-50);
		buttonA.ontouchstart = function(){
			game.scoreValue += 1;
			this.frame =1;
		}
		buttonA.ontouchend = function(){
			this.frame =0;
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