(function($){
    var rg = $.cookie("Rg_sec");
  
    if(rg == null) {
      // 非会員の場合
      //console.log('非会員');
      $(".ACC_Vis").show();
      $(".ACC_Mem").hide();
      $(".ACC_Mem_YFX").hide();
      $(".ACC_Mem_NFX").hide();
      $(".ACC_Mem_YMargin").hide();
      $(".ACC_Mem_NMargin").hide();
      $(".ACC_Mem_YNISA").hide();
      $(".ACC_Mem_NNISA").hide();
    } else {
      //console.log('会員');
      $(".ACC_Mem").show();
      $(".ACC_Vis").hide();

      //1.FX口座だし分け
      if(rg.substr(103,1) == '1'){
        //console.log('FXあり')
        $(".ACC_Mem_YFX").show();
        $(".ACC_Mem_NFX").hide();
      } else {
        //console.log('FXなし')
        $(".ACC_Mem_NFX").show();
        $(".ACC_Mem_YFX").hide();
      }

      //2.信用口座だし分け
      if(rg.substr(92,1) == '1'){
        //console.log('信用あり')
        $(".ACC_Mem_YMargin").show();
        $(".ACC_Mem_NMargin").hide();
      } else {
        //console.log('信用なし')
        $(".ACC_Mem_NMargin").show();
        $(".ACC_Mem_YMargin").hide();
      }

      //3.NISA口座だし分け
      if(rg.substr(788,2) == '06'){
        //console.log('NISA口座あり')
        $(".ACC_Mem_YNISA").show();
        $(".ACC_Mem_NNISA").hide();
      } else {
        //console.log('NISA口座なし')
        $(".ACC_Mem_NNISA").show();
        $(".ACC_Mem_YNISA").hide();
      }

    }
    
    
  })(jQuery||jqBase);