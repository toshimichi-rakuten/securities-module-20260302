var reutersReloadFlg = 0;
var reutersChartUrl = "";
var reutersLoaded = false;
var reutersError = false;

/**
* wkFld
* 更新フラグ用⇒ロイターASPキックのパラメータとなる
* １：市況　２：ランキング
*/
var wkFld;

/**
 * マーケット情報リロードを実施
 * 当初HTMLからパラメータを受信していたが、
 * マーケット情報とランキングが同一コンテナ内での表示となったため、
 * 更新用のフラグはグローバルフィールドからの展開とする。
 */
function reutersReload(){
	reutersReloadFlg = wkFld;
	date = new Date();
	var sTag = document.createElement("script");
	sTag.type="text/javascript";
	sTag.charset="utf-8";
	sTag.src = 'https://www.trkd-asia.com/rakutensec/f_index1.jsp?date=' + date.getTime();
	
	document.body.appendChild(sTag);
}

/**
 * ロイターのチャートの変更を実施
 * @param url チャートのurl
 */
function reutersChangeChartUrl(url, link, name){
	reutersChartUrl = url;
	date = new Date();
	document.getElementById('reuters_chart').src = reutersChartUrl + "&date=" + date.getTime();
	document.getElementById('reuters_chart_link').href=link;
	document.getElementById('reuters_market_title').innerHTML=name;
}

/**
 * マーケット情報タブ及びコピーライト表示部と更新するボタンの表示切替
 * @param num 表示番号
 */
function reutersChangeDisplay(num){
	switch(num) {
		case 0:		//市況
			document.getElementById('updateBtnOn').style.display = "";
			document.getElementById('updateBtnOff').style.display = "none";
			document.getElementById('reuters_chart_tab').style.display = "";
			document.getElementById('reuters_ranking1').style.display = "none";
			document.getElementById('reuters_ranking2').style.display = "none";
			document.getElementById('mmf_yield').style.display = "none";
			wkFld = 1;
			break;
		case 1:		//売買代金・出来高
			document.getElementById('updateBtnOn').style.display = "";
			document.getElementById('updateBtnOff').style.display = "none";
			document.getElementById('reuters_chart_tab').style.display = "none";
			document.getElementById('reuters_ranking1').style.display = "";
			document.getElementById('reuters_ranking2').style.display = "none";
			document.getElementById('mmf_yield').style.display = "none";
			wkFld = 2;
			break;
		case 2:		//値上がり率・値下がり率
			document.getElementById('updateBtnOn').style.display = "";
			document.getElementById('updateBtnOff').style.display = "none";
			document.getElementById('reuters_chart_tab').style.display = "none";
			document.getElementById('reuters_ranking1').style.display = "none";
			document.getElementById('reuters_ranking2').style.display = "";
			document.getElementById('mmf_yield').style.display = "none";
			wkFld = 2;
			break;
		case 3:		//MMF
			document.getElementById('updateBtnOn').style.display = "none";
			document.getElementById('updateBtnOff').style.display = "";
			document.getElementById('reuters_chart_tab').style.display = "none";
			document.getElementById('reuters_ranking1').style.display = "none";
			document.getElementById('reuters_ranking2').style.display = "none";
			document.getElementById('mmf_yield').style.display = "";
			break;
	}
	makeCopyright(num);
}

/**
* Copyright部の表示切替を実施
* @param 表示タブ番号
*/
function makeCopyright(tabNo) {
	var strCpyright = "";
	if(tabNo == 3) {
		strCopyright = '<p style="color:#666666;font-size:68.8%;line-height:1.2;padding:4px 6px">※当該実績は、過去のものであり、将来の運用成果等を保証するものではありません。また、税引き前の利回りを表示しております。</p>';
	} else {
		strCopyright = '<table style="margin-bottom:0px" summary="コピーライト"><tr><td style="padding:0px;border-bottom:0px;border-right:0px;text-align:right">&copy; 2012 Thomson Reuters</td></tr></table>';
	}
	document.getElementById('copyrightPlus').innerHTML = strCopyright;
}

/**
 * ロイターの通信が帰ってきた際に実行する
 * @param datas ロイターのデータ
 */
