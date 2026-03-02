/**
 * 株式検索用のクッキーを管理を行います。
 * jQueryのcookieオブジェクトを使用しているためjQueryおよびjQuery Cookieは必須
 * になります。
 */

//株式検索履歴表示用に使用するクッキーのキー
var stockSearchHistoryKey = 'stockSearchHistoryKey';

var stockURL = new Array(5);
stockURL[0] = '/web/market/search/quote.html?ric=';
stockURL[1] = '/web/market/search/us_search/quote.html?ric=';
stockURL[2] = '/web/market/search/china_search/quote.html?ric=';
stockURL[3] = '';
stockURL[4] = '/web/market/search/asean_search/quote.html?ric=';

var stockCookieNum = 10;
var stockSaveDate = 90;

var exponentURL = new Array(120);
exponentURL[0] = '/web/market/data/n225.html';
exponentURL[1] = '/web/market/data/topx.html';
exponentURL[2] = '/web/market/data/notc.html';
exponentURL[3] = '/web/market/data/dji.html';
exponentURL[4] = '/web/market/data/ixic.html';
exponentURL[5] = '/web/market/data/gspc.html';
exponentURL[6] = '/web/market/data/ftse.html';
exponentURL[7] = '/web/market/data/fchi.html';
exponentURL[8] = '/web/market/data/gdaxi.html';
exponentURL[9] = '/web/market/data/irts.html';
exponentURL[10] = '/web/market/data/bvsp.html';
exponentURL[11] = '/web/market/data/bsesn.html';
exponentURL[12] = '/web/market/data/hsi.html';
exponentURL[13] = '/web/market/data/hsce.html';
exponentURL[14] = '/web/market/data/hscc.html';
exponentURL[15] = '/web/market/data/ssce.html';

exponentURL[16] = '/web/market/data/jnic1.html';
exponentURL[17] = '/web/market/data/niyc1.html';
exponentURL[18] = '/web/market/data/ssic1.html';

exponentURL[19] = '/web/market/data/usd.html';
exponentURL[20] = '/web/market/data/eur.html';
exponentURL[21] = '/web/market/data/aud.html';
exponentURL[22] = '/web/market/data/nzd.html';
exponentURL[23] = '/web/market/data/cad.html';
exponentURL[24] = '/web/market/data/gbp.html';
exponentURL[25] = '/web/market/data/chf.html';
exponentURL[26] = '/web/market/data/hkd.html';
exponentURL[27] = '/web/market/data/try.html';
exponentURL[28] = '/web/market/data/zar.html';
exponentURL[29] = '/web/market/data/rub.html';
exponentURL[30] = '/web/market/data/krw.html';
exponentURL[31] = '/web/market/data/mxn.html';
exponentURL[32] = '/web/market/data/brl.html';

exponentURL[33] = '/web/market/data/us3mt.html';
exponentURL[34] = '/web/market/data/us10yt.html';

exponentURL[35] = '/web/market/data/clc1.html';
exponentURL[36] = '/web/market/data/xaueqx.html';

exponentURL[37] = '/web/market/data/jp3yt.html';
exponentURL[38] = '/web/market/data/jp5yt.html';
exponentURL[39] = '/web/market/data/jp10yt.html';

exponentURL[40] = '/web/market/data/jsd.html';
exponentURL[41] = '/web/market/data/jsds.html';
exponentURL[42] = '/web/market/data/jsdg.html';
exponentURL[43] = '/web/market/data/jstk.html';

exponentURL[44] = '/web/market/data/esc1.html';
exponentURL[45] = '/web/market/data/dmc1.html';
exponentURL[46] = '/web/market/data/smcc1.html';
exponentURL[47] = '/web/market/data/nqc1.html';
exponentURL[48] = '/web/market/data/ymc1.html';
exponentURL[49] = '/web/market/data/sinc1.html';
exponentURL[50] = '/web/market/data/stwc1.html';

exponentURL[51] = '/web/market/data/qgc1.html';

