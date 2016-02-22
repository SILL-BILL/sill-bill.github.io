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
	game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
	//画像の読み込み
	game.preload("http://enchantjs.com/assets/images/chara1.gif");
	
	//ゲーム開始時の処理
	game.onload = function(){
		var scene = game.rootScene;
		scene.backgroundColor = "#000";
		
		//スプライトの生成、表示
		var kuma0 = new Sprite(32, 32);
		kuma0.image = game.assets["http://enchantjs.com/assets/images/chara1.gif"];
		kuma0.moveTo(50, 50);
		scene.addChild(kuma0);
		
		//スプライトの生成、表示(回転)
		var kuma1 = new Sprite(32, 32);
		kuma1.image = game.assets["http://enchantjs.com/assets/images/chara1.gif"];
		kuma1.moveTo(50, 100);
		kuma1.rotate(45);
		scene.addChild(kuma1);
		
		//スプライトの生成、表示(拡大)
		var kuma2 = new Sprite(32, 32);
		kuma2.image = game.assets["http://enchantjs.com/assets/images/chara1.gif"];
		kuma2.moveTo(50, 150);
		kuma2.scale(3, 2);
		scene.addChild(kuma2);
		
		//スプライトの生成、表示(frame アニメーションと更新処理)
		var kuma3 = new Sprite(32, 32);
		kuma3.image = game.assets["http://enchantjs.com/assets/images/chara1.gif"];
		kuma3.moveTo(50, 200);
		kuma3.onenterframe = function(){
			this.frame += 1;
			this.frame %= 3;
			
			this.moveBy(2, 0);
			if(this.x > 320){
				this.x = 0;
			}
		};
		scene.addChild(kuma3);
		
	};
	
	game.start();
};