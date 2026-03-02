/**
 *	jquery.share-button.js
 *  Ver 3.2
 */


(function($) {
	$.fn.socialService = function(options) {
		var o = $.extend({
			line: '.line-share',
			enUrl: encodeURIComponent(location.href),
			enDoc: encodeURIComponent(document.title),
			noUrl: location.href,
			charset: 'utf-8'
		}, options);

		$(o.line).each(function() {
			if(!navigator.userAgent.match(/(iPhone|iPad|iPod)/)) {
				$(this).hide();
			} else {
				$(this).show();
			}
		});
	return this;
	};

})(jQuery);

$(function() {
	var target = $('div.social-service');
	target.socialService();

	if ($.browser.msie && $.browser.version == 7) {
		target.addClass('IE7')
		.find('.twitter-share').css('display','none');
	} else if ($.browser.msie && $.browser.version == 6) {
		target.addClass('IE6')
		.find('.twitter-share').css('display','none');
	} else if ($.browser.msie && $.browser.version == 8) {
		target.addClass('IE8')
		.find('.twitter-share').css('display','none');
	}else{
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
	}
});

