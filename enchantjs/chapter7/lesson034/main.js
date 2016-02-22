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
//プレイヤー
var PLAYER_WIDTH  = 32; //幅
var PLAYER_HEIGHT = 32;	//高さ
//画像
var MAP_IMAGE    = "../../img/dungeon/map2.png";
var PLAYER_IMAGE = "../../img/dungeon/player.png";
//アセット
var ASSETS = [
	MAP_IMAGE,
	PLAYER_IMAGE
];

/*
* グローバル変数
*/
var game   = null;
var map    = null;
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
		
		//プレイヤー生成、表示
		player = new Player();
		stage.addChild(player);
		
		//ステージセットアップ
		setupStage(1);
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			
		};
	};
	
	game.start();
};

/*
* ステージをセットアップ
*/
var setupStage = function(stageIndex){
	
	var stage = window["STAGE0" + stageIndex];
	
	//マップをロード
	map.loadData(stage.map);
	//プレイヤー
	player.moveTo(stage.playerX, stage.playerY);
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
	}
});