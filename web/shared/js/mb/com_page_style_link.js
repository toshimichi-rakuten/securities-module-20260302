function setActiveStyleSheet(title) {
	var	convTitle = title ;
	convTitle = "rswStyleLink" + title ;
	try {
		setActiveStyleSheetFunc( convTitle, document ) ;
	}
	catch( errObj ) {
		;
	}

	setStyleLinkView( convTitle, "small" ) ;
	setStyleLinkView( convTitle, "medium" ) ;
	setStyleLinkView( convTitle, "large" ) ;

	createCookie("rswStyle", title, 365);
}

function setStyleLinkView(title,link_id) {
	var a ;
	a = document.getElementById(link_id);
	if( a == null )	return ;
	a.className = ( a.title == title ? "htsact" : "" ) ;
}

function setActiveStyleSheetFunc(title,doc) {
	var i, a, main;

	if(!doc.styleSheets){
		for(i=0; (a = doc.getElementsByTagName("rswStyleLink")[i]); i++) {
			if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
				a.disabled = true;
				if(a.getAttribute("title") == title) a.disabled = false;
			}
		}
	}
	else {
		a = doc.styleSheets;

		for(i=0; i<a.length; i++) {
			if( a[i].title == null )	continue ;
			if( a[i].title.indexOf("rswStyleLink") < 0 )	continue ;
			a[i].disabled = ((a[i].title==title)||(!a[i].title)) ? false : true;
		}

		var agent = navigator.userAgent;
		if ( agent.indexOf("Safari") >= 0 ){
			var link	= null ;
			var j	= 0 ;
			link	= doc.getElementsByTagName( "link" ) ;
			for( j = 0; j < link.length; j++ ) {
				if( link[j].title == null )	continue ;
				if( link[j].title == "" )	continue ;
				if( link[j].title.indexOf("rswStyleLink") < 0 )	continue ;

				link[j].disabled	= true ;	// Safariの場合、初回の文字サイズ切り替え時、disableにtrueを設定しないと正しく反映されない
				link[j].disabled = ((link[j].title==title)||(!link[j].title)) ? false : true;
				link[j].setAttribute( "rel", ( link[j].disabled ) ? "alternate stylesheet" : "stylesheet" ) ;
			}
		}
  	}
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function setActiveStyleSheetForPopUp(title) {
	var	convTitle = title ;
	convTitle = "rswStyleLink" + title ;
	try {
		setActiveStyleSheetFunc( convTitle, document ) ;
	}
	catch( errObj ) {
		;
	}

	setStyleLinkView( convTitle, "small" ) ;
	setStyleLinkView( convTitle, "medium" ) ;
	setStyleLinkView( convTitle, "large" ) ;

	createCookie("rswStyle", title, 365);
}


