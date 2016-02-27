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
var PLAYER_AVATAR_CODE        = "2:1:4:2004:21230:22480";
var PLAYER_WIDTH              = 64;
var PLAYER_HEIGHT             = 64;
var PLAYER_INIT_POS           = PLAYER_WIDTH*2;	//初期位置
var PLAYER_LIMIT_POS          = PLAYER_WIDTH*2;	//限界位置
var PLAYER_ADVANCE_SPEED      = 1;				//進行スピード
var PLAYER_DAMAGE_BACK_LENGTH = -PLAYER_WIDTH;	//ダメージを受けた際に移動する距離
var PLAYER_DAMAGE_BACK_SPEED  = 10;				//ダメージを受けた際に移動スピード
var MAX_LIFE                  = 3;				//マックスライフ
//虫
var BUG_SPEED = 2;
var BUG_LIFE  = 1;
var BUG_SCORE = 100;
//ドラゴン
var DRAGON_SPEED = 4;
var DRAGON_LIFE  = 2;
var DRAGON_SCORE = 500;
//画像
var BG01_IMAGE   = "../../img/avatar_enchant/avatarBg1.png";
var BG02_IMAGE   = "../../img/avatar_enchant/avatarBg2.png";
var BG03_IMAGE   = "../../img/avatar_enchant/avatarBg3.png";
var BUG_IMAGE    = "../../img/avatar_enchant/monster1.gif";
var DRAGON_IMAGE = "../../img/avatar_enchant/bigmonster1.gif";
//音
var MAIN_BGM         = "../../sound/dragon_buster/main_bgm.wav";
var PLAYER_DAMAGE_SE = "../../sound/dragon_buster/se9.wav";
var ENEMY_DAMAGE_SE  = "../../sound/dragon_buster/hit.wav";
var ENEMY_APPEAR_SE  = "../../sound/dragon_buster/se3.wav";
//アセット
var ASSETS = [
	BG01_IMAGE,
	BG02_IMAGE,
	BG03_IMAGE,
	BUG_IMAGE,
	DRAGON_IMAGE
//	MAIN_BGM,
//	PLAYER_DAMAGE_SE,
//	ENEMY_DAMAGE_SE,
//	ENEMY_APPEAR_SE
];


/*
* グローバル変数
*/
var game   = null;
var player = null;
var scoreLabel = null;
var lifeLabel = null;


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
		
		//パッド
		var pad = new Pad();
		pad.moveTo(0, 220);
		scene.addChild(pad);
		
		//スコア
		scoreLabel = new ScoreLabel(10, 15);
		scoreLabel.score = 0;
		scene.addChild(scoreLabel);
		
		//ライフ
		lifeLabel = new LifeLabel(180, 15, MAX_LIFE);
		lifeLabel.life = MAX_LIFE;	//ライフをセット
		scene.addChild(lifeLabel);
		
		//ステージ
		var stage = Group();
		stage.y = STAGE_OFFSET;
		scene.addChild(stage);
		
		//背景
		var bg = new AvatarBG(1);
		stage.addChild(bg);
		
		//プレイヤー
		player = new Player();
		player.visible = false;
		stage.addChild(player);
		
		//シーン切替時の処理
		scene.onenter = function(){
			player.visible = true;
			player.x = PLAYER_INIT_POS;
			
			//BGM再生
//			game.assets[MAIN_BGM].play();
//			game.assets[MAIN_BGM].src.loop = true;
			
			scene.onupbuttondown = function(){
				if(player.action == "attack"){
					return;
				}
				player.up();
			};
			scene.ondownbuttondown = function(){
				if(player.action == "attack"){
					return;
				}
				player.down();
			};
			scene.onrightbuttondown = function(){
				if(player.action == "attack"){
					return;
				}
				player.action = "attack";
			};
		};
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			//スクロール
			bg.scroll(game.frame*2);
			
			//モンスター生成
			if(game.frame % 60 == 0){
				var monster = null;
				var r = Math.floor(Math.random()*100);
				if(r < 20){
					monster = new Dragon();
				}else{
					monster = new Bug();
				}
				monster.x = 240;
				stage.addChild(monster);
				//SE
//				game.assets[ENEMY_APPEAR_SE].clone().play();
			}
			
			console.dir(lifeLabel.life);
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
		this.posIndex = 0;
		this.updatePosY();
		this.action = "run";
	},
	//上に移動
	up: function(){
		if(this.posIndex <= 0){
			return;
		}
		--this.posIndex;
		this.updatePosY();
	},
	//下に移動
	down: function(){
		if(this.posIndex >= 2){
			return;
		}
		++this.posIndex;
		this.updatePosY();
	},
	//Y座標更新
	updatePosY: function(){
//		this._element.style.zIndex = this.posIndex;
		this.y = CHARACTER_OFFSET_Y + CHARACTER_STEP_Y*this.posIndex;
	},
	//ダメージを受けた際の処理
	damage: function(){
		if(this.action == "damage"){
			return;
		}
		//ダメージアクションに切り替える
		this.action = "damage";
		//ダメージ
//		game.assets[PLAYER_DAMAGE_SE].clone().play();
		//モーション
		this.tl.moveBy(PLAYER_DAMAGE_BACK_LENGTH, 0, PLAYER_DAMAGE_BACK_SPEED).then(function(){
			var right = this.x + this.width;
			if(right <= 0){
				game.end(scoreLabel.score, "画面外に出てゲームオーバー!!");
			}
		});
	},
	//更新処理
	onenterframe: function(){
		if(this.action == "run" && this.x <PLAYER_LIMIT_POS){
			this.x += PLAYER_ADVANCE_SPEED;
		}
		if(this.action == "stop"){
			this.action = "run";
		}
	}
});

