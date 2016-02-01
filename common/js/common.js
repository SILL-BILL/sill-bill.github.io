$(function(){

	/*--------------------
	バリアー解除
	---------------------*/
	$('.barrier').on('click',function(){
		$(this).removeClass('on');
	});

	//ヘッダーロゴアニム
	$('.header .navbar .logo').velocity({opacity:0, rotateX:'-90deg'},{duration:1}).velocity({opacity:1,rotateX:'0'},{delay:500*3, duration:500*2,easing:'ease-out'}).attr('style','');

	// mmenu init.
	$('nav#headMenu').mmenu({
		extensions: ["effect-slide-menu", "effect-slide-listitems", "theme-dark", "border-full"]
	});

});
