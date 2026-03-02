//console.log($);
//$.cookie("Rg_sec","ddd");
//console.log($.cookie("Rg_sec"));
//console.log(campaingCd);


if($.cookie("Rg_sec") === null){
    //rgSecが無い場合
    var html_str = "<div class=\"account-title\">CFDをはじめるにはFX口座開設が必要です</div><div class=\"account-area\"><div class=\"account-flex\"><div class=\"account-box\"><p class=\"account-box__image\"><img src=\"/web/fx/account/images/txt-account-fx-03.png\" alt=\"FXの取引をメインでされたい方におすすめ！\"></p><p class=\"account-box__image\"><a href=\"/web/fx/account/fxaccount.html\"><img src=\"/web/fx/account/images/btn-account-fx-01.png\" alt=\"FX専用口座開設\"></a></p></div><div class=\"account-box\"><p class=\"account-box__image\"><img src=\"/web/fx/account/images/txt-account-03.png\" alt=\"FX・株・投資信託などすべてのお取引が可能！\"></p><p class=\"account-box__image\"><a href=\"/web/account/\"><img src=\"/web/fx/account/images/btn-account-01.png\" alt=\"総合口座開設\"></a></p></div></div>    <ul class=\"list-link-01 list-col3\" style=\"margin-bottom: 0;\"><li style=\"width: auto;\"><a href=\"/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&amp;type=account&amp;sub_type=&amp;local=acc_app_top&amp;eventType=init\">総合口座をお持ちの方はこちら（ログイン）</a></li><li style=\"width: auto;\"><a href=\"/web/fx/dedicated-account/#faq\">FAQ</a></li></ul></div>";
}else{
    //rgSecが有る場合
    var html_str = "<div class=\"lyt-image image-col1-full\"><p class=\"image\"> <a onclick=\"sharedLinkPage.jumpPage(sharedLinkPage.villageCampAppInput + '&amp;campaignCd=" + campaingCd + "' + getDisplayParam());return false;\" href=\"javascript:void(0);\"><img width=\"695\" height=\"72\" alt=\"ログイン&#12288;キャンペーンにエントリーはこちら\" src=\"/web/campaign/fxtrade/images/btn-campaign-entry.gif\"></a></p><p class=\"image align-C\"><a href=\"/web/cfd/startup/\"><img src=\"/web/shared/images/button/btn-entry-cfd-01_pt.png\" alt=\"CFD口座開設はこちら\" border=\"0\" height=\"61\" width=\"320\"></a></p></div><!-- /.lyt-image -->";
}
//HTMLコードを出力
$(".rgSec_output").html(html_str);
