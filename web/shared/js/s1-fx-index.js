new Swiper('#js-pcmm-carousel-tickers', {
  loop: true,
  slidesPerView: 4,
  // slidesPerGroup: 5,
  width: 842,
  spaceBetween: 5,
  navigation: {
    nextEl: '#js-pcmm-carousel-tickers-navigation > .swiper-button-next',
    prevEl: '#js-pcmm-carousel-tickers-navigation > .swiper-button-prev'
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: true
  }
});

function createBanner(){
  var str2 = "";
  let arr2 = [];
  var tempHead2 = '<div class="s1-swiper swiper"><div class="swiper-wrapper">';
  var tempFoot2 = '</div></div><div class="swiper-pagination">';
  fetch("/web/fx/json/banner.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < 5; i++){
      var n = data[i];
      arr2.push(n.pagination); 
      str2 = str2 + '<div class="swiper-slide"><a href="'+n.urpc+'?l-id=fxtop-full-banner_'+n.slid+'" data-ratid="fxtop-full-banner__'+n.slid +'" data-ratevent="click" data-ratparam="all"'+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+'><img src="'+n.img+'876x220.png" width="876" height="220" alt="'+n.title+'"></a></div>'
    }
    str2 = tempHead2 + str2 + tempFoot2;
    //console.log(str2);
    $("#data-json-banner").replaceWith(str2);

    const swiper = new Swiper(".s1-swiper", {
      slidesPerView: 1　/* この行を追加 */,
      // ナビボタンが必要なら追加
      pagination: {
        el: '.swiper-pagination', // ページネーション要素のクラス
        clickable: true, // クリックによるスライド切り替えを有効にする
        type: 'bullets', // 'bullets'（デフォルト） | 'fraction' | 'progressbar'
        renderBullet: function(index, className) {
          //中の文字を表示
          return '<span class="' + className + ' swiper-pagination-bullet--' + index + '">' + arr2[index] + '</span>';
        }
      },
      loop: true,
      autoplay: {
      delay: 3000,
      disableOnInteraction: true
      },
    });
  })
}

function createInfo(){
  var str1 = ""
  var cnt1 = "0"
  var tempHead1 = '<ul class="s1-list-info">';
  var tempFoot1 = '</ul>';

  $(function() {
    $.ajax({
      async : false,
      url : "/web/shared/json/info/info_fx.json",
      type : "get",
      dataType : "json",
      cache : false,
      success : function(data){
        for(var i=0; i < data.length; i++) {
          var n = data[i];
          if(n.us_pc !== ''){
            str1 = str1 +
            '<li class="s1-list-info__item">'+
            '<div class="s1-list-info__content s1-list-info__content--time">'+n.date+'</div>'+
            '<div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--' +n.label_en+ '">'+n.label+'</span></div>'+
            '<div class="s1-list-info__content"><a href="'+n.pc_url+'" '+(n.blank =="〇" ? 'target=\"_blank\" ' : '' )+'data-ratid="fx_info_'+n.slid+'" data-ratevent="click" data-ratparam="all">'+n.txt+'</a></div>'+
            '</li>';
            cnt1++;
          }
        }
        str1 = tempHead1 + str1 + tempFoot1;
        $("#data-json-info").append(str1);
      }
    });
  });
}

createInfo();
createBanner();


