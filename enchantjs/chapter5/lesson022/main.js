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
//プレイヤー
var PLAYER_WIDTH   = 32;	//幅
var PLAYER_HEIGHT  = 32;	//高さ
var PLAYER_JUMP    = -5;	//ジャンプの強さ
var PLAYER_GRAVIRY = 0.25	//重力
//画像
var PLAYER_IMAGE = "../../img/action/player.png";
//アセット
var ASSETS = [
	PLAYER_IMAGE
];

/*
* グローバル変数
*/
var game = null;
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
	//画像、SEの読み込み
	game.preload(ASSETS);
	
	//ゲーム開始時の処理
	game.onload = function(){
		var scene = game.rootScene;
		scene.backgroundColor = "#0af";
		
		//プレイヤーを生成、表示
		player = new Player();
		player.moveTo(20, SCREEN_HEIGHT/2-PLAYER_HEIGHT/2);
		scene.addChild(player);
		
		//画面タッチ時の処理
		scene.ontouchstart = function(){
			//プレイヤーをジャンプ
			player.jump();
		};
		
		//シーン更新時の処理
		scene.onenterframe = function(){
		};
	};
	
	game.start();
};

/*
* プレイヤー
*/
var Player = Class.create(Sprite, {
	//初期化処理
	initialize: function(){
		Sprite.call(this, PLAYER_WIDTH, PLAYER_HEIGHT);
		this.image = game.assets[PLAYER_IMAGE];
		this.frame = 0;
		this.vy = 0;	//移動速度
	},
	//更新処理
	onenterframe: function(){
		//移動
		this.vy += PLAYER_GRAVIRY;	//重力
		this.y  += this.vy;			//移動
		
		//フレームアニメーション
		if(this.vy > 0){
			this.frame = 0;
		}else{
			this.frame = 1;
		}
	},
	//ジャンプ処理
	jump: function(){
		//移動値を設定
		this.vy = PLAYER_JUMP;
	}
});