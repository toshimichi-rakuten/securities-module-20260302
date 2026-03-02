var scid = String(location.search);
    scid = scid.replace( "?" , "&" );
      if (scid){
        if (document.referrer.indexOf('rakuten-sec.co.jp') == -1 &&  (
          (navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) ||
          navigator.userAgent.indexOf('iPod') > 0 ||
          (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0) ||
          navigator.userAgent.indexOf('Windows Phone') > 0 )) {
            if(confirm('楽天証券スマートフォン専用サイトへ移動しますか？')) {
              location.href = '/smartphone/?l-id=vtop_select_sp' + scid;
            } else {
              location.href = '/?l-id=vtop_select_pc' + scid;
            }
          }
        }else{
          if (document.referrer.indexOf('rakuten-sec.co.jp') == -1 &&  (
          (navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) ||
          navigator.userAgent.indexOf('iPod') > 0 ||
          (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0) ||
          navigator.userAgent.indexOf('Windows Phone') > 0 )) {
            if(confirm('楽天証券スマートフォン専用サイトへ移動しますか？')) {
              location.href = '/smartphone/?l-id=vtop_select_sp';
            } else {
              location.href = '/?l-id=vtop_select_pc';
            }
          }
        }