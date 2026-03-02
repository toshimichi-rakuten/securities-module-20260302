var $copyrightVendor = $(".s1-copyright-vendor");
var d = new Date();
$copyrightVendor.html("&copy;" + d.getFullYear() + " Thomson Reuters");

// var _scroll = {
//   delay: 1000,
//   easing: 'linear',
//   items: 1,
//   duration: 0.03,
//   timeoutDuration: 0,
//   pauseOnHover: 'immediate'
// };
// $('.domestic-ticker__list').carouFredSel({
//   width: 1000,
//   align: false,
//   items: {
//     width: 'variable',
//     height: 20,
//     visible: 1
//   },
//   scroll: _scroll
// });

function fqa_ranking(json) {
  var str = "";

  for (var i in json.list) {
    str = str + "<li class=" + json.list[i][0] + ">" +
      "<a href=\"" + json.list[i][1] + "\" target=\"_blank\">" +
      json.list[i][2] +
      "</a></li>";
  }
  $(".s1-list-number").html(str);

  var ckey = "faq" + fqa_getCategory();
  // 有効期限の作成
  var now = new Date().getTime();
  var ctm = new Date(now + (60 * 60 * 24 * 1000 * 1));
  var expires = ctm.toGMTString();
  document.cookie = ckey + "=" + escape(str) + "\; expires=" + expires;
}

function fqa_getCategory() {
  var obj = [{
    "key": "domestic",
    "category": 26
  },
  {
    "key": "foreign",
    "category": 44
  },
  {
    "key": "bond",
    "category": 66
  },
  {
    "key": "stock",
    "category": 27
  },
  {
    "key": "margin",
    "category": 35
  },
  {
    "key": "us",
    "category": 45
  },
  {
    "key": "china",
    "category": 52
  },
  {
    "key": "asean",
    "category": 59
  },
  {
    "key": "jbond",
    "category": 67
  },
  {
    "key": "foreignbond",
    "category": 73
  },
  {
    "key": "fund",
    "category": 79
  },
  {
    "key": "fop",
    "category": 100
  },
  {
    "key": "foreign_futures",
    "category": 107
  },
  {
    "key": "web/fx",
    "category": 501
  },
  {
    "key": "web/fx/rfx",
    "category": 115
  },
  {
    "key": "forex_settlement",
    "category": 123
  },
  {
    "key": "gold",
    "category": 129
  },
  {
    "key": "cfd",
    "category": 136
  },
  {
    "key": "covered_warrant",
    "category": 143
  },
  {
    "key": "nisa",
    "category": 512
  }
  ];

  var _url = new String(document.location);
  var _category = 0;

  for (var i in obj) {
    if (_url.indexOf(obj[i].key) != -1) {
      _category = obj[i].category;
    }
  }

  return (_category);
}

function getCookie(key) {
  // Cookieから値を取得する
  var cookieString = document.cookie;

  // 要素ごとに ";" で区切られているので、";" で切り出しを行う
  var cookieKeyArray = cookieString.split(";");

  // 要素分ループを行う
  for (var i = 0; i < cookieKeyArray.length; i++) {
    var targetCookie = cookieKeyArray[i];

    // 前後のスペースをカットする
    targetCookie = targetCookie.replace(/^\s+|\s+$/g, "");

    var valueIndex = targetCookie.indexOf("=");
    if (targetCookie.substring(0, valueIndex) == key) {
      // キーが引数と一致した場合、値を返す
      return unescape(targetCookie.slice(valueIndex + 1));
    }
  }

  return null;

}

function updateData() {
  $.ajax({
    url: "https://www.trkd-asia.com/rakutensec/f_index1.jsp",
    type: "get",
    dataType: "jsonp",
    scriptCharset: "UTF-8",
    cache: false,
    timeout: 3000,
    complete: function () { }
  });
}

