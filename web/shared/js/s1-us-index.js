// 検索用
function submitSearchResultUSS(formname) {
  var org_chr = document.charset;
  //	document.charset='shift_jis';

  var url = '/web/market/search/us_search/result.html?forwarding=na&target=0&theme=na&returns=na&head_office=na&sector=na&r1=on';

  var txt = "";
  //	var txt = EscapeSJIS(document.forms[formname].elements['name'].value);
  txt = encodeURI(document.forms[formname].elements['name'].value);
  //	txt = txt.replace('#', '%23');
  //	txt = txt.replace("&", "%26");

  if (isNumeric(txt)) {

    url += '&code=' + txt;
  } else {
    url += '&name=' + txt;
  }

  //プルダウンで選択した項目を取得
  // var stock = document.forms[formname].elements['market'].value;
  var stock = 'all';
  url += '&' + stock + '=on';

  //プルダウンで選択した項目を取得
  var stockvariety = document.forms[formname].elements['stock-variety'].value;
  url += '&' + stockvariety + '=on';

  //送信
  //	document.charset=org_chr;
  toRakutenSite(url);
}
function toRakutenSite(url) {
  if (top != window) {
    top.location = url;
  } else {
    window.location = url;
  }
}

// 決算情報
(function($){$.extend({ csv: function(delim, quote, linedelim) { delim = typeof delim == "string" ? new RegExp( "[" + (delim || "," ) + "]" ) : typeof delim == "undefined" ? "," : delim; quote = typeof quote == "string" ? new RegExp("^[" + (quote || '"' ) + "]" ) : typeof quote == "undefined" ? '"' : quote; lined = typeof lined == "string" ? new RegExp( "[" + (lined || "\n") + "]+") : typeof lined == "undefined" ? "\n" : lined; function splitline (v) { var arr = v.split(delim), out = [], q; for (var i=0, l=arr.length; i<l; i++) { if (q = arr[i].match(quote)) { for (j=i; j<l; j++) { if (arr[j].charAt(arr[j].length-1) == q[0]) { break; } } var s = arr.slice(i,j+1).join(delim); out.push(s.substr(1,s.length-2)); i = j; } else { out.push(arr[i]); } } return out; } return function(text) { var lines = text.split(lined); for (var i=0, l=lines.length; i<l; i++) { lines[i] = splitline(lines[i]); } return lines; }; }});})($);

function makeSettlementInfo(){
    //---- US Settlemnet Infomation ----
    var flg = 0;
    var udt = new Date();
    if(udt.getHours() < 8) {
        udt.setTime(udt.getTime() - (86400 * 1000));
    }
    var yyyymmdd = udt.getFullYear() + rightString("0" + (udt.getMonth()+1), 2) + rightString("0" + udt.getDate(), 2);
    yyyymmdd = checkDisplayDate('/ITS/market-data/us-closing.csv', yyyymmdd);
    if(yyyymmdd) {
        var unum = getSettlementNum('/web/market/calendar/F_NUMBER_SCH.csv', yyyymmdd, 2);
        if(unum > 0) {
            var wrk = new String(yyyymmdd);
            var ustr = "決算発表シーズンに突入！</br>【米国株式 " + wrk.substr(4,2) + "/" + wrk.substr(6,2) + " 発表予定】";
            $.ajax({
                type: "GET",
                url: '/ITS/market-data/us-closing.csv',
                async: false,
                success: function (cdata) {
                    var ccsv = $.csv()(cdata);
                    for(k=0; k<ccsv.length; k++) {
                        if(ccsv[k][0] == yyyymmdd) {
                            var mei = getMeigara('/web/market/calendar/F_SCH_SOURCE.csv', ccsv[k][0], ccsv[k][1].replace(/\r/g, ''));
                            if(mei) {
                                ustr = ustr + mei + "、";
                                flg = 1;
                            }
                        }
                    }
                }
            });
            ustr = ustr.slice(0, -1) + "など"; // + unum + "銘柄";
            $("#US_SETTLEMENT").html(ustr);
        }
    }
    if(flg == 0) {
        $("#SETTLEMENT_INFO").hide();
    }
}

