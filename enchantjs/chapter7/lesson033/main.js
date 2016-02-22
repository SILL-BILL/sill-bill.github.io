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
//画像
var MAP_IMAGE = "../../img/dungeon/map2.png";
//アセット
var ASSETS = [
	MAP_IMAGE
];

/*
* グローバル変数
*/
var game = null;
var map  = null;

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
		
		//マップ
		map = new Map(16, 16);
		map.image = game.assets[MAP_IMAGE];
		stage.addChild(map);
		
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
};