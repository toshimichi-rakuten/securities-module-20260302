/**
 *	jquery.share-button.js
 *  Ver 2.3
 */

	
(function($) {
	
	$.fn.socialService = function(options) {
		var o = $.extend({
			twitterD: '.twitter-d',
			googlePlusD: '.google-plus-d',
			facebookD: '.facebook-d',
			enUrl: encodeURIComponent(location.href),
			enDoc: encodeURIComponent(document.title),
			countParam: '?l-id=tweetbtn', //計測パラメーター
			hashTag: '#rsec',
			hatena: '.hatena-c',
			hLayout: 'simple',
			yahoo: '.yahoo-c',
			google: '.google-c',
			livedoor: '.livedoor-c',
			delicious: '.delicious-c',
			charset: 'utf-8'
		}, options);
		
		$(o.facebookD).each(function() {
			var facebookUrl = '//www.facebook.com/plugins/like.php?href=' + document.URL +'&amp;layout=standard&amp;show_faces=false&amp;width=77&amp;action=like&amp;colorscheme=light';
			$(this).append('<iframe src="' + facebookUrl + '" allowtransparency="true" style="border:none;overflow:hidden;width:77px;height:24px;right:0;" frameborder="0" scrolling="no"></iframe>');
		});
		
		/* Tweetボタン改修前
		$(o.twitterD).each(function() {
			$(this).append('<a href="https://twitter.com/share" class="twitter-share-button" data-lang="ja" data-related="RakutenSec" data-count="none" data-hashtags="rsec">Tweet</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>')
		});*/
		
		//Tweetボタン改修後
		o.docTitle = o.docTitle + " #rsec";
		$(o.twitterD).each(function() {
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'javascript:;',
				'title': 'このページをツイートする'
			})
			.click(function(){
				var title = o.enDoc + encodeURIComponent(' ' + o.hashTag);
				var openurl =
				'http://twitter.com/share?original_referer=https://www.rakuten-sec.co.jp/&text=' + title + '&url=' + o.enUrl + o.countParam;
				window.open(openurl);
			});
		});
		
		
		$(o.googlePlusD).each(function() {
			$(this).append('<div class="g-plusone" data-size="medium" data-count="false"></div>');
		});
	
		$(o.hatena).each(function() {
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'http://b.hatena.ne.jp/append?' + o.enUrl,
				'title': 'このページをはてなブックマークにブックマークする'
			})
			.addClass('hatena-bookmark-button')
		});
		
		$(o.yahoo).each(function(){
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'javascript:;',
				'title': 'このページをYahooブックマークにブックマークする'
			})
			.click(function(){
				var openurl =
					'http://bookmarks.yahoo.co.jp/action/bookmark?t=' + o.enDoc + '&u=' + o.enUrl;
				window.open(openurl);
			});
		});
		
		$(o.google).each(function(){
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'https://www.google.com/bookmarks/mark?op=add&bkmk=' + o.enUrl + '&title=' + o.enDoc,
				'title': 'このページをGoogleブックマークにブックマークする'
			});
		});
		
		/* LiveDoorブックマーク終了に伴い削除
		$(o.livedoor).each(function(){
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'javascript:;',
				'title': 'このページをLiveDoorブックマークにブックマークする'
			})
			.click(function(){
				var openurl =
				'http://clip.livedoor.com/redirect?link=' + o.enUrl + '&title=' + o.enDoc + '&ie=' + o.charset
				window.open(openurl);
			});
		});*/
		
		$(o.delicious).each(function(){
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'javascript:;',
				'title': 'このページDeliciousにブックマークする'
			})
			.click(function(){
				var openurl =
					'http://www.delicious.com/save?url=' + o.enUrl + '&title=' + o.enDoc;
				window.open(openurl);
			});
		});
	return this;
	};

})(jQuery);

$(function() {
	
	var target = $('div.sns-sbs');
	target.socialService();
	
	if ($.browser.msie && $.browser.version == 7) {
		target.addClass('IE7');
	} else if ($.browser.msie && $.browser.version == 6) {
		target.addClass('IE6');
	} else if ($.browser.msie && $.browser.version == 8) {
		target.addClass('IE8');
	}
	
});