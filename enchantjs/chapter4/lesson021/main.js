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
var ENEMY_TYPE_RED = 0;
var ENEMY_TYPE_GREEN = 1;
var ENEMY_TYPE_BLUE = 2;
//爆発
var CRASH_WIDTH  = 32;	//幅
var CRASH_HEIGHT = 32;	//高さ
//背景
var BACKGROUND_WIDTH  = 320;	//幅
var BACKGROUND_HEIGHT = 2384;	//高さ
var SCROLL_SPEED      = 4;		//スクロール速度
//画像
var PLAYER_IMAGE = "../../img/shooting/player.png";
var ENEMY_RED_IMAGE  = "../../img/shooting/enemy_red.png";
var ENEMY_GREEN_IMAGE  = "../../img/shooting/enemy_green.png";
var ENEMY_BLUE_IMAGE  = "../../img/shooting/enemy_blue.png";
var BULLET_IMAGE = "../../img/shooting/bullet.png";
var BACKGROUND_IMAGE = "../../img/shooting/background.png";
var CRASH_IMAGE = "../../img/shooting/crash.png";
//音
var MAIN_BGM = "../../sound/shooting/main_bgm.wav";
var CRASH_SE = "../../sound/shooting/crash.wav";
//アセット
var ASSETS = [
	PLAYER_IMAGE,
	BULLET_IMAGE,
	ENEMY_RED_IMAGE,
	ENEMY_GREEN_IMAGE,
	ENEMY_BLUE_IMAGE,
	BACKGROUND_IMAGE,
	CRASH_IMAGE,
//	MAIN_BGM,
//	CRASH_SE
];


