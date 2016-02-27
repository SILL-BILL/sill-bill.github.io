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
//ロゴ
var LOGO_WIDTH  = 42;
var LOGO_HEIGHT = 42;
//画像
var BACKGROUND_IMAGE = "../../img/banner/bg_001.png";
var LOGO_IMAGE = "../../img/banner/logo_001.png";
//アセット
var ASSETS = [
	BACKGROUND_IMAGE,
	LOGO_IMAGE
];

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
			this.x -= 2;
			//端まで行ったら戻す
			if(this.x <= -(BACKGROUND_WIDTH-SCREEN_WIDTH)){
				background.moveTo(0, 0);
			}
		};
		scene.addChild(background);
		
		//ロゴ1を生成、表示
		var logoRaku = new Sprite(42, 42);
		logoRaku.image = game.assets[LOGO_IMAGE];
		logoRaku.frame = 0;
		logoRaku.moveTo(SCREEN_HEIGHT/2-(LOGO_HEIGHT*2)/2, SCREEN_HEIGHT/2-LOGO_HEIGHT/2);
		scene.addChild(logoRaku);
		
		//ロゴ2を生成、表示
		var logoKen = new Sprite(42, 42);
		logoKen.image = game.assets[LOGO_IMAGE];
		logoKen.frame = 1;
		logoKen.moveTo(logoRaku.x+42, logoRaku.y);
		scene.addChild(logoKen);
		
		
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			
		};
		
	};
	
	game.start();
};