jQuery.extend({
  csv: function(delim, quote, linedelim) {
  delim = typeof delim == "string" ? new RegExp( "[" + (delim || ","   ) + "]" ) : typeof delim == "undefined" ? ","    : delim;
  quote = typeof quote == "string" ? new RegExp("^[" + (quote || '"'   ) + "]" ) : typeof quote == "undefined" ? '"'    : quote;
  lined = typeof lined == "string" ? new RegExp( "[" + (lined || "\n") + "]+") : typeof lined == "undefined" ? "\r\n" : lined;
  function splitline (v) {
  var arr  = v.split(delim), out = [], q;
  for (var i=0, l=arr.length; i<l; i++) {
  if (q = arr[i].match(quote)) {
  for (j=i; j<l; j++) {
  if (arr[j].charAt(arr[j].length-1) == q[0]) { break; }
  }
  var s = arr.slice(i,j+1).join(delim);
  out.push(s.substr(1,s.length-2));
  i = j;
  } else {
  out.push(arr[i]);
  }
  }
  return out;
  }
  return function(text) {
  var lines = text.split(lined);
  for (var i=0, l=lines.length; i<l; i++) {
  lines[i] = splitline(lines[i]);
  }
  return lines;
  };
  }
  });
  function getRatedata() {
  var dtbl = new Array( 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 );
  var adtbl;
  //if("_csv" in window) {
  //} else {
  $.get('/web/fx/RateData/SwapData.dat', function (data) {
  var csv = $.csv("\t")(data);
  for(var i in dtbl) {
  var j =  dtbl[i];
  var key = "#FXSWB" + j;
  $(key).html(String(csv[j][1]));
  var key = "#FXSWA" + j;
  $(key).html(String(csv[j][2]));
  }
  });
  $.get('/web/fx/csv/Spread_Data.csv', function (data) {
    adjtbl = $.csv(",")(data);
  });
  //}
  $.get('/web/fx/RateData/RateData.dat', function (data) {
  var csv = $.csv("\t")(data);
  var ctbl = [
  { "sc":    0, "cv":  0, "pe":  0.0 },
  { "sc":    0, "cv":  0, "pe":  0.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":10000, "cv":  2, "pe": 25.0 },
  { "sc":10000, "cv":  2, "pe": 25.0 },
  { "sc":10000, "cv":  2, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 20.0 }, //TRY 25->20
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":10000, "cv":  2, "pe": 25.0 },
  { "sc":10000, "cv": 12, "pe": 25.0 },
  { "sc":10000, "cv": 13, "pe": 25.0 },
  { "sc":10000, "cv": 13, "pe": 25.0 },
  { "sc":10000, "cv":  4, "pe": 25.0 },
  { "sc":10000, "cv": 13, "pe": 25.0 },
  { "sc":10000, "cv": 13, "pe": 25.0 },
  { "sc":10000, "cv": 13, "pe": 25.0 },
  { "sc":10000, "cv": 10, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":10000, "cv":  5, "pe": 25.0 },
  { "sc":10000, "cv":  5, "pe": 25.0 }
  ];
  for(var i in dtbl) {
  var j =  dtbl[i];
  var key = "#FXBID" + j;
  $(key).html(csv[j][12]);
  $(key).removeClass("up-02");
  $(key).removeClass("down-02");
  if("_csv" in window) {
  if(_csv[j][12] < csv[j][12]) {
  $(key).addClass("up-02");
  } else if(_csv[j][12] > csv[j][12]) {
  $(key).addClass("down-02");
  }
  }
  var key = "#FXASK" + j;
  $(key).html(csv[j][13]);
  $(key).removeClass("up-02");
  $(key).removeClass("down-02");
  if("_csv" in window) {
  if(_csv[j][13] < csv[j][13]) {
  $(key).addClass("up-02");
  } else if(_csv[j][13] > csv[j][13]) {
  $(key).addClass("down-02");
  }
  }
  var key = "#FXSPD" + j;
  $(key).html(spreadFormat(csv[j][12], csv[j][13], ctbl[j].sc));
  var key = "#FXSPD" + j + "_1";
  $(key).html(spdadjcalc(csv[j][12], csv[j][13], ctbl[j].sc, adjtbl[j][0]));
  var key = "#FXSPD" + j + "_2";
  $(key).html(spdadjcalc(csv[j][12], csv[j][13], ctbl[j].sc, adjtbl[j][1]));
  var key = "#FXCHG" + j;
  $(key).html(csv[j][16]);
  if(parseFloat(csv[j][16]) > 0.0) {
  $(key).addClass("up-02");
  } else {
  $(key).addClass("down-02");
  }
  var key = "#FXDEP" + j;
  if(ctbl[j].cv == 0) {
  var dep = (parseFloat(csv[j][12]) +  parseFloat(csv[j][13])) / 2.0 * 1000.0 / ctbl[j].pe;
  } else {
  var n = ctbl[j].cv;
  var dep = (parseFloat(csv[j][12]) +  parseFloat(csv[j][13])) / 2.0 * 1000.0 / ctbl[j].pe * (parseFloat(csv[n][12]) +  parseFloat(csv[n][13])) / 2.0;
  }
  //$(key).html(addComma(parseInt(dep)));
  $(key).html(addComma(Math.ceil(dep)));
  }
  _csv = csv;
  });
  }
  function rateFormat(str, sc) {
  var num = new String(str).split(".");
  if(sc == 100) {
  return "<span class=\"integer\">" + num[0] + ".</span><span class=\"decimal\">" + num[1].substring(0,2) + "<span>" + num[1].charAt(2) + "</span></span>";
  } else {
  return "<span class=\"integer\">" + num[0] + "." + num[1].substring(0,2) + "</span><span class=\"decimal\">" + num[1].substring(2,4) + "<span>" + num[1].charAt(4) + "</span></span>";
  }
  }
  function spreadFormat(bid, ask, sc) {
  var num = new String((parseFloat(ask)-parseFloat(bid))*sc+0.01);
  var cn = 3;
  if(parseInt(num) > 9) cn = 4;
  return num.substring(0, cn);
  }
  function spdadjcalc(bid, ask, sc, adj) {
  if(adj.indexOf("ー") != -1) { return adj; }
  var num = new String((parseFloat(ask)-parseFloat(bid))*sc + 0.01 + parseFloat(adj));
  var cn = 3;
  if(parseInt(num) > 9) cn = 4;
  return num.substring(0, cn);
  }
  function addComma(str) {
  var num = new String(str).replace(/,/g, "");
  while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
  return num;
  }

getRatedata();
$(function() {
setInterval(function() { getRatedata(); },3000);
});
$("#show-all-pair").click(function() {
$(".trhide").show();
$("#show-all-pair").hide();
});

$.ajax({
  url : "https://media.rakuten-sec.net/list/feed/choice_fx.js",
  type : "get",
  dataType : "jsonp",
  scriptCharset : "UTF-8",
  cache : false,
  timeout: 10000,
  complete :  function(data){
  }
});

function choice_fx(json)
{
var str = "";

$.each(json.List, function(i, data) {
  if(i >= 4) return false;
  atid = data.Link.split("-/");
  aymd = data.Date.split("/");

  str = str + '<div class="s1-grid__cell--thin-1-4"><div class="s1-link-box-03 s1-link-box-03--padding"><a href="'+ data.Link +'" target="_blank" data-ratid="v_domestic_top_report_'+ aymd[0] + aymd[1] + aymd[2] + '_' + atid[1] +'" data-ratevent="click" data-ratparam="all"></a><div class="s1-box-media"><p><img decoding="async" src="' + data.Image + '" alt="" width="182"></p></div><p class="fc-b-01 fw-b">'+ data.Title +'</p><p class="fs-xs">'+ data.Date +'更新</p></div></div>'
});
$("#REPLST").prepend(str);
}

window.addEventListener('DOMContentLoaded', function(){

   sday = "";
   eday = "";

     var dt = new Date();

     yyyymm = dt.getFullYear() + rightString("0" + (dt.getMonth()+1), 2);

     sday = dt.getFullYear() + "/" + rightString("0" + (dt.getMonth()+1), 2) + "/" + rightString("0" + (dt.getDate()), 2);
     stim = rightString("0" + (dt.getHours()+1), 2) + "/" + rightString("0" + (dt.getMinutes()), 2);
     
     pos = dt.getTime();
     pos = pos + (86400 * 1000 * 7);
     dt.setTime(pos);
     eday = dt.getFullYear() + "/" + rightString("0" + (dt.getMonth()+1), 2) + "/" + rightString("0" + (dt.getDate()), 2);

    var _url = "../market/ginfo_calendar/keizai_calendar_all_" + yyyymm + ".xml";

    $.ajax({
      url : _url,
      type : "get",
      dataType : "xml",
      cache : false,
      timeout: 3000,
      success : function(axml) {
        var emg_url = "../market/ginfo_calendar/keizai_calendar_emg_" + yyyymm + ".xml";
        $.ajax({
          url : emg_url,
          type : "get",
          dataType : "xml",
          cache : false,
          timeout: 3000,
          success : function(exml) {
            xmlParse(axml,exml);
         }
        });
      },
      error : function() {
        $("#CALTBL").html("情報がみつかりません");
      }
    });
});

function xmlParse(axml,exml)
{

  var wTbl = new Array( "-", "月", "火", "水", "木", "金", "土", "日" );
  var iTbl = new Array( "&nbsp\;", "★", "★★", "★★★" );

  var str = "<table class=\"s1-tbl-data01 s1-tbl--width-full fs12\"><tbody><tr>";
  str = str + "<th width=\"15\" class=\"ta-c\">日付</th>";
  str = str + "<th width=\"30\" class=\"ta-c\">時間</th>";
  str = str + "<th width=\"100\" class=\"ta-c\">";
  str = str + "<select id=\"curtype\" name=\"curtype\" onchange=\"changeCurType(this);\">";
  str = str + "<option value=\"ALL\">国・地域(全て)</option>";
  str = str + "<option value=\"USD\">米国</option>";
  str = str + "<option value=\"JPY\">日本</option>";
  str = str + "<option value=\"EUR\">ユーロ</option>";
  str = str + "<option value=\"GBP\">イギリス</option>";
  str = str + "<option value=\"AUD\">オーストラリア</option>";
  str = str + "<option value=\"NZD\">ニュージーランド</option>";
  str = str + "<option value=\"ZAR\">南アフリカ</option>";
  str = str + "<option value=\"CAD\">カナダ</option>";
  str = str + "<option value=\"CHF\">スイス</option>";
  str = str + "<option value=\"DEM\">ドイツ</option>";
  str = str + "<option value=\"FRF\">フランス</option>";
  str = str + "<option value=\"SGD\">シンガーポール</option>";
  str = str + "<option value=\"HKD\">香港</option>";
  str = str + "<option value=\"BRL\">ブラジル</option>";
  str = str + "<option value=\"RUB\">ロシア</option>";
  str = str + "<option value=\"INR\">インド</option>";
  str = str + "<option value=\"CNY\">中国</option>";
  str = str + "<option value=\"KRW\">韓国</option>";
  str = str + "<option value=\"SEK\">スウェーデン</option>";
  str = str + "<option value=\"NOK\">ノルウェー</option>";
  str = str + "<option value=\"PLZ\">ポーランド</option>";
  str = str + "<option value=\"TRL\">トルコ</option>";
  str = str + "<option value=\"MXP\">メキシコ</option>";
  str = str + "</select></th>";

  str = str + "<th width=\"30%\" class=\"ta-c\">主要経済指標等</th>";
  str = str + "<th width=\"40\" class=\"ta-c\">重要度</th>";
  str = str + "<th width=\"90\" class=\"ta-c\">前回(修正値)</th>";
  str = str + "<th width=\"40\" class=\"ta-c\">予想</th>";
  str = str + "</tr>";

  var ctstart  = "";
  var ctend    = "";
  var p_day = "";

  var ary = [];
  $(axml).find('ROW').each(function(){
    ary.push(this);
  });
  $(exml).find('ROW').each(function(){
    ary.push(this);
  });

  ary.sort(function(a, b){
    var dtA = $(a).find('DATE').text();
    var dtB = $(b).find('DATE').text();
    dtA = dtA.substr(0,10);
    dtB = dtB.substr(0,10);
    if (dtA > dtB) return 1;
    if (dtA < dtB) return -1;

    var tmA = $(a).find('TIME').text();
    var tmB = $(b).find('TIME').text();
    if(tmA == "*" || tmA == "") tmA = "     ";
    if(tmB == "*" || tmB == "") tmB = "     ";
    tmA = rightString("0" + tmA, 5);
    tmB = rightString("0" + tmB, 5);
    if (tmA > tmB) return 1;
    if (tmA < tmB) return -1;

    return 0;
  });
  
  var dcnt = 0;
  $.each(ary, function(){
    var xDate = $(this).find('DATE').text();

    if((sday != "") && (sday > xDate)) return true;
    if((eday != "") && (eday <= xDate)) return false;

    var xTime = $(this).find('TIME').text();
    if((sday != "") && (sday == xDate)) {
       if(xTime != "*") {
         xTime = rightString("0" + xTime, 5)
         if(xTime < stim) return true;
       }
    }
    if(xTime == "*") xTime = "&nbsp;";


    if(ctstart == "") ctstart = xDate.substr(5,5);
    ctend = xDate.substr(5,5);

    var xWeekday = $(this).find('WEEKDAY').text();
    if(!(xWeekday in wTbl)) xWeekday = 0;

    var xCur = $(this).find('CUR').text();

    var xName = $(this).find('NAME').text();

    var xComp = $(this).find('COMP').text();
    if(xComp == "*") {
      xComp = "&nbsp;";
    } else {
      xComp = "(" + xComp + ")";
    }

    var xMon = $(this).find('MON').text();
    if(xMon == "*" || xMon == "") xMon = "&nbsp\;";

    var xLast = $(this).find('LAST').text();
    if(xLast == "*" || xLast == "") xLast = "&nbsp\;";

    var xChange = $(this).find('CHANGE').text();
    if(xChange == "*" || xChange == "") {
      xChange = "&nbsp\;";
    } else if(xChange != "") {
      xChange = " (" + xChange + ")";
    }

    var xEstimate = $(this).find('ESTIMATE').text();
    if(xEstimate == "*" || xEstimate == "") xEstimate = "&nbsp\;";

    var xImportance = $(this).find('IMPORTANCE').text();
    if(!(xImportance in iTbl)) xImportance = 0;

    if(xTime == "&nbsp;") {
      str = str + "<tr class=\"NOT " + xCur + "\" style=\"display: none;\">";
    }else {
      if(dcnt < 10) {
        str = str + "<tr class=\"ALL " + xCur + "\">";
      } else {
        str = str + "<tr class=\"ALL " + xCur + "\" style=\"display: none;\">";
      }
      dcnt++;
    }
    str = str + "<td class=\"ta-c\">" + xDate.substr(5,5) + "(" + wTbl[xWeekday] + ")" + "</td>";
    str = str + "<td class=\"ta-r\" >" + xTime + "</td>";
    str = str + "<td class=\"ta-l fw-b\"><img src=\"" + getCountryFlag(xCur) + "\"  class=\"va-m\">" + "<span>&nbsp;" + getCountryName(xCur) + "</span></td>";

    var url = getDictionaryURL(xCur, xName, xComp, xMon);
    if(url == "") {
      str = str + "<td>" + xMon + xName + xComp + "</td>";
    } else {
      str = str + "<td><a href=\"" + url + "\">" + xMon + xName + xComp + "</a></td>";
    }
    str = str + "<td class=\"ta-l\">" + iTbl[xImportance] + "</td>";
    str = str + "<td>" + xLast + xChange + "</td>";
    str = str + "<td>" + xEstimate + "</td>";
    str = str + "</tr>";

  });
  str = str + "</tbody></table><ul class=\"s1-list-link ta-r\"><li class=\"s1-list-link__item\"><a href=\"/web/market/calendar/\">経済カレンダーはこちら</a></li></ul>";

  $("#CALTBL").html(str);
}

function getCountryName(key)
{
  var cntbl = {
    "AUD":"オーストラリア",
    "CAD":"カナダ",
    "CHF":"スイス",
    "DEM":"ドイツ",
    "EUR":"ユーロ",
    "FRF":"フランス",
    "GBP":"イギリス",
    "JPY":"日本",
    "NZD":"ニュージーランド",
    "USD":"米国",
    "ZAR":"南アフリカ",
    "HKD":"香港",
    "SGD":"シンガーポール",
    "BRL":"ブラジル",
    "RUB":"ロシア",
    "INR":"インド",
    "CNY":"中国",
    "SEK":"スウェーデン",
    "NOK":"ノルウェー",
    "KRW":"韓国",
    "MXP":"メキシコ",
    "PLZ":"ポーランド",
    "TRL":"トルコ"
  };

  if(key in cntbl) {
    return(cntbl[key]);
  } else {
    return("-");
  }
}

function getCountryFlag(key)
{
  var cftbl = {
    "AUD":"flag_au_24x16.gif",
    "CAD":"flag_ca_24x16.gif",
    "CHF":"flag_ch_24x16.gif",
    "DEM":"flag_de_24x16.gif",
    "EUR":"flag_eu_24x16.gif",
    "FRF":"flag_fr_24x16.gif",
    "GBP":"flag_gb_24x16.gif",
    "JPY":"flag_jp_24x16.gif",
    "NZD":"flag_nz_24x16.gif",
    "USD":"flag_us_24x16.gif",
    "ZAR":"flag_za_24x16.gif",
    "HKD":"flag_hk_24x16.gif",
    "SGD":"flag_sg_24x16.gif",
    "BRL":"flag_br_24x16.gif",
    "RUB":"flag_ru_24x16.gif",
    "INR":"flag_in_24x16.gif",
    "CNY":"flag_cn_24x16.gif",
    "SEK":"flag_se_24x16.gif",
    "NOK":"flag_no_24x16.gif",
    "KRW":"flag_kr_24x16.gif",
    "MXP":"flag_mx_24x16.gif",
    "PLZ":"flag_pl_24x16.gif",
    "TRL":"flag_tr_24x16.gif"
  };

  if(key in cftbl) {
    return("/web/shared/images/flags/" + cftbl[key]);
  } else {
    return("/web/shared/images/flags/flag_space_24x16.gif");
  }
}

function getDictionaryURL(cur, txt, xComp, xMon)
{
  var dutbl = {
    // "EUR欧州中央銀行（ＥＣＢ）政策金利":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/a/ecb.html",
    // "GBPイングランド銀行（ＢＯＥ、英中央銀行）金利発表":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/a/boe.html",
    // "JPYマネーストックＭ２":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ma/ms.html",
    // "JPYマネタリーベース":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ma/monetaly.html",
    // "JPY外国為替平衡操作の実施状況（介入実績）":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/fx.html",
    // "JPY企業向けサービス価格指数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/kigyomuke.html",
    // "JPY機械受注":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/kikaijyutyu.html",
    // "JPY鉱工業生産・確報値":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/koukougyo.html",
    // "JPY鉱工業生産・速報値":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/koukougyo.html",
    // "JPY国際収支・経常収支":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/kokusaisyusi.html",
    // "JPY国際収支・貿易収支":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/kokusaisyusi.html",
    // "JPY国内企業物価指数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/kigyobukka.html",
    // "JPY四半期実質国内総生産（ＧＤＰ、改定値）":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/g/gdp.html",
    // "JPY四半期実質国内総生産（ＧＤＰ、速報値）":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/g/gdp.html",
    // "JPY全国消費者物価指数（ＣＰＩ）":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/syohisyabukka.html",
    // "JPY全国消費者物価指数（ＣＰＩ、生鮮食料品除く)":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/syohisyabukka.html",
    // "JPY全産業活動指数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/zensangyokatudo.html",
    // "JPY全世帯家計調査・消費支出":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/kakei.html",
    // "JPY大型小売店（既存店）販売額":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/a/oogata.html",
    // "JPY第三次産業活動指数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ta/3jisangyo.html",
    // "JPY日銀金融政策決定会合、終了後決定内容発表":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/na/nitiginkinyu.html",
    // "JPY日銀金融政策決定会合、終了後政策金利発表":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/na/nitiginkinyu.html",
    // "JPY日銀短観・四半期大企業製造業業況判断":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/na/nitigintankan.html",
    // "JPY日銀短観・四半期大企業製造業先行き":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/na/nitigintankan.html",
    // "JPY日銀短観・四半期大企業全産業設備投資":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/na/nitigintankan.html",
    // "JPY貿易統計（通関ベース）":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ha/boekitokei.html",
    // "USDＡＤＰ雇用統計":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/a/adp.html",
    // "USDＩＳＭ製造業景況指数":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/i/ism.html",
    // "USDＩＳＭ非製造業景況指数（総合）":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/i/ism2.html",
    // "USDケース・シラー米住宅価格指数":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/s/sp.html",
    // "USDニューヨーク連銀製造業景気指数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/na/nym.html",
    // "USDフィラデルフィア連銀製造業景気指数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ha/frbop.html",
    // "USDミシガン大学消費者態度指数・確報値":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ma/uomioc.html",
    // "USDミシガン大学消費者態度指数・速報値":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ma/uomioc.html",
    // "USD卸売物価指数（ＰＰＩ）":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/usppi.html",
    // "USD卸売物価指数（ＰＰＩコア指数、食品・エネルギー除く）":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/usppi.html",
    // "USD企業在庫":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/kigyozaiko.html",
    // "USD景気先行指標総合指数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/lei.html",
    // "USD月次財政収支":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/mts.html",
    // "USD建設許可件数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/bp.html",
    // "USD個人所得":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/piao.html",
    // "USD鉱工業生産":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/ipi.html",
    // "USD四半期実質国内総生産（ＧＤＰ、改定値）":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/g/usgdp.html",
    // "USD四半期実質国内総生産（ＧＤＰ、確定値）":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/g/usgdp.html",
    // "USD四半期実質国内総生産（ＧＤＰ、速報値）":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/g/usgdp.html",
    // "USD住宅着工件数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/ushs.html",
    // "USD小売売上高":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ka/rs.html",
    // "USD消費者信頼感指数（コンファレンス・ボード）":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/uscci.html",
    // "USD消費者物価指数（ＣＰＩ）":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/uscpi.html",
    // "USD消費者物価指数（ＣＰＩコア指数）":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/uscpi.html",
    // "USD新規失業保険申請件数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/usijc.html",
    // "USD新築住宅販売件数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/usnhs.html",
    // "USD製造業新規受注":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/usmno.html",
    // "USD設備稼働率":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/sa/uscu.html",
    // "USD対米証券投資（短期債除く）":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ta/ustic.html",
    // "USD耐久財受注":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ta/usdgmo.html",
    // "USD耐久財受注・輸送用機器除く":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ta/usdgmo.html",
    // "USD中古住宅販売件数":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ta/usehs.html",
    // "USD米地区連銀経済報告（ベージュブック）":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ha/beigebook.html",
    // "USD米連邦公開市場委員会（ＦＯＭＣ）、終了後政策金利発表":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/f/fomc.html",
    // "USD米連邦公開市場委員会（ＦＯＭＣ）１日目":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/f/fomc.html",
    // "USD米連邦公開市場委員会（ＦＯＭＣ）議事要旨":"https://www.rakuten-sec.co.jp/web/market/dictionary/e/f/fomc.html",
    // "USD貿易収支":"https://www.rakuten-sec.co.jp/web/market/dictionary/j/ha/itigas.html"

    "USD非農業部門雇用者数変化(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=A2",
    "USD失業率":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=A1",
    "USD貿易収支":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=B1",
    "USD対米証券投資（短期債除く）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=B2",
    "USD小売売上高(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=C1",
    "USD住宅着工件数(年率換算件数)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=C2",
    "USD建設許可件数(年率換算件数)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=C3",
    "USDミシガン大学消費者態度指数・速報値":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=C4",
    "USD消費者信頼感指数（コンファレンス・ボード）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=C5",
    "USD卸売物価指数（ＰＰＩ）(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=D1",
    "USD消費者物価指数（ＣＰＩ）(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=D3",
    "USD消費者物価指数（ＣＰＩ）(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=D4",
    "USD四半期実質国内総生産（ＧＤＰ、速報値）(前期比年率)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=D5",
    "USD耐久財受注(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=D6",
    "USDＩＳＭ製造業景況指数":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=E1",
    "USD鉱工業生産(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=E2",
    "USD米連邦公開市場委員会（ＦＯＭＣ）、終了後政策金利発表":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-States&indicator=S2",

    "CAD新規雇用者数":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Canada&indicator=A2",
    "CAD失業率":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Canada&indicator=A1",
    "CAD小売売上高(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Canada&indicator=C1",
    "CAD消費者物価指数（ＣＰＩ）(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Canada&indicator=D1",
    "CAD四半期国内総生産（ＧＤＰ）(前期比年率)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Canada&indicator=E2",
    "CADカナダ銀行　政策金利":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Canada&indicator=S5",

    "JPY失業率":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Japan&indicator=A1",
    "JPY貿易統計（通関ベース）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Japan&indicator=B1",
    "JPY全国消費者物価指数（ＣＰＩ）(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Japan&indicator=C1",
    "JPY四半期実質国内総生産（ＧＤＰ、改定値）(前期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Japan&indicator=D1",
    "JPY四半期実質国内総生産（ＧＤＰ、改定値）(年率換算)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Japan&indicator=D2",
    "JPY日銀短観・四半期大企業製造業業況判断":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Japan&indicator=D3",
    "JPY日銀短観・四半期大企業製造業先行き":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Japan&indicator=D4",
    "JPY鉱工業生産・速報値(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Japan&indicator=E1",

    "EUR失業率":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=European-Union&indicator=A1",
    "EUR小売売上高(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=European-Union&indicator=C1",
    "EUR卸売物価指数（ＰＰＩ）(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=European-Union&indicator=D1",
    "EUR消費者物価指数（ＨＩＣＰ、改定値）(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=European-Union&indicator=D2",
    "EUR四半期域内総生産（ＧＤＰ、速報値）(前期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=European-Union&indicator=E1",
    "EUR四半期域内総生産（ＧＤＰ、速報値）(前年同期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=European-Union&indicator=E2",
    "EUR製造業購買担当者景気指数（ＰＭＩ、速報値）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=European-Union&indicator=E3",
    "EURサービス部門購買担当者景気指数（ＰＭＩ、速報値）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=European-Union&indicator=E4",
    "EUR欧州中央銀行（ＥＣＢ）政策金利":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=European-Union&indicator=S3",

    "DEM失業率":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Germany&indicator=A1",
    "DEM小売売上高指数(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Germany&indicator=C1",
    "DEM国内総生産（ＧＤＰ、改定値）(前期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Germany&indicator=E1",
    "DEM国内総生産（ＧＤＰ、改定値）(前年同期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Germany&indicator=E2",
    "DEMＺＥＷ景況感調査（期待指数）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Germany&indicator=E3",
    "DEMＩＦＯ企業景況感指数":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Germany&indicator=E4",
    "DEM製造業購買担当者景気指数（ＰＭＩ、速報値）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Germany&indicator=E5",
    "DEMサービス部門購買担当者景気指数（ＰＭＩ、速報値）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Germany&indicator=E6",
    "DEM鉱工業生産(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Germany&indicator=E7",

    "GBP失業率":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=A1",
    "GBP小売売上高指数(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=C1",
    "GBP消費者物価指数（ＣＰＩ）(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=D2",
    "GBP卸売物価指数（食品、エネルギー除くコアＰＰＩ）(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=E9",
    "GBP四半期国内総生産（ＧＤＰ、改定値）(前期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=E1",
    "GBP四半期国内総生産（ＧＤＰ、改定値）(前年同期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=E2",
    "GBP製造業購買担当者景気指数（ＰＭＩ）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=E3",
    "GBP建設業購買担当者景気指数（ＰＭＩ）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=E4",
    "GBPサービス部門購買担当者景気指数（ＰＭＩ）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=E5",
    "GBP鉱工業生産指数(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=E6",
    "GBPイングランド銀行（ＢＯＥ、英中央銀行）金利発表":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=United-Kingdom&indicator=S4",

    "AUD失業率":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Australia&indicator=A1",
    "AUD新規雇用者数":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Australia&indicator=A2",
    "AUD貿易収支":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Australia&indicator=B1",
    "AUD小売売上高(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Australia&indicator=C1",
    "AUD住宅建設許可件数 (前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Australia&indicator=C2",
    "AUD四半期卸売物価指数（ＰＰＩ）(前年同期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Australia&indicator=D1",
    "AUD四半期消費者物価（ＣＰＩ）(前年同期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Australia&indicator=D2",
    "AUD四半期国内総生産（ＧＤＰ）(前年同期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Australia&indicator=E1",
    "AUD豪準備銀行（中央銀行）、政策金利発表":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Australia&indicator=S6",

    "NZD四半期失業率":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=New-Zealand&indicator=A1",
    "NZD貿易収支":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=New-Zealand&indicator=B1",
    "NZD四半期小売売上高指数(前期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=New-Zealand&indicator=C1",
    "NZD住宅建設許可件数(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=New-Zealand&indicator=C2",
    "NZD四半期卸売物価指数（ＰＰＩ）(前期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=New-Zealand&indicator=D1",
    "NZD四半期消費者物価（ＣＰＩ）(前期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=New-Zealand&indicator=D2",
    "NZD四半期国内総生産（ＧＤＰ）(前期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=New-Zealand&indicator=E1",
    "NZDニュージーランド準備銀行（ＲＢＮＺ、ＮＺ中央銀行）政策金利":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=New-Zealand&indicator=S7",

    "CNY貿易収支（米ドル）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=China&indicator=A1",
    "CNY小売売上高(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=China&indicator=B1",
    "CNY生産者物価指数（ＰＰＩ）(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=China&indicator=C1",
    "CNY消費者物価指数（ＣＰＩ）(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=China&indicator=C2",
    "CNY四半期国内総生産（ＧＤＰ）(前年同期比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=China&indicator=D1",
    "CNYＣａｉｘｉｎ製造業購買担当者景気指数（ＰＭＩ）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=China&indicator=D3",
    "CNY製造業購買担当者景気指数（ＰＭＩ）":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=China&indicator=D4",
    "CNY鉱工業生産(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=China&indicator=D6",

    "ZAR貿易収支":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=South-Africa&indicator=A1",
    "ZAR消費者物価指数（ＣＰＩ）(前年同月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=South-Africa&indicator=B2",
    "ZAR四半期国内総生産（ＧＤＰ）(前期比年率)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=South-Africa&indicator=C1",
    "ZAR南アフリカ準備銀行（中央銀行）政策金利":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=South-Africa&indicator=S10",

    "TRL消費者物価指数（ＣＰＩ）(前月比)":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Turkey&indicator=B1",
    "TRLトルコ中銀、政策金利":"https://www.rakuten-sec.co.jp/web/market/ecoData/index.html?country=Turkey&indicator=S12"
  };

  var comp = xComp.replace('&nbsp;', '');
  var key = cur + txt + comp;

  if(key in dutbl) {
    return(dutbl[key]);
  } else {
    return("");
  }
}

function rightString( str, len )
{
  return str.substr( str.length - len, len );
}

function changeCurType(obj)
{
    $(".ALL").hide();
    $(".NOT").hide();
    $("." + obj.value).show();
    
    i = 0;
    $.each($("#CALTBL tbody").children(), function() {
      if($(this).css('display') != 'none') {
        if(i > 10) $(this).css('display', 'none');
        i++;
      }
    });
}
