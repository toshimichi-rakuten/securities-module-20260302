/*
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,n=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),i=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-n(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(i-a))<=o?r[r.length-1]=s.add(e):r.push(e),i=a}),r},i=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=i(e);if(o.remove){var n=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(n)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.2",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=a,r._parse=n,r._parseOptions=i,r._apply=function(e,o){var s=i(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),u=h.parents().filter(":hidden");return u.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),u.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),i=0;if(s.target)i=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),n=e.css("display");"inline-block"!==n&&"flex"!==n&&"inline-flex"!==n&&(n="block");var a={
display:n};a[s.property]="",e.css(a),e.outerHeight(!1)>i&&(i=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=n(e.css("border-top-width"))+n(e.css("border-bottom-width")),o+=n(e.css("padding-top"))+n(e.css("padding-bottom"))),e.css(s.property,i-o+"px"))})}),u.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),n=o.attr("data-mh")||o.attr("data-match-height");n in e?e[n]=e[n].add(o):e[n]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(n,a){if(a&&"resize"===a.type){var i=t(window).width();if(i===e)return;e=i;
}n?o===-1&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi);var h=t.fn.on?"on":"bind";t(window)[h]("load",function(t){r._update(!1,t)}),t(window)[h]("resize orientationchange",function(t){r._update(!0,t)})});



/* 
 * -------------------------------------------------------
 * -------------------------------------------------------
 * 
 * :::: 機能一覧 ::::
 *
 * 1 : ローカルナビ
 * 2 : アンカーリンク（スムーススクロール）
 * 3 : 目次開閉用トグル機能
 * 4 : アコーディオン
 * 5 : アコーディオン（白枠全体）
 * 6 : タブ機能
 * 7 : パンくずスクロール
 * 8 : ページ下部の【ログイン・上へ】の表示制御・スクロール
 * 9 : 各カルーセルのオプション設定
 *
 * -------------------------------------------------------
 * -------------------------------------------------------
*/


