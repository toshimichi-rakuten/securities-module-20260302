function openWinLp(){
	var winW = window.innerWidth;

	if (winW < 768) {
		var url = "/web/help/chat/visitor/";
		window.open(
			url,
			"_blank"
		);
	} else {
		try {
			var url = usergram.link("/web/help/chat/visitor/");
		} catch(e) {
			var url = "/web/help/chat/visitor/";
		}
		window.open(
			url,
			"_blank",
			"menubar=0,width=400,height=600,top=0,left=0,scrollbars=1"
		);
	}
}