/*
 * average.js
 * Version 1.1
 *
 * 債券残存期間計算プラグイン
 * 2021/8/19 計算方法を修正
 * 
 */

(function($) {
	$.fn.average = function(options) {
		var o = $.extend({
			dispID: '#disp',
			year: 2020,
			month: 12
		}, options);
	
		$(o.dispID).each(function() {
			var today = new Date();
			var y = today.getFullYear();
			var m = today.getMonth()+1;
			
			var tempY = o.year - y;
			var tempM = o.month - m;
			var tempX = (tempY * 12) + tempM // 一旦月に変換
			//console.log(tempX)

			for( i = 0; tempX > 11; i++){
				tempX = tempX - 12
			}

			//console.log(i)
			//console.log(tempX)

		
			var txtY = ''
			var txtM = ''

			//年
			if(i == 0) {
			}else{
				txtY = i +'年'
			}

			//月
			if(tempX == 0){
			}else{
				txtM = tempX+'ヶ月'
			}

			//最終表記
			var txtX = '約'+ txtY + txtM
			//console.log(txtX)
			$(this).text(txtX)
		});
	return this;
	};

})(jQuery);