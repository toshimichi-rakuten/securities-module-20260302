/*
 * jquery.tabs.load.js
 *
 * クリックされたら指定したURLを読み込んで表示します。
 *
 * 【使用方法】
 * 1.タブメニューを含め、表示・非表示する要素全てをdivでマークアップし、IDを指定します。 オプション：targetID: '#tab'
 * 2.クリックするタブメニューのリストを指定します。 オプション：tabElement: '.tab-list li'
 * 3.ファイルを読み込む要素をdivでマークアップし、IDを指定します。　オプション：dispElement: '#tab-display'
 * 4.読み込むファイルの名前を指定します。（読み込むファイルは0から連番でふって下さい。） オプション：url: 'inc' 例：inc0.html, inc1.html…
 * 5.コールバック関数のオプションが指定できますが、海外株式トップ専用ですのでこのオプションは通常使用しません。（初期値はfalse） オプション：callback: true
 *
 */
(function($) {
	$.fn.tabsLoad = function(options) {
		var o = $.extend({
			targetID: '#tab',
			tabElement: '.tab-list li',
			dispElement: '#tab-display',
			url: 'inc',
			callback: false
		}, options);
	
		$(o.tabElement, o.targetID).each(function() {
			var selectedTab = $.cookie(o.targetID + 'selectedTab');
			if (selectedTab) {
				$(o.tabElement, o.targetID).eq(selectedTab).addClass('selected');
				if (o.callback) {
					$(o.dispElement, o.targetID).hide().load(o.url +selectedTab +'.html',
					function(){
						secondTab();
					}).fadeIn();
				} else {
					$(o.dispElement, o.targetID).hide().load(o.url +selectedTab +'.html').fadeIn();
				}
			} else {
				$(o.tabElement, o.targetID).eq(0).addClass('selected');
				if (o.callback) {
					$(o.dispElement, o.targetID).hide().load(o.url +'0.html',
					function(){
						secondTab();
					}).fadeIn();
				} else {
					$(o.dispElement, o.targetID).hide().load(o.url +'0.html').fadeIn();
				}
			}
			
			$(this).click(function(){
				var tabIndex = $(o.tabElement, o.targetID).index(this);
				$.cookie(o.targetID + 'selectedTab', tabIndex);
				$(o.tabElement, o.targetID).removeClass('selected');
				$(this).addClass('selected');
				if (o.callback) {
					$(o.dispElement, o.targetID).hide().load(o.url +tabIndex +'.html', function(){
						secondTab();
					}).fadeIn();
				} else {
					$(o.dispElement, o.targetID).hide().load(o.url +tabIndex +'.html').fadeIn();
				}
			});
			
		});
		
		//海外株式トップ用コールバック関数
		function secondTab() {
			$('div#china-search-item').hide();
			$('div#asean-search-item').hide();
			$('input[name="item-1"]:radio').click(function() {
				var data = $(this).val();
				if(data == 'us-checked') {
					$('div#china-search-item').hide();
					$('div#asean-search-item').hide();
					$('div#us-search-item').fadeIn();
				} else if(data == 'china-checked') {
					$('div#us-search-item').hide();
					$('div#asean-search-item').hide();
					$('div#china-search-item').fadeIn();
				} else {
					$('div#us-search-item').hide();
					$('div#china-search-item').hide();
					$('div#asean-search-item').fadeIn();
				}
			});
		}
		return this;
	};
})(jQuery);