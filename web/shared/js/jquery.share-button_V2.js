/**
 *	jquery.share-button.js
 *  Ver 2.0
 */

	
(function($) {
	
	
	$.fn.socialService = function(options) {
		var o = $.extend({
			googlePlusD: '.google-plus-d',
			facebookD: '.facebook-d',
			enUrl: encodeURIComponent(location.href),
			enDoc: encodeURIComponent(document.title),
			docUrl: document.URL,
			docTitle: document.title,
			hatena: '.hatena-c',
			hLayout: 'simple',
			yahoo: '.yahoo-c',
			google: '.google-c',
			livedoor: '.livedoor-c',
			delicious: '.delicious-c',
			charset: 'utf-8'
		}, options);
		
	
		$(o.googlePlusD).each(function() {
			//$(this).append('<g:plusone size="small" href="' + o.enUrl + '"></g:plusone>');
			$(this).append('<div class="g-plusone" data-size="small" data-count="true" data-href="' + o.enUrl + '"></div>');
		});
	
		$(o.facebookD).each(function() {
			var facebookUrl = 'http://www.facebook.com/plugins/like.php?href=' + o.enUrl +'&layout=button_count&show_faces=fakse&width=100&action=like&colorscheme=light';
			$(this).append('<iframe src="' + facebookUrl + '" allowtransparency="true" style="border: medium none ; overflow: hidden; width: 100px; height: 21px;right: 0;" frameborder="0" scrolling="no"></iframe>');
		});
		
		$(o.hatena).each(function() {
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'http://b.hatena.ne.jp/append?' + o.enUrl,
				'title': 'このページをブックマークする'
			})
			.addClass('hatena-bookmark-button')
		});
		
		$(o.yahoo).each(function(){
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'javascript:;',
				'title': 'このページをブックマークする'
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
				'title': 'このページをブックマークする'
			});
		});
		
		$(o.livedoor).each(function(){
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'javascript:;',
				'title': 'このページをブックマークする'
			})
			.click(function(){
				var openurl =
				'http://clip.livedoor.com/redirect?link=' + o.enUrl + '&title=' + o.enDoc + '&ie=' + o.charset
				window.open(openurl);
			});
		});
		
		$(o.delicious).each(function(){
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'javascript:;',
				'title': 'このページをブックマークする'
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
	$('div.sns-sbs').socialService();
	var topHide = $('div.top ul.social-bookmark-btn').hide();
	var bottomHide = $('div.bottom ul.social-bookmark-btn').hide();
	
	/*$('div.top div.sbs p').css('cursor', 'pointer');
	$('div.top div.sbs p').toggle(function() {
		$(this).next().fadeIn();
	}, function() {
		$(this).next().fadeOut();
	});
	$('div.bottom div.sbs p').css('cursor', 'pointer');
	$('div.bottom div.sbs p').toggle(function() {
		$(this).next().fadeIn();
	}, function() {
		$(this).next().fadeOut();
	});*/
	
	$('div.top div.sbs p').css('cursor', 'pointer').click(function() {
		$(this).next().fadeIn().hover(
			function() {},
			function() {
				$(this).fadeOut();
		});
	});
	
	$('div.bottom div.sbs p').css('cursor', 'pointer').click(function() {
		$(this).next().fadeIn().hover(
			function() {},
			function() {
				$(this).fadeOut();
		});
	});
	
	
	if ($.browser.msie && $.browser.version < 6) {
		$('div.sns-sbs').addClass('underIE7');
	}
	
	/*$('div.top li.social-bookmark-list').css('cursor', 'pointer').click(function() {
		$(this).children().slideDown().hover(
			function() {},
			function() {
				$(this).slideUp();
		});
	});
	$('div.bottom li.social-bookmark-list').css('cursor', 'pointer').click(function() {
		$(this).children().slideDown().hover(
			function() {},
			function() {
				$(this).slideUp();
		});
	});*/
	
});