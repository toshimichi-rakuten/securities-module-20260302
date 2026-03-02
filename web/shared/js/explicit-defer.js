"use strict";

function downloadJSAtOnload() {
	const element = document.createElement("script");
	element.src="/web/shared/js/third-party.js";
    document.body.appendChild(element);
}

if (window.addEventListener)
    window.addEventListener("load", downloadJSAtOnload, false);
else if (window.attachEvent)
    window.attachEvent("onload", downloadJSAtOnload);
else window.onload = downloadJSAtOnload;
