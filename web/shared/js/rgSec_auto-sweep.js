//console.log($);
//$.cookie("Rg_sec","ddd");
//console.log($.cookie("Rg_sec"));

if($.cookie("Rg_sec") === null){
    //rgSecが無い場合
    var html_str = "";
}else{
    //rgSecが有る場合
    var html_str = "<div class=\"box-20170218-03\"><p style=\"margin-bottom:0;\"><strong>《新機能リリース記念》<br />すでに証券口座および銀行口座をお持ちの方は、3月31日（金）までに自動入出金設定をすると100円プレゼント！</strong><br />※2月17日以前に、楽天証券および楽天銀行の口座をお持ちの方が対象となります。</p><p style=\"margin-bottom:0;\" class=\"align-R\"><a href=\"/web/campaign/20170218-03/\">詳しくはこちら</a></p></div>";
}
//HTMLコードを出力
$(".rgSec_output").html(html_str);
