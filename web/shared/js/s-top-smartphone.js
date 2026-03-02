(function($){

function Device() {
	this.tagId = '.rc-h-standard';
	this.type = (function() {
		if(navigator.userAgent.match(/iPhone/)) {
			return 'iphone';
		} else if(navigator.userAgent.match(/iPod/)){
			return 'ipod';
		} else if(navigator.userAgent.match(/iPad/)){
			return 'ipad';
		} else if(navigator.userAgent.match(/Android/) && !navigator.userAgent.match("Android 3")){
			return 'android';
		} else {
			return false;
		}
	})();
}

function showLink(device) {
	if(device.type) {
		linkField = jqBase(device.tagId);
		if(device.type != 'ipad'){
			linkField.prepend('<div style="text-align:center;"><nobr><a href="http://ispeed.jp/smartphone/?l-id=vtop_smartphone_ispeed_' + device.type + '"><img src="/web/images/banners/ispeed_ip_an/470x120.jpg" border="0"></a><a href="https://www.rakuten-sec.co.jp/smartphone/?l-id=vtop_smartphone_' + device.type + '"><img src="/web/images/index-btn-iphone-02.gif" border="0"></a></nobr></div>');
		}else{
			linkField.prepend('<div style="text-align:center;"><nobr><a href="http://ispeed.jp/ipad/?l-id=vtop_smartphone_ispeed_' + device.type + '"><img src="/web/images/banners/ispeed_ip_an/470x120.jpg" border="0"></a><a href="https://www.rakuten-sec.co.jp/smartphone/?l-id=vtop_smartphone_' + device.type + '"><img src="/web/images/index-btn-iphone-02.gif" border="0"></a></nobr></div>');
		}
	}
}

function sMain(){
	device = new Device();
	showLink(device);
}

sMain();

})(jqBase);


