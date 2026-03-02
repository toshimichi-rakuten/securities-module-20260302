
/*!
Rakuten Common Header
@copyright Rakuten, inc.
@version 0.1.4
 */
window.jqBase=jQuery.noConflict(!0),


/*!
Rakuten Securities Section Nav in Header
 */
(function($){
    var Header = (function(){
        var delayTime = 400;
        var floatPoint = 850;

        var _Class = function() {
            this.$window = $(window);
            this.$header = $('div.rc-h-standard');
            this.$navs   = this.$header.find('ul.rc-h-section-nav,ul.rc-h-float-nav').find('a,b');
            this.$panels = this.$header.find('div.rc-h-dropdown-panel');
            this.timer   = null;
            this.tapFlag = false;
            this.tapEvent= null;
            setEvents.call(this);
        };

        _Class.prototype.showDropdown = function() {
            var that = this;

            if(that.category) {
                that.$navs.filter('[data-h-dropdown=' + that.category + ']').addClass('rc-h-hover');
                that.$panels.each(function(){
                    var $panel = $(this), $inner;

                    if($panel.hasClass('rc-h-panel-' + that.category)){
                        $panel.css({
                            width: 0,
                            height: 0
                        });
                        $panel.show();
                        $inner = $panel.children();
                        $panel.css({
                            width: $inner.outerWidth(),
                            height: $inner.outerHeight()
                        });
                    }
                });
            }
        };

        _Class.prototype.hideDropdown = function() {
            this.$navs.removeClass('rc-h-hover');
            this.$panels.hide();
            this.category = void 0;
        };

        var setEvents = function() {
            this.$navs
                .bind('mouseenter', onEnterNav.call(this))
                .bind('mouseleave', onLeaveNav.call(this))
                .filter('b')
                .bind('touchstart', onTouchStartNav.call(this))
                .bind('touchmove',  onTouchMoveNav.call(this))
                .bind('touchend',   onTouchEndNav.call(this));

            this.$panels
                .bind('mouseenter', onEnterDropdown.call(this))
                .bind('mouseleave', onLeaveDropdown.call(this));

            this.$window
                .bind('touchstart', onTouchStartDoc.call(this));

            if(this.$header.find('.rc-h-float-bar').length > 0){
                this.$window
                    .bind('scroll', onScroll.call(this));
            }
        };

        var onScroll = function() {
            return (function(_this) {
                return function() {
                    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

                    if(scrollY > floatPoint) {
                        _this.$header.addClass('rc-h-floating');
                    } else {
                        _this.$header.removeClass('rc-h-floating');
                    }
                };
            })(this);
        };

        var onTouchStartDoc = function() {
            return (function(_this) {
                return function() {
                    onLeaveNav.call(_this)();
                };
            })(this);
        };

        var onTouchStartNav = function() {
            return (function(_this) {
                return function(e) {
                    _this.tapFlag = true;
                    _this.tapEvent = e;
                    e.stopPropagation();
                    e.preventDefault();
                };
            })(this);
        };

        var onTouchMoveNav = function() {
            return (function(_this) {
                return function() {
                    _this.tapFlag = false;
                    _this.tapEvent = null;
                };
            })(this);
        };

        var onTouchEndNav = function() {
            return (function(_this) {
                return function() {
                    var currentTarget;

                    if(_this.tapFlag) {
                        currentTarget = _this.tapEvent.currentTarget;

                        // if(_this.category === $(currentTarget).data('h-dropdown')) {
                        if(_this.category === $(currentTarget).attr('data-h-dropdown')) {
                            _this.hideDropdown();
                        } else {
                            onEnterNav.call(_this).call(currentTarget);
                        }
                    }
                    _this.tapFlag = false;
                    _this.tapEvent = null;
                };
            })(this);
        };

        var onEnterNav = function() {
            return (function(_this) {
                return function() {
                    // var category = $(this).data('h-dropdown');
                    var category = $(this).attr('data-h-dropdown');
                    clearTimeout(_this.timer);

                    if(category !== _this.category) {
                        _this.hideDropdown();
                        // _this.category = $(this).data('h-dropdown');
                        _this.category = $(this).attr('data-h-dropdown');
                        _this.showDropdown();
                    }
                };
            })(this);
        };

        var onLeaveNav = function() {
            return (function(_this) {
                return function() {
                    _this.timer = setTimeout(function() {
                        _this.hideDropdown();
                    }, delayTime);
                };
            })(this);
        };

        var onEnterDropdown = function() {
            return (function(_this) {
                return function() {
                    clearTimeout(_this.timer);
                };
            })(this);
        };

        var onLeaveDropdown = function() {
            return (function(_this) {
                return function() {
                    _this.timer = setTimeout(function() {
                        _this.hideDropdown();
                    }, delayTime);
                };
            })(this);
        };

        return _Class;
    })();

    $(function() {
        new Header();
    });

})(window.jqBase || jQuery);


