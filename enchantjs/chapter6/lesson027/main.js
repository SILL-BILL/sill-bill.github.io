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
var STAGE_OFFSET  = 45;
//キャラクター共通
var CHARACTER_OFFSET_Y = 20;
var CHARACTER_STEP_Y   = 45;
//プレイヤー
var PLAYER_AVATAR_CODE = "1:3:0:2009:2109:27540";
var PLAYER_WIDTH       = 64;
var PLAYER_HEIGHT      = 64;
//アセット
var ASSETS = [
	
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
	//画像、音読み込み
	game.preload(ASSETS);
	
	//ゲーム開始時の処理
	game.onload = function(){
		var scene = game.rootScene;
		scene.backgroundColor = "#cff";
		
		//ステージ
		var stage = Group();
		stage.y = STAGE_OFFSET;
		scene.addChild(stage);
		
		//プレイヤー
		player = new Player();
		stage.addChild(player);
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			
		};
	};
	
	game.start();
};

/*
* プレイヤー
*/
var Player = Class.create(Avatar, {
	//初期化処理
	initialize: function(){
		//親の初期化呼び出し
		Avatar.call(this, PLAYER_AVATAR_CODE);
		this.action = "run";
	}
});