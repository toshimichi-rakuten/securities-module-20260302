// BackgroundImageCache
try {
	document.execCommand('BackgroundImageCache', false, true);
} catch(e) {}

jQuery(document).ready(function(){

	// viewport
	if(navigator.userAgent.indexOf('iPad') != -1){
		$('head').prepend('<meta name="viewport" content="width=1300, user-scalable=yes">\n');
	} else {
		$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=1">\n');
	}


	// Scroll
	$('a.scroll').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});

	// tel
	var ua = navigator.userAgent;
	if (ua.indexOf('iPhone') < 0 && ua.indexOf('Android') < 0) {
		$('a[href^="tel:"]').css('cursor', 'default').click(function (event) {
			event.preventDefault();
		});
	}

	// menuSp
	$('#menu').hide();
	$('#overlay').hide();
	$('.menuTrigger').click(function(){
		if ($(this).hasClass('active')) {
			$('#menu').slideUp('fast');
			$('#overlay').hide();
			$(this).removeClass('active');
			$('#menu').removeClass('open');
		} else {
			$('#menu').slideDown('fast');
			hsize = $('html').height();
			$('#overlay').show().css('height', hsize + 'px');
			$(this).addClass('active');
			$('#menu').addClass('open');
  			$('html').animate({scrollTop: 0},0);					
		}
		return false;
	});
	$('#menu .link01 > li > a').click(function(){
		if ($(this).parent('li').hasClass('acc')) {
			$(this).parent('li').find('ul').slideToggle('fast');
			$(this).parent('li').toggleClass('active');
			return false;
		}
	});
	$('#menu .close01 a').click(function(){
		$('#menu').slideUp('fast');
		$('#overlay').hide();
		$('.menuTrigger').removeClass('active');
		$('#menu').removeClass('open');
		return false;
	});
	// matchHeight
	//$('').matchHeight();

});