/*
 * モンスター
 */
var BaseMonster = Class.create(AvatarMonster, {
	//初期化処理
	initialize: function(img) {
		AvatarMonster.call(this, img);
		
		this.action = "appear";
		this.posIndex = Math.floor(Math.random()*3);
		this.speed   = 2;
		this.life    = 1;
		this.offsetY = (58-img.width/4);
		this.updatePosY();
		
		this.update = this.appear;
	},
	//更新処理
	onenterframe: function() {
		if(this.update){
			this.update();
		}
		
		//プレイヤーとの衝突判定
		if(this.posIndex === player.posIndex && this.intersect(player)){
			//プレイヤーが攻撃中だった場合はこちらがダメージを受ける
			if(player.action == "attack"){
				this.damage();
			}else{
				player.damage();
			}
		}
		
		//止まっていたら歩くアクションに切り替える
		if(this.action == "stop"){
			this.action = "walk";
		}
		
		//画面外に出たら削除
		if(this.x < -100){
			this.parentNode.removeChild(this);
			//ダメージ
			lifeLabel.life -= 1;
			if (lifeLabel.life <= 0){
				game.end(scoreLabel.score, "敵を取り逃がしてゲームオーバー!!");
			}
		}
	},
	//Y座標更新
	updatePosY: function(){
//		this._element.style.zIndex = this.posIndex;
		this.y = CHARACTER_OFFSET_Y + CHARACTER_STEP_Y*this.posIndex + this.offsetY;
	},
	//ダメージを受けた際の処理
	damage: function(){
		if(this.action === "attack" || this.action == "disappear"){
			return;
		}
		this.action = "attack";
		//ダメージ
//		game.assets[ENEMY_DAMAGE_SE].clone().play();
		//ライフを減らす
		this.life -= 1;
		if(this.life <= 0){
			this.action = "disappear";
		}
		this.tl.moveBy(100, 0, 30);
	},
	//出現処理
	appear: function() {
		if(this.action == "stop"){
			this.update = this.advance;
		}
	},
	// 進行処理
	advance: function(){
		this.x -= this.speed;
	}
});

/*
 * 虫
 */
var Bug = Class.create(BaseMonster, {
	//初期化処理
	initialize: function(){
		BaseMonster.call(this, game.assets[BUG_IMAGE]);
		this.speed = BUG_SPEED;
		this.life  = BUG_LIFE;
	},
	//削除時処理
	onremoved: function(){
		scoreLabel.score += BUG_SCORE;
	}
});

/*
 * ドラゴン
 */
var Dragon = Class.create(BaseMonster, {
	// 初期化処理
	initialize: function(){
		BaseMonster.call(this, game.assets[DRAGON_IMAGE]);
		this.speed = DRAGON_SPEED;
		this.life  = DRAGON_LIFE;
	},
	// 削除時処理
	onremoved: function(){
		scoreLabel.score += DRAGON_SCORE;
	}
});