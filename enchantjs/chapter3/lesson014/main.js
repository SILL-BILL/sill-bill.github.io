/*
 * おまじない
 */
enchant();


/*
 * 定数
 */
// パラメータ
var SCREEN_WIDTH    = 320;  // スクリーンの幅
var SCREEN_HEIGHT   = 320;  // スクリーンの高さ
var BUG_MAX_NUM     = 10;   // 虫の数
var BUG_WIDTH       = 32;   // 虫の幅
var BUG_HEIGHT      = 32;   // 虫の高さ
var BUG_SPEED       = 4;	// 虫の移動スピード
var BUG_MOVE_TIME   = 30;   // 虫の移動時間
var BUG_WAIT_TIME   = 30;   // 虫の待ち時間
// 画像
var FIELD_IMAGE	 = "http://www.shoeisha.co.jp/book/shuchu/enchantsample/chapter03/floor.png"
var GOKIBURI_IMAGE  = "http://www.shoeisha.co.jp/book/shuchu/enchantsample/chapter03/bug.png";
// 音
var MAIN_BGM        = "../../sound/gokiburi/main_bgm.wav";
var CLEAR_BGM       = "../../sound/gokiburi/clear_bgm.wav";
var CRY_SE          = "../../sound/gokiburi/cry.wav";
var TOUCH_SE        = "../../sound/gokiburi/touch.wav";
// アセットリスト
var ASSETS = [
	FIELD_IMAGE, GOKIBURI_IMAGE,
	MAIN_BGM, CLEAR_BGM, CRY_SE, TOUCH_SE
];


/*
 * グローバル変数
 */
var game	= null;


/*
 * 汎用処理
 */
//ランダム値生成
var randfloat = function(min, max) {
	return Math.random()*(max-min)+min;
};


/*
 * メイン処理
 */
window.onload = function() {
	// ゲームオブジェクトの生成
	game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
	// 画像の読み込み
	game.preload(ASSETS);
	
	// ゲーム開始時の処理
	game.onload = function() {
		var scene = game.rootScene;
		scene.backgroundColor = "black";
		
		// 背景を生成, 表示
		var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
		bg.image = game.assets[FIELD_IMAGE];
		scene.addChild(bg);
			
		// 残りの数表示用ラベルの生成, 表示
		var numText = new Label("");
		numText.font = "18px 'Meiryo', 'メイリオ', 'ヒラギノ角ゴ Pro W3', sans-serif";
		numText.color   = "black";
		numText.moveTo(10, 10);
		scene.addChild(numText);
		
		// シーン切替時の処理
		scene.onenter = function() {
			// フレームをリセット
			game.frame = 0;
			
			// 虫の数をセット
			game.bugNum = BUG_MAX_NUM;
			
			// 虫を生成
			for (var i=0; i<BUG_MAX_NUM; ++i) {
				var gokiburi = new Gokiburi();
				gokiburi.moveTo(randfloat(0, SCREEN_WIDTH-BUG_WIDTH), randfloat(0, SCREEN_HEIGHT-BUG_HEIGHT));
				scene.addChild(gokiburi);
			}
			
			// 叫び声
			game.assets[CRY_SE].play();
		};
		
		// シーン更新時の処理
		scene.onenterframe = function() {
			// 残りの数表示用ラベル更新
			numText.text = "残り: " + game.bugNum + "匹";
			
			// bgm 再生
			game.assets[MAIN_BGM].play();
			
			// クリアチェック
			if (game.bugNum <= 0) {
				// BGM を切り替える
				game.assets[MAIN_BGM].stop();
				game.assets[CLEAR_BGM].play();
				// ゲーム終了
				var time = Math.floor(game.frame/game.fps);
				var msg  = time + "秒でクリアしました!!";
				game.end((60-time) * 100, msg);
			}
		};
	};
	
	game.start();
};


/*
 * ゴキブリクラス
 */
var Gokiburi = Class.create(Sprite, {
	// 初期化処理
	initialize: function() {
		Sprite.call(this, BUG_WIDTH, BUG_HEIGHT);
		this.image	  = game.assets[GOKIBURI_IMAGE];
		this.rotation   = randfloat(0, 360);
		this.timer	  = randfloat(0, BUG_MOVE_TIME);
		// 移動処理をセット
		this.update = this.move;
	},
	// 移動処理
	move: function() {
		// 向いている方向に移動
		var angle = (this.rotation+270)*Math.PI/180;
		this.x += Math.cos(angle) * BUG_SPEED;
		this.y += Math.sin(angle) * BUG_SPEED;
		
		// フレームアニメーション
		this.frame = 1 - this.frame;
		
		// 待ちモードに切り替える
		if (this.timer > BUG_MOVE_TIME) {
			this.timer  = 0;
			this.update = this.wait;
		}
	},
	// 待ち処理
	wait: function() {
		// 移動モードに切り替える
		if (this.timer > BUG_WAIT_TIME) {
			this.rotation = randfloat(0, 360);
			this.timer = 0;
			this.update = this.move;
		}
	},
	// 削除待ち
	destroyWait: function() {
		this.opacity = 1 - (this.timer/BUG_WAIT_TIME);
		if (this.timer > BUG_WAIT_TIME) {
			this.parentNode.removeChild(this);
		}
	},
	// 更新処理
	onenterframe: function() {
		// 更新処理実行
		this.update();
		
		// タイマー更新
		this.timer += 1;
		
		// 画面からはみ出ないよう制御
		var left	= 0;
		var right   = SCREEN_WIDTH-this.width;
		var top	 = 0;
		var bottom  = SCREEN_HEIGHT-this.height;
		
		if (left > this.x) this.x = left;
		else if (right < this.x) this.x = right;
		if (top > this.y) this.y = top;
		else if (bottom < this.y) this.y = bottom;
	},
	// タッチ開始時処理
	ontouchstart: function() {
		this.timer = 0;
		this.frame  = 2;
		this.update = this.destroyWait;
		this.ontouchstart = null;
		
		game.bugNum-=1;
		game.assets[TOUCH_SE].clone().play();
	},
});