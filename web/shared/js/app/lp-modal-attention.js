/*
 * LP modal Plugin
 *
 */

(function($) {
	$.fn.lpModal = function(options) {
		var o = $.extend({
			showUrl: '/web/lp/atention.html?height=585&width=600'
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
			var searchQuery2 = 'scid=wi_pnt';
			for(var i = 0 ; i < query.length ;i++){
				if(query[i].match(searchQuery1) || query[i].match(searchQuery2)) return true;
			}
			return false;
		}
	return this;
	};
})(jQuery);




