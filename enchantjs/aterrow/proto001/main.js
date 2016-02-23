/*
* おまじない
*/
enchant();


/*
* 定数
*/
//パラメータ
var SCREEN_WIDTH  = 320; //スクリーンの幅
var SCREEN_HEIGHT = 320; //スクリーンの高さ
//背景
var BACKGROUND_WIDTH  = 2530;
var BACKGROUND_HEIGHT = 320;
//画像
var BACKGROUND_IMAGE = "../../img/aterrow/background.png";
//音
var MAIN_BGM = "../../sound/aterrow/main_bgm001.mp3";
//アセット
var ASSETS = [
	BACKGROUND_IMAGE,
	MAIN_BGM
];

/*
* グローバル変数
*/
var game = null;
var player = null;
var scoreLabel = null;
var timeLabel = null;

/*
* 汎用処理
*/
//ランダム値生成
var randfloat = function(min, max){
	return Math.random()*(max-min)+min;
};

/*
* ゲームオーバー処理
*/
var gameOver = function(rst){
	var score = scoreLabel.score;
	var msg = score+"point 獲得!"+rst;
	game.end(score, msg);
};

/*
* メイン処理
*/
window.onload = function(){
	//ゲームオブジェクト生成
	game = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
	//画像、SEの読み込み
	game.preload(ASSETS);
	
	//ゲーム開始時の処理
	game.onload = function(){
		var scene = game.rootScene;
		scene.backgroundColor = "#3c8";
		
		//横スクロール背景を生成、表示
		var background = new Sprite(BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
		background.image = game.assets[BACKGROUND_IMAGE];
		background.onenterframe = function(){
			//スクロール
			this.x -= 4;
			//端まで行ったら戻す
			if(this.x <= -(BACKGROUND_WIDTH-SCREEN_WIDTH)){
				background.moveTo(0, 0);
			}
		};
		scene.addChild(background);
		
		//シーン切替時の処理
		scene.onenter = function(){
			//ゲームのフレーム初期化
			game.frame = 0;
			
			//BGM再生
			game.assets[MAIN_BGM].play();
			game.assets[MAIN_BGM].src.loop = true;
			
			//プレイヤーを生成、表示
			/*
			player = new Player();
			player.moveTo(20, SCREEN_HEIGHT/2-PLAYER_HEIGHT/2);
			scene.addChild(player);
			*/
			
			//スコア
			scoreLabel = new ScoreLabel(10, 10);
			scoreLabel.score = 0;
			scene.addChild(scoreLabel);
		};
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			
		};
		
	};
	
	game.start();
};

/*
* スコアアップ
*/
var ScoreUpLabel = Class.create(MutableText, {
	//初期化処理
	initialize: function(score){
		MutableText.call(this);
		
		this.text = '+' + score;
		this.time = 0;
	},
	//更新処理
	onenterframe: function(){
		//移動
		this.y -= 0.1;
		//透明度
		this.opacity = 1.0 - (this.time/30);
		
		//削除
		if(this.time > 30){
			this.parentNode.removeChild(this);
		}
		
		this.time += 1;
	}
});