exponentURL[52] = '/web/market/data/gcc1.html';
exponentURL[53] = '/web/market/data/sic1.html';
exponentURL[54] = '/web/market/data/hgc1.html';
exponentURL[55] = '/web/market/data/cc1.html';
exponentURL[56] = '/web/market/data/wc1.html';
exponentURL[57] = '/web/market/data/sc1.html';
exponentURL[58] = '/web/market/data/inr.html';
exponentURL[59] = '/web/market/data/cny.html';

exponentURL[60] = '/web/market/data/ftsti.html';
exponentURL[61] = '/web/market/data/seti.html';
exponentURL[62] = '/web/market/data/klse.html';
exponentURL[63] = '/web/market/data/jkse.html';
exponentURL[64] = '/web/market/data/sgd.html';
exponentURL[65] = '/web/market/data/thb.html';
exponentURL[66] = '/web/market/data/myr.html';
exponentURL[67] = '/web/market/data/idr.html';

exponentURL[68] = '/web/market/data/enyc1.html';

exponentURL[69] = '/web/market/data/jniv.html';
exponentURL[70] = '/web/market/data/de10yt.html';
exponentURL[71] = '/web/market/data/uk10yt.html';
exponentURL[72] = '/web/market/data/fr10yt.html';
exponentURL[73] = '/web/market/data/es10yt.html';
exponentURL[74] = '/web/market/data/pt10yt.html';
exponentURL[75] = '/web/market/data/eu10yt.html';
exponentURL[76] = '/web/market/data/it10yt.html';
exponentURL[77] = '/web/market/data/gr10yt.html';
exponentURL[78] = '/web/market/data/hu10yt.html';
exponentURL[79] = '/web/market/data/plc1.html';

exponentURL[80] = '/web/market/data/jponmu.html';
exponentURL[81] = '/web/market/data/jpdr.html';
exponentURL[82] = '/web/market/data/usff.html';
exponentURL[83] = '/web/market/data/cadisc.html';
exponentURL[84] = '/web/market/data/ecbmro.html';
exponentURL[85] = '/web/market/data/gbprime.html';
exponentURL[86] = '/web/market/data/chlibtarget.html';
exponentURL[87] = '/web/market/data/zarepo.html';
exponentURL[88] = '/web/market/data/hkpr.html';
exponentURL[89] = '/web/market/data/aucasht.html';
exponentURL[90] = '/web/market/data/nzcash.html';
exponentURL[91] = '/web/market/data/inrepo.html';
exponentURL[92] = '/web/market/data/cnt1ll.html';
exponentURL[93] = '/web/market/data/brtarget.html';
exponentURL[94] = '/web/market/data/rubrefrate.html';
exponentURL[95] = '/web/market/data/cbtondepo.html';
exponentURL[96] = '/web/market/data/mxncton.html';

exponentURL[97] = '/web/market/data/mthr.html';
exponentURL[98] = '/web/market/data/jpx400.html';
exponentURL[99] = '/web/market/data/jn4fc1.html';
exponentURL[100] = '/web/market/data/jsdi.html';
exponentURL[101] = '/web/market/data/treit.html';
exponentURL[102] = '/web/market/data/CSI000002.html';
exponentURL[103] = '/web/market/data/CSI000159.html';
exponentURL[104] = '/web/market/data/CSI300.html';
exponentURL[105] = '/web/market/data/jmic1.html';
exponentURL[106] = '/web/market/data/jgbind.html';
exponentURL[107] = '/web/market/data/jgblev.html';
exponentURL[108] = '/web/market/data/jgbinv.html';
exponentURL[109] = '/web/market/data/jgbinv2.html';
exponentURL[110] = '/web/market/data/jtwc1.html';
exponentURL[111] = '/web/market/data/jfcc1.html';

