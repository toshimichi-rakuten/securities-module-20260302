var reutersLoaded = false;
var reutersError = false;

/**
 * ロイターの表示のリロードを実施
 * @param num リロード対象
 */
function reutersReload(){
	date = new Date();
	var sTag = document.createElement("script");
	sTag.type="text/javascript";
	sTag.charset="utf-8";
	sTag.src = 'https://www.trkd-asia.com/rakutensec/f_index1.jsp?date=' + date.getTime();
	
	document.body.appendChild(sTag);
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
	
	document.getElementById('reuters_date').innerHTML=datas["market"]["date"];
	document.getElementById('reuters_time').innerHTML=datas["market"]["time"];
	remakeMarketData(datas["market"]["list"]);
}

/**
 * マーケット情報の表示切替を実施する。
 * @param datas ロイターのデータ
 */
function remakeMarketData(datas){
	html = "<table class=\"tbl-data-03 margin-reset-01\" border=\"1\" cellspacing=\"0\"><tbody>";
	for(i = 0; i < datas.length; i++){
		if(datas[i][0] == "日経平均"){
		}else if(datas[i][0] == "TOPIX"){
		}else if(datas[i][0] == "日経JQ平均"){
		}else if(datas[i][0] == "NYダウ"){
		}else if(datas[i][0] == "NASDAQ"){
		}else if(datas[i][0] == "米ドル/円"){
		}else{
			continue;
		}

		if( i % 2 == 1){
			html += "<tr class=\"odd\">";
		}else{
			html += "<tr>";
		}
		html += "<th scope=\"row\" valign=\"top\"><a href=";
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
		html +=  ">" + datas[i][0] + "</a></th>";
		html += "<td>" + datas[i][1] + "</td>";
		html += "<td><span class=\"" + datas[i][3] + "\">"+ datas[i][2] +"</span></td></tr>";
	}
	html += "</tbody></table>";
	document.getElementById('reuters_market_data').innerHTML = html;
}

/**
 * ロイターの情報が取得できない場合の処理
 */
function onReutersError(){
	if(!reutersLoaded){
		reutersError = true;
		document.getElementById('reuters').innerHTML = '現在、一時的にマーケット情報が表示できません。<br />しばらくたってから再度ご覧ください。';
	}
}

setTimeout(onReutersError, 15000);
