// console.log($);
// $.cookie("Rg_sec","ddd");
// console.log($.cookie("Rg_sec"));

if($.cookie("Rg_sec") === null){
    //rgSecが無い場合
    var html_str = "<p style=\"text-align:center;margin:20px 0;\"><a href=\"/web/campaign/20181101-05/\" onclick=\"s.lidTrack('conts_20181101-05_cp_01')\"><img src=\"/web/images/banners/cp_20181101-05/580x180.png\" alt=\"\" width=\"290\" height=\"90\"></a></p>";
    //var html_str = "<p class=\"img ta-c mb-30\"><a href=\"/web/campaign/20170218-01/\" onclick=\"s.lidTrack('conts_moneybridge_cp_01')\"><img src=\"/web/images/banners/cp_20170218-01/728x90.png\" alt=\"\" width=\"728\" height=\"90\"></a></p>";
    //var html_str = "<p class=\"img ta-c mb-30\"><a href=\"/web/campaign/20170418-02/\" onclick=\"s.lidTrack('conts_moneybridge_bankagency')\"><img src=\"/web/images/banners/cp_20170418-02/728x90.png\" alt=\"\" width=\"728\" height=\"90\"></a></p>";
    //var html_str = "<p class=\"img ta-c mb-30\"><a href=\"/web/campaign/20170906-01/\" onclick=\"s.lidTrack('conts_moneybridge_cp_03')\"><img src=\"/web/images/banners/cp_20170906-01/728x90.png\" alt=\"\" width=\"728\" height=\"90\"></a></p>";
    //var html_str = "";
}else{
    //rgSecが有る場合
    if($.cookie('Rg_sec').substr(101,1) == '2'){
      //var html_str = "<p class=\"img ta-c mb-30\"><a href=\"/web/campaign/20180608-03/\" onclick=\"s.lidTrack('conts_moneybridge_cp_20180608-03')\"><img src=\"/web/images/banners/cp_20180608-03/728x90.png\" alt=\"\" width=\"728\" height=\"90\"></a></p>";
    }else{
      //var html_str = "<p class=\"img ta-c mb-30\"><a href=\"/web/campaign/20180608-03/\" onclick=\"s.lidTrack('conts_moneybridge_cp_20180608-03')\"><img src=\"/web/images/banners/cp_20180608-03/728x90.png\" alt=\"\" width=\"728\" height=\"90\"></a></p>";
    //var html_str = "<p class=\"img ta-c mb-30\"><a href=\"/web/campaign/20170906-01/\" onclick=\"s.lidTrack('conts_moneybridge_cp_03')\"><img src=\"/web/images/banners/cp_20170906-01/728x90.png\" alt=\"\" width=\"728\" height=\"90\"></a></p>";
    }
}
//HTMLコードを出力
$(".rgSec_output").html(html_str);
