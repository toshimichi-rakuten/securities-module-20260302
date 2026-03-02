

function render_header(){
	var url_path = window.location.pathname;
	var strInnerHTML_prefix ="<dl><dt>グローバルナビゲーション</dt><dd><ul>\n";
	var strInnerHTML = "";
	var strInnerHTML_home_selected = "";
	var strInnerHTML_home_nonselected = "";
	var isSelected = 0; //0: no match;  1: match URL (Home);  2:match URL (others)
	
	//alert(url_path);
	//1. Home
	strInnerHTML_home_selected = '<li class="selected"><a href="/"><img src="/web/shared/images/nav-global/global-nav-home-h.gif" alt="ホーム" width="73" height="27" /></a><ul><li><a href="/web/service/">サービス案内</a></li><li><a href="/web/products/">取扱商品</a></li><li><a href="/web/commission/">手数料</a></li><li><a href="/web/campaign/">キャンペーン</a></li><li><a href="/web/special/">特集</a></li><li><a href="/web/learn/">投資を学ぶ</a></li><li><a href="/web/help/">ヘルプ</a></li><li><a href="/web/info/">お知らせ</a></li><li class="last-child"><a href="/web/company/">楽天証券について</a></li></ul></li>\n';
	if( url_path.match(/web\/index\.html/) ||
		url_path.match(/web\/service\//) ||
		url_path.match(/web\/products\//) ||
		url_path.match(/web\/commission\//) ||
		url_path.match(/web\/campaign\//) ||
		url_path.match(/web\/special\//) ||
		url_path.match(/web\/learn\//) ||
		url_path.match(/web\/help\//) ||
		url_path.match(/web\/info\//) ||
		url_path.match(/web\/company\//)){
		//strInnerHTML_home_selected = '<li class="selected"><a href="/"><img src="/web/shared/images/nav-global/global-nav-home-h.gif" alt="ホーム" width="73" height="27" /></a><ul><li><a href="/web/service/">サービス案内</a></li><li><a href="/web/products/">取扱商品</a></li><li><a href="/web/commission/">手数料</a></li><li><a href="/web/campaign/">キャンペーン</a></li><li><a href="/web/special/">特集</a></li><li><a href="/web/learn/">投資を学ぶ</a></li><li><a href="/web/help/">ヘルプ</a></li><li><a href="/web/info/">お知らせ</a></li><li class="last-child"><a href="/web/company/">楽天証券について</a></li></ul></li>\n';
		isSelected = 1;
	}else{
		strInnerHTML_home_nonselected = '<li><a href="/"><img src="/web/shared/images/nav-global/global-nav-home-o.gif" alt="ホーム" width="73" height="24" /></a></li>\n';
	}
	//2. Beginner
	if(url_path.match(/ITS\/rakuten_g\//)){
		strInnerHTML = strInnerHTML + '<li class="selected"><a href="/ITS/rakuten_g/start/"><img src="/web/shared/images/nav-global/global-nav-beginner-h.gif" alt="はじめての方へ" width="88" height="27" /></a><ul><li><a href="/ITS/rakuten_g/start/">はじめての楽天証券</a></li><li><a href="/ITS/rakuten_g/stock/">商品別初めてガイド</a></li><li><a href="/ITS/rakuten_g/marketspeed/">投資に役立つツール&amp;サービス</a></li><li class="last-child"><a href="/ITS/rakuten_g/campaign/">現在実施中の口座開設キャンペーン</a></li></ul></li>\n';
		isSelected = 2;
	}else{
		strInnerHTML = strInnerHTML + '<li><a href="/ITS/rakuten_g/start/"><img src="/web/shared/images/nav-global/global-nav-beginner-o.gif" alt="はじめての方へ" width="88" height="24" /></a></li>\n';
	}
	//3. Market
	if(url_path.match(/web\/market\//)){
		strInnerHTML = strInnerHTML + '<li class="selected"><a href="/web/market/"><img src="/web/shared/images/nav-global/global-nav-market-h.gif" alt="マーケット情報" width="110" height="27" /></a><ul><li><a href="/web/market/">マーケット情報トップ</a></li><li><a href="/web/market/data/n225.html">指数・金利・為替</a></li><li><a href="/web/market/search/">銘柄検索</a></li><li><a href="/web/market/search/hp_search/">株主優待検索</a></li><li><a href="/web/market/ranking/value.html">ランキング</a></li><li><a href="/web/market/news/">ニュースヘッドライン</a></li><li><a href="/web/market/opinion/">レポート＆コメント</a></li><li class="last-child"><a href="/web/market/calendar/">経済カレンダー</a></li></ul>\n';
		isSelected = 2;
	}else{
		strInnerHTML = strInnerHTML + '<li><a href="/web/market/"><img src="/web/shared/images/nav-global/global-nav-market-o.gif" alt="マーケット情報" width="110" height="24" /></a></li>\n';
	}
	//4. Domestic
	if(url_path.match(/web\/domestic\//)){
		strInnerHTML = strInnerHTML + '<li class="selected"><a href="/web/domestic/"><img src="/web/shared/images/nav-global/global-nav-domestic-h.gif" alt="国内株式" width="73" height="27" /></a><ul><li><a href="/web/domestic/">国内株式トップ</a></li><li><a href="/web/domestic/stock/">現物取引</a></li><li><a href="/web/domestic/margin/">信用取引</a></li><li><a href="/web/domestic/pts/">PTS取引（夜間取引）</a></li><li><a href="/web/domestic/ipo/">新規公開／公募・売出</a></li><li><a href="/web/domestic/off_auction/">立会外分売</a></li><li class="last-child"><a href="/web/domestic/stock_fee.html">国内株式手数料の特徴</a></li></ul>\n';
		isSelected = 2;
	}else{
		strInnerHTML = strInnerHTML + '<li><a href="/web/domestic/"><img src="/web/shared/images/nav-global/global-nav-domestic-o.gif" alt="国内株式" width="73" height="24"></a></li>\n';
	}
	//5. Foreign
	if(url_path.match(/web\/foreign\//)){
		strInnerHTML = strInnerHTML + '<li class="selected"><a href="/web/foreign/"><img src="/web/shared/images/nav-global/global-nav-foreign-h.gif" alt="海外株式・ETF" width="110" height="27" /></a><ul><li><a href="/web/foreign/">海外株式・ETFトップ</a></li><li><a href="/web/foreign/us/">米国株式</a></li><li><a href="/web/foreign/china/">中国株式</a></li><li class="last-child"><a href="/web/foreign/etf/">海外ETF</a></li></ul></li>\n';
		isSelected = 2;
	}else{
		strInnerHTML = strInnerHTML + '<li><a href="/web/foreign/"><img src="/web/shared/images/nav-global/global-nav-foreign-o.gif" alt="海外株式・ETF" width="110" height="24"></a></li>\n';
	}
	//6.MMF
	if(url_path.match(/ITS\/ss\//)){
		isSelected = 2;
	}else{
		strInnerHTML = strInnerHTML + '<li><a href="/ITS/ss/"><img src="/web/shared/images/nav-global/global-nav-ss-o.gif" alt="投資信託" width="73" height="24" /></a></li>\n';
	}
	//7. Bond
	if(url_path.match(/web\/bond\/foreignbond\//)){
		strInnerHTML = strInnerHTML + '<li class="selected"><a href="/web/bond/foreignbond/"><img src="/web/shared/images/nav-global/global-nav-foreignbond-h.gif" alt="外国債券" width="73" height="27" /></a><ul><li class="last-child"><a href="/web/bond/foreignbond/">外国債券トップ</a></li></ul></li>\n';		
		isSelected = 2;
	}else{
		strInnerHTML = strInnerHTML + '<li><a href="/web/bond/foreignbond/"><img src="/web/shared/images/nav-global/global-nav-foreignbond-o.gif" alt="外国債券" width="73" height="24" /></a></li>\n';
	}
	//8. Fop
	if(url_path.match(/web\/fop\//)){
		strInnerHTML = strInnerHTML + '<li class="selected"><a href="/web/fop/"><img src="/web/shared/images/nav-global/global-nav-fop-h.gif" alt="先物・オプション" width="84" height="27" /></a><ul><li><a href="/web/fop/">先物・オプショントップ</a></li><li><a href="/web/fop/futures/">日経225先物／日経225ミニ</a></li><li class="last-child"><a href="/web/fop/option/">日経225オプション</a></li></ul></li>\n';
		isSelected = 2;
	}else{
		strInnerHTML = strInnerHTML + '<li><a href="/web/fop/"><img src="/web/shared/images/nav-global/global-nav-fop-o.gif" alt="先物・オプション" width="84" height="24" /></a></li>\n';
	}
	//9. FX
	if(url_path.match(/web\/fx\/rfx\//)){
		strInnerHTML = strInnerHTML + '<li class="selected"><a href="/web/fx/rfx/"><img src="/web/shared/images/nav-global/global-nav-fx-h.gif" alt="楽天FX" width="73" height="27" /></a><ul><li class="last-child"><a href="/web/fx/rfx/">楽天FXトップ</a></li></ul></li>\n';
		isSelected = 2;
	}else{
		strInnerHTML = strInnerHTML + '<li><a href="/web/fx/rfx/"><img src="/web/shared/images/nav-global/global-nav-fx-o.gif" alt="楽天FX" width="73" height="24" /></a></li>\n';
	}
	//10. forex
	if(url_path.match(/web\/currency\/forex\//)){
		strInnerHTML = strInnerHTML + '<li class="selected"><a href="/web/currency/forex/"><img src="/web/shared/images/nav-global/global-nav-forex-h.gif" alt="外国為替" width="73" height="27" /></a><ul><li class="last-child"><a href="/web/currency/forex/">外国為替トップ</a></li></ul></li>\n';
		isSelected = 2;
	}else{
		strInnerHTML = strInnerHTML + '<li><a href="/web/currency/forex/"><img src="/web/shared/images/nav-global/global-nav-forex-o.gif" alt="外国為替" width="73" height="24" /></a></li>\n';
	}
	//11. variety
	if(url_path.match(/web\/variety\/covered_warrant\//)){
		strInnerHTML = strInnerHTML + '<li class="selected"><a href="/web/variety/covered_warrant/"><img src="/web/shared/images/nav-global/global-nav-covered-warrant-h.gif" alt="カバードワラント" width="83" height="27" /></a><ul><li class="last-child"><a href="/web/variety/covered_warrant/">カバードワラントトップ</a></li></ul></li>\n';
		isSelected = 2;
	}else{
		strInnerHTML = strInnerHTML + '<li><a href="/web/variety/covered_warrant/"><img src="/web/shared/images/nav-global/global-nav-covered-warrant-o.gif" alt="カバードワラント" width="83" height="24" /></a></li>\n';
	}
	//12. deal with defaul select
	if(isSelected == 2){ //URL match a tab other than Home
		strInnerHTML = strInnerHTML_prefix + strInnerHTML_home_nonselected + strInnerHTML;
	}else{//URL match a tab other than Home
		strInnerHTML = strInnerHTML_prefix + strInnerHTML_home_selected + strInnerHTML;
	}
	
	strInnerHTML = strInnerHTML + "</ul></dd></dl>\n";
	//alert(strInnerHTML);
	//alert(isSelected);
	//Write document
	document.getElementById("nav-global").innerHTML = strInnerHTML;
}
