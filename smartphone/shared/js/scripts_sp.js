"use strict";

(function ($) {
  megaMenu('.js-trigger[data-type="mega-down"]');
  headerSearch('.js-trigger[data-type="search"]');
  pullDown('.js-trigger[data-type="pull"]');
  accordion('.js-trigger[data-type="acc"]');
  megaClose('.js-megaClose');
  searchClose('.js-searchClose');
  globalNav('.js-trigger[data-modal-trigger]');
  megaEscape('.js-trigger');
  expect(); // hover behavior

  var ua = navigator.userAgent.toLowerCase();
  var link = $('.js-trigger[data-type="acc"],.js-trigger[data-type="mega-down"],.js-trigger[data-type="pull"]');
/*
  if (/android|ipod|ipad|iphone|macintosh/.test(ua) && 'ontouchend' in document) {
    link.on("touchstart", function () {
      $(this).addClass("is-hover");
    });
    link.on("touchend", function () {
      $(this).removeClass("is-hover");
    });
  } else {
    link.hover(function () {
      $(this).addClass("is-hover");
    }, function () {
      $(this).removeClass("is-hover");
    });
  }*/

  // カレントページの処理
  let matchedURLs = [];
  let longestMatchedValue = '';
  let currentUrl = '';

  //例外対応
  const fundURL = '/web/fund/smartphone/';
  const findSelectionURL = '/smartphone/rfund/find/selection/';
  const rfundGuideURL = '/smartphone/rfund/guide/';
  const fundTipsURL = '/smartphone/special/fund_tips/';
  const fopURL = '/smartphone/fop/';
  const foreignFuturesURL = '/smartphone/foreign_futures/';

  const isException = function(currentUrl, currentHref) {
    if ((currentHref == fundURL && currentUrl.includes(findSelectionURL)) ||
      (currentHref == fundURL && currentUrl.includes(rfundGuideURL)) ||
      (currentHref == fundURL && currentUrl.includes(fundTipsURL)) || 
      (currentHref == fopURL && currentUrl.includes(foreignFuturesURL)))
    return true;
    return false;
  }
  
  $('#main-menu a').each(function (index) {
    let currentHref = String($(this).attr('href'));

    if (currentHref.includes(window.location.hostname)) {
      currentUrl = String(window.location.href);
    } else {
      currentUrl = String(window.location.pathname + window.location.search);
    }
    
    // Return all matched URLs
    if (currentHref != '' && currentUrl.includes(currentHref) && currentUrl.indexOf(currentHref) == 0) {
      matchedURLs.push(currentHref);
    }

    // 例外対応
    if (isException(currentUrl, currentHref)) {
      matchedURLs.push(currentHref);
      return;
    }
  });

  for(var i = 0; i < matchedURLs.length; i++) {
    if (longestMatchedValue.length < matchedURLs[i].length) {
      longestMatchedValue = matchedURLs[i];
    }
  }

  $(`#main-menu a[href="${longestMatchedValue}"]`).attr('aria-current', 'true');

  var $megaMenu = $('[aria-current]').closest('li[data-level="1"]').find('.js-trigger[data-type="mega-down"]');
  var $megaElm = $megaMenu.next();

  $megaMenu.next().slideDown(300, function () {
    $megaMenu.css('height', '');
  });
  $megaMenu.addClass('is-active').attr('aria-expanded', 'true');
  $megaElm.addClass('is-open').attr('aria-hidden', 'false');

  var $accordion = $('[aria-current]').closest('.p-rf-gnav__menuBox').find('.js-trigger[data-type="acc"]');

  $accordion.addClass('is-active').attr('aria-expanded', 'true');
  $accordion.parent().next().addClass('is-open').attr('aria-hidden', 'false').slideDown(300, function () {
    $(`#main-menu a[href="${longestMatchedValue}"]`).css('height', '');
  });

})(jQuery);

function megaMenu(target) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $this = $(this);
    var $megaElm = $this.next();
    var $expand = $this.attr('aria-expanded');

    if ($expand === 'false') {
      $this.next().stop().slideDown(300, function () {
        $this.css('height', '');
      });
      $this.addClass('is-active').attr('aria-expanded', 'true');
      $megaElm.addClass('is-open').attr('aria-hidden', 'false');
    } else {
      $this.next().stop().slideUp(300);
      $this.removeClass('is-active').attr('aria-expanded', 'false');
      $megaElm.removeClass('is-open').attr('aria-hidden', 'true');
    }
  });
}

function headerSearch(target) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $this = $(this);
    var $expand = $this.attr('aria-expanded');

    if ($expand === 'false') {
      $this.addClass('is-active').attr('aria-expanded', 'true').next().fadeIn(300, function () {
        $(this).addClass('is-open').attr('aria-hidden', 'false');
      });
    } else {
      $this.removeClass('is-active').attr('aria-expanded', 'false').next().fadeOut(300, function () {
        $(this).removeClass('is-open').attr('aria-hidden', 'true');
      });
    }
  });
}

