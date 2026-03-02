/**
 * 投信が参照されたクッキーを表示します。
 * jQueryのcookieオブジェクトを使用しているためjQueryおよびjQuery Cookieは必須
 * になります。
 */

function recentFundCookie0618(){
	var writeHtml = '';
	
	var s1 = $.cookie("ttid");		// 投信コード
	var s2 = $.cookie("recent");	// 投信名称

	// 閲覧された投信がない場合
	if(s1 == null || s2 == null) {
		writeHtml += "<p>【閲覧履歴がありません】</p>";
		writeHtml += "<p>ここに最近チェックした投資信託の銘柄情報が表示されます。</p>";
		writeHtml += "<p><a href=\"https://www.rakuten-sec.co.jp/web/fund/\">最新のランキングやオススメ銘柄はコチラでチェック！</a></p>";
		document.getElementById('tab-02').innerHTML = '<ul class=\"list-fund-last\">'+ writeHtml; + "</ul>";

		return;
	}

	// 閲覧された投信があった場合
	var sp     = s1.indexOf("=");
	var ep     = s1.indexOf("&");
	var fcodes = s1.substring(sp+1, ep);
	var fcode  = fcodes.split(",");

	var sp     = s2.indexOf("=");
	var fnames = s2.slice(sp+1);
	var fname  = fnames.split(",");
	
	for(var i=0; i< fcode.length; i++) {
		var cnt = i + 1;
		writeHtml += "<li>";
		writeHtml += "<p class=\"img\">";
		writeHtml += "<a href=\"https://www.rakuten-sec.co.jp/web/fund/detail/?ID=" + fcode[i] + "&l-id=vtop_checklist_fund_" + cnt + "\">";
		writeHtml += "<img src=\"/web/fund/detail/images/fund/" + fcode[i] + ".jpg\" alt=\"" + fname[i] + "\" width=\"23\" /></a></p>";
		writeHtml += "<p class=\"txt\">";
		writeHtml += "<a href=\"https://www.rakuten-sec.co.jp/web/fund/detail/?ID=" + fcode[i] + "&l-id=vtop_checklist_fund_" + cnt + "\">" + fname[i] + "</a></p>";
		writeHtml += "</li>";
	}

	if(writeHtml != ''){
		writeHtml += "</ul>";
		writeHtml += "<p class=\"comparison-btn\"><a href=\"Javascript:compareTopfive0618(\'" + fcodes + "\')\">";
		writeHtml += "<img alt=\"銘柄を比較する\" src=\"/web/shared/images/str-sub/history-btn-01.gif\"></a></p>";

		document.getElementById('tab-02').innerHTML = '<ul class=\"list-fund-last\">'+ writeHtml;
	}
}
function compareTopfive0618(fcodes) {   

    if(fcodes.indexOf(",")==-1) {
        window.alert("２件以内を比較できません。");
        return;
    }
    for (var i=0; i<5; i++) {
	    if(fcodes.indexOf(",") != -1) fcodes = fcodes.replace(",", "_");
	}
    window.location = "/web/fund/comparison/index.html?codes=" + fcodes;
}
