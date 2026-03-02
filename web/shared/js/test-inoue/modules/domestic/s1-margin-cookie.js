/*========================
国内株クッキー制御js

管理：\web\shared\js\_src\modules\
配置：\web\shared\js\
========================*/

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