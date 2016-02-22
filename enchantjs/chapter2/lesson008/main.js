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
	//画像の読み込み
	game.preload("http://enchantjs.com/assets/images/chara1.gif");
	
	//ゲーム開始時の処理
	game.onload = function(){
		var scene = game.rootScene;
		scene.backgroundColor = "#000";
		
		//シーン更新時の処理
		scene.onenterframe = function(){
			if(game.frame % 30 == 0){
				//クマを生成
				var kuma = new Kuma();
				kuma.x = randfloat(0,290)|0;
				kuma.y = randfloat(0,290)|0;
				scene.addChild(kuma);
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


/*
* クマクラス
*/
var Kuma = Class.create(Sprite, {
	//初期化処理
	initialize: function(){
		Sprite.call(this, 32, 32);
		
		var game = Core.instance;
		this.image = game.assets["http://enchantjs.com/assets/images/chara1.gif"];
		this.vx = randfloat(-4, 4)|0;
		this.vy = randfloat(-4, 4)|0;
		//X軸の移動値に応じて向きを調整
		if(this.vx < 0){
			this.scaleX *= -1;
		}
	},
	//更新処理
	onenterframe: function(){
		this.x += this.vx;
		this.y += this.vy;
		
		//フレーム調整
		this.frame += 1;
		this.frame %= 3;
		
		//画面外に出ないよう調整
		if(this.x < 0){
			this.x = 0;
			this.vx *= -1;
			this.scaleX *= -1;
		}else if(this.x > 290){
			this.x = 290;
			this.vx *= -1;
			this.scaleX *= -1;
		}
		if(this.y < 0){
			this.y = 0;
			this.vy *= -1;
		}else if(this.y > 290){
			this.y = 290;
			this.vy *= -1;
		}
	},
	//タッチ開始処理
	ontouchstart: function(){
		var game = Core.instance;
		//ラベル生成、表示
		var label = createLabel("10point", this.x, this.y, "#FFF");
		game.rootScene.addChild(label);
		//自身を削除
		this.parentNode.removeChild(this);
	}
});