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
//ボード
var BOARD_WIDTH   = 192;	//幅
var BOARD_HEIGHT  = 192;	//高さ
//オーブ
var ORB_WIDTH   = 24;	//幅
var ORB_HEIGHT  = 24;	//高さ
var ORB_MAX_ROW = 8;
var ORB_MAX_COL = 8;
//背景
var BACKGROUND_WIDTH  = 320;
var BACKGROUND_HEIGHT = 320;
//画像
var ORB_IMAGE = "../../img/orb-break/orb.png";
var BOARD_IMAGE  = "../../img/orb-break/board.png";
var BACKGROUND_IMAGE = "../../img/orb-break/bg_001.png";
//アセット
var ASSETS = [
	ORB_IMAGE,
	BOARD_IMAGE,
	BACKGROUND_IMAGE
];
/*
* グローバル変数
*/
var game = null;
var scoreLabel = null;
var arrOrb = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
];

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
		scene.backgroundColor = "#000";
		
		//背景を生成、表示
		var background = new Sprite(BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
		background.image = game.assets[BACKGROUND_IMAGE];
		scene.addChild(background);
		
		//ボードを生成、表示
		var board = new Sprite(BOARD_WIDTH, BOARD_HEIGHT);
		board.image = game.assets[BOARD_IMAGE];
		board.moveTo((BACKGROUND_WIDTH-BOARD_WIDTH)/2, (BACKGROUND_HEIGHT-BOARD_HEIGHT)/2);
		scene.addChild(board);
		
		//シーン切替時の処理
		scene.onenter = function(){
			//ゲームのフレーム初期化
			game.frame = 0;
			
			//スコア
			scoreLabel = new ScoreLabel(10, 10);
			scoreLabel.score = 0;
			scene.addChild(scoreLabel);
			
			//オーブの生成・表示
			for(var r=0; r<ORB_MAX_ROW; r++){
				for(var c=0; c<ORB_MAX_COL; c++){
					arrOrb[r][c] = new Orb(Math.floor(randfloat(0, 7)));
					arrOrb[r][c].moveTo(board.x+(ORB_WIDTH*c), board.y+(ORB_HEIGHT*r));
					scene.addChild(arrOrb[r][c]);
				}
			}
		};
		
	};
	
	game.start();
};

/*
* オーブ
*/
var Orb = Class.create(Sprite, {
	//初期化処理
	initialize: function(num){
		Sprite.call(this, ORB_WIDTH, ORB_HEIGHT);
		this.image = game.assets[ORB_IMAGE];
		this.frame = num;
		this.type  = num;
	},
	//更新処理
	onenterframe: function(){
		
	},
	//タッチスタート
	ontouchstart: function(){
		console.dir(this.type);
		this.opacity = 0.5;
	},
	//タッチムーブ
	ontouchmove: function(){
		console.dir(this.type);
	}
});