/**
 * twitterに書き込みする
 */
function sendTwitter(title, url){
	if(title == null || title == ''){
		title = "楽天証券";
	}else{
		title = "【楽天証券】" + title + " #rsec ";
	}

	if(url == null || url == ''){
		url = window.location.href;
	}
	var openUrl = 'http://twitter.com/share?original_referer=https://www.rakuten-sec.co.jp/&text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url);
	window.open( openUrl, 'twitter');
}
