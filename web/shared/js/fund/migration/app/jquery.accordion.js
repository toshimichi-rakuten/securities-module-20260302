(function($) {
	$.fn.accordion = function(options) {
		var o = $.extend({
			accordionElem: '#acco', //アコーディオンの対象
			clickElem: 'p.open-acco', //クリックする要素
			openClass: 'open', //クリックする要素に付加するクラス名
			targetElem: 'div', //ターゲット要素
			targetType: 'nextElem', //ターゲットが隣接する要素か子要素か
			effectType: 'slide', //エフェクトのタイプ slide or fade
			time: 500 //ディレイタイム
		}, options);
	
		$(o.accordionElem).each(function() {
			
			switch(o.targetType) {
				
				//隣の要素を表示・非表示
				case 'nextElem' :
				$(this).children(o.clickElem).next(o.targetElem).css({'display': 'none'});
		
				if(o.effectType == 'slide') {
					
					$(this).children(o.clickElem).toggle(function() {
						$(this).addClass(o.openClass).next(o.targetElem).slideDown(o.time);
					}, function() {
						$(this).removeClass(o.openClass).next(o.targetElem).slideUp(o.time);
					});
				} else {
					$(this).children(o.clickElem).toggle(function() {
						$(this).addClass(o.openClass).next(o.targetElem).fadeIn(o.time);
					}, function() {
						$(this).removeClass(o.openClass).next(o.targetElem).fadeOut(o.time);
					});
				}
				break;
				
				//子の要素を表示・非表示
				case 'childElem' :
				if(o.effectType == 'slide') {
					$(this).children(o.clickElem).toggle(function() {
						$(this).addClass(o.openClass).children().slideDown(o.time);
					}, function() {
						$(this).removeClass(o.openClass).children().slideUp(o.time);
					});
				} else {
					$(this).children(o.clickElem).toggle(function() {
						$(this).addClass(o.openClass).children().fadeIn(o.time);
					}, function() {
						$(this).removeClass(o.openClass).children().fadeOut(o.time);
					});
				}
				break;
			}
		});
	return this;
	};
})(jQuery);
