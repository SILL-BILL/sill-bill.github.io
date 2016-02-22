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


/*
* グローバル変数
*/
var game = null;


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
	
	//ゲーム開始時の処理
	game.onload = function(){
		var scene = game.rootScene;
		scene.backgroundColor = "#000";
		
	};
	
	game.start();
};