$(function(){


  // --------------------------------------------------
  // 表示制御用クラス付与

  $(window).on('load scroll',function(){

    var $html = $('html'),
        windowHeight = $(this).scrollTop(),
        scrollAmount = 56;

    // ローカルナビ
    if( windowHeight > scrollAmount ) {
      $html.addClass('localnav-fixed');
    } else if( windowHeight < 100 ){
      $html.removeClass('localnav-fixed');
    }

    // ページ下部【ログイン・上へ】
    if( windowHeight > scrollAmount ){
      $('.bottom-icon__list').addClass('fixed').fadeIn();
    }else if( windowHeight < scrollAmount ){
      $('.bottom-icon__list').removeClass('fixed').fadeOut();
    }

  });

  // footer要素の後に「上へ・ログイン」ボタン設置
  $('.smPusher').after('<ul class="bottom-icon__list" style="display: none;"><li class="bottom-icon__item"><a href="/smartphone/login.html"><img src="/smartphone/visitor/images/top/icon-bottom-login.png" alt=""></a></li><li class="bottom-icon__item scrolltop"><img src="/smartphone/visitor/images/top/icon-bottom-pagetop.png" alt=""></li></ul>');

  // ローカルナビを複製 → 変数に格納
  var $localFloatNavi = $('.s1-local-nav-cat').clone().addClass('s1-float-local-nav');
  // cloneがされていたらbody直前に挿入
  $localFloatNavi.clone(true).appendTo('body');


  if($('.s1-float-local-nav').length){
    // フロート用ローカルナビが存在したらボタン用のタグを設置
    $('.s1-local-nav-cat.s1-float-local-nav').before('<div id="js-localnav-btn" class="localnav-btn menu-trigger"><span></span><span></span><span></span></div>');
  }
  $('.localnav-btn').on('click',function(){
     $(this).next().slideToggle(); // ナビの開閉
     $(this).toggleClass('is-open');　// 開閉判定用クラスの付与
  });


  // ---------------------------------------------------------
  //  スクロール（アニメーション）処理

  $('.bottom-icon__item.scrolltop').on('click',function(){

    var speed    = 500,
        easing   = 'swing',
        target   = $('#top'),
        position = target.offset().top;

    $("html, body").animate({scrollTop:position}, speed, easing);

    return false;
  });


  /* --------------------------------------------------
   * 目次開閉用トグル機能 
   *
   * - クリックイベント（スライドトグル・クラスの切替え）
   * - テキストの切替
   *
  */
  $('.s1-list-anchor__toggle-txt').on('click',function(){
    $(this).next().slideToggle();
    $(this).toggleClass('is-open');
    if($(this).hasClass('is-open')){
      $(this).text('開く');
    }else{
      $(this).text('折りたたむ');
    }
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


  /* --------------------------------------------------
   * アコーディオン（白枠全体） 
   *
   * - クリックイベント（スライドトグル・クラスの切替え）
   * - テキストの切替
   *
  */

  $('.s1-accordion-type04__btn').on('click',function(){
    $(this).prev().slideToggle();
    $(this).toggleClass('is-open');
    if($(this).hasClass('is-open')){
      $(this).text('閉じる');
    }else{
      $(this).text('詳しく見る');
    }
    return false;
  });


  // --------------------------------------------------
  // タブ機能

  var tabMenu = function() {

    var $tabs        = $('.s1-tab-basic__list'),
        $content     = $('.s1-tab-content__block'),
        ACTIVE_CLASS = 'is-active';

    // 取得した値（id）を配列に格納
    var id_arr = $content.map(function() {
      return '#' + $(this).attr('id');
    }).get();

    // ハッシュを取得
    var getHash = function() {

      var hash  = window.location.hash,
          index = id_arr.indexOf(hash);

      if (index === -1) {
        return false;
      } else {
        return id_arr[index];
      }
    };

    // 初期化
    var initialize = function() {

      var hash = getHash(); // ハッシュを取得

      if (hash) {
        // URLにハッシュが含まれている場合
        $tabs.find('a[href="'+hash+'"]').addClass(ACTIVE_CLASS);
        $(hash).addClass(ACTIVE_CLASS);
      } else {
        // URLにハッシュが含まれていない場合
        $tabs.find('li:first-child a').addClass(ACTIVE_CLASS);
        $($content[0]).addClass(ACTIVE_CLASS);
      }
    };

    // タブのクリックイベント
    var addEvent = function() {
      $tabs.find('a').on('click', function() {

        var href = $(this).attr('href'),
            $targetContent = $(href);

        if ($(this).hasClass(ACTIVE_CLASS)) {
          return false;
        }

        $tabs.find('a').removeClass(ACTIVE_CLASS);
        $content.removeClass(ACTIVE_CLASS);

        $(this).addClass(ACTIVE_CLASS);
        $targetContent.addClass(ACTIVE_CLASS);

        $('.slider-step').slick('setPosition');
        $('.slide-img__inner').matchHeight();
        $('.slide-img__inner .txt').matchHeight();

        return false;
      });
    };

    return [initialize(), addEvent()];
  };
  tabMenu();


  /* --------------------------------------------------
   * アンカーリンク（スムーススクロール）
   *
   * - class : noscroll でスクロール処理から除外
   * - ページ内アンカーのアコーディオン展開
   *
  */

  $('a[href^="#"]').not('.noscroll').on('click', function() {

    var speed    = 300,
        easing   = 'swing',
        href     = $(this).attr('href'), // 
        target   = $(href == "#" || href === "" ? 'html' : href),
        position = target.offset().top;

    $('html, body').animate({scrollTop:position}, speed, easing);

    // アコーディオン機能:アンカーリンクで展開
    $(href).addClass('is-open').next().show();
 
    return false;
  });


  /* --------------------------------------------------
   * table（横スクロール）マークアップ調整
  */
  $('.scroll-box').wrap("<div class='scroll-box-wrap'></div>");


  /* ---------------------------------------------
   * 各カルーセルのオプション設定
   */

  // 看板
  $('.slider').ready(function(){
    $('.slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      infinite: true,
      draggable:false,
      swipe: true,
      dots: false,
      arrows: true,
      centerMode: true,
      centerPadding:'20px'
    });
  });

  // お知らせ
  $('.slider-info').ready(function(){
    $('.slider-info').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      infinite: true,
      draggable:false,
      swipe: true,
      dots: true,
      dotsClass: 'dots-info',
      arrows: false
    });
  });

  // STEP
  $('.slider-step').ready(function(){
    $('.slider-step').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      infinite: false,
      draggable:false,
      swipe: true,
      dots: true,
      arrows: true
    });
  });

  // STEP用文言の高さ揃え（jquery.matchHeight.js）
  $('.slide-img__inner .txt').matchHeight();

});

/* --------------------------------------------------
 * パンくずスクロール 
 *
 * - 要素がウインドウ内に入ったら一度だけ処理を実行
 *
*/


// 要素の位置を取得
var viewElement   = $('.s1-breadcrumbs').offset().top - $(window).height();
var animationFlag = false; // アニメーションフラグ：初期値

$(window).on('scroll',function(){

  if($(window).scrollTop() > viewElement){

    var breadcrumbW = $('.s1-breadcrumbs').width(); // パンくず要素の幅を取得

    if(!animationFlag){ // animationFlagがtrueでないときに処理を実行

      setTimeout(function(){
        $('.s1-breadcrumbs').animate({scrollLeft:breadcrumbW}, 1000);
      }, 500);

      animationFlag = true; // フラグの変更
    }

  }
});