/*
	Breakpoints.js
	version 1.0
	
	Creates handy events for your responsive design breakpoints
	
	Copyright 2011 XOXCO, Inc
	http://xoxco.com/

	Documentation for this plugin lives here:
	http://xoxco.com/projects/code/breakpoints
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

*/
(function($) {

	var lastSize = 0;
	var interval = null;

	$.fn.resetBreakpoints = function() {
		$(window).unbind('resize');
		if (interval) {
			clearInterval(interval);
		}
		lastSize = 0;
	};
	
	$.fn.setBreakpoints = function(settings) {
		var options = jQuery.extend({
							distinct: true,
							breakpoints: new Array(320,480,768,960)
				    	},settings);


		interval = setInterval(function() {
	
			var w = $(window).width();
			var done = false;
			
			for (var bp in options.breakpoints.sort(function(a,b) { return (b-a) })) {
			
				// fire onEnter when a browser expands into a new breakpoint
				// if in distinct mode, remove all other breakpoints first.
				if (!done && w >= options.breakpoints[bp] && lastSize < options.breakpoints[bp]) {
					if (options.distinct) {
						for (var x in options.breakpoints.sort(function(a,b) { return (b-a) })) {
							if ($('body').hasClass('breakpoint-' + options.breakpoints[x])) {
								$('body').removeClass('breakpoint-' + options.breakpoints[x]);
								$(window).trigger('exitBreakpoint' + options.breakpoints[x]);
							}
						}
						done = true;
					}
					$('body').addClass('breakpoint-' + options.breakpoints[bp]);
					$(window).trigger('enterBreakpoint' + options.breakpoints[bp]);

				}				

				// fire onExit when browser contracts out of a larger breakpoint
				if (w < options.breakpoints[bp] && lastSize >= options.breakpoints[bp]) {
					$('body').removeClass('breakpoint-' + options.breakpoints[bp]);
					$(window).trigger('exitBreakpoint' + options.breakpoints[bp]);

				}
				
				// if in distinct mode, fire onEnter when browser contracts into a smaller breakpoint
				if (
					options.distinct && // only one breakpoint at a time
					w >= options.breakpoints[bp] && // and we are in this one
					w < options.breakpoints[bp-1] && // and smaller than the bigger one
					lastSize > w && // and we contracted
					lastSize >0 &&  // and this is not the first time
					!$('body').hasClass('breakpoint-' + options.breakpoints[bp]) // and we aren't already in this breakpoint
					) {					
					$('body').addClass('breakpoint-' + options.breakpoints[bp]);
					$(window).trigger('enterBreakpoint' + options.breakpoints[bp]);

				}						
			}
			
			// set up for next call
			if (lastSize != w) {
				lastSize = w;
			}
		},250);
	};
	
})(jQuery);
(function($) {
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
画像の最大幅＝画像元サイズの幅
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////
$.fn.addMaxWidth = function() {
	return this.each(function(){
		var $this = $(this);
		var imgObj = new Image();
		imgObj.src = $this.attr('src');
		$this.css('maxWidth', imgObj.width+'px');
			});
}
$.fn.addMaxWidth2 = function() {
	return this.each(function(){
		var $this = $(this);
		var imgObj = new Image();
		imgObj.src = $this.attr('src');
		$this.css('maxWidth', imgObj.width/2+'px');
			});
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
breakpoints.js
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////
$(window).setBreakpoints({
	distinct: true,
	breakpoints: [ 1, 768 ]
});
$(window).bind('enterBreakpoint768',function() {
	$('.switch-img').each(function() {
		$(this).attr('src', $(this).attr('src').replace('/sp/', '/pc/'));
		$("img.mw").addMaxWidth();
	});
});
$(window).bind('enterBreakpoint1',function() {
	$('.switch-img').each(function() {
		$(this).attr('src', $(this).attr('src').replace('/pc/', '/sp/'));
		$("img.mw").addMaxWidth2();
	});
});

})(jQuery);//function end

$(function(){
	var w_wid     = window.innerWidth;
	var bottom_btn = $(".index-bottom-btn");
	$(window).scroll(function () {
		100 < $(this).scrollTop()
		? bottom_btn.stop().animate({bottom : "0"}, 300)
		: bottom_btn.stop().animate({bottom : "-140px"}, 300)
	});
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////
// -------------------------------------------------------------
// フローティングエリア
// -------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){

  var FLOATING_BTN       = $('.s1-floating-area'),
      TOPSCROLL_BTN      = $('.scroll-pagetop'),
      DISPLAY_CLASS_NAME = 'is-display';

  $(window).scroll(function () {

    if(100 < $(this).scrollTop()){

      FLOATING_BTN.stop().addClass(DISPLAY_CLASS_NAME);
      TOPSCROLL_BTN.stop().addClass(DISPLAY_CLASS_NAME);

    }else{

      FLOATING_BTN.stop().removeClass(DISPLAY_CLASS_NAME);
      TOPSCROLL_BTN.stop().removeClass(DISPLAY_CLASS_NAME);

    }

  });

})



//////////////////////////////////////////////////////////////////////////////////////////////////////////
// -------------------------------------------------------------
// 画像切り替え処理
// -------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////
$(window).on('load resize', function(){

  var WINDOW_WIDTH = $(window).width(),
      BREAKPOINTS  = 767,
      HR_IMG   = $('.hi-res-img');

  if ( WINDOW_WIDTH <= BREAKPOINTS ) {

    var BEFORE = '_pc',
        AFTER  = '_sp';


    // PC高解像度画像最適化クラス除去
    HR_IMG.removeClass('hr-img-width');

    // 画像サイズの初期化
    HR_IMG.attr('width','auto');

    switchImg();

  } else {

    var BEFORE = '_sp',
        AFTER  = '_pc';

    // PC高解像度画像最適化クラス付与
    HR_IMG.addClass('hr-img-width');
    
    switchImg();

    HR_IMG.each(function(){

      var img_width  = $(this).width();
      var img        = new Image();

      img.src = $(this).attr('src');

      var _width = img.width;

      // 元画像の半分の値を挿入
      $(this).attr('width',_width/2);

    });

  }

  // 画像切り替え
  function switchImg(){

    $('img[src*=_pc],img[src*=_sp]').each(function(){

      var img = $(this).attr('src').replace(BEFORE, AFTER);

      if( $(this).attr('src').match(BEFORE) ) {
        $(this).attr('src', img);
      }

    });
  }

})

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
トップに戻るボタン
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var b = window.innerWidth;
var c = $(".scroll");
$(window).scroll(function () {100 < $(this).scrollTop()? c.stop().animate({bottom : "0",opacity: 1}, 50): c.stop().animate({bottom : "-20px",opacity: 0}, 100)});
c.click(function () {$("body, html").stop().animate({scrollTop: 0}, 500, "swing");})