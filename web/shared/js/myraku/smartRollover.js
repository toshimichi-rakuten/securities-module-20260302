function smartRollover() {
	if(document.getElementsByTagName) {
		var tags = ["img","input"];
		for( var i=0; i<tags.length; i++ ) {
			var el = document.getElementsByTagName(tags[i]);
			for(var j=0; j<el.length; j++) {
				var attr = el[j].getAttribute("src");
				if( attr ) {
					if(el[j].getAttribute("src").match("_mouseoff.")) {
						el[j].onmouseover = function() {
							this.setAttribute("src", this.getAttribute("src").replace("_mouseoff.", "_mouseover."));
						}
						el[j].onmouseout = function() {
							this.setAttribute("src", this.getAttribute("src").replace("_mouseover.", "_mouseoff."));
						}
					}
				}
			}
		}
	}
}  
if(window.addEventListener) {  
  window.addEventListener("load", smartRollover, false);  
}  
else if(window.attachEvent) {  
  window.attachEvent("onload", smartRollover);
}