/* global tabType: true */
/* global targetIdField: true */
/* global openDialogDefault: true */
/* global isSHL24: true */


(function($global){
  $global("#keyboard_body").css("display","none");
  var openKeyboard = function(){
    tabType = "3";
    targetIdField = new Array("form-login-id","form-login-pass");
    // キーボードを表示するidを指定（指定要素の右側に表示）
    openDialogDefault("#form-login-pass");
  };
      $global("#keyboard_opener").one("click",function(e) {
        var s = $global("<link>");
        s.attr({
          rel : "stylesheet",
          type : "text/css",
          media : "screen",
          href : "https://www.rakuten-sec.co.jp/web/shared/css/keyboard-new.css"
        });
        var s1 =$global("<link>");
        s1.attr({
          rel : "stylesheet",
          type : "text/css",
          href : "https://www.rakuten-sec.co.jp/web/shared/css/jquery-ui-1.10.3.custom.min.css"
        });
        $global("head").append(s).append(s1);
        $global.getScript("https://www.rakuten-sec.co.jp/web/shared/js/jquery-ui-1.8.24.custom.min.js", function() {
          $global.getScript("/web/shared/js/keyboard-new.js?0222", function() {
            openKeyboard();
            $global("#keyboard_opener").click(function(e) {
              openKeyboard();
              e.preventDefault();
            });
            if(isSHL24()){
              $global(".software-keyboard").css("display","none");
            }
            $global("#keyboard2").show();
            $global("#keyboard2").css("left","0px");
            $global("#keyboard2").css("top","90px");
            // IE7対応
            var isIE7 = navigator.userAgent.match(/msie [7.]/i);
            if(isIE7){
              $global("#keyboard2").css("top","100px");
            }
          });
        });
        e.preventDefault();
      });
})(window.jqBase || jQuery);
