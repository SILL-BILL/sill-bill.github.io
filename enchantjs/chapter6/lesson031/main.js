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
var PLAYER_AVATAR_CODE   = "2:1:4:2004:21230:22480";
var PLAYER_WIDTH         = 64;
var PLAYER_HEIGHT        = 64;
var PLAYER_INIT_POS      = PLAYER_WIDTH*2;
var PLAYER_LIMIT_POS     = PLAYER_WIDTH*2;
var PLAYER_ADVANCE_SPEED = 1;
var MAX_LIFE             = 3;
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
//アセット
var ASSETS = [
	BG01_IMAGE,
	BG02_IMAGE,
	BG03_IMAGE,
	BUG_IMAGE,
	DRAGON_IMAGE
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