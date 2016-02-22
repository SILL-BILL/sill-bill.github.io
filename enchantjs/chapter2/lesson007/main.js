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
		
		//ラベルの生成、表示
		var label = new Label("enchant.js 楽しいよん♪");
		label.color = "#FFF";
		label.font  = "25px 'Meiryo', 'メイリオ', 'ヒラギノ角ゴ Pro W3', sans-serif";
		scene.addChild(label);
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			if(game.frame % 5 == 0){
				//ラベルを生成して表示
				var text = "Hello";
				var x = randfloat(0, 300)|0;
				var y = randfloat(0, 300)|0;
				var r = randfloat(0, 255)|0;
				var g = randfloat(0, 255)|0;
				var b = randfloat(0, 255)|0;
				var color = "rgb(" + r + "," + g + "," + b + ")";
				var label = createLabel(text, x, y, color);
				scene.addChild(label);
			}
		};
		
	};
	
	game.start();
};


/*
* ラベルを生成する
*/
var createLabel = function(text, x, y, color){
	//ラベル生成
	var label = new Label(text);
	label.font = "12px 'Consolas', 'Monaco', 'MS ゴシック'";
	label.moveTo(x, y);
	label.color = color;
	//更新処理
	label.onenterframe = function(){
		this.opacity -= 0.01;
		if(this.opacity <= 0){
			this.parentNode.removeChild(this);
		}
	};
	
	return label;
};