
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

  //赤枠
  $(function() {
    var tempHead1 = '<section class="s1-section--01"><div class="s1-news-box s1-section s1-emergency-box--top" style="font-size:14px; line-height: 1.5; padding: 16px; margin-bottom:16px; border: 2px solid #C03228; background-color:#FBF2F2;">'
    var tempFoot1 = '</div></section>'
    $.ajaxSetup({ async: false });
    $.getJSON('/web/shared/json/info/info_red.json').then(
      function(data){
        //console.log(data);
        var srcv = ""; //非会員
        var srcm = ""; //会員
        //var lastkey = data.length;
        var regex = /(.*)\%\%\%(.+)\%\%\%(.*)/;
        for(let i in data){
          var detail = data[i].title.match(regex);
          const mainFunc = function(srcx){ //メインの分岐条件を関数化
            if(detail != null){
              return srcx + '<p style="color: #df0101;">・' + detail[1] + '<br><a' + (data[i].blank =="〇" ? ' target=\"_blank\"' : '' ) + ' href="'+data[i].ursp+'" onclick="s.lidTrack(\'sp_top_important_'+data[i].slid+'\')">'+detail[2]+'</a></p>'
            }else{
              return srcx + '<p><a' + (data[i].blank =="〇" ? ' target=\"_blank\"' : '' ) + ' href="'+data[i].ursp+'" onclick="s.lidTrack(\'sp_top_important_'+data[i].slid+'\')">・'+data[i].title+'</a></p>'
            } 
          }
          if(data[i].spvtop != ""){
            srcv = mainFunc(srcv);
          }
          if(data[i].spmtop != ""){
            srcm = mainFunc(srcm);
          }
        }
        if(srcv!=''){
          srcv = tempHead1 + srcv + tempFoot1;
        }else{
          srcv = '';
        }
        if(srcm!=''){
          srcm = tempHead1 + srcm + tempFoot1;
        }else{
          srcm = '';
        }
        //console.log(srcv);
        //console.log(srcm);
        $("#data-json-red-v").replaceWith(srcv);
        $("#data-json-red-m").replaceWith(srcm);
      });
    var tempHeadMain = '<div class="s1-news">'
    var tempFootMain = '</div>'
    $.ajaxSetup({ async: false });
    $.getJSON('/web/shared/json/info/info_top.json').then(
      function(data){
        //console.log(data);
        var srcv = ""; //非会員
        var srcm = ""; //会員
        const dataImp = data.filter(function(elm) {
          return elm.imp == "〇";
        });
        const dataNor = data.filter(function(elm) {
          return elm.imp != "〇";
        });
        //console.log(dataNor);
        var tempHeadImp = '<div class="s1-emergency-box"><ul class="s1-news__list">'
        var tempFootImp = '</ul></div>'
        var srcImp = ''
        var tempHeadNor = '<ul class="s1-news__list">'
        var tempFootNor = '</ul>'
        var srcNor = ''

        //メイン関数
        function outPutSrc(mv,flag,array){
          var src = ''
          if(mv == "v"){
            for(let i in array){
              if(array[i].spvtop != ""){
                src = src + '<li class="s1-news__item">'+(flag =="Imp" ? '<span class="s1-news__important">重要</span>' : '<span class="s1-news__date">'+dataNor[i].date+'</span>')+'<span class="s1-news__info"><a'+(array[i].blank =="〇" ? ' target=\"_blank\"' : '' )+' href="'+array[i].ursp+'" data-ratid="sp_top_visitor_info__'+array[i].slid+'" data-ratevent="click" data-ratparam="all">'+array[i].title+'</a></span></li>'
              }              
            }
          }else if(mv == "m"){
            for(let i in array){
              if(array[i].spmtop != ""){
                src = src + '<li class="s1-news__item">'+(flag =="Imp" ? '<span class="s1-news__important">重要</span>' : '<span class="s1-news__date">'+dataNor[i].date+'</span>')+'<span class="s1-news__info"><a'+(array[i].blank =="〇" ? ' target=\"_blank\"' : '' )+' href="'+array[i].ursp+'" data-ratid="sp_top_visitor_info__'+array[i].slid+'" data-ratevent="click" data-ratparam="all">'+array[i].title+'</a></span></li>'
              }
            }
          }
          return src
        }

        var flag1 = "Imp"
        var flag2 = "Nor"

        //非会員
        var mv = "v"
        srcv = tempHeadMain + tempHeadImp + outPutSrc(mv,flag1,dataImp) + tempFootImp + tempHeadNor + outPutSrc(mv,flag2,dataNor); + tempFootNor + tempFootMain;
        srcv = srcv.replace(/【重要】/g,'');

        //会員
        var mv = "m"
        srcm = tempHeadMain + tempHeadImp + outPutSrc(mv,flag1,dataImp) + tempFootImp + tempHeadNor + outPutSrc(mv,flag2,dataNor); + tempFootNor + tempFootMain;
        srcm = srcm.replace(/【重要】/g,'');

        $("#data-json-info-v").replaceWith(srcv);
        $("#data-json-info-m").replaceWith(srcm);
      });
  });

  $(function(){
    $("#search").on("click", function() {
    $(".headerSearchBox").toggleClass("active");//開いた時、検索窓にクラスを追加
    });
  });

  $(function(){
    // footer要素の後に「上へ・表示モード」ボタン設置
    $('.footer-content-area').after('<ul class="bottom-icon__list" style="display: none;"><li class="bottom-icon__item" id="float-modeselect"><a href="/smartphone/mode-select.html"><div class="rex-icon rex-icon--bottom rex-icon-mode-switching"></div><span class="bottom-icon__text">表示モード</span></a></li><li class="bottom-icon__item scrolltop"><div class="rex-icon rex-icon--bottom rex-icon-arrow-up"></div><span class="bottom-icon__text">上へ</span></li></ul>');

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
    $('.slider-01').fadeIn(300);
  });



}, false);