function pullDown(target) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $this = $(this);
    var $expand = $this.attr('aria-expanded');

    if ($expand === 'false') {
      $this.next().stop().slideDown(300, function () {
        $this.css('height', '');
      });
      $this.addClass('is-active').attr('aria-expanded', 'true').next().addClass('is-open').attr('aria-hidden', 'false');
    } else {
      $this.next().stop().slideUp(300);
      $this.removeClass('is-active').attr('aria-expanded', 'false').next().removeClass('is-open').attr('aria-hidden', 'true');
    }
  });
}

function accordion(target) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $this = $(this);
    var $expand = $this.attr('aria-expanded');

    if ($expand === 'false') {
      $this.addClass('is-active').attr('aria-expanded', 'true');
      $this.parent().next().addClass('is-open').attr('aria-hidden', 'false').stop().slideDown(300, function () {
        $(this).css('height', '');
      });
    } else {
      $this.removeClass('is-active').attr('aria-expanded', 'false');
      $this.parent().next().removeClass('is-open').attr('aria-hidden', 'true').stop().slideUp(300);
    }
  });
}

function megaClose(target) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $this = $(this);
    $this.closest('[id]').removeClass('is-open').attr('aria-hidden', true).prev().attr('aria-expanded', false).focus();
  });
}

function searchClose(target) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $this = $(this);
    $this.closest('[id]').removeClass('is-open').attr('aria-hidden', true).fadeOut(300).prev().attr('aria-expanded', false).focus();
  });
}

function globalNav(target) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $wY = $(window).scrollTop();
    var $state = $(this).data('modal-trigger');
    var $id = '#' + $(this).data('modal-target');
    var $gnav = $($id);

    if ($state === 'open') {
      $gnav.attr('aria-modal', 'true').attr('role', 'dialog').removeClass('is-hide').animate({
        left: '0',
        right: '0'
      }, 300, function () {
        $gnav.addClass('is-open');
        $('#menuTitle').focus();
      });
      $('body').css({
        'height': '100%',
        'overflow': 'hidden'
      });
    } else if ($state === 'close') {
      $gnav.removeAttr('aria-modal').removeAttr('role').removeClass('is-open').animate({
        left: '-100%',
        right: '100%'
      }, 300, function () {
        $gnav.addClass('is-hide');
        $('.js-trigger[data-modal-trigger="open"]').focus();
      });
      $('body').css({
        'height': '',
        'overflow': ''
      });
      window.scrollTo(0, $wY);
    }
  });
  $('[data-modal-position="start"]').on("focus", function (e) {
    var focusElm = [];
    $('#main-menu button:visible,#main-menu a:visible').each(function () {
      focusElm.push(this);
    });
    var focusElmNum = focusElm.length - 1;
    focusElm[focusElmNum].focus();
  });
  $('[data-modal-position="end"]').on("focus", function (e) {
    $('[data-modal-trigger="close"]').focus();
  });
}

function megaEscape(target) {
  var $elm = $(target);
  var $this;
  var $focusElm;
  var $focusElmType;
  var $modalFlag;
  $elm.on('click', function (e) {
    $this = $(this);

    if ($this.hasClass('js-trigger') && $this.hasClass('is-active')) {
      $focusElm = $this;
      $focusElmType = $focusElm.data('type');
    } else if ($this.hasClass('js-trigger') && $this.attr('data-modal-trigger')) {
      $modalFlag = 1;
      $focusElm = '';
    }
  });
  $(window).on('keyup', function (e) {
    if (e.keyCode === 27) {
      if ($focusElm !== '') {
        if ($focusElmType == 'search') {
          $focusElm.removeClass('is-active').attr('aria-expanded', false);
          $focusElm.next().removeClass('is-open').attr('aria-hidden', true).fadeOut(300);
          $focusElm = '';
        } else if ($focusElmType == 'mega-down' || $focusElmType == 'pull') {
          $focusElm.removeClass('is-active').attr('aria-expanded', false);
          $focusElm.next().removeClass('is-open').attr('aria-hidden', true).slideUp(300);
          $focusElm = '';
        } else if ($focusElmType == 'acc') {
          $focusElm.removeClass('is-active').attr('aria-expanded', false);
          $focusElm.parent().next().removeClass('is-open').attr('aria-hidden', 'true').stop().slideUp(300);
          $focusElm = '';
        }
      } else if ($focusElm == '' && $modalFlag == 1) {
        $('#main-menu').removeAttr('aria-modal').removeAttr('role').removeClass('is-open').animate({
          left: '-100%',
          right: '100%'
        }, 300, function () {
          $('#main-menu').addClass('is-hide');
          $('.js-trigger[data-modal-trigger="open"]').focus();
        });
        $modalFlag = 0;
      }
    }
  });
}

function expect() {
  $(document).on('click', function (e) {
    // search
    var $searchBtn = $('.js-trigger[data-type="search"]');
    var $searchArea = $searchBtn.parent(); // pull
    // mega

    if (!$(e.target).closest($searchArea).length) {
      $searchBtn.removeClass('is-active').attr('aria-expanded', 'false').next().fadeOut(300, function () {
        $searchBtn.removeClass('is-open').attr('aria-hidden', 'true');
      });
    }
  });
}