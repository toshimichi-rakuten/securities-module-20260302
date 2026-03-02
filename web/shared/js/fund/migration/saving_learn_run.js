(function($) {
	$(function() {
		
		if (typeof $.fn.livequery == 'function') {
			$('a.colorbox').livequery(function() {
				$(this).colorbox({
					iframe: true,
					innerWidth: 655,
					innerHeight: 376,
					scrolling: false
				});
			});
		}
		else {
			$('a.colorbox').colorbox({
				iframe: true,
				innerWidth: 655,
				innerHeight: 376,
				scrolling: false
			});
		}
		$('.socialtool').socialtool();
		$('div#appBrowser').appBrowser();
		$('div#appBrowser li.app span.figure').each(function() {
			var pos = ($(this).parents('ul.appList').find('li.app').index($(this).parents('li.app')) <= 2) ? 'right' : 'left';
			$(this).appBalloon({
				contents: $(this).siblings('div.detail'),
				position: pos
			});
		});
		$('div#appListSection div.head li a').smoothScroll({
			buffer: -5
		});
		$('div.appNavi').appCarousel();
		
	});
}) (jQuery);