// 銀行連携出し分け
window.addEventListener( 'load', function(){

  var rg = getCookieBank("Rg_sec");
  
  var rbankViewFlag = true;
  var depoViewFlag = true;
  if(rg == null) {
    // $("#RBANK").hide();
    rbankViewFlag = false;
  } else {
    if(rg.substr(111,1) == '1') {
      // $("#DEPO").hide();
      depoViewFlag = false;
      var flg = parseInt(rg.substr(101,1));
      switch(flg){
      case 0:
      case 3:
      case 9:
          break;
      case 1:
      case 2:
        // $("#RBANK").hide();
        rbankViewFlag = false;
        break;
      }
    } else {
      // $("#RBANK").hide();
      rbankViewFlag = false;
    }
  }
  if(rbankViewFlag) {
    $("#RBANK").show();
  }
  if(depoViewFlag) {
    $("#DEPO").show();
  }
  
  function getCookieBank( name )
  {
    var result = null;
  
    var cookieName = name + '=';
    var allcookies = document.cookie;
  
    var position = allcookies.indexOf( cookieName );
    if( position != -1 ) {
      var startIndex = position + cookieName.length;
      var endIndex = allcookies.indexOf( ';', startIndex );
      if( endIndex == -1 ) {
        endIndex = allcookies.length;
      }
      result = decodeURIComponent( allcookies.substring( startIndex, endIndex ) );
    }
    return result;
  }
}, false);

// NISA出し分け
document.addEventListener("DOMContentLoaded", function() {

  var rg = getCookieNisa("Rg_sec");
  
  if(rg == null) {
  } else {
    var flg = parseInt(rg.substr(788,2));
    switch(flg){
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
        break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      $("#NISAACC").hide();
      break;
    }
  }
  function getCookieNisa( name )
  {
    var result = null;
  
    var cookieName = name + '=';
    var allcookies = document.cookie;
  
    var position = allcookies.indexOf( cookieName );
    if( position != -1 ) {
      var startIndex = position + cookieName.length;
      var endIndex = allcookies.indexOf( ';', startIndex );
      if( endIndex == -1 ) {
        endIndex = allcookies.length;
      }
      result = decodeURIComponent( allcookies.substring( startIndex, endIndex ) );
    }
    return result;
  }
  
});


window.addEventListener( 'load', function(){
  $(function(){
    var cookieValue = $.cookie('mode-select');
    if( cookieValue === '1' ){
      $('.s1-mode-select__title').addClass('s1-mode-select__item01');
      $('.s1-mode-select__title').text("標準モード");
      $('.s1-mode-select__text').text("初心者の方からアクティブな方までオススメ。");
    }else if( cookieValue === '2' ){
      $('.s1-mode-select__title').addClass('s1-mode-select__item02');
      $('.s1-mode-select__title').text("マーケット・投資情報モード");
      $('.s1-mode-select__text').text("マーケット情報、レポートなど投資情報を優先表示。");
    }else if( cookieValue=== '3' ){
      $('.s1-mode-select__title').addClass('s1-mode-select__item03');
      $('.s1-mode-select__title').text("オススメ情報優先モード");
      $('.s1-mode-select__text').text("楽天証券からのお知らせやキャンペーンなどを優先表示。");
    }
  });
}, false);


window.addEventListener( 'load', function(){
  $(function(){
    $('.mode-select__item--01').on('click',function(){
      $.removeCookie('mode-select');
      var expire = new Date(2030, 1).toUTCString();
      document.cookie = 'mode-select=1; expires=' + expire;

    });
    $('.mode-select__item--02').on('click',function(){
      $.removeCookie('mode-select');
      var expire = new Date(2030, 1).toUTCString();
      document.cookie = 'mode-select=2; expires=' + expire;
    });
    $('.mode-select__item--03').on('click',function(){
      $.removeCookie('mode-select');
      var expire = new Date(2030, 1).toUTCString();
      document.cookie = 'mode-select=3; expires=' + expire;
    });
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


$(document).ready(function() {
  const targetElementId = 'ai-chat';
  const cookieNameToCheck = 'Rg_sec';

  function checkCookieExists(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return true;
      }
    }
    return false;
  }

  if (checkCookieExists(cookieNameToCheck)) {
    $('#' + targetElementId).remove();
  }
});