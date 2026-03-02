$(function() {

    // Search form sender
    $('#s3-form-search').submit(function(e){
        $(this).changeSearchResult(this.name);
        e.preventDefault();
    });

    // Add market data to HTML
    window.callback = function(data) {
        var nikkeiAve = (data.market.list[0])[1],
            nikkeiPrev = (data.market.list[0])[2],
            nikkeiUpDown = (data.market.list[0])[3],
            nikkeiDate = (data.market.list[0])[5],
            yenDollar = (data.market.list[25])[1],
            yenDollarPrev = (data.market.list[25])[2],
            yenDollarUpDown = (data.market.list[25])[3],
            nikkeiAveInt = (nikkeiAve.split('.'))[0],
            nikkeiAveDec = (nikkeiAve.split('.'))[1],
            yenDollarInt = (yenDollar.split('.'))[0],
            yenDollarDec = (yenDollar.split('.'))[1],
            $nikkeiNum = $('.s3-market-info .s3-market-info__list').find('li').eq(0),
            $yenDollarNum = $('.s3-market-info .s3-market-info__list').find('li').eq(1);
            $nikkeiNum.find('.s3-market-info__num').text(nikkeiAveInt);
            $nikkeiNum.find('.s3-market-info__num-sub').text('.'+nikkeiAveDec);
            $nikkeiNum.find('.s3-market-info__updown').addClass(nikkeiUpDown).text(nikkeiPrev+'円');
            $nikkeiNum.find('.s3-market-info__date').text('（'+nikkeiDate+'）');
            $yenDollarNum.find('.s3-market-info__num').text(yenDollarInt);
            $yenDollarNum.find('.s3-market-info__num-sub').text('.'+yenDollarDec);
            $yenDollarNum.find('.s3-market-info__updown').addClass(yenDollarUpDown).text(yenDollarPrev+'円');
    };

    // Add system info to HTML
    $.ajaxSetup({ cache: false });
    $.ajax({
        accepts: '*/*',
        type: 'GET',
        url: '/ITS/system_info_web.xml',
        dataType: 'xml'
    }).done(function(resp) {
        $('#system_info').empty().append((resp.documentElement.firstChild.nodeValue).replace(/system_info\//g, '/ITS/system_info/'));
    });

  // Get market data
  getJSONP("https://www.trkd-asia.com/rakutensec/f_index1.jsp");
  
  // IPOVTOP
  var sort_by = function(field, reverse, primer){
   reverse = (reverse) ? -1 : 1;
   return function(a,b){
       a = a[field];
       b = b[field];
       if (typeof(primer) != 'undefined'){
           a = primer(a);
           b = primer(b);
       }
       if(isNaN(a) == false){
         return reverse * (a - b); //数字の時のソート
       }else{
         //console.log(reverse)
         if (a<b) return reverse * -1;
         if (a>b) return reverse * 1;
         return 0;
       }
   }
}
var tempHead = '<table class="s3-tbl-ipo">'+
'<thead>'+
'<tr>'+
'<th>上場日</th>'+
'<th>銘柄コード</th>'+
'<th>銘柄名</th>'+
'<th>ブックビルディング期間</th>'+
'<th>仮条件</th>'+
'<th>公開価格</th>'+
'<th>購入申込期間</th>'+
'<th>抽選日</th>'+
'</tr>'+
'</thead>'+
'<tbody>';
var tempFoot = '</tbody></table>'
  fetch("/web/domestic/ipo/json/ipo_lead_json.json", {
	method: "get",
	cache: "no-store",
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      data.sort(sort_by('data4', false, function(a){return a.toUpperCase()}));
      data.sort(sort_by('data18', false, function(a){return a.toUpperCase()}));
      var src = data.map(function(n,i){
        if(n.status!='クローズ' && n.status!=''){
          return '<tr>'+
          '<td>'+n.data18+'</td>'+
          '<td>'+n.code+'</td>'+
          '<td><a data-ratId="v_visitor_top_ipo_'+n.code+'" data-ratEvent="click" data-ratParam="all" href="/web/domestic/ipo/'+n.code+n.sub+'.html">'+n.data1+'</a></td>'+
          '<td>'+n.data4+'～'+n.data6+'</td>'+
          '<td>'+n.data3+'</td>'+
          '<td>'+n.data10+'円</td>'+
          '<td>'+n.data11+'～'+n.data13+'</td>'+
          '<td>'+n.data17+'</td>'+
          '</tr>';
        }else{
          return '';
        }
      })
      .join('');
      if(src!=''){
        src = tempHead + src + tempFoot;
      }else{
        src = '<p>現在、新規公開株式はございません。</p>';
        //$('#IPOVTOP').addClass('is-hidden');
      }
      src = src.replace(/株式会社/g, '')
      src = src.replace(/(\d{4})\/(\d{2})\/(\d{2})/g, '$2/$3')
      $('#data-json-ipo-vtop').append(src);
    },
    function(data){
      $('#data-json-ipo-vtop').append('<p>データ処理に時間がかかっております。しばらくお時間をあけて再度表示させてください。</p>');
    }
  );
  var tempHead2 = '<div class="s1-emergency">';
  var tempFoot2 = '</div>'
  fetch("/web/shared/json/info/info_red.json", {
	method: "get",
	cache: "no-store",
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      var srcv = ""; //非会員
      var srcm = ""; //会員
      var lastkey = data.length;
      var regex = /(.*)\%\%\%(.+)\%\%\%(.*)/;
      
      for(let i in data){
        var detail = data[i].title.match(regex);
        const mainFunc = function(srcx){ //メインの分岐条件を関数化
          if(detail != null){
            return srcx + '・' + detail[1] + '<a' + (data[i].blank =="〇" ? ' target=\"_blank\"' : '' ) + ' href="'+data[i].urpc+'" onclick="s.lidTrack(\'pc_top_important_'+data[i].slid+'\')"><br>'+detail[2]+'</a>' + ( i != lastkey-1 ? '<br>' : '' )
          }else{
            return srcx + '<a' + (data[i].blank =="〇" ? ' target=\"_blank\"' : '' ) + ' href="'+data[i].urpc+'" onclick="s.lidTrack(\'pc_top_important_'+data[i].slid+'\')">・'+data[i].title+'</a>'+( i != lastkey-1 ? '<br>' : '' )
          } 
        }
        if(data[i].pcvtop != ""){
          srcv = mainFunc(srcv);
        }
        if(data[i].pcmtop != ""){
          srcm = mainFunc(srcm);
        }
      }
      if(srcv!=''){
        srcv = tempHead2 + srcv + tempFoot2;
      }else{
        srcv = '';
      }
      if(srcm!=''){
        srcm = tempHead2 + srcm + tempFoot2;
      }else{
        srcm = '';
      }
      //console.log(srcv);
      //console.log(lastkey);
      $("#data-json-red-v").replaceWith(srcv);
      $("#data-json-red-m").replaceWith(srcm);
  });
	var tempHead3 = '<ul class="s3-info-list">';
	var tempFoot3 = '</ul>'
	fetch("/web/shared/json/info/info_top.json", {
	method: "get",
	cache: "no-store",
	}).then(function (response) {
	  return response.json();
	}).then(function (data) {
	  var srcv = ""; //非会員
	  var srcm = ""; //会員
	  var lastkey = data.length;
	  //console.log(data);
	  for(let i in data){
		const mainFunc = function(srcx){ //メインの分岐条件を関数化
		  let flag = data[i].imp
		  return srcx + '<li>'+(flag =="〇" ? '<span class="s3-label-important">重要</span>' : '<span>'+data[i].date+'</span>' )+'<a'+(data[i].blank =="〇" ? ' target=\"_blank\"' : '' )+' href="'+data[i].urpc+'" data-ratid="pc_top_visitor_info__'+data[i].slid+'" data-ratevent="click" data-ratparam="all">'+data[i].title+'</a></li>'
		}
		if(data[i].pcvtop != ""){
		  srcv = mainFunc(srcv);
		}
		if(data[i].pcmtop != ""){
		  srcm = mainFunc(srcm);
		}
	  }
	  if(srcv!=''){
		srcv = srcv.replace(/【重要】/g,'');
		srcv = tempHead3 + srcv + tempFoot3;
	  }else{
		srcv = '';
	  }
	  if(srcm!=''){
		srcm = srcm.replace(/【重要】/g,'');
		srcm = tempHead3 + srcm + tempFoot3;
	  }else{
		srcm = '';
	  }
	  //console.log(srcv);
	  $("#data-json-info-v").replaceWith(srcv);
	  $("#data-json-info-m").replaceWith(srcm);
	});
});

//toushiru
getJSONP("https://media.rakuten-sec.net/list/feed/choice01v2.js", "choice01v2");
  
function choice01v2(data)
{
  var str = "";

  for(i=0; i<data.List.length; i++) {
       str = str + "<li class=\"s3-media-list__item\">";
       str = str + "<div class=\"s3-media-list__thumb\"><a href=\"" + data.List[i].Link + "\" onclick=\"s.lidTrack(\'" + makeSID("v_visitor_top_report_block_", data.List[i].Date, data.List[i].Link) + "\')\;this.href=usergram.link(this.href)\;\" target=\"_blank\"><img src=\"" + data.List[i].Image + "\" width=\"100\" height=\"67\" alt=\"\"></a></div>";
       str = str + "<div class=\"s3-media-list__txt\">";
       str = str + "<p>" + data.List[i].Date;
       if(data.List[i].Newflg == 1) {
         str = str + " <span class=\"s3-label-new\">NEW</span>";
       }
       str = str + "</p>";
       str = str + "<p><a href=\"" + data.List[i].Link + "\" onclick=\"s.lidTrack(\'" + makeSID("v_visitor_top_report_block_", data.List[i].Date, data.List[i].Link) + "\')\;this.href=usergram.link(this.href)\;\" target=\"_blank\">" + data.List[i].Title;
       if(data.List[i].Author) {
          str = str + "：" + data.List[i].Author;
       }
       str = str + "</a></p></div></li>";
  }
  document.getElementById("REPLST").innerHTML = str;

}

function makeSID(prefix, date, link)
{
 var sid = "";

 var dt = date.split("/");
 var at = link.split("/");

 sid = prefix + dt[0] + dt[1] + dt[2] + "_" + at[5];

 return sid;
}

//決算
jQuery.extend({
    csv: function(delim, quote, linedelim) {
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

        return function(text) {
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
    var jpflg = 0;

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
            var jstr = "【国内株式 " + wrk.substr(4, 2) + "/" + wrk.substr(6, 2) + " 発表予定】";

            fetch("/ITS/market-data/domestic-closing.csv", {
              method: "GET",
              cache: "no-store",
              headers: [["Content-Type", "text/csv"]]
            }).then(function (response) {
              return response.text();
            }).then(function (cdata) {
              var ccsv = jQuery.csv()(cdata);
            
              for (k = 0; k < ccsv.length; k++) {
                if (ccsv[k][0] == yyyymmdd) {
                  var mei = getMeigara('/web/market/calendar/SCH_SOURCE.csv', ccsv[k][0], ccsv[k][1].replace(/\r/g, ''));
            
                  if (mei) {
                    jstr = jstr + mei + "、";
                    jpflg = 1;
                  }
                }
              }
            });
            jstr = jstr.slice(0, -1) + "など" + jnum + "銘柄";
            if (jpflg) {
                jQuery("#JP_SETTLEMENT").html(jstr);
                jQuery("#SETTLEMENT_INFO").show();
            } else {
                jQuery("#JP_SETTLEMENT").parent().hide();
            }
        }
    } else {
      jQuery("#JP_SETTLEMENT").parent().hide();
    }

    //---- US Settlemnet Infomation ----
    var usflg = 0;

    var udt = new Date();
    if (udt.getHours() < 8) {
        udt.setTime(udt.getTime() - (86400 * 1000));
    }

    var yyyymmdd = udt.getFullYear() + rightString("0" + (udt.getMonth() + 1), 2) + rightString("0" + udt.getDate(), 2);

    yyyymmdd = checkDisplayDate('/ITS/market-data/us-closing.csv', yyyymmdd);
    if (yyyymmdd) {
        var unum = getSettlementNum('/web/market/calendar/F_NUMBER_SCH.csv', yyyymmdd, 2);
        if (unum > 0) {
            var wrk = new String(yyyymmdd);
            var ustr = "【米国株式 " + wrk.substr(4, 2) + "/" + wrk.substr(6, 2) + " 発表予定】";

            fetch("/ITS/market-data/us-closing.csv", {
              method: "GET",
              cache: "no-store",
              headers: [["Content-Type", "text/csv"]]
            }).then(function (response) {
              return response.text();
            }).then(function (cdata) {
              var ccsv = jQuery.csv()(cdata);
              for (var k = 0; k < ccsv.length; k++) {
                if (ccsv[k][0] == yyyymmdd) {
                  var mei = getMeigara('/web/market/calendar/F_SCH_SOURCE.csv', ccsv[k][0], ccsv[k][1].replace(/\r/g, ''));
                  if (mei) {
                    ustr = ustr + mei + "、";
                    usflg = 1;
                }
              }
              }
            });
            ustr = ustr.slice(0, -1) + "など"; // + unum + "銘柄";
            if (usflg) {
                jQuery("#US_SETTLEMENT").html(ustr);
                jQuery("#SETTLEMENT_INFO").show();
              
            } else {
                jQuery("#US_SETTLEMENT").parent().hide();
            }
        }
    } else {
      jQuery("#US_SETTLEMENT").parent().hide();
    }
    if (jpflg == 0 && usflg == 0) {
        //jQuery("#SETTLEMENT_INFO").hide();
    }
}

function checkDisplayDate(fname, yyyymmdd) {
  var rcYYYYMMDD = "";
fetch(fname, {
  method: "GET",
  cache: "no-store",
  headers: [["Content-Type", "text/csv"]]
}).then(function (response) {
  return response.text();
}).then(function (data) {
  var csv = jQuery.csv()(data);
  for (i = 0; i < csv.length; i++) {
    if (csv[i][0] >= yyyymmdd) {
      rcYYYYMMDD = csv[i][0];
      break;
    }
  }
});
return rcYYYYMMDD;
}

function getSettlementNum(fname, yyyymmdd, pos) {
  var rc = 0;
fetch(fname, {
  method: "GET",
  cache: "no-store",
  headers: [["Content-Type", "text/csv"]]
}).then(function (response) {
  return response.text();
}).then(function (data) {
          var csv = jQuery.csv()(data);
          for (var i = 1; i < csv.length; i++) {
              if (csv[i][0] == yyyymmdd) {
                  rc = csv[i][pos];
                  break;
    }
  }
});
  return rc;
}


function getMeigara(fname, yyyymmdd, code) {
  var rc = 0;
fetch(fname, {
  method: "GET",
  cache: "no-store",
  headers: [["Content-Type", "text/csv"]]
}).then(function (response) {
  return response.text();
}).then(function (data) {
          var csv = jQuery.csv()(data);
          for (var i = 1; i < csv.length; i++) {
              if (csv[i][2] == yyyymmdd && csv[i][0] == code) {
                  rc = csv[i][1] + "(" + csv[i][0] + ")";
                  break;
    }
  }
});
  return rc;
}

function rightString(str, len) {
    return str.substr(str.length - len, len);
}

makeSettlementInfo();

//NISA口座開設ボタンだし分け
var rg = getCookieNisa("Rg_sec");

    if (rg == null) {
        jQuery("#UADEACC").remove();
    } else {
        var flg = parseInt(rg.substr(788, 2));
        switch (flg) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                jQuery("#NISAACC").remove();
                break;
        }
    }

    function getCookieNisa(name) {
        var result = null;

        var cookieName = name + '=';
        var allcookies = document.cookie;

        var position = allcookies.indexOf(cookieName);
        if (position != -1) {
            var startIndex = position + cookieName.length;
            var endIndex = allcookies.indexOf(';', startIndex);
            if (endIndex == -1) {
                endIndex = allcookies.length;
            }
            result = decodeURIComponent(allcookies.substring(startIndex, endIndex));
        }
        return result;
    }

//頭のSPへ誘導バナー
function Device() {
	this.tagId = '.rc-h-standard';
	this.type = (function() {
		if(navigator.userAgent.match(/iPhone/)) {
			return 'iphone';
		} else if(navigator.userAgent.match(/iPod/)){
			return 'ipod';
		} else if(navigator.userAgent.match(/iPad/)){
			return 'ipad';
		} else if(navigator.userAgent.match(/Android/) && !navigator.userAgent.match("Android 3")){
			return 'android';
		} else {
			return false;
		}
	})();
}

function showLink(device) {
	if(device.type) {
		linkField = jQuery(device.tagId);
		if(device.type != 'ipad'){
			linkField.prepend('<div style="text-align:center;"><nobr><a href="http://ispeed.jp/smartphone/?l-id=vtop_smartphone_ispeed_' + device.type + '"><img src="/web/images/banners/ispeed_ip_an/470x120.jpg" border="0"></a><a href="https://www.rakuten-sec.co.jp/smartphone/?l-id=vtop_smartphone_' + device.type + '"><img src="/web/images/index-btn-iphone-02.gif" border="0"></a></nobr></div>');
		}else{
			linkField.prepend('<div style="text-align:center;"><nobr><a href="http://ispeed.jp/ipad/?l-id=vtop_smartphone_ispeed_' + device.type + '"><img src="/web/images/banners/ispeed_ip_an/470x120.jpg" border="0"></a><a href="https://www.rakuten-sec.co.jp/smartphone/?l-id=vtop_smartphone_' + device.type + '"><img src="/web/images/index-btn-iphone-02.gif" border="0"></a></nobr></div>');
		}
	}
}

function sMain(){
	device = new Device();
	showLink(device);
}

sMain();

// パスワードの表示・非表示切替
$('.s3-passwd-form__toggle').on('click',function () {
  // アイコンの切り替え
  $(this).toggleClass('is-active');
  // 入力フォームの取得
  var input = $('#form-login-pass');
  // type切替
  if (input.attr('type') == 'password') {
    input.attr({
      type:'text'
    });
  } else {
    input.attr({
      type:'password'
    });
  }
});

