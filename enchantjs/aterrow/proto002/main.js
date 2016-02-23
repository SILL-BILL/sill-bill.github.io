/*
* おまじない
*/
enchant();


/*
* 定数
*/
//モード
var MODE = "debug";
//パラメータ
var SCREEN_WIDTH  = 320; //スクリーンの幅
var SCREEN_HEIGHT = 320; //スクリーンの高さ
//背景
var BACKGROUND_WIDTH  = 2530;
var BACKGROUND_HEIGHT = 320;
//プレイヤー
var PLAYER_WIDTH  = 15; //幅
var PLAYER_HEIGHT = 15;	//高さ
//画像
var BACKGROUND_IMAGE = "../../img/aterrow/background.png";
var PLAYER_IMAGE = "../../img/aterrow/site.png";
//音
var MAIN_BGM = "../../sound/aterrow/main_bgm001.mp3";
//アセット
var ASSETS = [
	BACKGROUND_IMAGE,
	PLAYER_IMAGE,
	MAIN_BGM
];

/*
* グローバル変数
*/
var game = null;
var player = null;
var scoreLabel = null;
var timeLabel = null;

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
			
			//プレイヤーを生成、表示
			player = new Player();
			player.moveTo(SCREEN_HEIGHT/2-PLAYER_HEIGHT/2, SCREEN_HEIGHT/2-PLAYER_HEIGHT/2);
			scene.addChild(player);
			
			//スコア
			scoreLabel = new ScoreLabel(10, 10);
			scoreLabel.score = 0;
			scene.addChild(scoreLabel);
			
			//デバイスモーションイベントリスナを登録
			window.addEventListener("devicemotion", function(e){
				if(!player){
					return;
				}
				var ag = e.accelerationIncludingGravity;
				if(agent == 1){
					player.dx =  ag.x;
					player.dy = -ag.y;
				}else if(agent == 2){
					player.dx = ag.x;
					player.dy = -ag.y;
				}else{
					//win8
					player.dx = -ag.x;
					player.dy = ag.y;
				}
			});
			
			//BGM再生
			game.assets[MAIN_BGM].play();
			game.assets[MAIN_BGM].src.loop = true;
			
		};
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			
		};
		
	};
	
	game.start();
};

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

/*
* プレイヤー
*/
var Player = Class.create(Sprite, {
	//初期化処理
	initialize: function(){
		Sprite.call(this, PLAYER_WIDTH, PLAYER_HEIGHT);
		this.image = game.assets[PLAYER_IMAGE];
		this.opacity = 0.7;
		this.frame = 0;
		
		this.dx = 0;
		this.dy = 0;
		
		//デバック時の十字キーで移動可能
		if(MODE === "debug"){
			this.addEventListener("enterframe", function(){
				//十字キーによる移動(デバック機能)
				var input = game.input;
				if(input.left){
					this.x -= 4;
				}
				if(input.right){
					this.x += 4;
				}
				if(input.up){
					this.y -= 4;
				}
				if(input.down){
					this.y += 4;
				}
			});
		}
	},
	//更新処理
	onenterframe: function(){
		//移動
		this.x += this.dx;
		this.y += this.dy;
		
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