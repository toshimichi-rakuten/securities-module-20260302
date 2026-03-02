
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

var gz = getCookieHeader("Rg_sec");
var vhead = document.getElementById("VHEAD");
var btnAccount;
var btnSupport;
if (vhead){
	btnAccount = vhead.getElementsByClassName("rex-btn-account");
	btnSupport = vhead.getElementsByClassName("rex-btn-support");
}
if(btnAccount.length){
	if(gz == null) {
		btnAccount[0].style.display = "inline-block";
		btnSupport[0].style.display = "none";
	} else {
		btnAccount[0].style.display = "none";
		btnSupport[0].style.display = "inline-block";
	}
}

function getCookieHeader( name )
{
  var result = null;

  var cookieName = name + '=';
  var allcookies = document.cookie;

  var position = allcookies.indexOf( cookieName );

  if( position != -1 ) {
    var startIndex = position + cookieName.length;
    var endIndex = allcookies.indexOf( ';', startIndex );
    if( endIndex == -1 ) {
      endIndex = allcookies.length;
    }
    result = decodeURIComponent( allcookies.substring( startIndex, endIndex ) );
  }
  return result;
}

window.onload = function() {
	var floatModeselect = document.getElementById("float-modeselect");
	if(floatModeselect){
		if(gz == null) {
			floatModeselect.style.display = "none";
		} else {
			floatModeselect.style.display = "inline-block";
		}
	}
}


!function(){
  var G = GALFSRAM = window.GALFSRAM || {}
  G.mfx = G.mfx || {}
  G.mfx.router_mode = 'history'
}();