//console.log($);
//$.cookie("Rg_sec","ddd");
//console.log($.cookie("Rg_sec"));
//console.log(campaingCd);


if($.cookie("Rg_sec") === null){
    //rgSecが無い場合
    var html_str = "<div style=\"margin:0 0 15px;text-align:center; position: relative;\"><p style=\"margin:0 0 5px;text-align:center;\"><img src=\"/web/shared/images/button/btn-entry-15-bg.gif\" alt=\"\" border=\"0\" /></p><p style=\"margin:0;padding:0; position: absolute; top: 14px; left: 145px;\"><a href=\"/web/account/rakuten.html\" onclick=\"s.lidTrack('fx_debut_campaign_account_rakuten'), mboxTrack('fx_debut_campaign_account_rakuten','URL='+this.href)\"><img src=\"/web/shared/images/button/btn-entry-15-btn01.gif\" alt=\"楽天IDでかんたん口座開設\" border=\"0\" onMouseOver=\"this.src='/web/shared/images/button/btn-entry-15-btn01-h.gif';\" onMouseOut=\"this.src='/web/shared/images/button/btn-entry-15-btn01.gif';\" /></a></p><p style=\"margin:0;padding:0; position: absolute; top: 14px; left: 525px;\"><a href=\"/web/account/\" onclick=\"s.lidTrack('fx_debut_campaign_account'), mboxTrack('fx_debut_campaign_account','URL='+this.href)\"><img src=\"/web/shared/images/button/btn-entry-15-btn02.gif\" alt=\"口座開設\" border=\"0\" onMouseOver=\"this.src='/web/shared/images/button/btn-entry-15-btn02-h.gif';\" onMouseOut=\"this.src='/web/shared/images/button/btn-entry-15-btn02.gif';\" /></a></p></div>";
}else{
    //rgSecが有る場合
    var html_str = "<div class=\"lyt-image image-col1-full\"><p class=\"image\"> <a onclick=\"sharedLinkPage.jumpPage(sharedLinkPage.villageCampAppInput + '&amp;campaignCd=" + campaingCd + "' + getDisplayParam());return false;\" href=\"javascript:void(0);\"><img width=\"695\" height=\"72\" alt=\"ログイン&#12288;キャンペーンにエントリーはこちら\" src=\"/web/campaign/fxtrade/images/btn-campaign-entry.gif\"></a></p></div><div class=\"lyt-image image-col2\"><p class=\"image align-C\"><a href=\"/web/fx/rfx/login.html\"><img src=\"/web/shared/images/button/btn-login-fx-03.gif\" alt=\"楽天FXログイン\" border=\"0\" height=\"61\" width=\"320\"></a></p><p class=\"image align-C\"><a href=\"/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init\"><img src=\"/web/shared/images/button/btn-entry-fx-01_pt.gif\" alt=\"FX口座開設はこちら\" border=\"0\" height=\"61\" width=\"320\"></a></p></div><!-- /.lyt-image -->";
}
//HTMLコードを出力
$(".rgSec_output").html(html_str);
