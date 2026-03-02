/*!
 * 汎用的なCookie処理
 * 会員、非会員で出しわけ、
 * 信用、NISA口座開設状況の判別
 */

(function($) {
  var rg = $.cookie("Rg_sec");

  if(rg == null) {
    // 非会員の場合
    $(".ACC1").show();
    $(".ACC2").hide();
  } else {
    $(".ACC1").hide();
    // 信用
    if(rg.substr(92,1) == '1'){
      $(".ACC2").hide();
    } else {
      $(".ACC2").show();
    }
    //NISA
    if(rg.substr(788,2) == '06') {
      $(".ACC3").hide();
    } else {
      $(".ACC3").show();
    }
  }
})(jQuery || jqBase);
