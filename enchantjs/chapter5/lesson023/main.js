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
//敵
var ENEMY_WIDTH      = 32;	//幅
var ENEMY_HEIGHT     = 32;	//高さ
var ENEMY_SPEED      = -5;	//移動スピード;
var ENEMY_HIT_LENGHT = 20;	//衝突判定の領域サイズ
//画像
var PLAYER_IMAGE = "../../img/action/player.png";
var ENEMY_IMAGE  = "../../img/action/enemy.png";
//アセット
var ASSETS = [
	PLAYER_IMAGE,
	ENEMY_IMAGE
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
* ゲームオーバー処理
*/
var gameOver = function(rst){
	alert(rst);
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
			//敵を生成、表示
			if(game.frame % 30 == 0){
				var enemy = new Enemy();
				enemy.moveTo(SCREEN_WIDTH+30, Math.random()*(SCREEN_HEIGHT-ENEMY_HEIGHT));
				scene.addChild(enemy);
			}
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

/*
* 敵
*/
var Enemy = Class.create(Sprite, {
	//初期化処理
	initialize: function(){
		//親の初期化呼び出し
		Sprite.call(this, ENEMY_WIDTH, ENEMY_HEIGHT);
		this.image = game.assets[ENEMY_IMAGE];
		this.time = randfloat(0, 360) | 0;
	},
	//更新処理
	onenterframe: function(){
		//移動
		this.x += ENEMY_SPEED;
		this.y += Math.cos(this.time*5*Math.PI/180);
		
		//フレームアニメーション
		if(this.time%5 == 0){
			this.frame += 1;
			this.frame %= 3;
		}
		
		//プレイヤーとの衝突判定
		if(this.within(player, ENEMY_HIT_LENGHT)){
			gameOver("鳥と衝突してしまいました。残念ラッシャイベイベー！！");
		}
		
		//削除処理
		if(this.x < -40){
			this.parentNode.removeChild(this);
		}
		
		//タイムを進める
		++this.time;
	}
});