function checkDisplayDate(fname, yyyymmdd){
    var rcYYYYMMDD = "";
    $.ajax({
        type: "GET",
        url: fname,
        async: false,
        success: function (data) {
            var csv = $.csv()(data);
            for(i=0; i<csv.length; i++) {
                if(csv[i][0] >= yyyymmdd) {
                    rcYYYYMMDD = csv[i][0];
                    break;
                }
            }
        }
    });
    return rcYYYYMMDD;
}

function getSettlementNum(fname, yyyymmdd, pos){
    var rc = 0;
    $.ajax({
        type: "GET",
        url: fname,
        async: false,
        success: function (data) {
            var csv = $.csv()(data);
            for(i=1; i<csv.length; i++) {
                if(csv[i][0] == yyyymmdd) {
                    rc = csv[i][pos];
                    break;
                }
            }
        }
    });
    return rc;
}

function getMeigara(fname, yyyymmdd, code){
    var rc = "";
    $.ajax({
        type: "GET",
        url: fname,
        async: false,
        success: function (data) {
            var csv = $.csv()(data);
            for(i=1; i<csv.length; i++) {
                if(csv[i][2] == yyyymmdd && csv[i][0] == code) {
                    rc = csv[i][1] + "(" + csv[i][0] + ")";
                    break;
                }
            }
        }
    });
    return rc;
}

function rightString( str, len ){
    return str.substr( str.length - len, len );
}

makeSettlementInfo();

// 外国株式レポート
function choice_foreign_stock(json) {
    var str = "";
    $.each(json.List, function(i, data) {
        str = str + "<div class=\"s1-grid__cell--thin-1-3\">";
        str = str + "<div class=\"s1-box-media s1-box-media--left\">";
        str = str + "<p><a href=\"" + data.Link + "\" onclick=\"s.lidTrack(\'" + makeSID("v_foreign_top_report_img_", data.Date, data.Link) + "\')\;\" target=\"_blank\"><img src=\"" + data.Image + "\" alt=\"\" width=\"90\"></a></p>";
        str = str + "</div>";
        str = str + "<div class=\"s1-box-section\">";
        str = str + "<p><span class=\"s1-label bg-securities\">" + data.Date + "更新</span></p>";
        str = str + "<p><a href=\"" + data.Link + "\" onclick=\"s.lidTrack(\'" + makeSID("v_foreign_top_report_txt_", data.Date, data.Link) + "\');\" class=\"fw-b\" target=\"_blank\">" + data.Title + "</a></p>";
        str = str + "<p class=\"fs-s fw-b\">" + data.Serialize + "</p>";
        str = str + "<p class=\"fs-s\">" + data.Author + "</p></div></div>";
    });
    $("#REPLST").append(str);
}

function makeSID(prefix, date, link) {
    var sid = "";
    var dt = date.split("/");
    var at = link.split("/");
    sid = prefix + dt[0] + dt[1] + dt[2] + "_" + at[5];
    return sid;
}

$.ajax({
    url: "https://media.rakuten-sec.net/list/feed/choice_foreign_stock.js",
    type: "get",
    dataType: "jsonp",
    scriptCharset: "UTF-8",
    cache: false,
    timeout: 10000,
    complete: function(data) {}
});

