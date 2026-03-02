// JavaScript Document
(function($) {
	$(function newUp(y, m, d, c) {
		delDay = 7; // 何日後に削除するか
		oldDay = new Date(y + "/" + m + "/" +d);
		newDay = new Date();
		d =(newDay - oldDay) / (1000 * 24 * 3600);
		if(d <= delDay) {
			// Newマーク
			if(c == "new") document.write("<span class='icon-new'>NEW</span>");
		}
	});
})(jQuery);