function callback(datas){
	reutersLoaded = true;
	
	//一度エラーになった場合はロードしない
	if(reutersError){
		return;
	}
	
	if(reutersReloadFlg == 0 || reutersReloadFlg == 1){
		document.getElementById('reuters_date').innerHTML=datas["market"]["date"];
		document.getElementById('reuters_time').innerHTML=datas["market"]["time"];
		document.getElementById('reuters_date2').innerHTML=datas["market"]["date"];
		document.getElementById('reuters_time2').innerHTML=datas["market"]["time"];
		if(reutersChartUrl == ""){
			reutersChartUrl = datas["market"]["chartUrl"];
		}
		date = new Date();
		document.getElementById('reuters_chart').src = reutersChartUrl + "&date=" + date.getTime();
		remakeMarketData(datas["market"]["list"]);
	}
	if(reutersReloadFlg == 0 || reutersReloadFlg == 2){
		remakeTradingData(datas["tradingRanking"]);
		remakePerformanceData(datas["performanceRanking"]);
		remakeIncreaseData(datas["increaseRanking"]);
		remakeDecreaseData(datas["decreaseRanking"]);
	}
	
	//「更新する」ボタン押下用切替えパラメータを設定（１回通せば次回からはreutersChangeDisplay内で実施）
	if(wkFld == "" || wkFld == undefined ) {
		wkFld = 1;
		makeCopyright(wkFld);
	}
}

/**
 * マーケット情報の表示切替を実施する。
 * @param datas ロイターのデータ
 */
function remakeMarketData(datas){
	html = "<table class=\"tbl-data-03 margin-reset-01\" border=\"1\" cellspacing=\"0\"><tbody>";
	var lineNumber = 0;
	for(i = 0; i < datas.length; i++){
		if(datas[i][0] == "日経平均"){
		}else if(datas[i][0] == "TOPIX"){
		}else if(datas[i][0] == "上海総合指数"){
		}else if(datas[i][0] == "NYダウ"){
		}else if(datas[i][0] == "NASDAQ"){
		}else if(datas[i][0] == "米ドル/円"){
		}else{
			continue;
		}
		
		if( lineNumber % 2 == 1){
			html += "<tr class=\"odd\">";
		}else{
			html += "<tr>";
		}
		
		lineNumber++;
		
		html += "<th scope=\"row\" valign=\"top\"><a href=\"javascript:reutersChangeChartUrl('" + datas[i][4] + "',";
		if(datas[i][0] == "日経平均"){
			html += "'/web/market/data/n225.html'";
		}else if(datas[i][0] == "TOPIX"){
			html += "'/web/market/data/topx.html'";
		}else if(datas[i][0] == "日経JQ平均"){
			html += "'/web/market/data/notc.html'";
		}else if(datas[i][0] == "NYダウ"){
			html += "'/web/market/data/dji.html'";
		}else if(datas[i][0] == "NASDAQ"){
			html += "'/web/market/data/ixic.html'";
		}else if(datas[i][0] == "仏CAC40指数"){
			html += "'/web/market/data/fchi.html'";
		}else if(datas[i][0] == "独DAX30指数"){
			html += "'/web/market/data/gdaxi.html'";
		}else if(datas[i][0] == "ロシアRTS指数"){
			html += "'/web/market/data/irts.html'";
		}else if(datas[i][0] == "ブラジルボベスパ指数"){
			html += "'/web/market/data/bvsp.html'";
		}else if(datas[i][0] == "インドSENSEX"){
			html += "'/web/market/data/bsesn.html'";
		}else if(datas[i][0] == "香港ハンセン指数"){
			html += "'/web/market/data/hsi.html'";
		}else if(datas[i][0] == "ハンセンH株指数"){
			html += "'/web/market/data/hsce.html'";
		}else if(datas[i][0] == "ハンセンレッドチップ指数"){
			html += "'/web/market/data/hscc.html'";
		}else if(datas[i][0] == "上海総合指数"){
			html += "'/web/market/data/ssce.html'";
		}
		
		else if(datas[i][0] == "日経225先物（期近）"){
			html += "'/web/market/data/jnic1.html'";
		}else if(datas[i][0] == "CME日経平均先物"){
			html += "'/web/market/data/niyc1.html'";
		}else if(datas[i][0] == "SGX日経平均先物"){
			html += "'/web/market/data/ssic1.html'";
		}
		
		else if(datas[i][0] == "米ドル/円"){
			html += "'/web/market/data/usd.html'";
		}else if(datas[i][0] == "ユーロ/円"){
			html += "'/web/market/data/eur.html'";
		}else if(datas[i][0] == "豪ドル/円"){
			html += "'/web/market/data/aud.html'";
		}else if(datas[i][0] == "NZドル/円"){
			html += "'/web/market/data/nzd.html'";
		}else if(datas[i][0] == "カナダドル/円"){
			html += "'/web/market/data/cad.html'";
		}else if(datas[i][0] == "英ポンド/円"){
			html += "'/web/market/data/gbp.html'";
		}else if(datas[i][0] == "スイスフラン/円"){
			html += "'/web/market/data/chf.html'";
		}else if(datas[i][0] == "香港ドル/円"){
			html += "'/web/market/data/hkd.html'";
		}else if(datas[i][0] == "トルコリラ/円"){
			html += "'/web/market/data/try.html'";
		}else if(datas[i][0] == "南アランド/円"){
			html += "'/web/market/data/zar.html'";
		}else if(datas[i][0] == "ロシアルーブル/円"){
			html += "'/web/market/data/rub.html'";
		}else if(datas[i][0] == "韓国ウォン/円"){
			html += "'/web/market/data/krw.html'";
		}else if(datas[i][0] == "メキシコペソ/円"){
			html += "'/web/market/data/mxn.html'";
		}else if(datas[i][0] == "ブラジルレアル/円"){
			html += "'/web/market/data/brl.html'";
		}
		
		else if(datas[i][0] == "米国3カ月国債"){
			html += "'/web/market/data/us3mt.html'";
		}else if(datas[i][0] == "米国10年国債"){
			html += "'/web/market/data/us10yt.html'";
		}else if(datas[i][0] == "日本国債3年"){
			html += "'/web/market/data/jp3yt.html'";
		}else if(datas[i][0] == "日本国債5年"){
			html += "'/web/market/data/jp5yt.html'";
		}else if(datas[i][0] == "日本国債10年"){
			html += "'/web/market/data/jp10yt.html'";
		}
		
		else if(datas[i][0] == "原油（WTI原油先物）"){
			html += "'/web/market/data/clc1.html'";
		}else if(datas[i][0] == "金（Gold-100 Oz Pie Only）"){
			html += "'/web/market/data/gcc1.html'";
		}
		
		else{
			html += "''";
		}
		
		html +=  ",'" + datas[i][0] + "')\">" + datas[i][0] + "</a></th>";
		html += "<td>" + datas[i][1] + "</td>";
		html += "<td><span class=\"" + datas[i][3] + "\">"+ datas[i][2] +"</span></td></tr>";
	}
	html += "</tbody></table>";
	document.getElementById('reuters_market_data').innerHTML = html;
}

