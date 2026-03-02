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
	this.isAndroid = function() {
		if(navigator.userAgent.match(/Android/) && !navigator.userAgent.match("Android 3")) {
			return true;
		}
		return false;
	};
}

function showLink(device) {
	linkField = document.getElementById(device.tagId);
	linkField.style.display = "none";
	linkField.style.visibility = "hidden";

	isSmartphone = false;

	if(device.isIPhone()) {
		isSmartphone = true;
		linkField.innerHTML = '<a href="https://www.rakuten-sec.co.jp/web/fund/smartphone/products/fund/ranking/?l-id=web_fund_spbnr"><img src="/web/images/index-btn-fund-site.jpg" border="0"></a>';
	} else if(device.isIPod()) {
		isSmartphone = true;
		linkField.innerHTML = '<a href="https://www.rakuten-sec.co.jp/web/fund/smartphone/products/fund/ranking/?l-id=web_fund_spbnr"><img src="/web/images/index-btn-fund-site.jpg" border="0"></a>'
	} else if (device.isAndroid()) {
		isSmartphone = true;
		linkField.innerHTML = '<a href="https://www.rakuten-sec.co.jp/web/fund/smartphone/products/fund/ranking/?l-id=web_fund_spbnr"><img src="/web/images/index-btn-fund-site.jpg" border="0"></a>'
	}
	
/*
*			+ '<a href="https://www.rakuten-sec.co.jp/smartphone/?l-id=vtop_smartphone_iphone"><img src="/web/images/index-btn-iphone-02.gif" border="0"></a></nobr>';
*	} else if(device.isIPod()) {
*		isSmartphone = true;
*		linkField.innerHTML = '<nobr><a href="http://ispeed.jp/iphone/?l-id=vtop_smartphone_ispeed_iphone"><img src="/web/images/index-btn-iphone-01.gif" border="0"></a>'
*			+ '<a href="https://www.rakuten-sec.co.jp/smartphone/?l-id=vtop_smartphone_iphone"><img src="/web/images/index-btn-iphone-02.gif" border="0"></a></nobr>';
*	} else if (device.isAndroid()) {
*		isSmartphone = true;
*		linkField.innerHTML = '<a href="https://www.rakuten-sec.co.jp/smartphone/?l-id=vtop_smartphone_android"><img src="/web/images/index-btn-fund-site.jpg" border="0"></a>';
*	}
*/

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

