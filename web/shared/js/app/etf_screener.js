/*
 * ETF Screener
 * 2012.02.15
 *
 */
function isNumeric(num){ 
  var numeric="0123456789"; 

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
function toRakutenSite(url)
{
	if (top!=window) {
		top.location=url;
	} else {
		window.location = url;
	}
}

function foreign_search()
{
  if($(".nav-tab-foreign").hasClass("selected")) {
    if($("input[name=item-1]:checked").val()=="us-checked") {
      // 米国株式
      var url = '/web/market/search/us_search/result.html?forwarding=na&target=0&theme=na&returns=na&head_office=na&sector=na&r1=on';

      var txt =  $("input[name=form-us-text-01]").val();
      if(txt.indexOf("銘柄名") == 0) txt = "";

      url += '&name=' + txt;

      // 市場
      var exch = "";
      if($("input[name=usexch1]").prop("checked")) exch = exch + "&exch1=on"; // 
      if($("input[name=usexch2]").prop("checked")) exch = exch + "&exch2=on"; // 
      if($("input[name=usexch3]").prop("checked")) exch = exch + "&exch3=on"; // 
      if(exch.length == 0)  exch = "&all=on";
      url += exch;

      // 株式種類
      var cat = "";
      if($("input[name=var1]").prop("checked")) cat = cat + "&var1=on"; // 普通
      if($("input[name=var2]").prop("checked")) cat = cat + "&var2=on"; // ＥＴＦ
      if($("input[name=var3]").prop("checked")) cat = cat + "&var3=on"; // ＡＤＲ
      if(cat.length == 0)  cat = "&vall=on";
      url += cat;

      //送信
	  toRakutenSite(url);
    } else if($("input[name=item-1]:checked").val()=="china-checked") {
      // 中国株式
      var url = '/web/market/search/china_search/result.html?forwarding=na&target=0&theme=na&returns=na&sector=na&pageNo=&r1=on';

      var txt =  $("input[name=form-ch-text-01]").val();
      if(txt.indexOf("銘柄名") == 0) txt = "";

      var iTxt = txt;
      if(iTxt.match(/^[０-９]+$/)) {
        txt = toHalfWidth(iTxt);
      }

      if(isNumeric(txt)) {
        url += '&code=' + txt;
      } else {
        url += '&name=' + txt;
      }

      // 市場
      var cat = "";
      if($("input[name=cat1]").prop("checked")) cat = cat + "&cat1=on"; // Ｈ株
      if($("input[name=cat2]").prop("checked")) cat = cat + "&cat2=on"; // レッドチップ
      if($("input[name=cat3]").prop("checked")) cat = cat + "&cat3=on"; // 香港その他
      if(cat.length == 0)  cat = "&catAll=on";
      url += cat;

      // 株式種類
      var exch = "";
      if($("input[name=chexch1]").prop("checked")) exch = exch + "&exch1=on"; // 普通
      if($("input[name=chexch2]").prop("checked")) exch = exch + "&exch2=on"; // ＥＴＦ
      if(exch.length == 0)  exch = "&all=on";
      url += exch;

      //送信
      toRakutenSite(url);
    } else {
      // アセアン株式
      var url = '/web/market/search/asean_search/result.html?forwarding=na&target=na&theme=na&returns=na&sector=na&c=asn&p=result&freeword=';
      var txt =  $("input[name=form-as-text-01]").val();
      if(txt.indexOf("銘柄名") == 0) txt = "";

      url += '&name=' + txt;

      // 市場
      var exch = "";
      if($("input[name=aseanexch1]").prop("checked")) exch = exch + "&exch1=on"; // SG
      if($("input[name=aseanexch2]").prop("checked")) exch = exch + "&exch2=on"; // TH
      if($("input[name=aseanexch3]").prop("checked")) exch = exch + "&exch3=on"; // MY
      if($("input[name=aseanexch4]").prop("checked")) exch = exch + "&exch4=on"; // ID
      if(exch.length == 0)  exch = "&all=on";
      url += exch;

      // 株式種類
      var cat = "";
      if($("input[name=aseanvar1]").prop("checked")) cat = cat + "&var1=on"; // 普通
      if($("input[name=aseanvar2]").prop("checked")) cat = cat + "&var2=on"; // ＥＴＦ
      if(cat.length == 0)  cat = "&vall=on";
      url += cat;

      //送信
	  toRakutenSite(url);
    }
  } else {
    // ETF
    var url = '/web/market/search/etf_search/?';

    // 銘柄の特徴
    sel = $("#form-select-01").val();
    if(sel.length == 0) {
      // キーワード
      var txt = $("input[name=form-etf-text-01]").val();
      if(txt.indexOf("銘柄名") == 0) txt = "";
      url += "form-text-01=" + txt;

      if($("input[name=astch_st]").prop("checked")) url += "&astch_st=on"; // 株
      if($("input[name=astch_bo]").prop("checked")) url += "&astch_bo=on"; // 債券
      if($("input[name=astch_co]").prop("checked")) url += "&astch_co=on"; // 商品
      if($("input[name=astch_as]").prop("checked")) url += "&astch_as=on"; // 不動産
      if($("input[name=astch_cu]").prop("checked")) url += "&astch_cu=on"; // 通貨
      if($("input[name=astch_el]").prop("checked")) url += "&astch_el=on"; // その他

      if($("input[name=geoch_10]").prop("checked")) url += "&geoch_10=on"; // アメリカ
      if($("input[name=geoch_19]").prop("checked")) url += "&geoch_19=on"; // 中国
      if($("input[name=geoch_04]").prop("checked")) url += "&geoch_04=on"; // アジア
      if($("input[name=geoch_03]").prop("checked")) url += "&geoch_03=on"; // 新興諸国
    } else {
      // 銘柄の特徴

      url += "" + sel;
    }

    //送信
    toRakutenSite(url);

  }
}