
/* ----------------------------------------------

 :: 実装一覧 ::

 - 統合メニュー
 - ページ下部の【ログイン・上へ】の表示制御
 - 【上へ】のスクロールアニメーション
 - メインビジュアル（ビジタートップ用）

---------------------------------------------- */


$(function(){

  // 統合メニュー
  var member_cookie = $.cookie('Rg_sec');

  if(typeof member_cookie !== 'undefined'){

    // ページ読み込み時の表示指定
    $('.toggle-container').hide();

    $('.btn-menu-toggle span').addClass('open').removeClass('close');
    $('.btn-menu-toggle span .txt').text('開く');

    var toggleflg = 'close';

    // ボタンクリック時にイベント開始
    $('.btn-menu-toggle').on('click',toggleMenu);


  }else if(typeof member_cookie === 'undefined'){

    // フラグの初期化
    var toggleflg = 'open';

    // ボタンクリック時にイベント開始
    $('.btn-menu-toggle').on('click',toggleMenu);

  }

  function toggleMenu(){
    // 要素の開閉
    $('.toggle-container').slideToggle();
    // トグルボタンのテキスト書き換え・フラグ指定
    if(toggleflg === 'close'){
      $('.btn-menu-toggle span').addClass('close').removeClass('open');
      $('.btn-menu-toggle span .txt').text('閉じる');
      toggleflg = 'open';
    }else{
      $('.btn-menu-toggle span').addClass('open').removeClass('close');
      $('.btn-menu-toggle span .txt').text('開く');
      toggleflg = 'close';
    }
  }

  // ページ下部の【ログイン・上へ】の表示制御

  $(window).on('scroll',function(){


    var windowHeight = $(this).scrollTop(),
        scrollAmount = 100;


    if( windowHeight > scrollAmount ){
      $('.bottom-icon__list').addClass('fixed').fadeIn();
    }else if( windowHeight < scrollAmount ){
      $('.bottom-icon__list').removeClass('fixed').fadeOut();
    }

  });

  // 【上へ】のスクロールアニメーション
  $('.bottom-icon__item.scrolltop').on('click',function(){

    var speed    = 500,
        target   = $('#top'),
        position = target.offset().top;


    $("html, body").animate({scrollTop:position}, speed, "swing");

    return false;

  });

  // キャンペーン・お得な情報
  $('.slider-01').ready(function(){
    $('.slider-01').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: false,
      // speed: 1000,
      infinite: true,
      draggable:false,
      swipe: true,
      dots: true,
      dotsClass: 'dots-slider',
      arrows: false
    });
  });

  // グループ用
  $('.slider-02').ready(function(){
    $('.slider-02').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      // speed: 1000,
      infinite: true,
      draggable:false,
      swipe: true,
      dots: true,
      dotsClass: 'dots-slider',
      arrows: false
    });
  });

});


