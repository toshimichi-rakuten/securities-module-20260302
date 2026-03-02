//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
トップに戻るボタン
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var b = window.innerWidth;
var c = $(".scroll");
$(window).scroll(function () {100 < $(this).scrollTop()? c.stop().animate({bottom : "0",opacity: 1}, 50): c.stop().animate({bottom : "-20px",opacity: 0}, 100)});
c.click(function () {$("body, html").stop().animate({scrollTop: 0}, 500, "swing");})