/**
 * 売買代金上位銘柄ランキングの内容を書き換える。
 * @param datas ロイターのデータ
 */
function remakeTradingData(datas){
	html = "<table class=\"tbl-data-05\" border=\"1\" cellspacing=\"0\" width=\"80px\"><thead><tr><th scope=\"col\" class=\"w-20\">順位</th><th scope=\"col\" class=\"w-25\">銘柄</th><th scope=\"col\">現在値/売買代金</th></tr></thead><tbody>";
	
	for(i = 0; i < datas.length; i++){
		html += "<tr><th scope=\"row\" valign=\"top\">"+ ( i + 1 ) +"</th><td class=\"align-L\">";
		if(datas[i][4] == '--'){
			html += datas[i][0] + "</td>";
		}else{
			html += "<a href=\"/web/market/search/quote.html?ric=" + datas[i][4] + "\" title=\"" + datas[i][1] + "\">" + datas[i][0] + "</a></td>";
		}
		html += "<td>" + datas[i][2] + "&nbsp;(" + datas[i][3] + ")</td></tr>";
	}
	html += "</tbody></table>";
	document.getElementById('reuters_trading_table').innerHTML = html;
}

/**
 * 出来高上位銘柄ランキングの内容を書き換える。
 * @param datas ロイターのデータ
 */
