/*
 * LP modal Plugin
 *
 */

(function($) {
	var b = window.innerWidth;
	var window_wid="?height=585&width=600";
	if(b < 768){
		window_wid="?height=415&width=320";
	}
	$.fn.lpModal = function(options) {
		var o = $.extend({
			showUrl: '/web/lp/atention02.html' + window_wid
		}, options);

		modalShow();

		function modalShow() {
			if(checkQuery()) {
				tb_show('', o.showUrl, '');
				$('div#TB_title').hide();
				$('div#TB_window').css({'border': 'none', 'border-radius': '0','width':'300px'});
			}
		}
		function checkQuery(){
			var query = location.search.substring(1).split('&');
			var searchQuery1 = 'aid=';
			var searchQuery2 = 'scid=';
			for(var i = 0 ; i < query.length ;i++){
				if(query[i].match(searchQuery1) || query[i].match(searchQuery2)) return true;
			}
			return false;
		}
	return this;
	};
})(jQuery);
