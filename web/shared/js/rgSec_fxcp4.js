//console.log($);
//$.cookie("Rg_sec","ddd");
//console.log($.cookie("Rg_sec"));
//console.log(campaingCd);


if($.cookie("Rg_sec") === null){
    //rgSecが無い場合
    var html_str = "<a href=\"/web/account/\"><img src=\"/web/shared/images/button/btn-account-entry-01.png\" onmouseover=\"this.src='/web/shared/images/button/btn-account-entry-01_h.png'\" onmouseout=\"this.src='/web/shared/images/button/btn-account-entry-01.png'\" alt=\"\"></a>";
}else{
    //rgSecが有る場合
    var html_str = "<div class=\"lyt-image image-col1-full\"><p class=\"image\"> <a onclick=\"sharedLinkPage.jumpPage(sharedLinkPage.villageCampAppInput + '&amp;campaignCd=" + campaingCd + "' + getDisplayParam());return false;\" href=\"javascript:void(0);\"><img width=\"695\" height=\"72\" alt=\"ログイン&#12288;キャンペーンにエントリーはこちら\" src=\"/web/campaign/fxtrade/images/btn-campaign-entry.gif\"></a></p></div><div class=\"lyt-image image-col2\"><p class=\"image align-C\"><a href=\"/web/fx/rfx/login.html\"><img src=\"/web/shared/images/button/btn-login-fx-03.gif\" alt=\"楽天FXログイン\" border=\"0\" height=\"61\" width=\"320\"></a></p><p class=\"image align-C\"><a href=\"/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init\"><img src=\"/web/shared/images/button/btn-entry-fx-01_pt.gif\" alt=\"FX口座開設はこちら\" border=\"0\" height=\"61\" width=\"320\"></a></p></div><!-- /.lyt-image -->";
}
//HTMLコードを出力
$(".rgSec_output").html(html_str);
