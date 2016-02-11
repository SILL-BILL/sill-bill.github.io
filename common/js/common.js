// documet ready
$(function(){

	/*--------------------
	バリアー解除
	---------------------*/
	$('.barrier').on('click',function(){
		$(this).removeClass('on');
	});

	// mmenu init.
	$('nav#headMenu').mmenu({
		extensions: ["effect-slide-menu", "effect-slide-listitems", "theme-dark", "border-full"]
	});



});

// window onload
$(window).on('load', function(){

	//ローディングカバー
	$('.loading-cover').velocity({opacity:0},{delay:500*1,duration:500*2,easing:'ease-out',display:'none'}).addClass('off');

	//ヘッダーロゴアニム
	$('.header .navbar .logo').velocity({opacity:0, rotateX:'-90deg'},{duration:1}).velocity({opacity:1,rotateX:'0'},{delay:500*2, duration:500*2,easing:'ease-out'}).attr('style','');

	/*------------------
	 heightline item-list
	-------------------*/
	$(".item-list > li").heightLine("resize");

	/*-----------------
	 item-list anim
	------------------*/
	$('.item-list > li .thum').velocity({ opacity:0 },{ duration:300 });
	$('.item-list > li .thum').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if (isInView) {
			$(this).velocity({ opacity:1 },{ duration:300 });
		}
		else {
			$(this).velocity({ opacity:0 },{ duration:300 });
		}
	});

});