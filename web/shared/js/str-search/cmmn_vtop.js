function changeSearchResult_vtop(form) {
	
	var org_chr=document.charset; 
	var url = "";
	var data = "";
	var sctag = "";
	if($("#srch_jp").is(".selected")) {				 // 国内株式
		number = '0';
		data   = "https://www.trkd-asia.com/rakutensec/resultcnt_ja.jsp?all=on&sector=na";
		sctag = "vtop_seach_jp_";
		var iTxt = document.forms[form].elements['name'].value;
		 if(iTxt.match(/^[０-９]+$/)) {
			 document.forms[form].elements['name'].value = toHalfWidth(iTxt);
		 }
	} else if($("#srch_fn").is(".selected")) {		 // 投信
		number = '3';
		data   = "https://www.rakuten-sec.co.jp/web/fund/find/search/result.html?result=&sort=week_all_all%3Dup&count=9999&recsPerPage=20&condition2=&condition3=&tab=&condition1=";
		sctag = "vtop_search_fund_";
	} else if($("#srch_us").is(".selected")) {		 // 米株
		number = '1';
		data   = "https://www.trkd-asia.com/rakutensec/resultcnt_us.jsp?all=on&vall=on&forwarding=na&target=0&theme=na&returns=na&head_office=na&sector=na";
		sctag = "vtop_search_us_";
	} else if($("#srch_ch").is(".selected")) {		 // 中国株
		number = '2';
		data   = "https://www.trkd-asia.com/rakutensec/resultcnt_cn.jsp?all=on&catAll=on&forwarding=na&target=0&theme=na&returns=na&sector=na&pageNo=";
		sctag = "vtop_search_ch_";
		var iTxt = document.forms[form].elements['name'].value;
		 if(iTxt.match(/^[０-９]+$/)) {
			 document.forms[form].elements['name'].value = toHalfWidth(iTxt);
		 }
	} else if($("#srch_as").is(".selected")) {		 // アセアン株
		number = '5';
		data   = "https://www.trkd-asia.com/rakutensec/resultcnt_asn.jsp?vall=on&forwarding=na&target=na&theme=na&returns=na&sector=na&c=asn&p=result&all=on&freeword=";
		sctag = "vtop_search_asean_";
	}

	//プルダウンで選択した項目の値に対応するＵＲＬをFORMのactionにセット
	url = data;
	var txt = "";
	if(document.forms[form].elements['name'].value == '銘柄名\u2044コード\u2044ファンド名'){
		document.forms[form].elements['name'].value = '';
	}
	if(document.forms[form].elements['name'].value == '銘柄名/コード/ファンド名'){
		document.forms[form].elements['name'].value = '';
	}

    // サイトカタリスト
    sctag += document.forms[form].elements['name'].value;
    s.lidTrack(sctag);

	//投信以外はロイターのため、sjisEncode
	if (number != 3) {
		txt = encodeURI(document.forms[form].elements['name'].value);
		//数字のみの場合および米株Ticker検索のときはcodeのパラメータ
		if(isNumeric(txt)) {
			url += '&code=' + txt;
		} else {
			url += '&name=' + txt;
		}
	} else if (number = 3) {
		//投信は通常のURIencode
		var txt2 = encodeURI('&result=' + 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2');
		var txt1 = encodeURI('&form-text-01=' + document.forms[form].elements['name'].value);
		var txt  = encodeURI('ファンド名称like*' + document.forms[form].elements['name'].value + "*");
		url += txt + txt1 + txt2;
	}
	toRakutenSite(url);
}

var numeric="0123456789"; 
function isNumeric(num){ 
	if(num.length==0){ 
		return true; 
	} 
	for(i=0;i<num.length;i++){ 
		if(numeric.indexOf(num.charAt(i))<0){ 
			return false; 
		}
	} 
	return true; 
}

function toRakutenSite(url)
{
	if (top!=window) {
		top.location=url;
	} else {
		window.location = url;
	}
}

function submitSearchResultCH(formname)
{
	var org_chr=document.charset; 
//	document.charset='shift_jis';

	var url = '/web/market/search/china_search/result.html?catAll=on&forwarding=na&target=0&theme=na&returns=na&sector=na&pageNo=';

	var txt = "";
//	var txt = EscapeSJIS(document.forms[formname].elements['name'].value);
	txt = encodeURI(document.forms[formname].elements['name'].value);

//	txt = txt.replace('#', '%23');
//	txt = txt.replace("&", "%26");

	if(isNumeric(txt)) {

		url += '&code=' + txt;
	} else {
		url += '&name=' + txt;
	}
	
	//プルダウンで選択した項目を取得
	var stock = document.forms[formname].elements['market'].value;
	url += '&' + stock + '=on';

	//送信
//	document.charset=org_chr; 
	toRakutenSite(url);
}

function submitSearchResultCHETF(formname)
{
	var org_chr=document.charset; 
//	document.charset='shift_jis';

	var url = '/web/market/search/china_search/result.html?catAll=on&forwarding=na&target=0&theme=na&returns=na&sector=na&pageNo=';

	var txt = "";
	txt = encodeURI(document.forms[formname].elements['name'].value);
//	var txt = EscapeSJIS(document.forms[formname].elements['name'].value);
	txt = txt.replace('#', '%23');
	txt = txt.replace("&", "%26");

	if(isNumeric(txt)) {

		url += '&code=' + txt;
	} else {
		url += '&name=' + txt;
	}
	
	//プルダウンで選択した項目を取得
	url += '&exch2=on';

	//送信
//	document.charset=org_chr; 
	toRakutenSite(url);
}

function submitSearchResultUS(formname)
{
	var org_chr=document.charset; 
//	document.charset='shift_jis';

	var url = '/web/market/search/us_search/result.html?forwarding=na&target=0&theme=na&returns=na&head_office=na&sector=na';

	var txt = "";
//	var txt = EscapeSJIS(document.forms[formname].elements['name'].value);
	txt = encodeURI(document.forms[formname].elements['name'].value);
//	txt = txt.replace('#', '%23');
//	txt = txt.replace("&", "%26");

	if(isNumeric(txt)) {

		url += '&code=' + txt;
	} else {
		url += '&name=' + txt;
	}
	
	//プルダウンで選択した項目を取得
	var stock = document.forms[formname].elements['market'].value;
	url += '&' + stock + '=on';

	//プルダウンで選択した項目を取得
	var stockvariety = document.forms[formname].elements['stock-variety'].value;
	url += '&' + stockvariety + '=on';

	//送信
//	document.charset=org_chr; 
	toRakutenSite(url);
}

function submitSearchResultUSETF(formname)
{
	var org_chr=document.charset; 
//	document.charset='shift_jis';

	var url = '/web/market/search/us_search/result.html?forwarding=na&target=0&theme=na&returns=na&head_office=na&sector=na';

	var txt = "";
	txt = encodeURI(document.forms[formname].elements['name'].value);
//	var txt = EscapeSJIS(document.forms[formname].elements['name'].value);
	txt = txt.replace('#', '%23');
	txt = txt.replace("&", "%26");

	if(isNumeric(txt)) {

		url += '&code=' + txt;
	} else {
		url += '&name=' + txt;
	}
	
	//プルダウンで選択した項目を取得
	url += '&all=on';

	//プルダウンで選択した項目を取得
	url += '&var2=on';

	//送信
//	document.charset=org_chr; 
	toRakutenSite(url);
}

function submitSearchResultJP(formname)
{
	var org_chr=document.charset;
//	document.charset='shift_jis';

	var url = '/web/market/search/result.html?sector=na&pageNo=&c=ja&p=result'

	var txt = "";
//	var txt = EscapeSJIS(document.forms[formname].elements['name'].value);
	txt = encodeURI(document.forms[formname].elements['name'].value);
//	txt = txt.replace('#', '%23');
//	txt = txt.replace("&", "%26");

	if(isNumeric(txt)) {

		url += '&code=' + txt;
	} else {
		url += '&name=' + txt;
	}
	
	//プルダウンで選択した項目を取得
	var stock = document.forms[formname].elements['market'].value;
	url += '&' + stock + '=on';

	//送信
//	document.charset=org_chr; 
	toRakutenSite(url);

}

function chkSearchValue(){
	if(document.searchform == null || document.searchform.q == null || document.searchform.q.value == 'キーワードを入力'){
		document.searchform.q.value = '';
	}
}
function toHalfWidth(strVal){
  // 半角変換
  var halfVal = strVal.replace(/[！-～]/g,
    function( tmpStr ) {
      // 文字コードをシフト
      return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
    }
  );
 
  return halfVal;
}