// メインビジュアル（ビジタートップ用）
$(function(){

  $('.s1-hero__container:not(.is-active)').hide();

  var tabLink    = $('.s1-hero__list .s1-hero__item'),
      tabContent = $('.s1-hero__main .s1-hero__container');

  tabLink.on('click',function(){

    if($(this).not('is-active')){

      $(this).addClass('is-active').siblings('.s1-hero__item').removeClass('is-active');

      var index = $(tabLink).index(this);

      tabContent.eq(index).addClass('is-active').fadeIn('slow').siblings('.s1-hero__container').removeClass('is-active').hide();
    }

  });
});

  /* --------------------------------------------------
   * アコーディオン 
   *
   * - ページ読み込み時非表示
   * - クリックイベント（スライドトグル・クラスの切替え）
  */

  // ページ読み込み時初期表示
  $('.s1-accordion__body').hide();
  $('.s1-accordion-type02__body').hide();
  // クリックイベントによるコンテンツの開閉
  $('.s1-accordion-btn').on('click',function(){
    $(this).next().slideToggle();
    $(this).toggleClass('is-open');
  });

  // アンカーリンク対応
  $(location.hash).next('.s1-accordion__body').show();


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
    var tempHeadMain = '<div class="s1-news"><ul class="s1-news__list">'
    var tempFootMain = '</ul></div>'
    $.ajaxSetup({ async: false });
    $.getJSON('/web/shared/json/info/info_top.json').then(
      function(data){
        //console.log(data);
        var srcv = ""; //非会員
        var srcm = ""; //会員

        //メイン関数
        function outPutSrc(mv,array){
          var src = ''
          if(mv == "v"){
            for(let i in array){
              var flag = array[i].imp
              if(array[i].spvtop != ""){
                src = src + '<li class="s1-news__item">'+(flag =="〇" ? '<span class="s1-news__important">重要</span>' : '<span class=\"s1-news__'+ array[i].class +'\">'+ array[i].label +'</span>')+'<span class="s1-news__info"><a'+(array[i].blank =="〇" ? ' target=\"_blank\"' : '' )+' href="'+array[i].ursp+'" data-ratid="sp_top_visitor_info__'+array[i].slid+'" data-ratevent="click" data-ratparam="all">'+array[i].title+'</a></span></li>'
              }              
            }
          }else if(mv == "m"){
            for(let i in array){
              var flag = array[i].imp
              if(array[i].spmtop != ""){
                src = src + '<li class="s1-news__item">'+(flag =="〇" ? '<span class="s1-news__important">重要</span>' : '<span class=\"s1-news__'+ array[i].class +'\">'+ array[i].label +'</span>')+'<span class="s1-news__info"><a'+(array[i].blank =="〇" ? ' target=\"_blank\"' : '' )+' href="'+array[i].ursp+'" data-ratid="sp_top_visitor_info__'+array[i].slid+'" data-ratevent="click" data-ratparam="all">'+array[i].title+'</a></span></li>'
              }
            }
          }
          return src
        }

        //非会員
        var mv = "v"
        srcv = tempHeadMain + outPutSrc(mv,data); + tempFootMain;
        srcv = srcv.replace(/【重要】/g,'');

        //会員
        var mv = "m"
        srcm = tempHeadMain + outPutSrc(mv,data); + tempFootMain;
        srcm = srcm.replace(/【重要】/g,'');

        $("#data-json-info-v").replaceWith(srcv);
        $("#data-json-info-m").replaceWith(srcm);
      });
    //現在時刻取得
    function getNowYMDhmStr(){
      const date = new Date()
      const Y = date.getFullYear()
      const M = ("00" + (date.getMonth()+1)).slice(-2)
      const D = ("00" + date.getDate()).slice(-2)
      const h = ("00" + date.getHours()).slice(-2)
      const m = ("00" + date.getMinutes()).slice(-2)
      return Y + M + D + h + m
    }
    var tempHead4 = '<ul class="seminar__list">';
    var tempFoot4 = '</ul>'
    var timestamp = getNowYMDhmStr();
    fetch("/web/learn/seminar/json/seminar_top.json", {
      method: "get",
      cache: "no-store",
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        var src = "";
        var cnt = 0;
        for(let i in data){
          var tagArray = data[i].tag.split(',');
          var flagTime3 = data[i].time3 - timestamp;
          //console.log(flagTime3);
          var tag = '<span class="icon">'+tagArray[0]+'</span>'
          if(flagTime3 > 0){
            if(cnt < 3){
              src = src + '<li class="seminar__item"><a href="'+data[i].spurl+'" data-ratid="sp_top_seminar_'+data[i].rat+'" data-ratevent="click" data-ratparam="all"><div class="seminar__txtContent">'+tag+'<span class="date">'+data[i].date+' '+data[i].datetime+' </span><span class="txt">'+data[i].title+'</span></div><div class="seminar__img"><img src="'+data[i].path+'248x248.png" alt="" class="lazyloaded"></div></a></li>'
              cnt = cnt + 1;
            }
          }
        }
        src = tempHead4 + src + tempFoot4;
        $("#data-json-seminar").replaceWith(src);
        //console.log(src);
      });
  });