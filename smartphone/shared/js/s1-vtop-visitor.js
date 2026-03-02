
window.addEventListener( 'load', function(){

  //　銘柄検索
  var isAndroid = (/android/gi).test(navigator.appVersion),
      isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
      isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
      hasTouch = 'ontouchstart' in window && !isTouchPad,
      startEvt = hasTouch ? 'touchstart' : 'mousedown',
      moveEvt = hasTouch ? 'touchmove' : 'mousemove',
      endEvt = hasTouch ? 'touchend' : 'mouseup',
      cancelEvt = hasTouch ? 'touchcancel' : 'mouseup';

  /*
  var keyword = '',
  sector = 'na',
  mininvestamt = -1.0,
  maxinvestamt = -1.0,
  minper = -1.0,
  maxper = -1.0,
  mindivyield = -1.0,
  maxdivyield = -1.0,
  mindiv = -1.0,
  maxdiv = -1.0;
  */

  var keyword = '';

  $(function(){
    $('#hogehoge').val(keyword);
    /*
    $('#sector').val(sector);

    if (mininvestamt > -1)
    $('#mininvestamt').val(mininvestamt);
    else if (mininvestamt == -2)
    $('#mininvestamt').val("");

    if (maxinvestamt > -1)
    $('#maxinvestamt').val(maxinvestamt);
    else if (maxinvestamt == -2)
    $('#maxinvestamt').val("");

    if (minper > -1)
    $('#minper').val(minper);
    else if (minper == -2)
    $('#minper').val("");

    if (maxper > -1)
    $('#maxper').val(maxper);
    else if (maxper == -2)
    $('#maxper').val("");

    if (mindivyield > -1)
    $('#mindivyield').val(mindivyield);
    else if (mindivyield == -2)
    $('#mindivyield').val("");

    if (maxdivyield > -1)
    $('#maxdivyield').val(maxdivyield);
    else if (maxdivyield == -2)
    $('#maxdivyield').val("");

    if (mindiv > -1)
    $('#mindiv').val(mindiv);
    else if (mindiv == -2)
    $('#mindiv').val("");

    if (maxdiv > -1)
    $('#maxdiv').val(maxdiv);
    else if (maxdiv == -2)
    $('#maxdiv').val("");
    */

    /*
    $('input[type="number"]').each(function() {
    var defaultVal = $(this).attr('defaultvalue');
    var val = $(this).val();

    if(val == defaultVal) {
    $(this).css('color', '#CCCCCC').data('default', true);
    } else {
    $(this).css('color', '#000000').data('default', false);
    }

    $(this).on('blur', function() {
    $(this).data('default', false)

    var defaultVal = $(this).attr('defaultvalue');
    var val = $(this).val();

    if(defaultVal != undefined && defaultVal != null) {
    // if (val == '')
    // $(this).val(defaultVal).css('color', '#CCCCCC').data('default', true);
    if (val == defaultVal)
    $(this).css('color', '#CCCCCC').data('default', true);
    }
    }).on('focus', function() {
    $(this).css('color', '#000000');
    if($(this).data('default')) {
    $(this).val('')
    }
    })
    })
    */

    $('#btnSearch').on(endEvt, function(){
      //$(location).attr('href', './pagecontent?screener=true&pid=201&xid=0&page=0' +
      $(location).attr('href', '/smartphone/market/info/pagecontent?screener=true&pid=201&xid=0&page=0' +
      '&keyword=' + $('#hogehoge').val()
      /*                + '&sector=' + $('#sector').val()
      + '&mininvestamt=' + $('#mininvestamt').val()
      + '&maxinvestamt=' + $('#maxinvestamt').val()
      + '&minper=' + $('#minper').val()
      + '&maxper=' + $('#maxper').val()
      + '&mindivyield=' + $('#mindivyield').val()
      + '&maxdivyield=' + $('#maxdivyield').val()
      + '&mindiv=' + $('#mindiv').val()
      + '&maxdiv=' + $('#maxdiv').val()*/);
    });

    $('#btnClear').on(endEvt, function(){
      $('input[name="input"]').each(function() {
        var defaultVal = $(this).attr('defaultvalue');
        if(defaultVal != undefined && defaultVal != null)
        $(this).val(defaultVal).css('color', '#CCCCCC').data('default', true);
        else
        $(this).val('');
      });
      $('#sector').val('na');
    });

  });



  $(function(){
    $("#search").on("click", function() {
    $(".headerSearchBox").toggleClass("active");//開いた時、検索窓にクラスを追加
    });
  });

  $(function(){
    setTimeout(function(){
      // footer要素の後に「上へ・ログイン」ボタン設置
      $('.footer-content-area').after('<ul class="bottom-icon__list" style="display: none;"><li class="bottom-icon__item scrolltop"><div class="rex-icon rex-icon--bottom rex-icon-arrow-up"></div><span class="bottom-icon__text">上へ</span></li></ul>');

      // ---------------------------------------------------------
      //  スクロール（アニメーション）処理
      $('.bottom-icon__item.scrolltop').on('click',function(){

      var speed    = 500,
        easing   = 'swing',
        target   = $('#top'),
        head   = $('#VHEAD'),
        position = target.offset().top - head.outerHeight();
      $("html, body").animate({scrollTop:position}, speed, easing);
      return false;
      });
    });
  },1000);

  // ランダム表示処理 start
  var mvContentArea  = $('.slider-main'),
      mvContentInner = $('.slide-img');

  function randomize(selector){
    mvContentArea.find(selector).sort(function(){
      return Math.round(Math.random());
    }).detach().appendTo(mvContentArea);
  }

  $(function(){
    randomize('.slide-img');
    mvContentArea.slick({
      slidesToShow: 1,
      autoplay: false,
      speed: 1000,
      infinite: true,
      draggable:false,
      swipe: true,
      dots: true,
      dotsClass: 'dots-slider',
      arrows: false,
      centerMode: true,
      centerPadding:'20px'
    });
  });
  // ランダム表示処理 end

  $(window).on('load',function() {
    $('.slider-main').fadeIn(300);
    $('.slider-01').fadeIn(1000);
  });



}, false);