/*!
Rakuten Securities Subsection Nav in Header
 */
(function($){
    var path = location.pathname,
        arrPath,
        subMenu;

    function searchPath(path) {
        subMenu.each(function (index){
            var checkPath = $(this).attr('href');
            if (checkPath.match(path)){
                $(this).addClass('rc-h-active');
                return false;
            }
            if (index === subMenu.length - 1) {
                arrPath.pop();
                if(arrPath.length === 2) {
                    return false;
                }
                path = arrPath.join('/') + '/';
                searchPath(path);
            }
        });
    }

    $(function() {
        if(path === '/') {
            return false;
        }
        arrPath = path.split('/');
        subMenu = $('.rc-h-subsection-nav').find('a');
        searchPath(path);
    });

})(window.jqBase || jQuery);
















/*========================
現在地ナビゲーション
========================*/
(function($) {
  $(document).ready(function() {
    if($('.local-navi').length) {
      navCreate();
    }
  });

  var navCreate = function() {
    var jsonPath = "/web/fund/json/localnavi.json";
    $.ajax({
      type: 'GET',
      url: jsonPath,
      dataType: 'json',
      async: false,
      success: function(data) {
        // 出力先
        var lnav = $('.local-navi');
        //lnav.empty();
        // 大見出し生成
        lnav.append('<div class="local-navi__header"><a class="local-navi__category-link local-navi__category-link--active" href="' + data.header_url + '">' + data.header_name + '</a></div>');
        // 本体定義
        var lnav_body = $('<ul class="local-navi__body"></ul>');
        // ルート相対パス取得
        var current_url = location.pathname;
        if(current_url.slice(-1) == '/') {
          current_url += 'index.html';
        }
        // [debug] URL一次変更
        //current_url = '/web/fund/saving/learn/index.html'
        //current_url = '/web/fund/saving/simulation/index.html'
        //current_url = '/web/fund/saving/way.html'
        //current_url = '/web/fund/learn/about/merit.html'
        //current_url = '/web/fund/index.html'
        // カレント項目未発見フラグ初期化
        var undiscovered = true;
        // JSONパース(カテゴリオブジェクト配列のループ処理)
        $.each(data.categories, function(index, cat){
          // アクティブフラグ初期化
          var active = false;
          // ※除外処理を実装するならここに入れる
          if(undiscovered && cat.category_pattern) {
            // パターン指定が存在すれば前方一致で判断
            $.each(cat.category_pattern, function(index, value){
              // 前方一致パターン配列のループ処理
              if(current_url.indexOf(value) === 0) {
                // 一致したら残りはアクティブフラグを立てて残りはキャンセルして抜ける
                active = true;
                undiscovered = false;
                return false;
              }
            });
          } else {
            // パターン指定が存在しなければ完全一致で判断
            if(current_url == cat.category_url) {
              active = true;
              undiscovered = false;
            }
          }
          // 中身のhtmlを生成
          if(active) {
            // アクティブ
            if(cat.items) {
              // 区分がない場合
              // Lv2項目を生成して直接挿入
              // Lv1項目にLv2項目を挿入
              lnav_body.append('<li class="local-navi__category--active"><i class="s-glyph">&#xf113;</i><a href="' + cat.category_url + '" class="local-navi__category-link--active">' + cat.category + '</a><div class="local-navi__accordion"><ul class="local-navi__items">' + itemCreate(cat.items, current_url) + '</ul></div></li>');
            } else if(cat.accordion) {
              // 区分がある場合
              // Lv1項目を生成
              var lnav_items = $('<li class="local-navi__category--active"><i class="s-glyph">&#xf113;</i><a href="' + cat.category_url + '" class="local-navi__category-link--active">' + cat.category + '</a></li>');
              // Lv2項目のガワを生成
              var lnav_acc = $('<dl class="local-navi__accordion"></dl>');
              // Lv2項目の中身を生成
              $.each(cat.accordion, function(index, acc){
                // Lv2見出し
                lnav_acc.append('<dt class="local-navi__accordion-heading">' + acc.heading + '</dt>');
                // Lv2項目
                lnav_acc.append('<dd><ul class="local-navi__items">' + itemCreate(acc.items, current_url) + '</ul></dd>');
              });
              // Lv1項目にLv2項目を挿入
              lnav_items.append(lnav_acc);
              // 合体
              lnav_body.append(lnav_items);
            } else {
              // アクティブかつ下層なし (アクティブのLv1項目を挿入)
              lnav_body.append('<li class="local-navi__category--active-single"><i class="s-glyph">&#xf113;</i><a href="' + cat.category_url + '" class="local-navi__category-link--active">' + cat.category + '</a></li>');
            }
          } else {
            // 非アクティブ (非アクティブのLv1項目を挿入)
            lnav_body.append('<li class="local-navi__category"><i class="s-glyph">&#xf113;</i><a href="' + cat.category_url + '" class="local-navi__category-link">' + cat.category + '</a></li>');
          }
        });
        // 中身を挿入
        lnav.append(lnav_body);
        return;
      }
    });
  }
  // 項目オブジェクト配列から項目htmlを生成する関数
  var itemCreate = function(items, current_url) {
    var html = '';
    var undiscovered = true;
    $.each(items, function(index, item){
      var active = false;
      // ※除外処理を実装するならここに入れる
      if(undiscovered && item.item_pattern) {
        // パターン指定が存在すれば前方一致で判断(配列)
        $.each(item.item_pattern, function(index, value){
          if(current_url.indexOf(value) === 0) {
            // 一致したら残りはキャンセルして抜ける
            active = true;
            undiscovered = false;
            return false;
          }
        });
      } else {
        // パターン指定が存在しなければ完全一致で判断
        if(current_url == item.item_url) {
          active = true;
          undiscovered = false;
        }
      }
      if(active) {
        html += '<li class="local-navi__item--active"><i class="s-glyph local-navi__item-bullet">&#xf11e;</i><a href="' + item.item_url + '" class="local-navi__item-link">' + item.item_name + '</a></li>';
      } else {
        html += '<li class="local-navi__item"><i class="s-glyph local-navi__item-bullet">&#xf11e;</i><a href="' + item.item_url + '" class="local-navi__item-link">' + item.item_name + '</a></li>';
      }
    });
    return html;
  }

})(jqBase);




























