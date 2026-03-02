/*
 * LP modal Plugin
 *
 */

(function($) {
	$.fn.lpModal = function(options) {
		var o = $.extend({
			regFlag: '//www.rakuten-sec.co.jp/',
			//regFlag: 'http://10.166.10.116/', //テスト用
			//showUrl: '//account.rakuten-sec.co.jp/ITS/lp/atention.html?height=340&width=600'
			//showUrl: '//10.166.10.116:20100/ITS/lp/atention.html?height=340&width=600'
			showUrl: '//accd.rakuten-sec.co.jp/ITS/lp/atention.html?height=340&width=600'
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




	