/*!
s1-generate-info-list.js
ver1.0
お知らせ一覧を作成するJS
 */

//URLのパラメータ取得メソッド
function getQueryParam(key) {
	var urlParam = location.search.substring(1);
	if(urlParam) {
		var param = urlParam.split('&');
		var paramArray = [];
		for (i = 0; i < param.length; i++) {
			var paramItem = param[i].split('=');
			paramArray[paramItem[0]] = paramItem[1];
		}
	}
	return paramArray[key];
}

//canonical生成メソッド
function addCanonical(url) {
	var doc = document;
	var head = doc.getElementsByTagName('head')[0];
	var meta = doc.createElement('link');
	meta.setAttribute('rel', 'canonical');
	meta.setAttribute('href', url);
	head.appendChild(meta);
}

//お知らせリスト生成
(function($) {
	$.fn.generateInfo = function(options) {
		var o = $.extend({
			jsonPath: './json/info_2017.json', // JSONのパス
			targetClass: '.s1-list-info', // appendするクラス名
			pattern: 'archive', // 値をtopにすると20件取得、その他は全取得（archiveにしなくても全取得）
			channel: 'pc' // スマホの場合はsmtに
		}, options);

    $.ajax({
      async : false,
      url : o.jsonPath,
      type : "get",
      dataType : "json",
      cache : false,
      success : function(data) {
        var str = "";
        var j = 0;
				if(o.pattern === 'top') {
					var endList = 20;
				} else {
					var endList = data.docs.length;
				}
        for(var i=0; i<data.docs.length; i++) {
          var r = data.docs[i];
          str = str + "<li class=\"s1-list-info__item\">";
          str = str + "<div class=\"s1-list-info__content s1-list-info__content--time\">" + r.date + "</div>";
          str = str + "<div class=\"s1-list-info__content\">";
					if(o.channel === 'smt') {
						str = str + "<a href=\"" + r.url2 + "\" onclick=\"s.lidTrack('v_info_smt-top_list_txt_" + r.slid + "')\"";
					} else {
						str = str + "<a href=\"" + r.url1 + "\" onclick=\"s.lidTrack('v_info_vtop_list_txt_" + r.slid + "')\"";
					}
          str = str + targetCheck(r.target);
          str = str + ">" + r.title + "</a></div>";
          str = str + "</li>";
          j++;
					if(j == endList) break;
        }
        $(o.targetClass).append(str).parent().hide().fadeIn(300);
      },
      error: function() {}
    });

    function targetCheck(target) {
      if(target == "blank") {
        var strTarget = " target=\"_blank\"";
        return strTarget;
      }
    }
		return this;
	};
})(jQuery || jqBase);