function remakePerformanceData(datas){
	html = "<table class=\"tbl-data-05\" border=\"1\" cellspacing=\"0\" width=\"80px\"><thead><tr><th scope=\"col\" class=\"w-20\">順位</th><th scope=\"col\" class=\"w-25\">銘柄</th><th scope=\"col\">現在値/出来高</th></tr></thead><tbody>";
	
	for(i = 0; i < datas.length; i++){
		html += "<tr><th scope=\"row\" valign=\"top\">"+ ( i + 1 ) +"</th><td class=\"align-L\">";
		if(datas[i][4] == '--'){
			html += datas[i][0] + "</td>";
		}else{
			html += "<a href=\"/web/market/search/quote.html?ric=" + datas[i][4] + "\" title=\"" + datas[i][1] + "\">" + datas[i][0] + "</a></td>";
		}
		html += "<td>" + datas[i][2] + "&nbsp;(" + datas[i][3] + ")</td></tr>";
	}
	html += "</tbody></table>";
	document.getElementById('reuters_performance_table').innerHTML = html;
}

/**
 * 値上がり率上位銘柄ランキングの内容を書き換える。
 * @param datas ロイターのデータ
 */
function remakeIncreaseData(datas){
	html = "<table class=\"tbl-data-05\" border=\"1\" cellspacing=\"0\" width=\"80px\"><thead><tr><th scope=\"col\" class=\"w-20\">順位</th><th scope=\"col\" class=\"w-25\">銘柄</th><th scope=\"col\">現在値/騰落率(%)</th></tr></thead><tbody>";
	
	for(i = 0; i < datas.length; i++){
		html += "<tr><th scope=\"row\" valign=\"top\">"+ ( i + 1 ) +"</th><td class=\"align-L\">";
		if(datas[i][5] == '--'){
			html += datas[i][0] + "</td>";
		}else{
			html += "<a href=\"/web/market/search/quote.html?ric=" + datas[i][5] + "\" title=\"" + datas[i][1] + "\">" + datas[i][0] + "</a></td>";
		}
		html += "<td>" + datas[i][2] + "&nbsp;(<span class=\"" + datas[i][4] + "\">" + datas[i][3] + "</span>)</td></tr>";
	}
	html += "</tbody></table>";
	document.getElementById('reuters_increase_table').innerHTML = html;
}

/**
 * 値下がり率上位銘柄ランキングの内容を書き換える。
 * @param datas ロイターのデータ
 */
function remakeDecreaseData(datas){
	html = "<table class=\"tbl-data-05\" border=\"1\" cellspacing=\"0\" width=\"80px\"><thead><tr><th scope=\"col\" class=\"w-20\">順位</th><th scope=\"col\" class=\"w-25\">銘柄</th><th scope=\"col\">現在値/騰落率(%)</th></tr></thead><tbody>";
	
	for(i = 0; i < datas.length; i++){
		html += "<tr><th scope=\"row\" valign=\"top\">"+ ( i + 1 ) +"</th><td class=\"align-L\">";
		if(datas[i][5] == '--'){
			html += datas[i][0] + "</td>";
		}else{
			html += "<a href=\"/web/market/search/quote.html?ric=" + datas[i][5] + "\" title=\"" + datas[i][1] + "\">" + datas[i][0] + "</a></td>";
		}
		html += "<td>" + datas[i][2] + "&nbsp;(<span class=\"" + datas[i][4] + "\">" + datas[i][3] + "</span>)</td></tr>";
	}
	html += "</tbody></table>";
	document.getElementById('reuters_decrease_table').innerHTML = html;
}

/**
 * ロイターの情報が取得できない場合の処理
 */
function onReutersError(){
	if(!reutersLoaded){
		reutersError = true;
		document.getElementById('reuters').innerHTML = '<div class="box-02"><div class="box-inner-02"><div class="hdg-l2-02-container" style="margin-bottom:0px;"><h2 class="hdg-l2-02" style="margin-bottom:0px;"><span>マーケット情報</span></h2><ul class="nav-link-01"><li><a href="/web/market/"><img src="https://www.rakuten-sec.co.jp/web/shared/images/heading/hdg-icon-more-01.gif" alt="一覧" width="39" height="16" /></a></li></ul></div><!-- /.hdg-l2-02-container --><table style="margin-top:10px; font-size:90%;"><tr><td style="border:none;"><img src="/web/shared/images/icon/icon-attention-01.gif"></td><td style="border:none;">現在、一時的にマーケット情報が表示できません。<br />しばらくたってから再度ご覧ください。</td></tr></table></div></div>';
	}
}

setTimeout(onReutersError, 15000);