// ランキング
$(function(){

$.getJSON('/web/foreign/json/foreignRanking.json', function(data){

  var dt = data.us_ranking;
  var str = '';
  for(j=0; j<((dt.length < 5) ? dt.length : 5); j++) {
    if((j % 2) == 0) {
      str = str + '<tr>';
    } else {
      str = str + '<tr class=\"even\">';
    }
    str = str + '<td>' + (j+1) + '</td>';
    if(dt[j][1] == "new") {
      wh = 29; ht = 11;
    } else {
      wh = 12; ht = 14;
    }
    str = str + '<td class=\"ta-c\"><img src=\"/web/shared/images/icon/ico-' + dt[j][1] + '.png\" alt=\"' + dt[j][1] + '\" width=\"' + wh + '\" height=\"' + ht +'\" style=\"margin-top:0.3em;\" /></td>';

    var sfx = "";
    str = str + '<td class=\"ta-c\"><a href=\"/web/market/search/us_search/quote.html?ric=';
    if(dt[j][5] == "NYSE") sfx = ".N";
    if(dt[j][5] == "NYSE Arca") sfx = ".P";
    if(dt[j][5] == "NASDAQ") sfx = ".Q";
    var ric = dt[j][2];
    ric = ric.replace(" A", "a");
    ric = ric.replace(" B", "b");
    str = str + ric + sfx +'\" onclick=\"s.lidTrack(\"v_foreign_us_ranking_' + (j+1) + '\");return false;\">' + dt[j][2] + '</a></td>';
    str = str + '<td>' + dt[j][3] + '</td>';
    str = str + '<td>' + dt[j][4] + '</td>';
    str = str + '</tr>';
  }
  $('#data-json-ranking0').append(str);

  var dt = data.us_etf_ranking;
  var str = '';
  for(j=0; j<((dt.length < 5) ? dt.length : 5); j++) {
    if((j % 2) == 0) {
      str = str + '<tr>';
    } else {
      str = str + '<tr class=\"even\">';
    }
    str = str + '<td>' + (j+1) + '</td>';
    if(dt[j][1] == "new") {
      wh = 29; ht = 11;
    } else {
      wh = 12; ht = 14;
    }
    str = str + '<td class=\"ta-c\"><img src=\"/web/shared/images/icon/ico-' + dt[j][1] + '.png\" alt=\"' + dt[j][1] + '\" width=\"' + wh + '\" height=\"' + ht +'\" style=\"margin-top:0.3em;\" /></td>';

    var sfx = "";
    str = str + '<td class=\"ta-c\"><a href=\"/web/market/search/us_search/quote.html?ric=';
    if(dt[j][5] == "NYSE") sfx = ".N";
    if(dt[j][5] == "NYSE Arca") sfx = ".P";
    if(dt[j][5] == "NASDAQ") sfx = ".Q";
    var ric = dt[j][2];
    ric = ric.replace(" A", "a");
    ric = ric.replace(" B", "b");
    str = str + ric + sfx +'\" onclick=\"s.lidTrack(\"v_foreign_usetf_ranking_' + (j+1) + '\");return false;\">' + dt[j][2] + '</a></td>';

    str = str + '<td>' + dt[j][3] + '</td>';
    str = str + '</tr>';
  }
  $('#data-json-ranking1').append(str);

  var dt = data.us_adr_ranking;
  var str = '';
  for(j=0; j<((dt.length < 5) ? dt.length : 5); j++) {
    if((j % 2) == 0) {
      str = str + '<tr>';
    } else {
      str = str + '<tr class=\"even\">';
    }
    str = str + '<td>' + (j+1) + '</td>';
    if(dt[j][1] == "new") {
      wh = 29; ht = 11;
    } else {
      wh = 12; ht = 14;
    }
    str = str + '<td class=\"ta-c\"><img src=\"/web/shared/images/icon/ico-' + dt[j][1] + '.png\" alt=\"' + dt[j][1] + '\" width=\"' + wh + '\" height=\"' + ht +'\" style=\"margin-top:0.3em;\" /></td>';

    var sfx = "";
    str = str + '<td class=\"ta-c\"><a href=\"/web/market/search/us_search/quote.html?ric=';
    if(dt[j][5] == "NYSE") sfx = ".N";
    if(dt[j][5] == "NYSE Arca") sfx = ".P";
    if(dt[j][5] == "NASDAQ") sfx = ".Q";
    var ric = dt[j][2];
    ric = ric.replace(" A", "a");
    ric = ric.replace(" B", "b");
    str = str + ric + sfx +'\" onclick=\"s.lidTrack(\"v_foreign_usadr_ranking_' + (j+1) + '\");return false;\">' + dt[j][2] + '</a></td>';

    str = str + '<td>' + dt[j][3] + '</td>';
    str = str + '<td>' + dt[j][6] + '</td>';
    str = str + '<td>' + dt[j][4] + '</td>';
    str = str + '</tr>';
  }
  $('#data-json-ranking2').append(str);

  var dt = data.ch_ranking;
  var str = '';
  for(j=0; j<((dt.length < 5) ? dt.length : 5); j++) {
    if((j % 2) == 0) {
      str = str + '<tr>';
    } else {
      str = str + '<tr class=\"even\">';
    }
    str = str + '<td>' + (j+1) + '</td>';
    if(dt[j][1] == "new") {
      wh = 29; ht = 11;
    } else {
      wh = 12; ht = 14;
    }
    str = str + '<td class=\"ta-c\"><img src=\"/web/shared/images/icon/ico-' + dt[j][1] + '.png\" alt=\"' + dt[j][1] + '\" width=\"' + wh + '\" height=\"' + ht +'\" style=\"margin-top:0.3em;\" /></td>';

    str = str + '<td class=\"ta-c\"><a href=\"/web/market/search/china_search/quote.html?ric=';
    var sfx;
    var code;
    if(dt[j][2] >= 600000) {
      sfx = ".SH";
      code = dt[j][2];
    } else {
      sfx = ".HK";
      code = rightString("0" + dt[j][2], 5);
    }
    var ric = dt[j][2];
    str = str + ric + sfx +'\" onclick=\"s.lidTrack(\"v_foreign_ch_ranking_' + (j+1) + '\");return false;\">' + code + '</a></td>';

    str = str + '<td>' + dt[j][3] + '</td>';
    str = str + '<td>' + dt[j][4] + '</td>';
    str = str + '</tr>';
  }
  $('#data-json-ranking3').append(str);

  var dt = data.ch_etf_ranking;
  var str = '';
  for(j=0; j<((dt.length < 5) ? dt.length : 5); j++) {
    if((j % 2) == 0) {
      str = str + '<tr>';
    } else {
      str = str + '<tr class=\"even\">';
    }
    str = str + '<td>' + (j+1) + '</td>';
    if(dt[j][1] == "new") {
      wh = 29; ht = 11;
    } else {
      wh = 12; ht = 14;
    }
    str = str + '<td class=\"ta-c\"><img src=\"/web/shared/images/icon/ico-' + dt[j][1] + '.png\" alt=\"' + dt[j][1] + '\" width=\"' + wh + '\" height=\"' + ht +'\" style=\"margin-top:0.3em;\" /></td>';

    str = str + '<td class=\"ta-c\"><a href=\"/web/market/search/china_search/quote.html?ric=';
    var sfx;
    var code;
    if(dt[j][2] >= 600000) {
      sfx = ".SH";
      code = dt[j][2];
    } else {
      sfx = ".HK";
      code = rightString("0" + dt[j][2], 5);
    }
    var ric = dt[j][2];
    str = str + ric + sfx +'\" onclick=\"s.lidTrack(\"v_foreign_chetf_ranking_' + (j+1) + '\");return false;\">' + code + '</a></td>';

    str = str + '<td>' + dt[j][3] + '</td>';
    str = str + '</tr>';
  }
  $('#data-json-ranking4').append(str);

  var dt = data.as_ranking;
  var str = '';
  for(j=0; j<((dt.length < 5) ? dt.length : 5); j++) {
    if((j % 2) == 0) {
      str = str + '<tr>';
    } else {
      str = str + '<tr class=\"even\">';
    }
    str = str + '<td>' + (j+1) + '</td>';
    if(dt[j][1] == "new") {
      wh = 29; ht = 11;
    } else {
      wh = 12; ht = 14;
    }
    str = str + '<td class=\"ta-c\"><img src=\"/web/shared/images/icon/ico-' + dt[j][1] + '.png\" alt=\"' + dt[j][1] + '\" width=\"' + wh + '\" height=\"' + ht +'\" style=\"margin-top:0.3em;\" /></td>';

    var sfx = "";
    str = str + '<td class=\"ta-c\"><a href=\"/web/market/search/asean_search/quote.html?ric=';
    if(dt[j][5] == "インドネシア") sfx = ".JK";
    if(dt[j][5] == "マレーシア")   sfx = ".KL";
    if(dt[j][5] == "シンガポール") sfx = ".SI";
    if(dt[j][5] == "タイ")         sfx = ".BK";
    var ric = dt[j][2];
    str = str + ric + sfx +'\" onclick=\"s.lidTrack(\"v_foreign_as_ranking_' + (j+1) + '\");return false;\">' + dt[j][2] + '</a></td>';

    str = str + '<td>' + dt[j][3] + '</td>';
    str = str + '<td>' + dt[j][5] + '</td>';
    str = str + '</tr>';
  }
  $('#data-json-ranking5').append(str);


 var str = '<p class=\"ta-r\">ランキング対象期間　' + data.term + '（国内約定日）<br />更新日　' + data.update + '（毎週第二営業日更新）</p>';
 $('#data-json-date').append(str);
});

});

