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
// プレイヤー
var PLAYER_WIDTH  = 32; //幅
var PLAYER_HEIGHT = 32; //高さ
var PLAYER_SPEED  = 8;  //スピード
//弾
var BULLET_WIDTH  = 8;	//幅
var BULLET_HEIGHT = 16;	//高さ
var BULLET_SPEED  = 12;	//スピード
//敵
var ENEMY_WIDTH   = 32;	//幅
var ENEMY_HEIGHT  = 32;	//高さ
var ENEMY_SPEED   = 4;	//スピード
var ENEMY_CREATE_INTERVAL = 15;	//敵を生成する間隔
//画像
var PLAYER_IMAGE = "../../img/shooting/player.png";
var ENEMY_IMAGE  = "../../img/shooting/enemy.png";
var BULLET_IMAGE = "../../img/shooting/bullet.png";
//アセット
var ASSETS = [
	PLAYER_IMAGE,
	BULLET_IMAGE,
	ENEMY_IMAGE
];


/*
* グローバル変数
*/
var game   = null;
var player = null;
var bulletList = null;
var enemyList = null;

/*
* 汎用処理
*/
//Array拡張
Array.prototype.erase = function(elm){
	var index = this.indexOf(elm);
	this.splice(index, 1);
	return true;
};
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
		scene.backgroundColor = "#8cc";
		
		//アナログパッドを生成、表示
		var pad = new Pad();
		pad.moveTo(10, SCREEN_HEIGHT-100);
//		pad._element.style.zindex = 100;
		scene.addChild(pad);
		
		//プレイヤーの生成・表示
		player = new Player();
		player.moveTo(SCREEN_WIDTH/2-PLAYER_WIDTH/2, SCREEN_HEIGHT-PLAYER_HEIGHT);
		scene.addChild(player);
		
		//弾リスト
		bulletList = [];
		//敵リスト
		enemyList = [];
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			//弾を生成、表示
			if(game.frame%30 < 20 && game.frame%5 == 0){
				var bullet = new Bullet();
				bullet.moveTo(player.x+PLAYER_WIDTH/2-BULLET_WIDTH/2,player.y-20);
				bulletList.push(bullet);
				scene.addChild(bullet);
			}
			//敵を生成、表示
			if(game.frame % ENEMY_CREATE_INTERVAL == 0){
				var enemy = new Enemy();
				var x = randfloat(0, SCREEN_WIDTH-ENEMY_WIDTH);
				var y = -20;
				enemy.moveTo(x, y);
				enemyList.push(enemy);
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
	initialize: function(){
		Sprite.call(this, PLAYER_WIDTH, PLAYER_HEIGHT);
		this.image = game.assets[PLAYER_IMAGE];
		this.frame = 0;
	},
	onenterframe: function() {
		var input = game.input;
		var vx = 0, vy = 0;
		
		// 左右移動値を計算
		if (input.left == true) {
			vx = -PLAYER_SPEED;
			this.frame = 1;
		}else if (input.right == true) {
			vx =  PLAYER_SPEED;
			this.frame = 2;
		}else {
			this.frame = 0;
		}
		
		// 上下移動値を計算
		if(input.up    === true){
			vy = -PLAYER_SPEED;
		}else if (input.down  === true){
			vy =  PLAYER_SPEED;
		}
		
		// 斜め移動補正
		if (vx !== 0 && vy !== 0) {
			var length = Math.sqrt(vx*vx + vy*vy);	// 長さ
			vx /= length;	// 正規化
			vy /= length;	// 正規化
			vx *= PLAYER_SPEED; vy *= PLAYER_SPEED;	// 長さを調整
		}
		
		// 移動
		this.moveBy(vx, vy);
		
		// 画面からはみ出ないよう制御
		var left    = 0;
		var right   = SCREEN_WIDTH-this.width;
		var top     = 0;
		var bottom  = SCREEN_HEIGHT-this.height;
		
		if(this.x < left){
			this.x = left;
		}else if (this.x > right){
			this.x = right;
		}
		if(this.y < top){
			this.y = top;
		}else if (this.y > bottom){
			this.y = bottom;
		}
	}
});


/*
* Bulletクラス
*/
var Bullet = Class.create(Sprite, {
	//初期化処理
	initialize: function(){
		Sprite.call(this, BULLET_WIDTH, BULLET_HEIGHT);
		this.image = game.assets[BULLET_IMAGE];
		this.destroy = false;
	},
	//更新処理
	onenterframe: function(){
		this.y -= BULLET_SPEED;
		//削除処理
		if(this.y < -20 || this.destroy === true){
			this.parentNode.removeChild(this);
			bulletList.erase(this);
		}
	},
});

/*
* Enemyクラス
*/
var Enemy = Class.create(Sprite, {
	//初期段階
	initialize: function(){
		Sprite.call(this, ENEMY_WIDTH, ENEMY_HEIGHT);
		this.image = game.assets[ENEMY_IMAGE];
		this.destroy = false;
	},
	//更新処理
	onenterframe: function(){
		//移動
		this.y += ENEMY_SPEED;
		
		//削除処理
		if(this.y > SCREEN_HEIGHT || this.destroy === true){
			this.parentNode.removeChild(this);
			enemyList.erase(this);
		}
	},
});