/*
* グローバル変数
*/
var game   = null;
var player = null;
var bulletList = null;
var enemyList = null;
var scoreLabel = null;

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
		
		//縦スクロール背景を生成、表示
		var background = new Sprite(BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
		background.image = game.assets[BACKGROUND_IMAGE];
		background.moveTo(0, -background.height + game.height);
		background.onenterframe = function(){
			//スクロール
			this.y += SCROLL_SPEED;
			//端まで行ったら戻す
			if(this.y >= 0){
				background.moveTo(0, -background.height + game.height);
			}
		};
		scene.addChild(background);
		
		//シーン切替時の処理
		scene.onenter = function(){
			//ゲームのフレームを初期化
			game.frame = 0;
			
			//BGM再生
//			game.assets[MAIN_BGM].play();
//			game.assets[MAIN_BGM].src.loop = true;
			
			//アナログパッドを生成、表示
			var pad = new Pad();
			pad.moveTo(10, SCREEN_HEIGHT-100);
//			pad._element.style.zindex = 100;
			scene.addChild(pad);
			
			//プレイヤーの生成・表示
			player = new Player();
			player.moveTo(SCREEN_WIDTH/2-PLAYER_WIDTH/2, SCREEN_HEIGHT-PLAYER_HEIGHT);
			scene.insertBefore(player, pad);
//			scene.addChild(player);
			
			//弾リスト
			bulletList = [];
			//敵リスト
			enemyList = [];
			
			//スコアラベルを生成、表示
			scoreLabel = new ScoreLabel(10, 10);
			scoreLabel.score = 0;
//			scoreLabel._element.style.zIndex = 100;
			scene.insertBefore(scoreLabel, pad);
//			scene.addChild(scoreLabel);
		};
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			//弾を生成、表示
			if(game.frame%30 < 20 && game.frame%5 == 0){
				var bullet = new Bullet();
				bullet.moveTo(player.x+PLAYER_WIDTH/2-BULLET_WIDTH/2,player.y-20);
				bulletList.push(bullet);
				scene.insertBefore(bullet,scoreLabel);
			}
			//敵を生成、表示
			if(game.frame % ENEMY_CREATE_INTERVAL == 0){
				//レベルを取得
				var level = game.frame/300|0;
				level = Math.min(level, 3);
				var enemy = null
				
				//レベルに応じて生成する敵の種類を変更する
				if(level == 0){
					enemy = new Enemy(ENEMY_TYPE_RED);
				}else if(level == 1){
					enemy = new Enemy(ENEMY_TYPE_GREEN);
				}else if(level == 2){
					enemy = new Enemy(ENEMY_TYPE_BLUE);
				}else{
					var r = randfloat(0, 3)|0;
					enemy = new Enemy(r);
				}
				var x = randfloat(0, SCREEN_WIDTH-ENEMY_WIDTH);
				var y = -20;
				enemy.moveTo(x, y);
				enemyList.push(enemy);
				scene.insertBefore(enemy,scoreLabel);
			}
			
			//プレイヤーと敵の衝突判定
			for(var i=0,len=enemyList.length; i<len; ++i){
				var enemy = enemyList[i];
				if(enemy.intersect(player)){
					//ゲームオーバー処理
					var score = scoreLabel.score;
					var msg = scoreLabel.score + "point　獲得しました！";
					game.end(score, msg);
					
				}
			}
			
			//敵と弾の衝突判定
			for(var i=0, len=enemyList.length; i<len; ++i){
				var enemy = enemyList[i];
				
				if(enemy.destroy === true){
					continue;
				}
				
				for(var j=0, len2=bulletList.length; j<len2; ++j){
					var bullet = bulletList[j];
					//敵と弾の衝突判定
					if(bullet.intersect(enemy) == true){
						enemy.destroy = true;
						bullet.destroy = true;
						
						//クラッシュエフェクト
						var crash = new Crash();
						crash.moveTo(enemy.x, enemy.y);
						scene.insertBefore(crash, scoreLabel);
						
						//SE再生
//						game.assets[CRASH_SE].clone().play();
						
						//スコア加算
						scoreLabel.score += 100;
						break;
					}
				}
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
	initialize: function(type){
		Sprite.call(this, ENEMY_WIDTH, ENEMY_HEIGHT);
		
		//タイプに応じて表示する画像と動きを変更する
		switch(type){
			case ENEMY_TYPE_RED:
				this.image = game.assets[ENEMY_RED_IMAGE];
				this.tl.moveBy(0, 120, 30).moveBy(0, 120, 30).loop();
				break;
			case ENEMY_TYPE_GREEN:
				this.image = game.assets[ENEMY_GREEN_IMAGE];
				this.tl.moveBy(0, 120, 30, enchant.Easing.QUAD_EASEINOUT).wait(30).moveBy(0, 120, 30, enchant.Easing.QUAD_EASEINOUT).loop();
				break;
			case ENEMY_TYPE_BLUE:
				this.image = game.assets[ENEMY_BLUE_IMAGE];
				this.tl.moveBy(30, 120, 30, enchant.Easing.QUAD_EASEINOUT).moveBy(-30, 120, 30, enchant.Easing.QUAD_EASEINOUT).loop();
				break;
			default :
				this.image = game.assets[ENEMY_RED_IMAGE];
				this.tl.moveBy(0, 120, 30).loop();
				break;
		}
		
		this.destroy = false;
	},
	//更新処理
	onenterframe: function(){
		//移動
//		this.y += ENEMY_SPEED;
		
		//削除処理
		if(this.y > SCREEN_HEIGHT || this.destroy === true){
			this.parentNode.removeChild(this);
			enemyList.erase(this);
		}
	},
});

/*
* 爆発クラス
*/
var Crash = Class.create(Sprite, {
	//初期化処理
	initialize: function(){
		Sprite.call(this, CRASH_WIDTH, CRASH_HEIGHT);
		this.image = game.assets[CRASH_IMAGE];
		this.frame = 0;
		this.scale(2);
	},
	//更新処理
	onenterframe: function(){
		this.frame += 1;
		
		//削除処理
		if(this.frame > 64){
			this.parentNode.removeChild(this);
		}
	},
});