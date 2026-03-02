/**
 * 株式検索用のクッキーを管理を行います。
 * jQueryのcookieオブジェクトを使用しているためjQueryおよびjQuery Cookieは必須
 * になります。
 */

//株式検索履歴表示用に使用するクッキーのキー
var stockSearchHistoryKey = 'stockSearchHistoryKey';

var stockURL = new Array(3);
stockURL[0] = '/web/market/search/quote.html?ric=';
stockURL[1] = '/web/market/search/us_search/quote.html?ric=';
stockURL[2] = '/web/market/search/china_search/quote.html?ric=';

var stockCookieNum = 10;
var stockSaveDate = 90;

var exponentURL = new Array(60);
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


var exponentName = new Array(60);
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

exponentName[16] = '日経225（期近）（大証）';
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

exponentName[33] = '米国3カ月';
exponentName[34] = '米国10年';

exponentName[35] = '原油（WTI）先物（NYMEX)';
exponentName[36] = 'Gold（London）';

exponentName[37] = '日本国債3年';
exponentName[38] = '日本国債5年';
exponentName[39] = '日本国債10年';

exponentName[40] = 'JASDAQTOP20';
exponentName[41] = 'JASDAQスタンダード指数';
exponentName[42] = 'JASDAQグロース指数';
exponentName[43] = 'Jストック指数';

exponentName[44] = 'E-miniS&P500';
exponentName[45] = 'E-miniS&PMidCap400';
exponentName[46] = 'E-miniS&PSmallCap600';
exponentName[47] = 'E-miniNASDAQ-100';
exponentName[48] = 'E-miniDow';
exponentName[49] = 'S&PCNXNifty（SGX)';
exponentName[50] = 'MSCITaiwanIndexFutures（SGX)';

exponentName[51] = '天然ガス（HenryHub）先物（NYMEX）';

exponentName[52] = 'Gold先物（COMEX)';
exponentName[53] = 'Silver先物（COMEX)';
exponentName[54] = 'Copper先物（COMEX)';
exponentName[55] = 'Corn先物（CBOT）';
exponentName[56] = 'Wheat先物（CBOT）';
exponentName[57] = 'Soybeans先物（CBOT）';
exponentName[58] = 'インドルピー';

/**
 * クッキーの取得を行います。
 * @param stockKeyId 取得キーのid (0～2)
 * @param keyId 取得キーのid (0～9)
 * @return 指定されたkeyで登録されている情報
 */
function getStockCookie0618(keyId){
	return $.cookie(stockSearchHistoryKey + keyId);
}

/**
 * クッキーの登録を行います。
 * @param stockKeyId 取得キーのid (0～2)
 * @param keyId 取得キーのid (0～9) 
 * @param value 登録する検索情報
 */
 
function setStockCookie0618(stockKeyId, value){
	
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
function writeStockCookie0618(){
	writeHtml = '';
	cnt = 0;
	for(i = 0; i < stockCookieNum; i++){
	    cnt = i + 1;
		stockId = getStockCookie0618(i);
		if( stockId != null ){
			//指数の場合の対応
			if(stockId.indexOf('!3,') > -1){
				stockId = stockId.substring(stockId.indexOf('!3,') + 3);
				writeHtml += "<li><a href='" + exponentURL[stockId] + "&l-id=vtop_checklist_quote_" +  cnt + "'>" + exponentName[stockId] + "</a></li>";
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
					viewStockId = '0' + viewStockId + '(中国株)';
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
//		writeHtml += "<p><a href=\"https://www.rakuten-sec.co.jp/web/fund/\">最新のランキングやオススメ銘柄はコチラでチェック！</a></p>";
		document.getElementById('tab-03').innerHTML = '<ul class=\"list-market-last\">'+ writeHtml + "</ul>" + 
		"<p class=\"market-btn\"><a href=\"/web/market/\"><img src=\"/web/images/top201106/btn-market-01.gif\" alt=\"\" /></a></p>";
	}
}

/**
 * ricのパラメータ内容を取得する。
 */
function setRicParam0618(keyId, str){
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
