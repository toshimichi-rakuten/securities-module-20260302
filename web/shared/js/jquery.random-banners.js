/**
 *	jquery.random-banners.js
 *  Ver 1.2
 *
 *  Version History
 *  Ver1.2 2011.12.30 表示されるバナーを1本、2本と選べるように修正
 *  Ver1.1 2011.10.24 計算式を変更
 *  Ver1.0 2011.9.26 制作
 *
 */
 
(function($){
	$.fn.randomBanners = function(options){     
		var o = $.extend({
			targetID: '#rndBnr',
			targetVal: 1
		}, options);
        
		$(o.targetID).each(function(){
			
			var elem = $(this).children().length;
			
			var rnd1 = Math.floor(Math.random() * elem);
			$(this).children().eq(rnd1).css({'display': 'block'});
			
			if(o.targetVal == 2) {
				var rnd2=(rnd1 + Math.floor(Math.random() * (elem-1))+1)%elem;
				$(this).children().eq(rnd2).css({'display': 'block'});
			}
			
		});
		return this;
	}
      
})(jQuery);
