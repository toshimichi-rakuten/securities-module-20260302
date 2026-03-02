function Device() {
	this.tagId = "smartphoneSite";
	this.isIPhone = function() {
		if(navigator.userAgent.match(/iPhone/)) {
			return true && !this.isIPod();
		}
		return false;
	};
	this.isIPod = function() {
		if(navigator.userAgent.match(/iPod/)) {
			return true;
		}
		return false;
	};
	this.isAndroid = function() {^M
	        if(navigator.userAgent.match(/Android/) && !navigator.userAgent.match("Android 3")) {^M
	                return true;^M
	        }^M
	        return false;^M
	};^M
}

function showLink(device) {
	linkField = document.getElementById(device.tagId);
	linkField.style.display = "none";
	linkField.style.visibility = "hidden";

	isSmartphone = false;

	if(device.isIPhone()) {
		isSmartphone = true;
		linkField.innerHTML = '<nobr><a href="http://ispeed.jp/?l-id=vtop_smartphone_ispeed_iphone"><img src="/web/images/banners/ispeed_ip_an/470x120.jpg" border="0"></a>'
			+ '<a href="/smartphone/?l-id=vtop_smartphone_iphone"><img src="/web/images/index-btn-iphone-02.gif" border="0"></a></nobr>';
	} else if(device.isIPod()) {
		isSmartphone = true;
		linkField.innerHTML = '<nobr><a href="http://ispeed.jp/?l-id=vtop_smartphone_ispeed_ipod"><img src="/web/images/banners/ispeed_ip_an/470x120.jpg" border="0"></a>'
			+ '<a href="/smartphone/?l-id=vtop_smartphone_ipod"><img src="/web/images/index-btn-iphone-02.gif" border="0"></a></nobr>';
	} else if (device.isAndroid()) {
		isSmartphone = true;
		linkField.innerHTML = '<a href="/smartphone/?l-id=vtop_smartphone_android"><img src="/web/images/index-btn-smartphone.gif" border="0"></a>';
	}
	
	if(isSmartphone) {
		linkField.style.width="";
		linkField.style.height="";

		linkField.style.visibility = "visible";
		linkField.style.display = "";
	}
}

function sMain(){
	device = new Device();
	showLink(device);
}

