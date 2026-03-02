jQuery(document).ready(function() {

  // 分配金(COOKIE)
  var cookie = $.cookie("cnd-dividends");
  if(cookie == null) {
    $("ul","#cnd-dividends").eq(1).fadeOut("fast");
  } else {
    $("p.show-more","#cnd-dividends").fadeOut("fast");
    $("ul","#cnd-dividends").eq(1).fadeIn("fast");
  }
  var cookie = $.cookie("ttl-dividend");
  if(cookie == null) {
    $("#cnd-dividends").fadeIn("fast");
    $("#ttl-dividend").removeClass("closed");
  } else {
    $("#cnd-dividends").fadeOut("fast");
    $("#ttl-dividend").addClass("closed");
  }
  
  // 分配金(CLICK)
  $(".title-text","#ttl-dividend").click(function(){
    var cookie = $.cookie("ttl-dividend");
    if(cookie == null) {
      $.cookie("ttl-dividend","1",{ path:"/"});
      $("#cnd-dividends").fadeOut("fast");
      $("#ttl-dividend").addClass("closed");
    } else {
      $.cookie("ttl-dividend","",{ expires: -1, path:"/"})
      $("#cnd-dividends").fadeIn("fast");
      $("#ttl-dividend").removeClass("closed");
    }
  })
  $("p.show-more","#cnd-dividends").click(function() {
    $.cookie("cnd-dividends","1",{ path:"/"});
    $("p.show-more","#cnd-dividends").fadeOut("fast");
    $("ul","#cnd-dividends").eq(1).fadeIn("fast");
  })



  // 過去分配金利回り(COOKIE)
  var cookie = $.cookie("cnd-yield");
  if(cookie == null) {
    $("ul","#cnd-yield").eq(1).fadeOut("fast");
  } else {
    $("p.show-more","#cnd-yield").fadeOut("fast");
    $("ul","#cnd-yield").eq(1).fadeIn("fast");
  }
  var cookie = $.cookie("ttl-yield");
  if(cookie == null) {
    $("#cnd-yield").fadeIn("fast");
    $("#ttl-yield").removeClass("closed");
  } else {
    $("#cnd-yield").fadeOut("fast");
    $("#ttl-yield").addClass("closed");
  }
  
 // 過去分配金利回り(CLICK)
  $(".title-text","#ttl-yield").click(function(){
      var cookie = $.cookie("ttl-yield");
      if(cookie == null) {
        $.cookie("ttl-yield","1",{ path:"/"});
        $("#cnd-yield").fadeOut("fast");
        $("#ttl-yield").addClass("closed");
      } else {
        $.cookie("ttl-yield","",{ expires: -1, path:"/"})
        $("#cnd-yield").fadeIn("fast");
        $("#ttl-yield").removeClass("closed");
      }
  })
  $("p.show-more","#cnd-yield").click(function() {
    $.cookie("cnd-yield","1",{ path:"/"});
    $("p.show-more","#cnd-yield").fadeOut("fast");
    $("ul","#cnd-yield").eq(1).fadeIn("fast");
  })

  // 非課税口座買付可能(COOKIE)
  var cookie = $.cookie("ttl-nisa");
  if(cookie == null) {
    $("#cnd-nisa").fadeIn("fast");
    $("#ttl-nisa").removeClass("closed");
  } else {
    $("#cnd-nisa").fadeOut("fast");
    $("#ttl-nisa").addClass("closed");
  }

  // 非課税口座買付可能(CLICK)
  $(".title-text","#ttl-nisa").click(function() {
    var cookie = $.cookie("ttl-nisa");
    if(cookie == null) {
      $.cookie("ttl-nisa","1",{ path:"/"});
      $("#cnd-nisa").fadeOut("fast");
      $("#ttl-nisa").addClass("closed");
    } else {
      $.cookie("ttl-nisa","",{ expires: -1, path:"/"})
      $("#cnd-nisa").fadeIn("fast");
      $("#ttl-nisa").removeClass("closed");
    }
  })


  // 分配金再投資コース(COOKIE)
  var cookie = $.cookie("ttl-plowback");
  if(cookie == null) {
    $("#cnd-plowback").fadeIn("fast");
    $("#ttl-plowback").removeClass("closed");
  } else {
    $("#cnd-plowback").fadeOut("fast");
    $("#ttl-plowback").addClass("closed");
  }

  // 分配金再投資コース(CLICK)
  $(".title-text","#ttl-plowback").click(function() {
    var cookie = $.cookie("ttl-plowback");
    if(cookie == null) {
      $.cookie("ttl-plowback","1",{ path:"/"});
      $("#cnd-plowback").fadeOut("fast");
      $("#ttl-plowback").addClass("closed");
    } else {
      $.cookie("ttl-plowback","",{ expires: -1, path:"/"})
      $("#cnd-plowback").fadeIn("fast");
      $("#ttl-plowback").removeClass("closed");
    }
  })

  // 手数料 (COOKIE)
  var cookie = $.cookie("ttl-fee");
  if(cookie == null) {
    $("#cnd-fee").fadeIn("fast");
    $("#ttl-fee").removeClass("closed");
  } else {
    $("#cnd-fee").fadeOut("fast");
    $("#ttl-fee").addClass("closed");
  }
 
  // 手数料(CLICK)
  $(".title-text","#ttl-fee").click(function() {
    var cookie = $.cookie("ttl-fee");
    if(cookie == null) {
      $.cookie("ttl-fee","1",{ path:"/"});
      $("#cnd-fee").fadeOut("fast");
      $("#ttl-fee").addClass("closed");
    } else {
      $.cookie("ttl-fee","",{ expires: -1, path:"/"})
      $("#cnd-fee").fadeIn("fast");
      $("#ttl-fee").removeClass("closed");
    }
  })
  
  








  
  
  // 資産タイプ(COOKIE)
  var cookie = $.cookie("cnd-asset-type0");
  if(cookie == null) {
    $("ul","#cnd-asset-type").eq(1).fadeOut("fast");
    $("img","#cnd-asset-type").eq(0).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
  } else {
    $("ul","#cnd-asset-type").eq(1).fadeIn("fast");
    $("img","#cnd-asset-type").eq(0).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
  }

  var cookie = $.cookie("cnd-asset-type1");
  if(cookie == null) {
    $("ul","#cnd-asset-type").eq(2).fadeOut("fast");
    $("img","#cnd-asset-type").eq(1).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
  } else {
    $("ul","#cnd-asset-type").eq(2).fadeIn("fast");
    $("img","#cnd-asset-type").eq(1).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
  }
  
  var cookie = $.cookie("cnd-asset-type2");
  if(cookie == null) {
    $("ul","#cnd-asset-type").eq(3).fadeOut("fast");
    $("img","#cnd-asset-type").eq(2).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
  } else {
    $("ul","#cnd-asset-type").eq(3).fadeIn("fast");
    $("img","#cnd-asset-type").eq(2).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
  }

  var cookie = $.cookie("cnd-asset-type3");
  if(cookie == null) {
    $("ul","#cnd-asset-type").eq(4).fadeOut("fast");
    $("img","#cnd-asset-type").eq(3).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
  } else {
    $("ul","#cnd-asset-type").eq(4).fadeIn("fast");
    $("img","#cnd-asset-type").eq(3).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
  }

  var cookie = $.cookie("cnd-asset-type4");
  if(cookie == null) {
    $("ul","#cnd-asset-type").eq(5).fadeOut("fast");
    $("img","#cnd-asset-type").eq(4).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
  } else {
    $("ul","#cnd-asset-type").eq(5).fadeIn("fast");
    $("img","#cnd-asset-type").eq(4).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
  }

  var cookie = $.cookie("ttl-asset-type");
  if(cookie == null) {
    $("#cnd-asset-type").fadeIn("fast");
    $("#ttl-asset-type").removeClass("closed");
  } else {
    $("#cnd-asset-type").fadeOut("fast");
    $("#ttl-asset-type").addClass("closed");
  }
 
  // 資産タイプ(CLICK)
  $(".title-text","#ttl-asset-type").click(function() {
    var cookie = $.cookie("ttl-asset-type");
    if(cookie == null) {
      $.cookie("ttl-asset-type","1",{ path:"/"});
      $("#cnd-asset-type").fadeOut("fast");
      $("#ttl-asset-type").addClass("closed");
    } else {
      $.cookie("ttl-asset-type","",{ expires: -1, path:"/"})
      $("#cnd-asset-type").fadeIn("fast");
      $("#ttl-asset-type").removeClass("closed");
    }
  })

  $("span.btn-toggle","#cnd-asset-type").eq(0).click(function(){
    var cookie = $.cookie("cnd-asset-type0");
    if(cookie == null) {
      $.cookie("cnd-asset-type0","1",{ path:"/"});
      $("ul","#cnd-asset-type").eq(1).fadeIn("fast");
      $("img","#cnd-asset-type").eq(0).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
    } else {
      $.cookie("cnd-asset-type0","",{ expires: -1, path:"/"})
      $("ul","#cnd-asset-type").eq(1).fadeOut("fast");
      $("img","#cnd-asset-type").eq(0).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
    }
  })
  
  $("span.btn-toggle","#cnd-asset-type").eq(1).click(function(){
    var cookie = $.cookie("cnd-asset-type1");
    if(cookie == null) {
      $.cookie("cnd-asset-type1","1",{ path:"/"});
      $("ul","#cnd-asset-type").eq(2).fadeIn("fast");
      $("img","#cnd-asset-type").eq(1).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
    } else {
      $.cookie("cnd-asset-type1","",{ expires: -1, path:"/"})
      $("ul","#cnd-asset-type").eq(2).fadeOut("fast");
      $("img","#cnd-asset-type").eq(1).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
    }
  })

  $("span.btn-toggle","#cnd-asset-type").eq(2).click(function(){
    var cookie = $.cookie("cnd-asset-type2");
    if(cookie == null) {
      $.cookie("cnd-asset-type2","1",{ path:"/"});
      $("ul","#cnd-asset-type").eq(3).fadeIn("fast");
      $("img","#cnd-asset-type").eq(2).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
    } else {
      $.cookie("cnd-asset-type2","",{ expires: -1, path:"/"})
      $("ul","#cnd-asset-type").eq(3).fadeOut("fast");
      $("img","#cnd-asset-type").eq(2).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
    }
  })

  $("span.btn-toggle","#cnd-asset-type").eq(3).click(function(){
    var cookie = $.cookie("cnd-asset-type3");
    if(cookie == null) {
      $.cookie("cnd-asset-type3","1",{ path:"/"});
      $("ul","#cnd-asset-type").eq(4).fadeIn("fast");
      $("img","#cnd-asset-type").eq(3).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
    } else {
      $.cookie("cnd-asset-type3","",{ expires: -1, path:"/"})
      $("ul","#cnd-asset-type").eq(4).fadeOut("fast");
      $("img","#cnd-asset-type").eq(3).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
    }
  })

  $("span.btn-toggle","#cnd-asset-type").eq(4).click(function(){
    var cookie = $.cookie("cnd-asset-type4");
    if(cookie == null) {
      $.cookie("cnd-asset-type4","1",{ path:"/"});
      $("ul","#cnd-asset-type").eq(5).fadeIn("fast");
      $("img","#cnd-asset-type").eq(4).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
    } else {
      $.cookie("cnd-asset-type4","",{ expires: -1, path:"/"})
      $("ul","#cnd-asset-type").eq(5).fadeOut("fast");
      $("img","#cnd-asset-type").eq(4).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
    }
  })



  // ファンドタイプ(COOKIE)
  var cookie = $.cookie("cnd-fund-type0");
  if(cookie == null) {
    $("img","#cnd-fund-type").eq(0).fadeOut();
    $("ul","#cnd-fund-type").eq(2).fadeOut();
  } else {
    $("p.show-more","#cnd-fund-type").fadeOut();

    var cookie = $.cookie("cnd-fund-type2");
    if(cookie == null) {
      $("ul","#cnd-fund-type").eq(1).fadeOut("fast");
      $("ul","#cnd-fund-type").eq(2).fadeOut("fast");
      $("img","#cnd-fund-type").eq(0).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
    } else {
      $("ul","#cnd-fund-type").eq(1).fadeIn("fast");
      $("ul","#cnd-fund-type").eq(2).fadeIn("fast");
      $("img","#cnd-fund-type").eq(0).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
    }
  }

  var cookie = $.cookie("cnd-fund-type5");
  if(cookie == null) {
    $("ul","#cnd-fund-type").eq(5).fadeOut("fast");
    $("img","#cnd-fund-type").eq(1).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
  } else {
    $("ul","#cnd-fund-type").eq(5).fadeIn("fast");
    $("img","#cnd-fund-type").eq(1).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
  }

  var cookie = $.cookie("ttl-fund-type");
  if(cookie == null) {
    $("#cnd-fund-type").fadeIn("fast");
    $("#ttl-fund-type").removeClass("closed");
  } else {
    $("#cnd-fund-type").fadeOut("fast");
    $("#ttl-fund-type").addClass("closed");
  }
 
  // ファンドタイプ(CLICK)
  $(".title-text","#ttl-fund-type").click(function() {
    var cookie = $.cookie("ttl-fund-type");
    if(cookie == null) {
      $.cookie("ttl-fund-type","1",{ path:"/"});
      $("#cnd-fund-type").fadeOut("fast");
      $("#ttl-fund-type").addClass("closed");
    } else {
      $.cookie("ttl-fund-type","",{ expires: -1, path:"/"})
      $("#cnd-fund-type").fadeIn("fast");
      $("#ttl-fund-type").removeClass("closed");
    }
  })

  $("p.show-more","#cnd-fund-type").click(function() {
    $.cookie("cnd-fund-type0","1",{ path:"/"});
    $("p.show-more","#cnd-fund-type").fadeOut();
    $.cookie("cnd-fund-type2","1",{ path:"/"});
    $("ul","#cnd-fund-type").eq(2).fadeIn();
    $("img","#cnd-fund-type").eq(0).fadeIn();
    $("img","#cnd-fund-type").eq(0).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
  })

  $("span.btn-toggle","#cnd-fund-type").eq(0).click(function(){
    var cookie = $.cookie("cnd-fund-type2");
    if(cookie == null) {
      $.cookie("cnd-fund-type2","1",{ path:"/"});
      $("ul","#cnd-fund-type").eq(1).fadeIn("fast");
      $("ul","#cnd-fund-type").eq(2).fadeIn("fast");
      $("img","#cnd-fund-type").eq(0).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
    } else {
      $.cookie("cnd-fund-type2","",{ expires: -1, path:"/"})
      $("ul","#cnd-fund-type").eq(1).fadeOut("fast");
      $("ul","#cnd-fund-type").eq(2).fadeOut("fast");
      $("img","#cnd-fund-type").eq(0).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
    }
  })
  
  $("span.btn-toggle","#cnd-fund-type").eq(1).click(function(){
    var cookie = $.cookie("cnd-fund-type5");
    if(cookie == null) {
      $.cookie("cnd-fund-type5","1",{ path:"/"});
      $("ul","#cnd-fund-type").eq(5).fadeIn("fast");
      $("img","#cnd-fund-type").eq(1).attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
    } else {
      $.cookie("cnd-fund-type5","",{ expires: -1, path:"/"})
      $("ul","#cnd-fund-type").eq(5).fadeOut("fast");
      $("img","#cnd-fund-type").eq(1).attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
    }
  })

  // トータルリターン (COOKIE)
  var cookie = $.cookie("ttl-total-return");
  if(cookie == null) {
    $("#cnd-total-return").fadeIn("fast");
    $("#ttl-total-return").removeClass("closed");
  } else {
    $("#cnd-total-return").fadeOut("fast");
    $("#ttl-total-return").addClass("closed");
  }
 
  // トータルリターン(CLICK)
  $(".title-text","#ttl-total-return").click(function() {
    var cookie = $.cookie("ttl-total-return");
    if(cookie == null) {
      $.cookie("ttl-total-return","1",{ path:"/"});
      $("#cnd-total-return").fadeOut("fast");
      $("#ttl-total-return").addClass("closed");
    } else {
      $.cookie("ttl-total-return","",{ expires: -1, path:"/"})
      $("#cnd-total-return").fadeIn("fast");
      $("#ttl-total-return").removeClass("closed");
    }
  })



  // シャープレシオ(COOKIE)
  var cookie = $.cookie("ttl-sharpe-ratio");
  if(cookie == null) {
    $("#cnd-sharpe-ratio").fadeIn("fast");
    $("#ttl-sharpe-ratio").removeClass("closed");
  } else {
    $("#cnd-sharpe-ratio").fadeOut("fast");
    $("#ttl-sharpe-ratio").addClass("closed");
  }
 
  // シャープレシオ(CLICK)
  $(".title-text","#ttl-sharpe-ratio").click(function() {
    var cookie = $.cookie("ttl-sharpe-ratio");
    if(cookie == null) {
      $.cookie("ttl-sharpe-ratio","1",{ path:"/"});
      $("#cnd-sharpe-ratio").fadeOut("fast");
      $("#ttl-sharpe-ratio").addClass("closed");
    } else {
      $.cookie("ttl-sharpe-ratio","",{ expires: -1, path:"/"})
      $("#cnd-sharpe-ratio").fadeIn("fast");
      $("#ttl-sharpe-ratio").removeClass("closed");
    }
  })
  

  // 投資地域(COOKIE)
  var cookie = $.cookie("cnd-region2");
  if(cookie == null) {
    $("ul","#cnd-region").eq(2).fadeOut("fast");
  } else {
    $("p.show-more","#cnd-region").fadeOut("fast");
    $("ul","#cnd-region").eq(2).fadeIn("fast");
  }
  
  var cookie = $.cookie("cnd-region1");
  if(cookie == null) {
    $("ul","#cnd-region").eq(1).fadeOut("fast");
    $("img","#cnd-region").attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
  } else {
    $("ul","#cnd-region").eq(1).fadeIn("fast");
    $("img","#cnd-region").attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
  }
  
  var cookie = $.cookie("ttl-region");
  if(cookie == null) {
    $("#cnd-region").fadeIn("fast");
    $("#ttl-region").removeClass("closed");
  } else {
    $("#cnd-region").fadeOut("fast");
    $("#ttl-region").addClass("closed");
  }
 
  // 投資地域(CLICK)
  $(".title-text","#ttl-region").click(function() {
    var cookie = $.cookie("ttl-region");
    if(cookie == null) {
      $.cookie("ttl-region","1",{ path:"/"});
      $("#cnd-region").fadeOut("fast");
      $("#ttl-region").addClass("closed");
    } else {
      $.cookie("ttl-region","",{ expires: -1, path:"/"})
      $("#cnd-region").fadeIn("fast");
      $("#ttl-region").removeClass("closed");
    }
  })

  $("p.show-more","#cnd-region").click(function() {
    $.cookie("cnd-region2","1",{ path:"/"});
    $("p.show-more","#cnd-region").fadeOut("fast");
    $("ul","#cnd-region").eq(2).fadeIn("fast");
  })
  
  $("span.btn-toggle","#cnd-region").click(function(){
    var cookie = $.cookie("cnd-region1");
    if(cookie == null) {
      $.cookie("cnd-region1","1",{ path:"/"});
      $("ul","#cnd-region").eq(1).fadeIn("fast");
      $("img","#cnd-region").attr({alt:"閉じる",src:"/web/shared/images/button/btn-minus-01.gif"})
    } else {
      $.cookie("cnd-region1","",{ expires: -1, path:"/"})
      $("ul","#cnd-region").eq(1).fadeOut("fast");
      $("img","#cnd-region").attr({alt:"開く",src:"/web/shared/images/button/btn-plus-01.gif"})
    }
  })
  
  
  
  
  // リッパースコア(COOKIE)
  var cookie = $.cookie("ttl-lipper-score");
  if(cookie == null) {
    $("#cnd-lipper-score").fadeIn("fast");
    $("#ttl-lipper-score").removeClass("closed");
  } else {
    $("#cnd-lipper-score").fadeOut("fast");
    $("#ttl-lipper-score").addClass("closed");
  }

  // リッパースコア(CLICK)
  $(".title-text","#ttl-lipper-score").click(function() {
    var cookie = $.cookie("ttl-lipper-score");
    if(cookie == null) {
      $.cookie("ttl-lipper-score","1",{ path:"/"});
      $("#cnd-lipper-score").fadeOut("fast");
      $("#ttl-lipper-score").addClass("closed");
    } else {
      $.cookie("ttl-lipper-score","",{ expires: -1, path:"/"})
      $("#cnd-lipper-score").fadeIn("fast");
      $("#ttl-lipper-score").removeClass("closed");
    }
  })

  
  // 積立(COOKIE)
  var cookie = $.cookie("ttl-accumulation");
  if(cookie == null) {
    $("#cnd-accumulation").fadeIn("fast");
    $("#ttl-accumulation").removeClass("closed");
  } else {
    $("#cnd-accumulation").fadeOut("fast");
    $("#ttl-accumulation").addClass("closed");
  }
 
  // 積立(CLICK)
  $(".title-text","#ttl-accumulation").click(function() {
    var cookie = $.cookie("ttl-accumulation");
    if(cookie == null) {
      $.cookie("ttl-accumulation","1",{ path:"/"});
      $("#cnd-accumulation").fadeOut("fast");
      $("#ttl-accumulation").addClass("closed");
    } else {
      $.cookie("ttl-accumulation","",{ expires: -1, path:"/"})
      $("#cnd-accumulation").fadeIn("fast");
      $("#ttl-accumulation").removeClass("closed");
    }
  })
  
  
  // 償還日設定(COOKIE)
  var cookie = $.cookie("ttl-redemption-date");
  if(cookie == null) {
    $("#cnd-redemption-date").fadeIn("fast");
    $("#ttl-redemption-date").removeClass("closed");
  } else {
    $("#cnd-redemption-date").fadeOut("fast");
    $("#ttl-redemption-date").addClass("closed");
  }
 
  // 償還日設定(CLICK)
  $(".title-text","#ttl-redemption-date").click(function() {
    var cookie = $.cookie("ttl-redemption-date");
    if(cookie == null) {
      $.cookie("ttl-redemption-date","1",{ path:"/"});
      $("#cnd-redemption-date").fadeOut("fast");
      $("#ttl-redemption-date").addClass("closed");
    } else {
      $.cookie("ttl-redemption-date","",{ expires: -1, path:"/"})
      $("#cnd-redemption-date").fadeIn("fast");
      $("#ttl-redemption-date").removeClass("closed");
    }
  })


  // 委託会社(COOKIE)
  var cookie = $.cookie("ttl-company");
  if(cookie == null) {
    $("#cnd-company").fadeIn("fast");
    $("#ttl-company").removeClass("closed");
  } else {
    $("#cnd-company").fadeOut("fast");
    $("#ttl-company").addClass("closed");
  }
 
  // 委託会社(CLICK)
  $(".title-text","#ttl-company").click(function() {
    var cookie = $.cookie("ttl-company");
    if(cookie == null) {
      $.cookie("ttl-company","1",{ path:"/"});
      $("#cnd-company").fadeOut("fast");
      $("#ttl-company").addClass("closed");
    } else {
      $.cookie("ttl-company","",{ expires: -1, path:"/"})
      $("#cnd-company").fadeIn("fast");
      $("#ttl-company").removeClass("closed");
    }
  })


  // キーワード(COOKIE)
  var cookie = $.cookie("cnd-keyword");
  if(cookie == null) {
    $("ul","#cnd-keyword").eq(1).fadeOut("fast");
  } else {
    $("p.show-more","#cnd-keyword").fadeOut("fast");
    $("ul","#cnd-keyword").eq(1).fadeIn("fast");
  }
  var cookie = $.cookie("ttl-keyword");
  if(cookie == null) {
    $("#cnd-keyword").fadeIn("fast");
    $("#ttl-keyword").removeClass("closed");
  } else {
    $("#cnd-keyword").fadeOut("fast");
    $("#ttl-keyword").addClass("closed");
  }
  
  // キーワード(CLICK)
  $(".title-text","#ttl-keyword").click(function(){
    var cookie = $.cookie("ttl-keyword");
    if(cookie == null) {
      $.cookie("ttl-keyword","1",{ path:"/"});
      $("#cnd-keyword").fadeOut("fast");
      $("#ttl-keyword").addClass("closed");
    } else {
      $.cookie("ttl-keyword","",{ expires: -1, path:"/"})
      $("#cnd-keyword").fadeIn("fast");
      $("#ttl-keyword").removeClass("closed");
    }
  })
  $("p.show-more","#cnd-keyword").click(function() {
    $.cookie("cnd-keyword","1",{ path:"/"});
    $("p.show-more","#cnd-keyword").fadeOut("fast");
    $("ul","#cnd-keyword").eq(1).fadeIn("fast");
  })


  // 運用年数(COOKIE)
  var cookie = $.cookie("ttl-years");
  if(cookie == null) {
    $("#cnd-years").fadeIn("fast");
    $("#ttl-years").removeClass("closed");
  } else {
    $("#cnd-years").fadeOut("fast");
    $("#ttl-years").addClass("closed");
  }

  // 運用年数(CLICK)
  $(".title-text","#ttl-years").click(function() {
    var cookie = $.cookie("ttl-years");
    if(cookie == null) {
      $.cookie("ttl-years","1",{ path:"/"});
      $("#cnd-years").fadeOut("fast");
      $("#ttl-years").addClass("closed");
    } else {
      $.cookie("ttl-years","",{ expires: -1, path:"/"})
      $("#cnd-years").fadeIn("fast");
      $("#ttl-years").removeClass("closed");
    }
  })


  // 協会分類(COOKIE)
  var cookie = $.cookie("ttl-classification");
  if(cookie == null) {
    $("#cnd-classification").fadeIn("fast");
    $("#ttl-classification").removeClass("closed");
  } else {
    $("#cnd-classification").fadeOut("fast");
    $("#ttl-classification").addClass("closed");
  }
 
  // 協会分類(CLICK)
  $(".title-text","#ttl-classification").click(function() {
    var cookie = $.cookie("ttl-classification");
    if(cookie == null) {
      $.cookie("ttl-classification","1",{ path:"/"});
      $("#cnd-classification").fadeOut("fast");
      $("#ttl-classification").addClass("closed");
    } else {
      $.cookie("ttl-classification","",{ expires: -1, path:"/"})
      $("#cnd-classification").fadeIn("fast");
      $("#ttl-classification").removeClass("closed");
    }
  })


  // 純資産(COOKIE)
  var cookie = $.cookie("ttl-net-asset");
  if(cookie == null) {
    $("#cnd-net-asset").fadeIn("fast");
    $("#ttl-net-asset").removeClass("closed");
  } else {
    $("#cnd-net-asset").fadeOut("fast");
    $("#ttl-net-asset").addClass("closed");
  }
 
  // 純資産(CLICK)
  $(".title-text","#ttl-net-asset").click(function() {
    var cookie = $.cookie("ttl-net-asset");
    if(cookie == null) {
      $.cookie("ttl-net-asset","1",{ path:"/"});
      $("#cnd-net-asset").fadeOut("fast");
      $("#ttl-net-asset").addClass("closed");
    } else {
      $.cookie("ttl-net-asset","",{ expires: -1, path:"/"})
      $("#cnd-net-asset").fadeIn("fast");
      $("#ttl-net-asset").removeClass("closed");
    }
  })


//  // クリアボタンで項目初期化(フィアネスで実装のためコメント)
//  $("li",".btn-search-lower").eq(1).click(function() {
//    $("input[type='text'], textarea").not("input[readonly='true'], input[type='hidden'], :button, :submit, :reset").val("");
//    $("input[type='radio'], input[type='checkbox'], select").removeAttr("checked").removeAttr("selected");
//    $("select option:first-child").attr("selected", "selected");
//  })
  
  
  
})