function callback(json) {
  var p = json.market.list;

  //n225
  $(".n225rt1").html(p[0][1] + "　<span class=\"" + p[0][3] + "\">" + p[0][2] + "</span>");
  $(".n225tm1").text(p[0][5] + "　15分ディレイ");
  $(".n225rt").text(p[0][1]);
  $(".n225cp").text(p[0][2]);
  $(".n225cp").addClass(p[0][3]);
  $(".n225tm").text(p[0][5]);
  //topx
  $(".topxrt1").html(p[1][1] + "　<span class=\"" + p[1][3] + "\">" + p[1][2] + "</span>");
  $(".topxrt").text(p[1][1]);
  $(".topxcp").text(p[1][2]);
  $(".topxcp").addClass(p[1][3]);
  $(".topxtm").text(p[1][5]);

  //dji
  $(".djirt1").html(p[11][1] + "　<span class=\"" + p[11][3] + "\">" + p[11][2] + "</span>");
  $(".djirt").text(p[11][1]);
  $(".djicp").text(p[11][2]);
  $(".djicp").addClass(p[11][3]);
  $(".djitm").text(p[11][5]);

  //jnic1
  $(".jnic1rt1").html(p[22][1] + "　<span class=\"" + p[22][3] + "\">" + p[22][2] + "</span>");
  $(".jnic1tm").text(p[22][5]);

  //usd
  $(".usdrt1").html(p[32][1] + "　<span class=\"" + p[32][3] + "\">" + p[32][2] + "</span>");
  $(".usdtm").text(p[32][5]);

  //Ticker
  var tickerstr = "";
  tickerstr = tickerstr + "<dt>日経平均</dt><dd>" + p[0][1] + " <span class=\"" + p[0][3] + "\">" + p[0][2] + "</span></dd>";
  tickerstr = tickerstr + "<dt>TOPIX</dt><dd>" + p[1][1] + " <span class=\"" + p[1][3] + "\">" + p[1][2] + "</span></dd>";
  tickerstr = tickerstr + "<dt>日経平均先物</dt><dd>" + p[22][1] + " <span class=\"" + p[22][3] + "\">" + p[22][2] + "</span></dd>";
  tickerstr = tickerstr + "<dt>NYダウ</dt><dd>" + p[11][1] + " <span class=\"" + p[11][3] + "\">" + p[11][2] + "</span></dd>";
  tickerstr = tickerstr + "<dt>ドル/円</dt><dd>" + p[32][1] + " <span class=\"" + p[32][3] + "\">" + p[32][2] + "</span></dd>";
  $(".domestic-ticker__list").html(tickerstr);

  // 値上がり
  var p = json.increaseRanking;
  var str = "<tbody>";
  for (var i = 0; i < 5; i++) {
    str = str + "<tr>";
    str = str + "<td>" + (i + 1) + "</td>";
    str = str + "<td><a href=\"https://www.rakuten-sec.co.jp/web/market/search/quote.html?ric=" + p[i][5] + "\">" + p[i][1] + "</a></td>";
    str = str + "<td>" + p[i][2] + "</td>";
    str = str + "<td><span class=\"up-02\">" + p[i][3] + "</span></td>";
    str = str + "</tr>";
  }
  str = str + "</tbody>";
  $(".increaseRanking").append(str);

  // 値下がり
  var p = json.decreaseRanking;
  var str = "<tbody>";
  for (var i = 0; i < 5; i++) {
    str = str + "<tbody><tr>";
    str = str + "<td>" + (i + 1) + "</td>";
    str = str + "<td><a href=\"https://www.rakuten-sec.co.jp/web/market/search/quote.html?ric=" + p[i][5] + "\">" + p[i][1] + "</a></td>";
    str = str + "<td>" + p[i][2] + "</td>";
    str = str + "<td><span class=\"down-02\">" + p[i][3] + "</span></td>";
    str = str + "</tr>";
  }
  str = str + "</tbody>";
  $(".decreaseRanking").append(str);

  // 売買代金
  var p = json.tradingRanking;
  var str = "<tbody>";
  for (var i = 0; i < 5; i++) {
    str = str + "<tr>";
    str = str + "<td>" + (i + 1) + "</td>";
    str = str + "<td><a href=\"https://www.rakuten-sec.co.jp/web/market/search/quote.html?ric=" + p[i][4] + "\">" + p[i][1] + "</a></td>";
    str = str + "<td>" + p[i][2] + "</td>";
    str = str + "<td>" + p[i][3] + "</td>";
    str = str + "</tr>";
  }
  str = str + "</tbody>";
  $(".tradingRanking").append(str);

  // 出来高
  var p = json.performanceRanking;
  var str = "<tbody>";
  for (var i = 0; i < 5; i++) {
    str = str + "<tr>";
    str = str + "<td>" + (i + 1) + "</td>";
    str = str + "<td><a href=\"https://www.rakuten-sec.co.jp/web/market/search/quote.html?ric=" + p[i][4] + "\">" + p[i][1] + "</a></td>";
    str = str + "<td>" + p[i][2] + "</td>";
    str = str + "<td>" + p[i][3] + "</td>";
    str = str + "</tr>";
  }
  str = str + "</tbody>";
  $(".performanceRanking").append(str);

  $(".updatetime").text(json.market.date + "　" + json.market.time + "　15分ディレイ");
}

updateData();

