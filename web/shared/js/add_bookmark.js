function addBookmark() {

	if(navigator.userAgent.indexOf("MSIE") > -1){ //Internet Explorer
	document.write('<!-'+'-[if IE]>');
	document.write('<ul class="topUtilityLink"><li class="addBm"><a href="#" onclick="addBookmarkIE();s.lidTrack(\'vtop_addbookmark\');return false;">このページをブックマーク（お気に入り）に登録する</a></li><li class="twttr"><a href="http://twitter.com/RakutenSec" onclick="s.lidTrack(\'vtop_header_twitter\')">楽天証券公式twitter（ツイッター）</a></li><li class="fb"><a href="http://www.facebook.com/RakutenSec" onclick="s.lidTrack(\'vtop_header_facebook\')">楽天証券公式Facebook（フェイスブック）</a></li><li class="ad"><a href="http://ad2.trafficgate.net/t/r/4414/1441/99636_99636/" onclick="s.lidTrack(\'vtop_header_rakuten_kc\')">楽天カード入会で最大7000ポイント!</a></li></ul>');
	document.write('<![endif]-'+'->');
	}
	
	else if(navigator.userAgent.indexOf("Firefox") > -1){ //Firefox
	document.write('<ul class="topUtilityLink"><li class="addBm"><a href="#" onclick="addBookmarkFF();s.lidTrack(\'vtop_addbookmark\');return false;">このページをブックマーク（お気に入り）に登録する</a></li><li class="twttr"><a href="http://twitter.com/RakutenSec" onclick="s.lidTrack(\'vtop_header_twitter\')">楽天証券公式twitter（ツイッター）</a></li><li class="fb"><a href="http://www.facebook.com/RakutenSec" onclick="s.lidTrack(\'vtop_header_facebook\')">楽天証券公式Facebook（フェイスブック）</a></li><li class="ad"><a href="http://ad2.trafficgate.net/t/r/4414/1441/99636_99636/" onclick="s.lidTrack(\'vtop_header_rakuten_kc\')">楽天カード入会で最大7000ポイント!</a></li></ul>');
	}
	
	else if(navigator.userAgent.indexOf("Opera") > -1){ //Opera
	document.write('<ul class="topUtilityLink"><li class="addBm"><a href="https://www.rakuten-sec.co.jp/" rel="sidebar" title="楽天証券" onclick="s.lidTrack(\'vtop_addbookmark\');">このページをブックマーク（お気に入り）に登録する</a></li><li class="twttr"><a href="http://twitter.com/RakutenSec" onclick="s.lidTrack(\'vtop_header_twitter\')">楽天証券公式twitter（ツイッター）</a></li><li class="fb"><a href="http://www.facebook.com/RakutenSec" onclick="s.lidTrack(\'vtop_header_facebook\')">楽天証券公式Facebook（フェイスブック）</a></li><li class="ad"><a href="http://ad2.trafficgate.net/t/r/4414/1441/99636_99636/" onclick="s.lidTrack(\'vtop_header_rakuten_kc\')">楽天カード入会で最大7000ポイント!</a></li></ul>');
	}
	
	else { //該当なし
	document.write('<ul class="topUtilityLink"><li class="twttr"><a href="http://twitter.com/RakutenSec" onclick="s.lidTrack(\'vtop_header_twitter\')">楽天証券公式twitter（ツイッター）</a></li><li class="fb"><a href="http://www.facebook.com/RakutenSec" onclick="s.lidTrack(\'vtop_header_facebook\')">楽天証券公式Facebook（フェイスブック）</a></li><li class="ad"><a href="http://ad2.trafficgate.net/t/r/4414/1441/99636_99636/" onclick="s.lidTrack(\'vtop_header_rakuten_kc\')">楽天カード入会で最大7000ポイント!</a></li></ul>');
	}
	
}

function addBookmarkIE() {
window.external.AddFavorite('https://www.rakuten-sec.co.jp/','楽天証券')
}
function addBookmarkFF() {
window.sidebar.addPanel('楽天証券','https://www.rakuten-sec.co.jp/','')
}
