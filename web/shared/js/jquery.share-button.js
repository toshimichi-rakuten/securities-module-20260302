/**
 *	jquery.share-button.js
 *  Ver 1.1
 */
 
(function($) {
	$(function() {
		$('ul#share').share();
	});
	
	$.fn.share = function(options) {
		var o = $.extend({
			docUri: document.URL,
			docTitle: document.title,
			hashTag: '#rsec',
			twitter: '#twitter',
			facebook: '#facebook',
			hatena: '#hatena',
			hLayout: 'simple',
			yahoo: '#yahoo',
			google: '#google',
			livedoor: '#livedoor',
			charset: 'utf-8',
			delicious: '#delicious',
			evernote: '#evernote',
			clipID: '#str-container',
			suggestTags: 'tag1,tag2,tag3'
		}, options);
		
		o.docTitle = o.docTitle + " #rsec";
		
		$(o.twitter).each(function() {
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'javascript:;',
				'title': 'このページをツイートする'
			})
			.click(function(){
				var openurl =
				'http://twitter.com/share?original_referer=https://www.rakuten-sec.co.jp/&text=' + encodeURIComponent(o.docTitle) + '&url=' + encodeURIComponent(o.docUri);
				window.open(openurl);
			});
		});
		
		$(o.facebook).each(function() {
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'javascript:;',
				'title': 'このページをシェアする'
			})
			.click(function(){
				var openurl =
				'http://www.facebook.com/sharer.php?u=' + o.docUri;
				window.open(openurl);
			});
		});
		
		/*$(o.hatena).each(function() {
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'http://b.hatena.ne.jp/entry/' + o.docUri,
				'data-hatena-bookmark-title': o.docTitle,
				'data-hatena-bookmark-layout': o.hLayout,
				'title': 'このページをブックマークする'
			})
			.addClass('hatena-bookmark-button')
		});*/
		
		$(o.hatena).each(function() {
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'http://b.hatena.ne.jp/append?' + encodeURIComponent(o.docUri),
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
					'http://bookmarks.yahoo.co.jp/action/bookmark?t=' + encodeURIComponent(o.docTitle) + '&u=' + encodeURIComponent(o.docUri);
				window.open(openurl);
			});
		});
		
		$(o.google).each(function(){
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'https://www.google.com/bookmarks/mark?op=add&bkmk=' + o.docUri + '&title=' + o.docTitle,
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
				'http://clip.livedoor.com/redirect?link=' + encodeURIComponent(o.docUri) + '&title=' + o.docTitle + '&ie=' + o.charset
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
					'http://www.delicious.com/save?url=' + encodeURIComponent(o.docUri) + '&title=' + encodeURIComponent(o.docTitle);
				window.open(openurl);
			});
		});
	
		$(o.evernote).each(function(){
			$(this).wrapInner('<a></a>')
			.children()
			.attr({
				'href': 'javascript:;',
				'title': 'このページをEvernoteにクリップする'
			})
			.click(function(){
				Evernote.doClip({
					providerName: o.doctitle,
					contentId: o.clipID,
					suggestTags: o.suggestTags
				}); return false;
			});
		});
	return this;
	};

})(jQuery);