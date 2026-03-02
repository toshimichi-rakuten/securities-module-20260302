/*
 * jquery.navigation.low.js
 *
 * Ver 1.1
 * 4階層目もマッチするように改修
 *
 */
 
$(function() {
	
	var nav = $('div#nav-local').find('ul').find('ul');
	var navLi = nav.find('li');
	var myPath = location.pathname;
	var now = myPath.split('/');
	var dir = now.slice(2,3);
	var dirDeep = now.slice(3,4);
	
	nav.find('ul').hide();
	
	navLi.each(function() {
		var navID = $(this).attr('ID');
		if(navID == dir) {
			$(this).addClass('selected').children('ul').show();
		}
	});

	navLi.find('li').find('a').each(function() {
		var hrefPath = $(this).attr('href');
		var temp = hrefPath.indexOf(dirDeep);
		if (temp == 0) {
			$(this).parent('li').removeClass();
		} else if (temp != -1) {
			$(this).parent('li').addClass('selected');
		}
	});
	
	nav.find('li:last-child').addClass('last-child');
	
});