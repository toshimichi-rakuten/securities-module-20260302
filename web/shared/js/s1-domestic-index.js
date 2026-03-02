jqBase(".s1-slick-slider--2").slick({
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  initialSlide: 1,
  centerMode: true,
  centerPadding: '9%'
});
var $copyrightVendor = jqBase(".s1-copyright-vendor");
var d = new Date();
$copyrightVendor.html("&copy;" + d.getFullYear() + " Thomson Reuters");

jqBase(window).on('load', function () {
  jqBase('.s1-lower-carousel__container').flexslider({
    animation: "slide",
    slideshowSpeed: "2500",
    animationSpeed: "600",
    controlsContainer: jqBase(".s1-lower-carousel__controls"),
    customDirectionNav: jqBase(".s1-lower-carousel__nav a")
  });
});

var _scroll = {
  delay: 1000,
  easing: 'linear',
  items: 1,
  duration: 0.03,
  timeoutDuration: 0,
  pauseOnHover: 'immediate'
};
jqBase('.domestic-ticker__list').carouFredSel({
  width: 1000,
  align: false,
  items: {
    width: 'variable',
    height: 20,
    visible: 1
  },
  scroll: _scroll
});

jqBase('.domestic-support-nav-cat__element').eq(0).click();

function fqa_ranking(json) {
  var str = "";

  for (var i in json.list) {
    str = str + "<li class=" + json.list[i][0] + ">" +
      "<a href=\"" + json.list[i][1] + "\" target=\"_blank\">" +
      json.list[i][2] +
      "</a></li>";
  }
  jqBase(".s1-list-number").html(str);

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
  jqBase.ajax({
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
  jqBase(".n225rt1").html(p[0][1] + "　<span class=\"" + p[0][3] + "\">" + p[0][2] + "</span>");
  jqBase(".n225tm1").text(p[0][5] + "　20分ディレイ");
  jqBase(".n225rt").text(p[0][1]);
  jqBase(".n225cp").text(p[0][2]);
  jqBase(".n225cp").addClass(p[0][3]);
  jqBase(".n225tm").text(p[0][5]);
  //topx
  jqBase(".topxrt1").html(p[1][1] + "　<span class=\"" + p[1][3] + "\">" + p[1][2] + "</span>");
  jqBase(".topxrt").text(p[1][1]);
  jqBase(".topxcp").text(p[1][2]);
  jqBase(".topxcp").addClass(p[1][3]);
  jqBase(".topxtm").text(p[1][5]);

  //dji
  jqBase(".djirt1").html(p[11][1] + "　<span class=\"" + p[11][3] + "\">" + p[11][2] + "</span>");
  jqBase(".djirt").text(p[11][1]);
  jqBase(".djicp").text(p[11][2]);
  jqBase(".djicp").addClass(p[11][3]);
  jqBase(".djitm").text(p[11][5]);

  //jnic1
  jqBase(".jnic1rt1").html(p[22][1] + "　<span class=\"" + p[22][3] + "\">" + p[22][2] + "</span>");
  jqBase(".jnic1tm").text(p[22][5]);

  //usd
  jqBase(".usdrt1").html(p[32][1] + "　<span class=\"" + p[32][3] + "\">" + p[32][2] + "</span>");
  jqBase(".usdtm").text(p[32][5]);

  //Ticker
  var tickerstr = "";
  tickerstr = tickerstr + "<dt>日経平均</dt><dd>" + p[0][1] + " <span class=\"" + p[0][3] + "\">" + p[0][2] + "</span></dd>";
  tickerstr = tickerstr + "<dt>TOPIX</dt><dd>" + p[1][1] + " <span class=\"" + p[1][3] + "\">" + p[1][2] + "</span></dd>";
  tickerstr = tickerstr + "<dt>日経平均先物</dt><dd>" + p[22][1] + " <span class=\"" + p[22][3] + "\">" + p[22][2] + "</span></dd>";
  tickerstr = tickerstr + "<dt>NYダウ</dt><dd>" + p[11][1] + " <span class=\"" + p[11][3] + "\">" + p[11][2] + "</span></dd>";
  tickerstr = tickerstr + "<dt>ドル/円</dt><dd>" + p[32][1] + " <span class=\"" + p[32][3] + "\">" + p[32][2] + "</span></dd>";
  jqBase(".domestic-ticker__list").html(tickerstr);

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
  jqBase(".increaseRanking").append(str);

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
  jqBase(".decreaseRanking").append(str);

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
  jqBase(".tradingRanking").append(str);

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
  jqBase(".performanceRanking").append(str);

  jqBase(".updatetime").text(json.market.date + "　" + json.market.time + "　20分ディレイ");
}

updateData();

function choice_domestic(json) {
  var str = "";
  jqBase.each(json.List, function (i, data) {
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

  jqBase("#REPLST").append(str);

}

function makeSID(prefix, date, link) {
  var sid = "";

  var dt = date.split("/");
  var at = link.split("/");

  sid = prefix + dt[0] + dt[1] + dt[2] + "_" + at[5];

  return sid;
}
jqBase.ajax({
  url: "https://media.rakuten-sec.net/list/feed/choice_domestic.js",
  type: "get",
  dataType: "jsonp",
  scriptCharset: "UTF-8",
  cache: false,
  timeout: 10000,
  complete: function (data) { }
});

jqBase.extend({
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
      jqBase.ajax({
        type: "GET",
        url: '/ITS/market-data/domestic-closing.csv',
        async: false,
        success: function (cdata) {
          var ccsv = jqBase.csv()(cdata);
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
      jqBase("#JP_SETTLEMENT").html(jstr);
    }
  }
  if (flg == 0) {
    jqBase("#SETTLEMENT_INFO").hide();
  }
}

function checkDisplayDate(fname, yyyymmdd) {
  var rcYYYYMMDD = "";
  jqBase.ajax({
    type: "GET",
    url: fname,
    async: false,
    success: function (data) {
      var csv = jqBase.csv()(data);
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
  jqBase.ajax({
    type: "GET",
    url: fname,
    async: false,
    success: function (data) {
      var csv = jqBase.csv()(data);
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
  jqBase.ajax({
    type: "GET",
    url: fname,
    async: false,
    success: function (data) {
      var csv = jqBase.csv()(data);
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
  jqBase(function () {
    str = ""
    jqBase.ajax({
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
        jqBase("#info-rsec-top").append(str);
        makeSettlementInfo();
      }
    });
  });
}

infolist();

function createBanner() {
  jqBase(function () {
    var sort_by = function (field, reverse, primer) {
      reverse = (reverse) ? -1 : 1;
      return function (a, b) {
        a = a[field];
        b = b[field];
        if (typeof (primer) != 'undefined') {
          a = primer(a);
          b = primer(b);
        }
        if (a < b) return reverse * -1;
        if (a > b) return reverse * 1;
        return 0;
      }
    }
    var str1 = ""
    var cnt1 = "0"
    var tempHead1 = '<ul class="s1-slick-slider s1-slick-slider--3 mb-double">';
    var tempFoot1 = '</ul>';

    jqBase.ajax({
      async: false,
      url: "/web/domestic/json/banner.json",
      type: "get",
      dataType: "json",
      cache: false,
      success: function (data) {
        //data.sort(sort_by('date', true, function(a){return a.toUpperCase()}));
        //data.sort(sort_by('priority', true, function(a){return a.toUpperCase()}));
        var t = jqBase('#timestamp').text()
        for (var i = 0; i < data.length; i++) {
          var n = data[i];
          if (n.domestic_pc !== "") {
            var flagTime = n.edate - t
            // 終了時刻-現在時刻が＋もしくは終了時刻が空
            if ((flagTime > 0) || (n.edate == '')) {
              str1 = str1 +
                '<li><a href="' + n.urpc + '" "target="' + n.blank + '" data-ratid="v_domestic_top_bnr_' + n.slid + '" data-ratevent="click" data-ratparam="all"><img decoding="async" src="' + n.img + '220x220.png" alt="' + n.title + '"></a></li>';
              cnt1++;
            }
          }
        }
        str1 = tempHead1 + str1 + tempFoot1;
        str1 = str1.replace(/target=\"〇\"/g, ' target=\"_blank\"')
        str1 = str1.replace(/target=\"×\"/g, '')
        //console.log(str1);
        jqBase("#data-json-banner").append(str1);
        jqBase(".s1-slick-slider--3").slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: '9%'
        });
      }
    });
  });
}
createBanner();