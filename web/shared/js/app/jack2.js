/*
 * jack.js
 * update 2013.9.26
 *
 *
 */

$(function() {
	$('body').css({'background-color' : '#2da6bb'});
	$('#box-tango').hide();

	$('#jack').html('<div id="left-bnr"><a href="/nisa/" onclick="s.lidTrack(\'vtop_sidecurtain_nisajack_left\')"><img src="/web/images/banners/isa_index/170x1024-left2.png" width="170" height="1024" /></a></div><div id="right-bnr"><a href="/nisa/campaign/nisa_rbankrate/" onclick="s.lidTrack(\'vtop_sidecurtain_nisajack_right\')"><img src="/web/images/banners/isa_index/170x1024-right2.png" width="170" height="1024" /></a></div>');

	//位置調整
	$('#left-bnr').css({
		'position': 'absolute',
		'left': '-185px',
		'top': '0'
	});
	$('#right-bnr').css({
		'position': 'absolute',
		'right': '-185px',
		'top': '0'
	});
});
