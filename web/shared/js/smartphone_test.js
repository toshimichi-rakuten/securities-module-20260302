function Device() {
	this.tagId = "smartphoneSite";
	this.isIPhone = function() {
		if(navigator.userAgent.match(/iPhone/)) {
			return true && !this.isIPod() && !this.isIPad();
		}
		return false;
	};
	this.isIPod = function() {
		if(navigator.userAgent.match(/iPod/)) {
			return true;
		}
		return false;
	};
	this.isIPad = function() {
		if(navigator.userAgent.match(/iPad/)) {
			return true;
		}
		return false;
	};
	this.isAndroid = function() {
		if(navigator.userAgent.match(/Android/)) {
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
		linkField.innerHTML = '<div style="padding:10px 0 5px;"><a href="https://www.rakuten-sec.co.jp/smartphone/?l-id=vtop_smartphone_iphone"><img src="/web/images/index-btn-smartphone.png" border="0"></a></div>';
	} else if(device.isIPod()) {
		isSmartphone = true;
		linkField.innerHTML = '<div style="padding:10px 0 5px;"><a href="https://www.rakuten-sec.co.jp/smartphone/?l-id=vtop_smartphone_ipod"><img src="/web/images/index-btn-smartphone.png" border="0"></a></div>';
	} else if(device.isIPad()) {
		isSmartphone = true;
		linkField.innerHTML = '<a href="http://ispeed.jp/ipad/?l-id=vtop_smartphone_ipad"><img src="/web/images/index-btn-ipad.gif" border="0"></a>';
	} else if (device.isAndroid()) {
		isSmartphone = true;
		linkField.innerHTML = '<div style="padding:10px 0 5px;"><a href="https://www.rakuten-sec.co.jp/smartphone/?l-id=vtop_smartphone_android"><img src="/web/images/index-btn-smartphone.png" border="0"></a></div>';
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

