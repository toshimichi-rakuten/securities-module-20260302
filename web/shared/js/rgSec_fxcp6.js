(function($) {
  var cpID = $("#campaingID").text();
  var cookieOff = "<div class=\"account-title\">楽天FXをはじめるにはFX口座開設が必要です</div><div class=\"account-area\"><div class=\"account-flex\"><div class=\"account-box\"><p class=\"account-box__image fw-b\" style=\"color:#009e90;\">FXの取引をメインでされたい方におすすめ！</p><div class=\"s1-btn-account-sub02 s1-btn-general--normal\"><a href=\"/web/account/fxaccount.html\"><i class=\"s-glyph\"></i>&nbsp;FX専用口座開設</a></div></div><div class=\"account-box\"><p class=\"account-box__image fw-b\" style=\"color:#F1534C;\">FX・株・投資信託などすべてのお取引が可能！</p><div class=\"s1-btn-account-open02 s1-btn-general--normal\"><a href=\"/web/account/\"><i class=\"s-glyph\"></i>&nbsp;総合口座開設</a></div></div></div><ul class=\"s1-list-link-a s1-list-link-a--inline\"><li class=\"s1-list-link-a__item\"><a href=\"/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&amp;type=account&amp;sub_type=&amp;local=acc_app_top&amp;eventType=init\">総合口座をお持ちの方はこちら（ログイン）</a></li><li class=\"s1-list-link-a__item\"><a href=\"/web/fx/dedicated-account/#faq\">FAQ</a></li></ul></div>";
  var cookieOn = "<div class=\"cp_start cp_end dp-n mb-double\"><p class=\"fc-r ta-c\">本キャンペーンの特典を受け取るには期間内にエントリーが必要です。</p><div class=\"s1-btn-cp-entry s1-btn-general--wide\"><a href=\"javascript:void(0);\" onclick=\"sharedLinkPage.jumpPage(sharedLinkPage.villageCampAppInput + '&amp;campaignCd=" + cpID + "' + getDisplayParam());return false;\">キャンペーンのエントリーはこちら</a></div></div><div class=\"account-title\">FXのお取引はこちら</div><div class=\"account-area\"><div class=\"account-flex mb-0\"><div class=\"account-box\"><p class=\"account-box__image fw-b\" style=\"color:#0069c7;\">楽天FX口座開設済みの方はこちら</p><div class=\"s1-btn-general01 s1-btn-general--normal\"><a href=\"/web/fx/login.html\">楽天FXログイン</a></div></div><div class=\"account-box\"><p class=\"account-box__image fw-b\" style=\"color:#009e90;\">FX口座未開設の方はこちら</p><div class=\"s1-btn-account-sub02 s1-btn-general--normal\"><a href=\"/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&amp;type=account&amp;sub_type=&amp;local=acc_app_top&amp;eventType=init\"><i class=\"s-glyph\"></i>&nbsp;FX専用口座開設</a></div></div></div></div>";
  //console.log($.cookie("Rg_sec"));
  if($.cookie("Rg_sec") === null){
    //rgSecが無い場合
    var html_str = cookieOff
  }else{
    //rgSecが有る場合
    var html_str = cookieOn
  }
  //HTMLコードを出力
  $(".rgSec_output").html(html_str);
  //CPコード自動付与
  $('.add_cpcode').each(function() {
    $(this).attr({
    'onclick':"sharedLinkPage.jumpPage(sharedLinkPage.villageCampAppInput + '\&campaignCd=" + cpID + "' + getDisplayParam());return false;"
    });
  });
})(window.jqBase || jQuery);