// お知らせ
function foreginInfo(){
  $(function(){
    var str2 = ""
    var cnt2 = "0"
    var tempHead = '<ul class="s1-list-info" style="padding: 10px;">';
    var tempFoot = '</ul>';

    $.ajax({
      async : false,
      url : "/web/foreign/json/foreign_info.json",
      type : "get",
      dataType : "json",
      cache : false,
      success : function(data){
        for(var i=0; i < data.length; i++) {
          var n = data[i];
          if(n.us_pc !== ''){
            if(cnt2<5){
              str2 = str2 +
              '<li class="s1-list-info__item">'+
              '<div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--' +n.class+ '">'+n.label+'</span></div>' +
              '<div class="s1-list-info__content"><a href="'+n.urpc+'" onclick="s.lidTrack(\'v_us_txt_'+n.slid+'\');" data-ratid="v_us_txt_'+n.slid+'" data-ratevent="click" data-ratparam="all">'+n.title+'</a></div></li>';
              cnt2++;
            }
          }
        }
        str2 = tempHead + str2 + tempFoot;
        $("#data-json-info").append(str2);
      }
    });
  });
}

foreginInfo();


// 株価情報
$.ajax({
    url: "https://www.trkd-asia.com/rakutensecj/pagecontent?pid=101",
    type: "get",
    dataType: "jsonp",
    scriptCharset: "UTF-8",
    cache: false,
    timeout: 3000,
    complete: function() {}
});

