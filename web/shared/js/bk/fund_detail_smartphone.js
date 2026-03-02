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

function showLink(device,quarystring) {
	linkField = document.getElementById(device.tagId);
	linkField.style.display = "none";
	linkField.style.visibility = "hidden";

	isSmartphone = false;

	if(device.isIPhone()) {
		isSmartphone = true;
		linkField.innerHTML = '<nobr><a href="/web/fund/smartphone/products/fund/detail/' + quarystring + '"><img src="/web/images/index-btn-fund-brand-detail.jpg" border="0"></a></nobr>';
	} else if(device.isIPod()) {
		isSmartphone = true;
		linkField.innerHTML = '<nobr><a href="/web/fund/smartphone/products/fund/detail/' + quarystring + '"><img src="/web/images/index-btn-fund-brand-detail.jpg" border="0"></a></nobr>';
	} else if (device.isAndroid()) {
		isSmartphone = true;
		linkField.innerHTML = '<nobr><a href="/web/fund/smartphone/products/fund/detail/' + quarystring + '"><img src="/web/images/index-btn-fund-brand-detail.jpg" border="0"></a></nobr>';
	}
	
	if(isSmartphone) {
		linkField.style.width="";
		linkField.style.height="";

		linkField.style.visibility = "visible";
		linkField.style.display = "";
	}
}

function getQuaryString(){
        if(location.search.length > 1){
                return location.search;
        }
        else{
        	return ""
	}
}

function sMain(){
	qs = getQuaryString();
	device = new Device();
	showLink(device,qs);
}