(function($) {
  $(function() {

    $.ajaxSetup({
      cache: false
    });
    //-------------------------------------------------------------------------
    // システム情報
    $.get("/ITS/system_info_web.xml", function(resp) {
      $("#system_info").append((resp.documentElement.firstChild.nodeValue).replace(/system_info/g, "/ITS/system_info/"));
    });

    /*
    var $feedbackPopup = $('[data-toggle=feedback]');
    if ($feedbackPopup.length > 0) {
      // $feedbackPopup.framePopup({
      //     width: 510,
      //     height: 540
      // });

      $feedbackPopup.click(function(e) {
        var _url = 'http://rakuten-sec.dga.jp/web_enq/feedback.html?current_url=' + document.location.pathname;
        window.open(_url, 'お客様の声をお聞かせください', 'width=540,height=460,menubar=no,toolber=no,location=no,status=no,resizable=no,scrollbars=no');
        e.preventDefault();
      });
    }

    var $pagetopAnchor = $('.s-pagetop-anchor');
    if ($pagetopAnchor.length > 0) {
      $pagetopAnchor.pagetopAnchor();
    }

    var $lazyImages = $('img.s-lazy');
    if ($lazyImages.length > 0) {
      $lazyImages.lazyload({
        effect: 'fadeIn',
        placeholder: '/web/shared/img/blank.png'
      });
    }
    */
    //-------------------------------------------------------------------------
    // 口座開設/NISA出し分け (jQuery 1.8)
    var rz = $.cookie("Rz");
    var rg = $.cookie("Rg_sec");
    if ((rz == null) && (rg == null)) { // デフォルト:非会員の場合
      $(".register").show();
      $(".register-nisa").hide();
    } else {
      if ((rz != null) && (rg == null)) { // 非会員・RzCookieを保持の場合
        $(".register").show();
        $(".register-nisa").hide();
      } else {
        if (rg.substr(111, 1) == '1') { // 入金実績
        } else {
          $(".register").hide();
          $(".register-nisa").show();
          if (rg.substr(5, 1) == '0') { // 口座申込済みの場合
          } else { // 初期設定完了済の場合
          }
        }
      }
    }
    //-------------------------------------------------------------------------
    // ログインフォーム開閉 (jQuery 1.8)
    $('.login-form--toggle-button').on('click', function() {
      var $this = $(this);
      if ($this.hasClass('login-form__heading--close')) {
        $this.removeClass('login-form__heading--close');
        $this.addClass('login-form__heading--open');
        $('.login-form__body').slideDown(100, function() {
          $this.children(":first").html('&nbsp;&#xf11d;');
        });
      } else {
        $('.ui-dialog-titlebar-close').click();
        $('.login-form__body').slideUp(100, function() {
          $this.removeClass('login-form__heading--open');
          $this.addClass('login-form__heading--close');
          $this.children(":first").html('&nbsp;&#xf11a;');
        });
      }
    });
    //-------------------------------------------------------------------------
    // ログインフォーム 同一画面遷移関連 (jQuery 1.8)
    // cookie書込
    $('#homeid').bind('change', function(){
      $this = $(this);
      if($this.val() == 'EQUAL') {
        $.cookie('homeid_fund', 'EQUAL', { expires: 30, path: '/'});
      } else {
        $.cookie('homeid', $this.val(), { expires: 30, path: '/'});
        $.cookie('homeid_old', $this.val(), { expires: 30, path: '/'});
        $.cookie('homeid_fund', null, { path: '/'});
      }
    });
    // cookie読込
    var homeid = $.cookie('homeid');
    var homeid_fund = $.cookie('homeid_fund');
    var homeid_old = $.cookie('homeid_old');
    // 状態復元
    if(homeid != null) {
      if(homeid_fund == 'EQUAL' && (homeid == homeid_old || homeid_old == null)) {
        $('#homeid').val('EQUAL');
      } else {
        $('#homeid').val(homeid);
      }
    } else {
      // 初期化
      $.cookie('homeid', 'HOME', { expires: 30, path: '/'});
      $.cookie('homeid_fund', 'EQUAL', { expires: 30, path: '/'});
    }
    //-------------------------------------------------------------------------
    // memberPath生成・セット
    var memberpath = '';
    var pathname = window.location.pathname.replace('/web/', '');
    var search = window.location.search;
    if(pathname == 'fund/detail/') {
      // 商品詳細
      memberpath = pathname + search;
    } else if(pathname == 'fund/find/ranking/ranking.html') {
      // ランキング
      var rankingargs = [];
      //$('.str-main-inner').children('input[type=hidden]').each(function(){
      $('#rankSettingsField input[type=hidden]').each(function(){
        rankingargs.push(this.name + '=' + this.value);
      });
      memberpath = pathname + '?' + rankingargs.join('&');
    } else {
      if(pathname.slice(-1) == '/') {
        memberpath = pathname + 'index.html';
      } else {
        memberpath = pathname;
      }
    }
    $('#form-login-path').val(memberpath);
    //-------------------------------------------------------------------------
    // お気に入りフッター開閉 (jQuery 1.6)
    $('.footer-fav__checked-button').click(function() {
      var $this = $(this);
      var $slide = $('.footer-fav');
      if ($slide.hasClass('footer-fav--open')) {
        $slide.removeClass('footer-fav--open');
        $slide.animate({
          bottom: "-=175"
        }, 100, function() {
          $this.children(":first").html('&#xf11d;');
        });
      } else {
        $slide.addClass('footer-fav--open');
        $slide.animate({
          bottom: "+=175"
        }, 100, function() {
          $this.children(":first").html('&#xf11a;');
        });
      }
    });
    //-------------------------------------------------------------------------
    // 文字サイズ変更 (jQuery 1.6)
    // ボタンバインド
    $('.font-size__buttons').children().click(function(){
      $this = $(this);
      $('.font-size__buttons').children().eq(0).attr('class', 'font-size__button--small');
      $('.font-size__buttons').children().eq(1).attr('class', 'font-size__button--medium');
      $('.font-size__buttons').children().eq(2).attr('class', 'font-size__button--large');
      var size = $this.attr('class').slice(19)
      $.cookie('rsec_fund_fontsize', size, { expires: 365 });
      $this.attr('class', 'font-size__button--' + size + '--active');
      if(size == 'large') {
        $('.content-area, .breadcrumbs').css('font-size', '115%');
      } else if(size == 'small') {
        $('.content-area, .breadcrumbs').css('font-size', '87%');
      } else {
        $('.content-area, .breadcrumbs').css('font-size', '100%');
      }
    });
    // 初期化
    // cookie処理
    var font_size = $.cookie("rsec_fund_fontsize");
    if (font_size == null) {
      $('.font-size__button--medium').attr('class', 'font-size__button--medium--active');
    } else {
      $('.font-size__button--' + font_size).attr('class', 'font-size__button--' + font_size + '--active');
      if(font_size == 'large') {
        $('.content-area, .breadcrumbs').css('font-size', '115%');
      } else if(font_size == 'small') {
        $('.content-area, .breadcrumbs').css('font-size', '87%');
      }
    }
    //-------------------------------------------------------------------------
    // [汎用] タブ (jQuery1.6-1.8)
    // アクティブタブ展開
    $('.tab').each(function(){
      var $this = $(this);
      var target = $this.children().children('.tab__button--active').index() + 1;
      $this.children('.tab__container' + target).fadeIn(100);
    });
    // ボタンバインド
    $('.tab__button, .tab__button--single').live('click', function(){
      var $this = $(this);
      if($this.hasClass('tab__button--active')) {
        return;
      }
      var target = $this.index() + 1;
      var $buttons = $this.parent();
      var $tab = $buttons.parent();
      $buttons.children('.tab__button--active').removeClass('tab__button--active');
      $this.addClass('tab__button--active');
      $tab.children('.tab__container').hide();
      $tab.children('.tab__container' + target).show();
      //$tab.children('.tab__container').fadeOut(100).promise().done(function(){
      //  $tab.children('.tab__container' + target).fadeIn(100);
      //});
    });
  });
  //-------------------------------------------------------------------------
  $(window).load(function() {
    // [汎用] 高さ自動調整 (jQuery 1.6)
    var $targets = $('.autoheight');
    if($targets.length) {
      $targets.each(function() {
        var height = [];
        var $this = $(this);
        $this.children().each(function() {
          height.push($(this).height())
        });
        var max_height = Math.max.apply(null, height);
        $this.children().height(max_height);
      });
    }
    // [汎用] 天地中央寄せ
    var $targets = $('.lt-ie8 .style__va-m');
    if($targets.length) {
      $targets.each(function() {
        var children_height = 0;
        $(this.children).each(function(){
          children_height += this.offsetHeight;
        });
        var parent_height = this.parentNode.offsetHeight;
        if(children_height < parent_height) {
          this.children[0].style.cssText  = 'padding-top: ' + (parent_height - children_height) / 2 + 'px;';
        }
      });
    }
  });
})(jqBase);

//-----------------------------------------------------------------------------
// [汎用] 高さ調整plugin版 (jQuery1.6)
jqBase.fn.adjustheight = function(target) {
  var height = [];
  this.find(target).each(function() {
    height.push(jqBase(this).height());
  });
  var max_height = Math.max.apply(null, height);
  this.find(target).height(max_height);
};

