var userAgent = window.navigator.userAgent.toLowerCase();
    
if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
	var current = document.currentScript;
	var script = document.createElement("script")
        script.setAttribute('defer', true);
	script.src="/web/shared/js/top/20200227/s3-script_top_ie.js";
        current.parentNode.appendChild(script);
}else{
	var current = document.currentScript;
	var script = document.createElement("script")
	script.setAttribute('defer', true);
	script.src="/web/shared/js/top/20200227/s3-script_top_20211102.js";
        current.parentNode.appendChild(script);
}