function readCookie2(name) {
	var nameEQ = name + "=";
	var ca = parent.document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function setAccHiddenParam( form ) {
	var date	= readCookie2( "Date" ) ;
	var key_1	= readCookie2( "key_1" ) ;
	var key_2	= readCookie2( "key_2" ) ;
	var key_3	= readCookie2( "key_3" ) ;
	var bname	= readCookie2( "bname" ) ;
	var accInputRoute = readCookie2( "accInputRoute" );

	form.inputStartDate.value	= ( date != null ? date : "" ) ;
	form.key1.value				= ( key_1 != null ? key_1 : "" ) ;
	form.key2.value				= ( key_2 != null ? key_2 : "" ) ;
	form.key3.value				= ( key_3 != null ? key_3 : "" ) ;
	form.bannerName.value		= ( bname != null ? bname : "" ) ;
	if(accInputRoute != null && accInputRoute != "") {
		form.accInputRoute.value    = accInputRoute ;
	}

}
