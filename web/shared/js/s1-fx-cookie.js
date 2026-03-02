(function($){
  var rg = $.cookie("Rg_sec");

  if(rg == null) {
    // 非会員の場合
    console.log('非会員');
    $(".ACC1").show();
    $(".ACC2").hide();
    $(".ACC3").hide();
  } else {
    //console.log('会員');
    $(".ACC1").hide();
    if(rg.substr(103,1) == '1'){
      console.log('FXあり')
      $(".ACC2").show();
      $(".ACC3").hide();
      //ログインフォームのセレクトボックス内修正
      $('#homeid').children('[value=ACC_NFX_OPEN]').remove();
      $('#homeid').children('[value=BO_TOP]').remove();
      $('#homeid').prepend($('<option value="FX_BO_TRADE">らくオプ取引</option>'));
      $('#homeid').prepend($('<option value="FX_TOP_LOGIN" selected="selected">楽天FX</option>'));
    } else {
      console.log('FXなし')
      $(".ACC3").show();
      $(".ACC2").hide();
    }
  }
  
  
})(jQuery||jqBase);