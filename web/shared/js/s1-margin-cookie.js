  var rg = jqBase.cookie("Rg_sec");

  if(rg == null) {
    // 非会員の場合
    jqBase(".ACC1").show();
    jqBase(".ACC2").hide();
  } else {
    jqBase(".ACC1").hide();
    if(rg.substr(92,1) == '1'){
      jqBase(".ACC2").hide();
    } else {
      jqBase(".ACC2").show();
    }
  }