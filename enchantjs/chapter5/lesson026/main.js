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
//アイテム
var ITEM_WIDTH       = 16;	//幅
var ITEM_HEIGHT      = 16;	//高さ
var ITEM_SPEED       = -4;	//アイテムのスピード
var COIN_POINT       = 100;	//コインのポイント
var COIN_FRAME       = 14;	//コイン画像のフレームインデックス
var DIAMOND_POINT    = 1000;//ダイアモンドのポイント
var DIAMOND_FRAME    = 64;	//ダイアモンド画像のフレームインデックス
//背景
var BACKGROUND_WIDTH  = 1320;
var BACKGROUND_HEIGHT = 320;
//画像
var PLAYER_IMAGE = "../../img/action/player.png";
var ENEMY_IMAGE  = "../../img/action/enemy.png";
var ICON_IMAGE  = "../../img/action/icon0.gif";
var BACKGROUND_IMAGE = "../../img/action/background.png";
//音
var MAIN_BGM = "../../sound/action/main_bgm.wav";
var JUMP_SE = "../../sound/action/jump.wav";
var ITEM_GET_SE = "../../sound/action/itemget.wav";
//アセット
var ASSETS = [
	PLAYER_IMAGE,
	ENEMY_IMAGE,
	ICON_IMAGE,
	BACKGROUND_IMAGE
//	MAIN_BGM,
//	JUMP_SE,
//	ITEM_GET_SE
];

/*
* グローバル変数
*/
var game       = null;
var player     = null;
var scoreLabel = null;

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
		scene.backgroundColor = "#0af";
		
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
//			game.assets[MAIN_BGM].play();
//			game.assets[MAIN_BGM].src.loop = true;
			
			//プレイヤーを生成、表示
			player = new Player();
			player.moveTo(20, SCREEN_HEIGHT/2-PLAYER_HEIGHT/2);
			scene.addChild(player);
			
			//スコア
			scoreLabel = new ScoreLabel(10, 10);
			scoreLabel.score = 0;
			scene.addChild(scoreLabel);
		};
		
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
			
			//アイテムを生成、表示
			if(game.frame % 50 == 0){
				var r = Math.floor(Math.random()*100);
				var item = null;
				if(r < 10){
					item = new Diamond();
				}else{
					item = new Coin();
				}
				item.moveTo(SCREEN_WIDTH+30, Math.random()*(SCREEN_HEIGHT-ENEMY_HEIGHT));
				scene.addChild(item);
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
		
		//画面からはみ出た際はゲームオーバー
		var top = 0;
		var bottom = SCREEN_HEIGHT;
		if(this.y+this.height < top){
			gameOver("画面外に出てしまいました。残念!");
		}else if(this.y > bottom){
			gameOver("画面外に出てしまいました。残念!");
		}
	},
	//ジャンプ処理
	jump: function(){
		//移動値を設定
		this.vy = PLAYER_JUMP;
		//SE再生
//		game.assets[JUMP_SE].clone().play();
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
			gameOver("お疲れさんでした。");
		}
		
		//削除処理
		if(this.x < -40){
			this.parentNode.removeChild(this);
		}
		
		//タイムを進める
		++this.time;
	}
});

/*
* アイテム
*/
var Item = Class.create(Sprite, {
	//初期化処理
	initialize: function(){
		Sprite.call(this, ITEM_WIDTH, ITEM_HEIGHT);
		this.image = game.assets[ICON_IMAGE];
	},
	//更新処理
	onenterframe: function(){
		//移動
		this.x += ITEM_SPEED;
		
		//衝突判定
		if(this.intersect(player)){
			//ヒットイベントを発行する
			var e = new enchant.Event("hit");
			this.dispatchEvent(e);
		}
		
		//削除処理
		if(this.x < -40){
			this.parentNode.removeChild(this);
		}
	},
	//ヒット時処理
	onhit: function(e){
		console.log("hit!");
	},
});

/*
* コイン
*/
var Coin = Class.create(Item, {
	//初期化処理
	initialize: function(){
		Item.call(this);
		this.frame = COIN_FRAME;
	},
	//ヒット時処理
	onhit: function(e){
		//スコアアップラベルを生成、表示
		var label = new ScoreUpLabel(COIN_POINT);
		label.moveTo(this.x, this.y);
		game.rootScene.addChild(label);
		
		//削除
		this.parentNode.removeChild(this);
		//スコア加算
		scoreLabel.score += COIN_POINT;
		//SE再生
//		game.assets[ITEM_GET_SE].clone().play();
	}
});

/*
* ダイアモンド
*/
var Diamond = Class.create(Item, {
	//初期化処理
	initialize: function(){
		Item.call(this);
		this.frame = DIAMOND_FRAME;
	},
	//ヒット時処理
	onhit: function(e){
		//スコアアップラベルを生成、表示
		var label = new ScoreUpLabel(DIAMOND_POINT);
		label.moveTo(this.x, this.y);
		game.rootScene.addChild(label);
		
		//削除
		this.parentNode.removeChild(this);
		//スコア加算
		scoreLabel.score += DIAMOND_POINT;
		//SE再生
//		game.assets[ITEM_GET_SE].clone().play();
	}
});

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