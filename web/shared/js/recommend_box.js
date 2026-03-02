//jQuery(document).ready(function() {
//	//tab
//	$('ul.tab_list li').css('cursor', 'pointer');
//	$("div.tab_box li:first-child", this).addClass("selected");
//
//	$("div.tab_box:not(:first)", this).hide();
//
//	var cookie = $.cookie("utility-tab");
//	if(cookie != null) {
//		var tabIndex = 1;
//
//		$("ul.tab_list li").removeClass("selected");
//		$(".last-child").addClass("selected");
//		$("div.tab_box").hide();
//		$("div.tab_box:eq("+tabIndex+")").fadeIn();
//	}
//
//	$("ul.tab_list li", this).toggle(function() {
//		var tabIndex = $("ul.tab_list li").index(this);
//
//		$("ul.tab_list li").removeClass("selected");
//		$(this).addClass("selected");
//		$("div.tab_box").hide();
//		$("div.tab_box:eq("+tabIndex+")").fadeIn();
//
//		if(tabIndex==0) {
//			$.cookie("utility-tab","",{ expires: -1, path:"/"})
//		} else {
//			$.cookie("utility-tab","1",{ path:"/"});
//		}
//	},function() {
//		var tabIndex = $("ul.tab_list li").index(this);
//
//		$("ul.tab_list li").removeClass("selected");
//		$(this).addClass("selected");
//		$("div.tab_box").hide();
//		$("div.tab_box:eq("+tabIndex+")").fadeIn();
//
//		if(tabIndex==0) {
//			$.cookie("utility-tab","",{ expires: -1, path:"/"})
//		} else {
//			$.cookie("utility-tab","1",{ path:"/"});
//		}
//	});
//
//	// get ric code
//	var ric = "NONE";
//	if(location.search.length > 1){
//		// 株主優待以外
//		var ret     = new String(location.search);
//		var riccode = ret.split("=");
//		ric         = riccode[1];
//
//		var home    = new String(location.pathname);
//    } else if(location.pathname.length > 1){
//		// 株主優待
//		var ret     = new String(location.pathname);
//		var riccode = ret.split("hp_");
//		ric         = riccode[1].replace(/.html/,"");
//
//		var home    = riccode[0];
//    }
//
//   // get recommends
//    var url = "https://grp10.api.rp.rakuten.co.jp/geap/v1/grp/recommend_security_jpstock_view.json"
//          + "?sid=029-001"
//          + "&rt=rcmd"
//          + "&q=iid:" + ric
//          + "&rows=20"
//          + "&callback=?";
//
//	$.getJSON(url, "", function(data) {
//		// publish recommends
//		$.each(data, function(key,item) {
//            if(key == "status" && item != 0) {
//				$("#recommend-box-list").html("<p>リコメンド情報はありません。</p>");
//				return false;
//            } else if(key == "response") {
//				$.each(item, function(key, item) {
//					if(key == "docs") {
//						var txt = "";
//						$.each(item, function(i,doc) {
//							$.each(doc, function(j,val) {
//								if(j == "id")     id     = val;
//								if(j == "market") market = val;
//								if(j == "title")  title  = val;
//							});
//							if(id.indexOf('OS') > -1){
//							  id = id.replace(/OS/g, "T");
//							  market = "東証";
//							}
//							if(location.search.length > 1) {
//								// 株主優待以外
//								txt = txt + "<li><a href=\"" + home + "?ric=" + id + "\" ";
//							} else {
//								// 株主優待
//								txt = txt + "<li><a href=\"" + home + "hp_" + id + ".html\" ";
//							}
//							txt = txt + "onClick=\"mblogger(\'" + ric + "\',\'" + id + "\',\'" + i + "\')\;\" >";
//							txt = txt + title + "(" + market + ")" + "</a></li>";
//						});
//						if(txt.length == 0) txt = "<p>リコメンド情報はありません。</p>";
//						$("#recommend-box-list").html(txt);
//						return false;
//					}
//	            });
//            }
//       });
//	});
//});
//
//    function mblogger(cv0, cv1, cv2) {
//      $.ajax({
//        async: false,
//        type: "GET",
//        url: "https://rd.rakuten.co.jp/cv/",
//        data: {
//         i: '6.2995.0',
//         cv_type: 'sec_jpstock_reco',
//         cv_var0: cv0,
//         cv_var1: cv1,
//         cv_var2: cv2
//        },
//        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
//        cache: false
//      });
//      return false;
//    }