$.ajax({
    url: "https://www.trkd-asia.com/rakutensecj/pagecontent?pid=103",
    type: "get",
    dataType: "jsonp",
    scriptCharset: "UTF-8",
    cache: false,
    timeout: 3000,
    complete: function() {}
});

function index(json) {
    var p = json.list;
    //dji
    $(".djirt1").html(p[7][2] + "　<span class=\"" + getColor(p[7][4]) + "\">" + p[7][4] + "</span>");
    $(".djitm1").text(p[7][3] + "　10分ディレイ");
    //SP500
    $(".gspcrt").text(p[11][2]);
    $(".gspccp").text(p[11][4]);
    $(".gspccp").addClass(getColor(p[11][4]));
    $(".gspctm").text(p[11][3]);
    //NASDAQ
    $(".ixicrt").text(p[8][2]);
    $(".ixiccp").text(p[8][4]);
    $(".ixiccp").addClass(getColor(p[8][4]));
    $(".ixictm").text(p[8][3]);
}

function forex(json) {
    var p = json.list;
    //USDJPY
    $(".usdrt").text(p[0][2]);
    $(".usdcp").text(p[0][5]);
    $(".usdcp").addClass(getColor(p[0][5]));
    $(".usdtm").text(p[0][4]);
}

function getColor(val) {
    if (val > 0) {
        return ("up-02");
    } else if (val < 0) {
        return ("down-02");
    }
    return ("");
}

// バナー
function createBanner(){
  var str2 = "";
  let arr2 = [];
  var tempHead2 = '<div class="s1-swiper swiper"><div class="swiper-wrapper">';
  var tempFoot2 = '</div></div><div class="swiper-pagination">';
  fetch("../us/json/banner_02.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < 5; i++){
      var n = data[i];
      arr2.push(n.pagination);
      // ?が含まれているか確認
      var lidParam = n.urpc.indexOf("?") > -1 ? "&l-id=" : "?l-id="; 
      str2 = str2 + '<div class="swiper-slide"><a href="'+n.urpc+lidParam+'ustop-full-banner_'+n.slid+'" data-ratid="ustop-full-banner__'+n.slid +'" data-ratevent="click" data-ratparam="all"'+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+'><img src="'+n.img+'876x220.png" width="876" height="220" alt="'+n.title+'"></a></div>'
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
createBanner();