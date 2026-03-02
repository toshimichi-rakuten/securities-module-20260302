/*!
 * caution-access.js
 * フィッシングサイト対策用 javascript
 *
 */
!/\.rakuten-sec\.(?:co\.jp|ne\.jp|com|hk)\.?$/.test(location.hostname) && function($) {
  var $window = $(window),
      $document = $(document),
      setDocumentSize = function() {
        return 'width:' + $window.width() + 'px!important;height:' + $document.height() + 'px!important;';
      },
      IE = /MSIE [6789]/.test(window.navigator.userAgent),
      $message = $('<div id="rb-alert-fishing-message">');

  var CSS_common =
        'z-index:2147483647!important;' +
        'position:' + (IE ? 'absolute' : 'fixed') +
        '!important;left:0px!important;' +
        'top:0px!important;',
      $overlay = $('<div class="rb-alert-fishing-overlay">'),
      $overlayInner = $('<div class="rb-alert-fishing-inner">');

  var createMessage = function(lang) {
    if (lang == 'jp') {
      $message.html('<a href="#" id="close-btn" class="button" data-func="close">Close</a>' +
        '<span class="lang">日本語 / <a href="#" class="button" data-lang="en">English</a></span>' +
        '<div>このページは楽天証券サイトを装っている可能性があります</div>' +
        '<p>このページがwww.rakuten-sec.co.jp以外のドメインで表示されていることを検知しました。個人情報を悪用されたり、詐欺被害に繋がる恐れもあるため、楽天証券のユーザーID・ログインパスワード・暗証番号など、個人情報の入力を行わないようご注意ください。</p>'
      );
    } else if (lang == 'en') {
      $message.html('<a href="#" id="close-btn" class="button" data-func="close">Close</a>' +
        '<span class="lang"><a href="#" class="button" data-lang="jp">日本語</a> / English</span>' +
        '<div>Caution: Web spoofing is detected</div>' +
        '<p>The page is displayed via the other web site. This caution can be displayed when the translation service is used. If you think this may be the case, you can close this pop-up. If you have no idea, please do not input any private information.</p>'
      );
    }

    $('.button', $message).click(function(){
      var $this = $(this);
      if ($this.attr('data-lang')) {
        var target = $this.attr('data-lang');
        $message.remove();
        createMessage(target);
        $overlayInner.append($message);
      } else if ($this.attr('data-func') === 'close') {
        $overlay.remove();
        $overlayInner.remove();
      }
      return false;
    });
  };




  var setCSS = function(a) {
        $overlay.css('cssText',
          'background:#000000!important;' +
          'background-image:none!important;' +
          'filter:alpha(opacity=80)!important;' +
          'opacity:0.8!important;' + CSS_common + a);
        $overlayInner.css('cssText',
          'background-image:none!important;' +
          'text-align:center!important;' + CSS_common + a);
      };

  createMessage('jp');
  setCSS(setDocumentSize());
  $overlayInner.append($message);
  $('body').append($overlay).append($overlayInner);
  $('body').append('<style>' +
    '#rb-alert-fishing-message {' +
      'position: relative;' +
      'width: 700px!important;' +
      'margin: 100px auto 0!important;' +
      'padding: 70px 30px 30px!important;' +
      'background: #ffffff!important;' +
      'color: #000000!important;' +
      'text-align: left!important;' +
    '}' +
    '#rb-alert-fishing-message div {' +
      'margin: 0!important;' +
      'padding: 0 0 8px!important;' +
      'background: #ffffff!important;' +
      'background-image: none!important;' +
      'border-bottom: 2px solid #bf0000!important;' +
      'font-size: 18px!important;' +
      'font-weight: bold!important;' +
      'text-align: center!important;' +
      'color: #bf0000!important;' +
    '}' +
    '#rb-alert-fishing-message p {' +
      'margin:1.0em 0 0;important;' +
      'padding:0px!important;' +
      'background:#ffffff!important;' +
      'line-height:1.5!important;' +
      'font-size:18px!important;' +
      'color:#000000!important;' +
    '}' +
    '#rb-alert-fishing-message a {' +
      'background: #ffffff!important;' +
      'font-size: 18px!important;' +
      'font-weight: bold!important;' +
      'color: #0000ff!important;' +
      'text-decoration: underline!important;' +
    '}' +
    '#rb-alert-fishing-message #close-btn {' +
      'position: absolute;' +
      'top: 20px;' +
      'left: 30px;' +
    '}' +
    '#rb-alert-fishing-message .lang {' +
      'position: absolute;' +
      'top: 20px;' +
      'right: 30px;' +
    '}' +
  '</style>');

  setCSS(setDocumentSize());

  $window.resize(function() {
    setCSS(setDocumentSize());
  });

  IE && $window.scroll(function(){
    setCSS(setDocumentSize() + 'top:' + $window.scrollTop() + 'px!important;');
  });

}(jqBase||jQuery);
