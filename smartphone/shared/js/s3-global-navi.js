

//header分の空ボックスを作成
var headerheight = document.getElementById("VHEAD").clientHeight;
$('.s3-marginbox--header').css('height', headerheight + 'px');


//Menuの表示
var btn = document.getElementById('s3-nav--button');
var box = document.getElementById('s3-menu--opened');
// var screenheight = window.parent.screen.height;
var menuonopen = 'メニュー';
var menuonclose = '閉じる';
var buttontext;
btn.onclick = function () {
$('.s3-menu-trigger').toggleClass('active');
box.classList.toggle('s3-menu--is-show')
var boxmargin = parseInt($('.s3-menu__container').css('margin-bottom'), 10);
$('.s3-menu__container--margentop').css('margin-top', headerheight + boxmargin + 'px');
	// $('.s3-menu').css('height',screenheight);
	$('body').toggleClass('scroll-fixed');
	$('.s3-menu').scrollTop(0);
	if (buttontext == '閉じる'){
		$('.s3-nav__text').text(menuonopen);
		buttontext = $('#s3-nav_text').text();
	} else {
		$('.s3-nav__text').text(menuonclose);
		buttontext = $('#s3-nav_text').text();
	};
}

  //アコーディオンで内部表示
//アコーディオン開閉icon
var accordionclose = '閉じる'
var accordionopen =　'開く'
$(function(){
  $('.s3-menu__margin-top0').click(function() {
      if ($('.switch').prop('checked')) {
          $('.s3-menu--accordion__icon').removeClass('active');
          $('.s3-menu--right__text').text(accordionclose);
      } else {
          $('.s3-menu--accordion__icon').addClass('active');
					$('.s3-menu--right__text').text(accordionopen);
      }
  });
});


//アプリストアへの連携
//OSチェック
function checkOS(){
	var agent = navigator.userAgent;
	os = null;
	if(agent.search(/iPhone/) != -1){
		if(((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 ) && (navigator.userAgent.indexOf('OS 8') > 0)) {
			os = 'ios8';
		}else{
			os = 'ios';
		}
	}else if(agent.search(/Android/) != -1){
		os = 'android';
	}else{
		os = 'other';
	}
	return os;
}
function launchApp(appUrl, storeUrl){
	if(appUrl=='') {
		document.location = storeUrl;
		return;
	}
	var timeOutMs = 300;
	if(checkOS() == 'android') {
		timeOutMs = 500;
	}
	var iframe = document.createElement('iframe');
	iframe.style.visibility = "hidden";
	document.body.appendChild(iframe);
	var time = (new Date()).getTime();
	iframe.src = appUrl;
	setTimeout(function(){
		var now = (new Date()).getTime();
		document.body.removeChild(iframe);
		if((now-time)> (timeOutMs +100)) {
			return;
		}
		document.location = storeUrl;
	}, timeOutMs);
}
//iSPEED株
function start_ispeed() {
	var os = checkOS();
	if(os === 'ios'){
		launchApp('ispeed://launch', 'https://itunes.apple.com/jp/app/id389339704');
	}
	else if(os === 'android'){
		launchApp('', 'intent://launch#Intent;scheme=ispeed;package=jp.co.rakuten_sec.ispeed;end');
	}
	else if(os === 'other'){
		document.location = 'http://ispeed.jp/';
	}
};
//iSPEEDFX
function start_fx() {
	var os = checkOS();
	if(os === 'ios'){
		launchApp('ispeed-fx://', 'https://itunes.apple.com/jp/app/ispeed-fx-%E6%A5%BD%E5%A4%A9%E8%A8%BC%E5%88%B8%E3%81%AEfx%E3%82%A2%E3%83%97%E3%83%AA/id581029732?mt=8');
	}
	else if(os === 'android'){
		launchApp('', 'market://details?id=jp.co.mobileit.ispeed_fx');
	}
	else if(os === 'other'){
		document.location = 'http://ispeed.jp/';
	}
};

//iSPEED先物OP
function start_op() {
	var os = checkOS();
	if(os === 'ios'){
		launchApp('ispeed-fop://', 'https://itunes.apple.com/jp/app/ispeed-%E5%85%88%E7%89%A9op-%E6%A5%BD%E5%A4%A9%E8%A8%BC%E5%88%B8%E3%81%AE%E5%85%88%E7%89%A9-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%A2%E3%83%97%E3%83%AA/id584769039?mt=8');
	}
	else if(os === 'android'){
		launchApp('', 'market://details?id=jp.co.rakuten_sec.ispeed_fop');
	}
	else if(os === 'other'){
		document.location = 'http://ispeed.jp/';
	}
};
//iSPEEDCX
function start_cx() {
	var os = checkOS();
	if(os === 'ios'){
		launchApp('ispeed-fop://', 'https://itunes.apple.com/jp/app/ispeed-cx-%E6%A5%BD%E5%A4%A9%E8%A8%BC%E5%88%B8%E3%81%AE%E5%9B%BD%E5%86%85%E5%95%86%E5%93%81%E5%85%88%E7%89%A9%E5%B0%82%E7%94%A8%E5%8F%96%E5%BC%95%E3%82%A2%E3%83%97%E3%83%AA/id650830894?mt=8');
	}
	else if(os === 'android'){
		launchApp('', 'market://details?id=jp.co.commodity.iformula&hl=ja');
	}
	else if(os === 'other'){
		document.location = 'http://ispeed.jp/';
	}
};