var exponentName = new Array(120);
exponentName[0] = '日経225';
exponentName[1] = 'TOPIX';
exponentName[2] = '日経ジャスダック平均';
exponentName[3] = 'NYダウ';
exponentName[4] = 'NASDAQ';
exponentName[5] = 'S&P500指数';
exponentName[6] = '英FT100指数';
exponentName[7] = '仏CAC40指数';
exponentName[8] = '独DAX30指数';
exponentName[9] = 'ロシアRTS指数';
exponentName[10] = 'ブラジルボベスパ指数';
exponentName[11] = 'インドSENSEX';
exponentName[12] = '香港ハンセン指数';
exponentName[13] = 'ハンセンH株指数';
exponentName[14] = 'ハンセンレッドチップ指数';
exponentName[15] = '上海総合指数';

exponentName[16] = '日経225期近（大証）';
exponentName[17] = '日経225（CME)';
exponentName[18] = '日経225（SGX）';

exponentName[19] = '米ドル';
exponentName[20] = 'ユーロ';
exponentName[21] = '豪ドル';
exponentName[22] = 'NZドル';
exponentName[23] = 'カナダドル';
exponentName[24] = '英ポンド';
exponentName[25] = 'スイスフラン';
exponentName[26] = '香港ドル';
exponentName[27] = 'トルコリラ';
exponentName[28] = '南アランド';
exponentName[29] = 'ロシアルーブル';
exponentName[30] = '韓国ウォン';
exponentName[31] = 'メキシコペソ';
exponentName[32] = 'ブラジルレアル';

exponentName[33] = '米国3年';
exponentName[34] = '米国10年';

exponentName[35] = '原油先物（NYMEX)';
exponentName[36] = 'Gold（London）';

exponentName[37] = '日本国債3年';
exponentName[38] = '日本国債5年';
exponentName[39] = '日本国債10年';

exponentName[40] = 'JASDAQTOP20';
exponentName[41] = 'JASDAQスタンダード';
exponentName[42] = 'JASDAQグロース';
exponentName[43] = 'Jストック';

exponentName[44] = 'E-miniS&P500';
exponentName[45] = 'E-miniS&PMidCap400';
exponentName[46] = 'E-miniS&PSmallCap600';
exponentName[47] = 'E-miniNASDAQ-100';
exponentName[48] = 'E-miniDow';
exponentName[49] = 'SGXNifty50';
exponentName[50] = 'MSCITaiwan（SGX)';

exponentName[51] = '天然ガス先物（NYMEX）';

exponentName[52] = 'Gold先物（COMEX)';
exponentName[53] = 'Silver先物（COMEX)';
exponentName[54] = 'Copper先物（COMEX)';
exponentName[55] = 'Corn先物（CBOT）';
exponentName[56] = 'Wheat先物（CBOT）';
exponentName[57] = 'Soybeans先物（CBOT）';
exponentName[58] = 'インドルピー';
exponentName[59] = '中国人民元';

exponentName[60] = 'シンガポールST指数';
exponentName[61] = 'タイSET指数';
exponentName[62] = 'クアラルンプール総合指数';
exponentName[63] = 'ジャカルタ総合指数';
exponentName[64] = 'シンガポールドル';
exponentName[65] = 'タイバーツ';
exponentName[66] = 'マレーシアリンギット';
exponentName[67] = 'インドネシアルピア';

exponentName[68] = 'E-miniNikkei225';