function choice_domestic(json) {
  var str = "";
  $.each(json.List, function (i, data) {
    str = str + "<div class=\"s1-grid__cell--thin-1-3\">";
    str = str + "<div class=\"s1-box-media s1-box-media--left\">";
    str = str + "<p><a href=\"" + data.Link + "\" onclick=\"s.lidTrack(\'" + makeSID("v_domestic_top_report_img_", data.Date, data.Link) + "\')\;\" target=\"_blank\"><img decoding=\"async\" src=\"" + data.Image + "\" alt=\"\" width=\"90\"></a></p>";
    str = str + "</div>";
    str = str + "<div class=\"s1-box-section\">";
    str = str + "<p><span class=\"s1-label bg-securities\">" + data.Date + "更新</span></p>";
    str = str + "<p><a href=\"" + data.Link + "\" onclick=\"s.lidTrack(\'" + makeSID("v_domestic_top_report_txt_", data.Date, data.Link) + "\');\" class=\"fw-b\" target=\"_blank\">" + data.Title + "</a></p>";
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
  url: "https://media.rakuten-sec.net/list/feed/choice_domestic.js",
  type: "get",
  dataType: "jsonp",
  scriptCharset: "UTF-8",
  cache: false,
  timeout: 10000,
  complete: function (data) { }
});

$.extend({
  csv: function (delim, quote, linedelim) {
    delim = typeof delim == "string" ? new RegExp("[" + (delim || ",") + "]") : typeof delim == "undefined" ? "," : delim;
    quote = typeof quote == "string" ? new RegExp("^[" + (quote || '"') + "]") : typeof quote == "undefined" ? '"' : quote;
    lined = typeof lined == "string" ? new RegExp("[" + (lined || "\n") + "]+") : typeof lined == "undefined" ? "\n" : lined;

    function splitline(v) {
      var arr = v.split(delim),
        out = [],
        q;
      for (var i = 0, l = arr.length; i < l; i++) {
        if (q = arr[i].match(quote)) {
          for (j = i; j < l; j++) {
            if (arr[j].charAt(arr[j].length - 1) == q[0]) {
              break;
            }
          }
          var s = arr.slice(i, j + 1).join(delim);
          out.push(s.substr(1, s.length - 2));
          i = j;
        } else {
          out.push(arr[i]);
        }
      }
      return out;
    }

    return function (text) {
      var lines = text.split(lined);
      for (var i = 0, l = lines.length; i < l; i++) {
        lines[i] = splitline(lines[i]);
      }
      return lines;
    };
  }
});

function makeSettlementInfo() {
  //---- JP Settlemnet Infomation ----
  var flg = 0;

  var jdt = new Date();
  if (jdt.getHours() > 15) {
    jdt.setTime(jdt.getTime() + (86400 * 1000));
  }

  var yyyymmdd = jdt.getFullYear() + rightString("0" + (jdt.getMonth() + 1), 2) + rightString("0" + jdt.getDate(), 2);

  yyyymmdd = checkDisplayDate('/ITS/market-data/domestic-closing.csv', yyyymmdd);
  if (yyyymmdd) {
    var jnum = getSettlementNum('/web/market/calendar/NUMBER_SCH.csv', yyyymmdd, 1);
    if (jnum > 0) {
      var wrk = new String(yyyymmdd);
      var jstr = "【" + wrk.substr(4, 2) + "/" + wrk.substr(6, 2) + " 発表予定】";
      $.ajax({
        type: "GET",
        url: '/ITS/market-data/domestic-closing.csv',
        async: false,
        success: function (cdata) {
          var ccsv = $.csv()(cdata);
          for (k = 0; k < ccsv.length; k++) {
            if (ccsv[k][0] == yyyymmdd) {
              var mei = getMeigara('/web/market/calendar/SCH_SOURCE.csv', ccsv[k][0], ccsv[k][1].replace(/\r/g, ''));
              if (mei) {
                jstr = jstr + mei + "、";
                flg = 1;
              }
            }
          }
        }
      });
      jstr = jstr.slice(0, -1) + "など" + jnum + "銘柄";
      $("#JP_SETTLEMENT").html(jstr);
    }
  }
  if (flg == 0) {
    $("#SETTLEMENT_INFO").hide();
  }
}

function checkDisplayDate(fname, yyyymmdd) {
  var rcYYYYMMDD = "";
  $.ajax({
    type: "GET",
    url: fname,
    async: false,
    success: function (data) {
      var csv = $.csv()(data);
      for (i = 0; i < csv.length; i++) {
        if (csv[i][0] >= yyyymmdd) {
          rcYYYYMMDD = csv[i][0];
          break;
        }
      }
    }
  });
  return rcYYYYMMDD;
}

function getSettlementNum(fname, yyyymmdd, pos) {
  var rc = 0;
  $.ajax({
    type: "GET",
    url: fname,
    async: false,
    success: function (data) {
      var csv = $.csv()(data);
      for (i = 1; i < csv.length; i++) {
        if (csv[i][0] == yyyymmdd) {
          rc = csv[i][pos];
          break;
        }
      }
    }
  });
  return rc;
}

function getMeigara(fname, yyyymmdd, code) {
  var rc = "";
  $.ajax({
    type: "GET",
    url: fname,
    async: false,
    success: function (data) {
      var csv = $.csv()(data);
      for (i = 1; i < csv.length; i++) {
        if (csv[i][2] == yyyymmdd && csv[i][0] == code) {
          rc = csv[i][1] + "(" + csv[i][0] + ")";
          break;
        }
      }
    }
  });
  return rc;
}

function rightString(str, len) {
  return str.substr(str.length - len, len);
}

function infolist() {
  $(function () {
    str = ""
    $.ajax({
      async: false,
      url: "/web/domestic/infolist.json",
      type: "get",
      dataType: "json",
      cache: false,
      success: function (data) {
        for (var i = 0; i < data.num; i++) {
          var r = data.docs[i];
          if (r.Channel.indexOf("v") > -1) {
            if (r.Category == "f") {
              str = str + "<li id=\"SETTLEMENT_INFO\"  class=\"s1-list-info__item\"><div class=\"s1-list-info__content s1-list-info__content--label\"><span class=\"s1-label--closing\">決算</span></div>";
              str = str + "<div class=\"s1-list-info__content\"><a id=\"JP_SETTLEMENT\" href=\"" + r.Url + "\" data-ratid=\"v_domestic_top_info_" + r.slid + "\" data-ratevent=\"click\" data-ratparam=\"all\"></a></div></li>";
            } else {
              str = str + "<li class=\"s1-list-info__item\">";
              if (r.Category == "t") {
                str = str + "<div class=\"s1-list-info__content s1-list-info__content--label\"><span class=\"s1-label--news\">お取引</span></div>";
              } else if (r.Category == "s") {
                str = str + "<div class=\"s1-list-info__content s1-list-info__content--label\"><span class=\"s1-label--service\">サービス</span></div>";
              } else if (r.Category == "c") {
                str = str + "<div class=\"s1-list-info__content s1-list-info__content--label\"><span class=\"s1-label--cp\">キャンペーン</span></div>";
              } else if (r.Category == "i") {
                str = str + "<div class=\"s1-list-info__content s1-list-info__content--label\"><span class=\"s1-label--news\">お知らせ</span></div>";
              } else if (r.Category == "S") {
                str = str + "<div class=\"s1-list-info__content s1-list-info__content--label\"><span class=\"s1-label--seminar\">セミナー</span></div>";
              } else if (r.Category == "I") {
                str = str + "<div class=\"s1-list-info__content s1-list-info__content--label\"><span class=\"s1-label--important\">重要</span></div>";
              } else if (r.Category == "p") {
                str = str + "<div class=\"s1-list-info__content s1-list-info__content--label\"><span class=\"s1-label--sp\">特集</span></div>";
              }
              str = str + "<div class=\"s1-list-info__content\"><a href=\"" + r.Url + "\" data-ratid=\"v_domestic_top_info_" + r.slid + "\" data-ratevent=\"click\" data-ratparam=\"all\">" + r.Title + "</a></div>";
              str = str + "</li>";
            }
          }
        }
        str = str + ""
        $("#info-rsec-top").append(str);
        makeSettlementInfo();
      }
    });
  });
}

function createBanner(){
  var str2 = "";
  let arr2 = [];
  var tempHead2 = '<div class="s1-swiper swiper"><div class="swiper-wrapper">';
  var tempFoot2 = '</div></div><div class="swiper-pagination">';
  fetch("../domestic/json/banner_02.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < 5; i++){
      var n = data[i];
      // ?が含まれているか確認
      var lidParam = n.urpc.indexOf("?") > -1 ? "&l-id=" : "?l-id=";
      arr2.push(n.pagination); 
      str2 = str2 + '<div class="swiper-slide"><a href="'+n.urpc+lidParam+'domestictop-full-banner_'+n.slid+'" data-ratid="domestictop-full-banner__'+n.slid +'" data-ratevent="click" data-ratparam="all"'+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+'><img src="'+n.img+'876x220.png" width="876" height="220" alt="'+n.title+'"></a></div>'
    }
    str2 = tempHead2 + str2 + tempFoot2;
    //console.log(str2);
    $("#data-json-banner").replaceWith(str2);

    const swiper = new Swiper(".s1-swiper", {
      slidesPerView: 1/* この行を追加 */,
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

function getCurrentYYYYMMDDHHMM() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1する
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');

  return `${year}${month}${day}${hour}${minute}`;
}

infolist();
createBanner();