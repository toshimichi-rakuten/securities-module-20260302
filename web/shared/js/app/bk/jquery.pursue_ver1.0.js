/**
 *	jquery.pursue.js
 *  Latest Version
 *  Ver 1.0
 *
 *	sample code
 *	$.fn.pursue({targetID: '#str-sub-common'});
 *
 */

(function($) {
	$.fn.pursue = function(options) {
		var o = $.extend({
			targetID: '#str-sub-common',
			sideBarName: '#fixed-sidebar'
		}, options);

		$(o.targetID).each(function() {

			$(this).css({'position': 'relative'}).wrapInner('<div id="fixed-sidebar" style="width: 180px"></div>');

			//header部の個別高さ
			var grpheaderHeight = $('#grpheader').height() + 5; //paddingの5pxを足す
			var globalnavHeight = $('#nav-global').height() + 10; //marginの3px 7pxを足す
			var topicpathHeight = $('#topic-path').height() + 7; //marginの7pxを足す

			//header部の高さ合計
			var headerHeight = grpheaderHeight + globalnavHeight + topicpathHeight;


			//コンテンツの高さ
			var contentsHeight = $('#str-contents').height();

			//sidebar部の高さ
			var sidebarHeight = $(this).height(contentsHeight);

			//Viewの高さ
			var windowHeight = $(window).height();

			$(window).scroll(function() {

				//スクロール量の取得
				var scrollTopPos = $(window).scrollTop();

				//実際のコンテンツの高さから表示されている画面の高さの差分
				var contentsArea = contentsHeight - windowHeight;

				if(scrollTopPos < contentsArea && scrollTopPos > headerHeight) {
					$(o.sideBarName).css({
						'position': 'fixed',
						'top': '0'
					});
				} else if(scrollTopPos > contentsArea-headerHeight) {
					$(o.sideBarName).css({
						'position': 'absolute',
						'top': '',
						'bottom': '0'
					});
				} else if(scrollTopPos < headerHeight){
					$(o.sideBarName).css({
						'position': 'absolute',
						'top': '0',
						'bottom': ''
					});
				}
			});

		});
		return this;
	};
})(jQuery);