exponentName[69] = '日経平均VI';
exponentName[70] = 'ドイツ10年国債';
exponentName[71] = 'イギリス10年国債';
exponentName[72] = 'フランス10年国債';
exponentName[73] = 'スペイン10年国債';
exponentName[74] = 'ポルトガル10年国債';
exponentName[75] = 'ユーロ圏10年債';
exponentName[76] = 'イタリア10年国債';
exponentName[77] = 'ギリシャ10年国債';
exponentName[78] = 'ハンガリー10年国債';
exponentName[79] = 'プラチナ先物';
exponentName[80] = '日本無担保コール';
exponentName[81] = '日本公定歩合';
exponentName[82] = '米国FF金利';
exponentName[83] = 'カナダ誘導目標';
exponentName[84] = 'ユーロ市場調整金利';
exponentName[85] = 'イギリスレポ金利';
exponentName[86] = 'スイス誘導目標';
exponentName[87] = '南アフリカレポ金利';
exponentName[88] = '香港再割引金利';
exponentName[89] = 'オーストラリア政策金利';
exponentName[90] = 'NZ目標短期金利';
exponentName[91] = 'インドレポ金利';
exponentName[92] = '中国貸出金利';
exponentName[93] = 'ブラジルSelic';
exponentName[94] = 'ロシアリファイナンス';
exponentName[95] = 'トルコ中央銀行ON DEPO';
exponentName[96] = 'メキシコON金利';
exponentName[97] = 'マザーズ総合';
exponentName[98] = 'JPX日経400';
exponentName[99] = 'JPX日経400先物';
exponentName[100] = 'ジャスダック指数';
exponentName[101] = '東証REIT指数';
exponentName[102] = '上海A株指数';
exponentName[103] = '上海・香港ストックコネクト';
exponentName[104] = 'CSI300';
exponentName[105]  = '東証マザーズ先物(期近)';
exponentName[106] = 'JPX国債先物';
exponentName[107] = 'JPX国債先物レバレッジ';
exponentName[108] = 'JPX国債先物インバース';
exponentName[109] = 'JPX国債先物ダブルインバース';
exponentName[110] = '台湾加権先物(期近)';
exponentName[111] = 'FTSE中国50先物(期近)';


/**
 * クッキーの取得を行います。
 * @param stockKeyId 取得キーのid (0～2)
 * @param keyId 取得キーのid (0～9)
 * @return 指定されたkeyで登録されている情報
 */
function getStockCookie0630(keyId){
	return $.cookie(stockSearchHistoryKey + keyId);
}

/**
 * クッキーの登録を行います。
 * @param stockKeyId 取得キーのid (0～2)
 * @param keyId 取得キーのid (0～9) 
 * @param value 登録する検索情報
 */
 
function setStockCookie0630(stockKeyId, value){
	
	//指数情報の場合だけマーキングをする。
	if(stockKeyId == 3){
		value = '!3,' + value;
	}else{
		value += ',' + stockKeyId;
	}
	
	values = new Array(stockCookieNum + 1);
	
	for(i = 0; i < values.length; i++){
		values[i] = getStockCookie(i);
		if(value == values[i]){
			delete values[i];
		}
	}
	
	values.unshift(value);
	setValues = new Array(stockCookieNum);
	
	j = 0;
	for(i = 0; i < values.length; i++){
		if(values[i] != undefined){
			setValues[j] = values[i];
			j++;
		}
	}
	
	for(i = 0; i < setValues.length; i++){
		$.cookie(stockSearchHistoryKey + i, setValues[i], { expires: stockSaveDate, path: '/' });
	}
}

/**
 * リンク情報を画面に書き込む
 * @param stockKeyId 取得キーのid (0～2)
 */
