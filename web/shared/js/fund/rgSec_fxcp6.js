function getQuerystring(key, default_)
{
   if (default_==null) default_="";
   key = key.replace(/[¥[]/,"¥¥¥[").replace(/[¥]]/,"¥¥¥]");
   var regex = new RegExp("[¥¥?&]"+key+"=([^&#]*)");
   var qs = regex.exec(window.location.href);
   if(qs == null)
    return default_;
   else
    return qs[1];
}
(function($) {
  var cpID = $("#campaingID").text();
  var cookieOff = "<div class=\"account-title\">楽天FXをはじめるにはFX口座開設が必要です</div><div class=\"account-area\"><div class=\"account-flex\"><div class=\"account-box\"><p class=\"account-box__image fw-b\" style=\"color:#009e90;\">最短<span class=\"fc-r\">5</span>分で申込完了！</p><div class=\"s1-btn-account-sub02 s1-btn-general--normal\" style=\"position:relative;\"><a href=\"/web/fx/account/fxaccount.html\"><i class=\"s-glyph\"></i>&nbsp;FX専用口座開設</a><img style=\"position:absolute; top:-30px; left:-30px;\" src=\"/web/fx/images/balloon-01.png\" alt=\"かんたん！\"></div></div><div class=\"account-box\"><p class=\"account-box__image fw-b\" style=\"color:#F1534C;\">FX・株・投資信託などすべてのお取引が可能！</p><div class=\"s1-btn-account-open02 s1-btn-general--normal\"><a href=\"/web/account/\"><i class=\"s-glyph\"></i>&nbsp;総合口座開設</a></div></div></div><ul class=\"s1-list-link-a s1-list-link-a--inline\"><li class=\"s1-list-link-a__item\"><a href=\"/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&amp;type=account&amp;sub_type=&amp;local=acc_app_top&amp;eventType=init\">総合口座をお持ちの方はこちら（ログイン）</a></li><li class=\"s1-list-link-a__item\"><a href=\"/web/fx/dedicated-account/#faq\">FAQ</a></li></ul></div>";
  
    //rgSecが無い場合
    var html_str = cookieOff;
    //URLのパラメータからアルゴキーを取得する
    var akey = getQuerystring("algoKey");

    //FX専用口座申込のアフィリエイト先から遷移して総合口座FX同時申込へ進む場合、
    //FX申込完了画面にアフィリエイトタグを埋め込むためcookieに情報を格納しておく
    document.cookie = 'bname=AL_;path=../../';
    document.cookie = 'refferrerURL=[algoKey=' + akey + ', fxSameOpnFlg=1]';


  //HTMLコードを出力
  $(".rgSec_output").html(html_str);
  //CPコード自動付与
  $('.add_cpcode').each(function() {
    $(this).attr({
    'onclick':"sharedLinkPage.jumpPage(sharedLinkPage.villageCampAppInput + '\&campaignCd=" + cpID + "' + getDisplayParam());return false;"
    });
  });
})(window.jqBase || jQuery);




