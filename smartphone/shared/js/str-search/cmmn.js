

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

function submitSearchResultAll(formname)
{
	var org_chr=document.charset;

	var url = "";
	//プルダウンで選択した項目の番号(0から始まる)を取得
	var number = document.forms[formname].elements['marketArea'].value;

	//プルダウンで選択した項目の値(optionのvalue値)をFORMのactionにセット
	var data = "";
	switch(number){
		//米国株式
		case '0': data = "https://www.trkd-asia.com/rakutensec/resultcnt_us.jsp?all=on&vall=on&forwarding=na&target=0&theme=na&returns=na&head_office=na&sector=na&r1=on";
			break;
		//中国株式
		case '1': data = "https://www.trkd-asia.com/rakutensec/resultcnt_cn.jsp?all=on&catAll=on&forwarding=na&target=0&theme=na&returns=na&sector=na&pageNo=&r1=on";
			break;
		//アセアン株式
		case '2': data = "https://www.trkd-asia.com/rakutensec/resultcnt_asn.jsp?vall=on&forwarding=na&target=na&theme=na&returns=na&sector=na&c=asn&p=result&all=on&freeword=&r1=on";
			break;
	}

	var url = data;

	var txt = "";

	// 銘柄・コード入力フォーム
	txt = encodeURI(document.forms[formname].elements['name'].value);

	if(isNumeric(txt)) {
		url += '&code=' + txt;
	} else {
		url += '&name=' + txt;
	}

	//送信
	toRakutenSite(url);
}