/*
 * LP modal Plugin
 *
 */

(function($) {
	$.fn.lpModal = function(options) {
		var o = $.extend({
			regFlag: 'https://stgwww.rakuten-sec.co.jp/',
			//regFlag: 'http://10.166.10.116/', //テスト用
			showUrl: 'https://stgwww.rakuten-sec.co.jp/web/lp/atention_test.html?height=340&width=600'
		}, options);
	
		modalShow();
		
		function modalShow() {
			var urlString = document.referrer;
			var regFlag = new RegExp(o.regFlag);
	
			if(!(urlString.match(regFlag))) {
				tb_show('', o.showUrl, '');
				$('div#TB_title').hide();
				$('div#TB_window').css({'border': 'none', 'border-radius': '5px'});
			}
		}
		
	return this;
	};
})(jQuery);




	