function writeStockCookie0630(){
	writeHtml = '';
	cnt = 0;
	for(i = 0; i < stockCookieNum; i++){
	    cnt = i + 1;
		stockId = getStockCookie0630(i);
		if( stockId != null ){
			//指数の場合の対応
			if(stockId.indexOf('!3,') > -1){
				stockId = stockId.substring(stockId.indexOf('!3,') + 3);
				writeHtml += "<li><a href='" + exponentURL[stockId] + "?l-id=vtop_checklist_quote_" +  cnt + "'>" + exponentName[stockId] + "</a></li>";
			}
			//株の場合の対応
			else{
				stockKeyId = stockId.substring(stockId.indexOf(',') + 1);
				stockId = stockId.substring(0,stockId.indexOf(','));
				viewStockId = stockId.substring(0,stockId.indexOf('.'));
				if( stockKeyId == 0 ){
					if(stockId.substring(stockId.indexOf('.') + 1) == 'T'){
						viewStockId += '(東証)';
					}
					else if(stockId.substring(stockId.indexOf('.') + 1) == 'OS'){
						viewStockId += '(大証)';
					}
					else if(stockId.substring(stockId.indexOf('.') + 1) == 'NG'){
						viewStockId += '(名証)';
					}
				}else if( stockKeyId == 1 ){
					viewStockId += '(米国株)';
				}else if( stockKeyId == 2 ){
					if(viewStockId >= 600000) {
						viewStockId = viewStockId + '(中国株)';
					}else{
						viewStockId = '0' + viewStockId + '(中国株)';
					}
				}else if( stockKeyId == 4 ){
					viewStockId += '(アセアン株)';
				}
				writeHtml += "<li><a href='" + stockURL[stockKeyId] + stockId + "&l-id=vtop_checklist_quote_" +  cnt + "'>" + viewStockId + "</a></li>";
			}
		}
	}

	if(writeHtml != ''){
		document.getElementById('tab-03').innerHTML = '<ul class=\"list-market-last\">'+ writeHtml +'</ul>' + 
		"<p class=\"market-btn\"><a href=\"/web/market/\"><img src=\"/web/images/top201106/btn-market-01.gif\" alt=\"\" /></a></p>";
	} else {
		writeHtml += "<p>【閲覧履歴がありません】</p>";
		writeHtml += "<p>ここに最近チェックした銘柄・指数の銘柄情報が表示されます。</p>";
		writeHtml += "<p><a href=\"https://www.rakuten-sec.co.jp/web/info/info20111025-01.html\">（閲覧履歴が正しく表示されないお客様はこちら）</a></p>";
//		writeHtml += "<p><a href=\"https://www.rakuten-sec.co.jp/web/fund/\">最新のランキングやオススメ銘柄はコチラでチェック！</a></p>";
		document.getElementById('tab-03').innerHTML = '<ul class=\"list-market-last\">'+ writeHtml + "</ul>" + 
		"<p class=\"market-btn\"><a href=\"/web/market/\"><img src=\"/web/images/top201106/btn-market-01.gif\" alt=\"\" /></a></p>";
	}
}

/**
 * ricのパラメータ内容を取得する。
 */
function setRicParam0630(keyId, str){
	//検索履歴登録
	var ricParam = '';
	if(str.indexOf('ric=') == -1){
		return;
	}
	if(str.indexOf('&',str.indexOf('ric=') + 4) > -1 ){
		ricParam = str.substring(str.indexOf('ric=') + 4, str.indexOf('&',str.indexOf('ric=') + 4));
	}else{
		ricParam = str.substring(str.indexOf('ric=') + 4);
	}
	setStockCookie(keyId,ricParam);
}

/**
 * 投信が参照されたクッキーを表示します。
 * jQueryのcookieオブジェクトを使用しているためjQueryおよびjQuery Cookieは必須
 * になります。
 */

function recentFundCookie0630(){
	var writeHtml = '';
	
	var s1 = $.cookie("ttid");		// 投信コード
	var s2 = $.cookie("recent");	// 投信名称

	// 閲覧された投信がない場合
	if(s1 == null || s2 == null) {
		writeHtml += "<p>【閲覧履歴がありません】</p>";
		writeHtml += "<p>ここに最近チェックした投資信託の銘柄情報が表示されます。</p>";
		writeHtml += "<p><a href=\"https://www.rakuten-sec.co.jp/web/fund/\">最新のランキングやオススメ銘柄はコチラでチェック！</a></p>";
		writeHtml += "<p><a href=\"/web/info/info20111025-01.html\">（閲覧履歴が正しく表示されないお客様はこちら）</a></p>";
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
		writeHtml += "<p class=\"comparison-btn\"><a href=\"Javascript:compareTopfive0630(\'" + fcodes + "\')\">";
		writeHtml += "<img alt=\"銘柄を比較する\" src=\"/web/shared/images/str-sub/history-btn-01.gif\"></a></p>";

		document.getElementById('tab-02').innerHTML = '<ul class=\"list-fund-last\">'+ writeHtml;
	}
}
function compareTopfive0630(fcodes) {   

    if(fcodes.indexOf(",")==-1) {
        window.alert("２件以内を比較できません。");
        return;
    }
    for (var i=0; i<5; i++) {
	    if(fcodes.indexOf(",") != -1) fcodes = fcodes.replace(",", "_");
	}
    window.location = "/web/fund/comparison/index.html?codes=" + fcodes;
}

