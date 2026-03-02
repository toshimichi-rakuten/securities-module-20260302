/**
 *	jquery.share-button.js
 *  Ver 2.5
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

		// $(o.facebookD).each(function() {
		// 	$(this).append('<div class="fb-like" data-send="false" data-layout="standard" data-width="77" data-show-faces="false" data-colorscheme="light" data-action="like"></div>');
		// });

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
