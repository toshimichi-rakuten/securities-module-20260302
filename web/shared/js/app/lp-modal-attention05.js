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
			var query0 = location.search;
			var query = location.search.substring(1).split('&');
			var searchQuery0 = 'gclid=';
			var searchQuery1 = 'aid=';
			var searchQuery2 = 'scid=wi_pnt';
			var searchQuery3 = 'AC';
			var searchQuery4 = 'TG';
			var searchQuery5 = 'KC';
			var searchQuery6 = 'VC';
			var searchQuery7 = 'JN';
			var searchQuery8 = 'TCS';
			var searchQuery9 = 'RT';
			if (query0.match(searchQuery0)){
				return false;
			}else{
				for(var i = 0 ; i < query.length ;i++){
					if(query[i].match(searchQuery1) || query[i].match(searchQuery2) || query[i].match(searchQuery3) || query[i].match(searchQuery4) || query[i].match(searchQuery5) || query[i].match(searchQuery6) || query[i].match(searchQuery7) || query[i].match(searchQuery8) || query[i].match(searchQuery9)) return true;
				}
				return false;
			}
		}
	return this;
	};
})(jQuery);




