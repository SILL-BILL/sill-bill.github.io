/*
* おまじない
*/
enchant();


/*
* 定数
*/
//モード
var MODE = "release";
//パラメータ
var SCREEN_WIDTH  = 320; //スクリーンの幅
var SCREEN_HEIGHT = 320; //スクリーンの高さ
var STAGE_MAX_NUM = 3; //ステージ数
var LIMIT_TIME    = 300; //制限時間
//プレイヤー
var PLAYER_WIDTH  = 32; //幅
var PLAYER_HEIGHT = 32;	//高さ
//ゴール
var GOAL_WIDTH    = 32; //幅
var GOAL_HEIGHT   = 32; //高さ
//キー
var KEY_WIDTH       = 16; //幅
var KEY_HEIGHT      = 16; //高さ
var KEY_IMAGE_FRAME = 33; //画像のフレームインデックス
//画像
var MAP_IMAGE    = "../../img/dungeon/map2.png";
var PLAYER_IMAGE = "../../img/dungeon/player.png";
var GOAL_IMAGE   = "../../img/dungeon/goal.png";
var ICON_IMAGE   = "../../img/ui_enchant/icon0.png";
//音
var MAIN_BGM   = "../../sound/dungeon/main_bgm.mp3";
var KEY_GET_SE = "../../sound/dungeon/se6.mp3";
var GOAL_SE    = "../../sound/dungeon/se7.mp3";
//アセット
var ASSETS = [
	MAP_IMAGE,
	PLAYER_IMAGE,
	GOAL_IMAGE,
	ICON_IMAGE,
	MAIN_BGM,
	KEY_GET_SE,
	GOAL_SE
];

/*
* グローバル変数
*/
var game      = null;
var map       = null;
var player    = null;
var goal      = null;
var key       = null;
var timeLabel = null;
var lockFlag  = true;
var agent     = 0;

/*
* 汎用処理
*/
//ランダム値生成
var randfloat = function(min, max){
	return Math.random()*(max-min)+min;
};
//ユーザエージェント判定
var userAgent = function(){
	
	var res = 0;
	
	if((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 ){
		res = 1;	//iphone or Ipad
	}else if(navigator.userAgent.indexOf('Android') > 0){
		res = 2;	//android
	}else{
		res = 3;	//win8;
	}
	
//	console.log(res);
	
	return res;

};


/*
* メイン処理
*/
window.onload = function(){
	//ゲームオブジェクト生成
	game = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
	//画像、音読み込み
	game.preload(ASSETS);
	
	//ユーザエージェントの取得
	agent = userAgent();
	
	//ゲーム開始時の処理
	game.onload = function(){
		var scene = game.rootScene;
		scene.backgroundColor = "#000";
		
		//ステージ
		var stage = new Group();
		scene.addChild(stage);
		stage.onenterframe = function(){
			if(player){
				this.x = 160-player.x.toFixed(0);
				this.y = 160-player.y.toFixed(0);
			}
		};
		
		//マップ
		map = new Map(16, 16);
		map.image = game.assets[MAP_IMAGE];
		stage.addChild(map);
		
		//シーン切替時
		scene.onenter = function(){
			//ゲームのフレームを初期化
			game.frame = 0;
			
			//ステージ数を初期化
			game.stage = 1;
			
			//プレイヤー生成、表示
			player = new Player();
			stage.addChild(player);
			
			//ゴール生成、表示
			goal = new Goal();
			stage.addChild(goal);
			
			//鍵生成、表示
			key = new Key();
			stage.addChild(key);
			
			//ステージセットアップ
			setupStage(1);
			
			//タイマー
			timeLabel = new TimeLabel(140, 15, "countdown");
			timeLabel.time = LIMIT_TIME;
			scene.addChild(timeLabel);
			
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
					player.dx = -ag.x;
					player.dy = ag.y;
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
			var left   = player.x;					//左
			var right  = player.x+player.width;		//右
			var top    = player.y;					//上
			var bottom = player.y+player.height;	//下
			
			//プレイヤーとマップの衝突判定
			if(
				map.hitTest(left, top)     || 			//左上
				map.hitTest(left, bottom)  || 			//左下
				map.hitTest(right, top)    ||			//右上
				map.hitTest(right, bottom)	 			//右下
			){
				gameOver(0, "Game Over!!");
			}
			
			//タイムアップ判定
			if(timeLabel.time < 0){
				gameOver(0, "Time Over!!");
			}
			
			
			//ロック判定
			if(lockFlag === false){
				//点滅
				goal.opacity = (Math.sin(game.frame*10*Math.PI/180)+1)/4+0.5;
				
				//ゴール判定
				if(player.intersect(goal)){
					
					//ゴールSE再生
					game.assets[GOAL_SE].play();
					
					//次のステージ
					game.stage += 1;
					if(game.stage <= STAGE_MAX_NUM){
						setupStage(game.stage);
					}else{
						//ゲームクリア
						var score = timeLabel.time*100;
						var score = 0;
						gameOver(score, "Game Clear!!");
					}
				}
			}
			
		};
	};
	
	game.start();
};

/*
* ステージをセットアップ
*/
var setupStage = function(stageIndex){
	
	var stage = window["STAGE0" + stageIndex];
	lockFlag = true;
	
	//マップをロード
	map.loadData(stage.map);
	//Key
	key.visible = true;
	key.moveTo(stage.keyX, stage.keyY);
	//ゴール
	goal.moveTo(stage.goalX, stage.goalY);
	//プレイヤー
	player.moveTo(stage.playerX, stage.playerY);
	
	//ステージ情報を表示
	var stageInfo = new MutableText(100, 150, 200, 50);
	stageInfo.text = "STAGE 0" + stageIndex;
	stageInfo.tl.delay(30).fadeOut(30).then(function(){
		game.rootScene.removeChild(this);
	});
	game.rootScene.addChild(stageInfo);
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
	}
});

/*
* ゲームオーバー
*/
var gameOver = function(score, rst){
	//スコア
	score += game.stage*1000;
	//メッセージ作成
	var msg = score + "point! " + rst;
	game.end(score, msg);
};

/*
* ゴール
*/
var Goal = Class.create(Sprite, {
	//初期化処理
	initialize: function(){
		Sprite.call(this, GOAL_WIDTH, GOAL_HEIGHT);
		this.image = game.assets[GOAL_IMAGE];
		this.frame = 0;
		//半透明にする
		this.opacity = 0.5;
	}
});

/*
* キー
*/
var Key = Class.create(Sprite, {
	//初期化処理
	initialize: function(){
		Sprite.call(this, KEY_WIDTH, KEY_HEIGHT);
		this.image = game.assets[ICON_IMAGE];
		this.frame = 33;
	},
	//更新処理
	onenterframe: function(){
		if(lockFlag == true && this.intersect(player) === true){
			lockFlag = false;
			this.visible = false;
			game.assets[KEY_GET_SE].play();
		}
	}
});