var strTable = '<div class="right_sub_account"><div class="head"><p>未開設の口座･お取引</p></div><p class="text">口座の開設のみで、特典のあるお取引もございます。</p><table border="0" cellspacing="0" cellpadding="0">';
var strTrEnd = '<img src="/web/shared/images/str-sub-common/btn-acc-apply-01.gif" width="50" height="15" alt="申込" /></a></td></tr>';
var intLineNo = 1;
var wkFlg = 0;

// Rz_secを確認し、未開設の口座・お取引の表示制御を実施
function setupInfoControl() {
	if($.cookie('Rg_sec') != null && $.cookie('Rg_sec') != '') {
		if($.cookie('Rg_sec').substr(139,1) != '0'){		//全経路最終ログイン日経過日数
			if($.cookie('Rg_sec').substr(92,1) == '0'){
				classControl();
				strTable = strTable + '<th>信用取引</th><td><a href="https://www.rakuten-sec.co.jp/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init" onclick="s.lidTrack(\'rightnavi_account_mgn\')">' + strTrEnd;
			}
			if($.cookie('Rg_sec').substr(93,1) == '0'){
				classControl();
				strTable = strTable + '<th>先物・オプション</th><td><a href="/web/fop/account.html" onclick="s.lidTrack(\'rightnavi_account_fop\')">' + strTrEnd;
			}
			if($.cookie('Rg_sec').substr(94,1) == '0'){
				classControl();
				strTable = strTable + '<th>カバードワラント</th><td><a href="/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init" onclick="s.lidTrack(\'rightnavi_account_cw\')">' + strTrEnd;
			}
			if($.cookie('Rg_sec').substr(95,1) == '0'){
				classControl();
				strTable = strTable + '<th>楽天FX</th><td><a href="/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init" onclick="s.lidTrack(\'rightnavi_account_rfx\')">' + strTrEnd;
			}
			if($.cookie('Rg_sec').substr(98,1) == '0'){
				classControl();
				strTable = strTable + '<th>PTS取引</th><td><a href="/web/domestic/pts/account.html" onclick="s.lidTrack(\'rightnavi_account_pts\')">' + strTrEnd;
			}
//			if($.cookie('Rg_sec').substr(99,1) == '0'){
//				classControl();
//				strTable = strTable + '<th>楽天CFD</th><td><a href="/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init" onclick="s.lidTrack(\'rightnavi_account_cfd\')">' + strTrEnd;
//			}
			if($.cookie('Rg_sec').substr(100,1) == '0'){
				classControl();
				strTable = strTable + '<th>海外先物</th><td><a href="/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init" onclick="s.lidTrack(\'rightnavi_account_ff\')">' + strTrEnd;
			}
			if(($.cookie('Rg_sec').substr(101,1) == '0') || ($.cookie('Rg_sec').substr(101,1) == '3') || ($.cookie('Rg_sec').substr(101,1) == '9')){
				classControl();
				strTable = strTable + '<th>マネーブリッジ</th><td><a href="https://www.rakuten-sec.co.jp/cgi-bin/CTS/Direct_Login.cgi?homeid=MONEY_BRIDGE" onclick="s.lidTrack(\'rightnavi_account_R-bank\')">' + strTrEnd;
			}
			
			//table作成有無により書出し制御
			if(wkFlg == 1) {
				strTable = strTable + '</tr></table></div>';
				document.getElementById('setupInfoTable').innerHTML = strTable;
			}
		}
	}
	return;
}

//テーブル背景色のclass定義
function classControl(){

	if(intLineNo % 2 == 0) {
		strTable = strTable + '<tr>';
	} else {
		strTable = strTable + '<tr class="even">';
	}
	intLineNo = intLineNo + 1;
	wkFlg = 1;

}