window.addEventListener( 'load', function(){
  $(function(){
    if (navigator.userAgent.match(/Android/i) != null){
      $.smartbanner({
        // title: 'iSPEED 株取引・投資情報',
        // author: '-楽天証券の株アプリ-',
        title: 'iGrow',
        author: '- 楽天証券の資産づくりアプリ -',
        appStoreLanguage: 'jp', // Language code for App Store
        price: '無料',
        button: '表示',
        inGooglePlay: 'In Google Play',
        // icon: '/smartphone/visitor/images/common/icon_ispeed_stock.png', // The URL of the icon (defaults to <meta name="apple-touch-icon">)
        icon: '/smartphone/visitor/images/common/icon_igrow.svg', // The URL of the icon (defaults to <meta name="apple-touch-icon">)
        force: 'android',
        speedIn: 300, // Show animation speed of the banner
        speedOut: 400, // Close animation
        daysHidden: 30, // Duration to hide the banner after being closed (0 = always show banner)
        daysReminder: 30,
        // appendToSelector: 'body',
        layer: true
      });
    }
    setTimeout(() => {

      var head = $("#VHEAD"),
          bnr01 = $(".bnr-01"),
          bnr02 = $(".bnr-02"),
          bnrelm_height = head.outerHeight() + bnr01.outerHeight() + bnr02.outerHeight() + 2;
  
      $("#smartbanner").css("top",  bnrelm_height + "px");
      console.log(head.outerHeight() + bnr01.outerHeight() + bnr02.outerHeight());

    }, "1000")
  });

  if(navigator.userAgent.search(/Android/) != -1){
    $(".bnrKuji").css("display", "none");
  }
}, false);


// var loadDeferredStyles = function() {
//   var addStylesNode = document.getElementById("deferred-styles");
//   var replacement = document.createElement("div");
//   replacement.innerHTML = addStylesNode.textContent;
//   document.body.appendChild(replacement)
//   addStylesNode.parentElement.removeChild(addStylesNode);
// };
// var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
//     window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
// if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
// else window.addEventListener('load', loadDeferredStyles);

