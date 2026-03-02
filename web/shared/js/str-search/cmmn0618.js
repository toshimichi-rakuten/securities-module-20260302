

function changeSearchResult0618(form, select, text){
	
	var org_chr=document.charset; 
//	document.charset='shift_jis';
	var url = "";
	//ラジオボタンで選択した項目の番号(0から始まる)を取得
	var number = '0';
	for(var i=0; i<document.forms[form].elements['stoc-type'].length; i++) {
		if(document.forms[form].elements['stoc-type'][i].checked) {
			number = document.forms[form].elements['stoc-type'][i].value;
		}
	}
	
	var data = "";
	switch(number){
		//日本株式
		case '0': data = "https://www.trkd-asia.com/rakutensec/resultcnt_ja.jsp?all=on&sector=na";
			break;
		//米国株式
		case '1': data = "https://www.trkd-asia.com/rakutensec/resultcnt_us.jsp?all=on&vall=on&forwarding=na&target=0&theme=na&returns=na&head_office=na&sector=na";
			break;
		//中国株
		case '2': data = "https://www.trkd-asia.com/rakutensec/resultcnt_cn.jsp?all=on&catAll=on&forwarding=na&target=0&theme=na&returns=na&sector=na&pageNo=";
			break;
		//投資信託
		case '3': data = "/ITS/ss/side/list/?search=";
			break;
		//米株銘柄検索
		case '4': data = "https://www.trkd-asia.com/rakutensec/resultcnt_us.jsp?all=on&vall=on&forwarding=na&target=0&theme=na&returns=na&head_office=na&sector=na";
			break;
	}
	//プルダウンで選択した項目の値に対応するＵＲＬをFORMのactionにセット
	url = data;
	var txt = "";
	if(document.forms[form].elements['name'].value == '銘柄名\u2044コード\u2044ファンド名'){
		document.forms[form].elements['name'].value = '';
	}
	//投信以外はロイターのため、sjisEncode
	if (number != 3) {
		txt = encodeURI(document.forms[form].elements['name'].value);
//		txt = EscapeSJIS(document.forms[form].elements['name'].value);
//		txt = txt.replace('#', '%23');
//		txt = txt.replace("&", "%26");
		//数字のみの場合および米株Ticker検索のときはcodeのパラメータ
		if(isNumeric(txt) || number == 4) {
			url += '&code=' + txt;
		} else {
			url += '&name=' + txt;
		}
	//投信は通常のURIencode
	} else if (number = 3) {
		var txt = encodeURI(document.forms[form].elements['name'].value);
		url += txt;
	}
//	document.charset=org_chr; 
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