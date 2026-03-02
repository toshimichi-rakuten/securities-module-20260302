"use strict";

(function ($) {
  megaMenu('.js-trigger[data-type="mega-down"]');
  headerSearch('.js-trigger[data-type="search"]');
  pullDown('.js-trigger[data-type="pull"]');
  megaClose('.js-megaClose');
  searchClose('.js-searchClose');
  globalNav('.js-trigger[data-modal-trigger]');
  megaEscape('.js-trigger');
  expect(); //floating

  var $floatingElm = $('.js-floating');
  $(window).on("scroll", function () {
    var $headerH = $('header[role="banner"]').height();

    if ($(this).scrollTop() > $headerH) {
      $floatingElm.addClass('is-show');
    } else {
      $floatingElm.removeClass('is-show');
    }
  }); // hover behavior

  var userAgent = navigator.userAgent;
  var link = $('.js-trigger[data-type="acc"],.js-trigger[data-type="mega-down"],.js-trigger[data-type="pull"]');

  if (userAgent.indexOf("iPhone") >= 0 || userAgent.indexOf("iPad") >= 0 || userAgent.indexOf("Android") >= 0) {
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
  }

  // VISITOR-130
  $(document).on('focusin', '.p-rf-h_main__wrap .mf_finder_header .mf_finder_searchBox_query_input', function () {
    $(this).parent().parent().addClass('mf_finder_searchBox--is-active');
  });

  $(document).on('focusout', '.p-rf-h_main__wrap .mf_finder_header .mf_finder_searchBox_query_input', function () {
    $(this).parent().parent().removeClass('mf_finder_searchBox--is-active');
  });
})(jQuery||jqBase);

function megaMenu(target) {
  (function ($) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $wW = $(window).width();
    var $this = $(this);
    var $megaElm = $this.next();
    var $expand = $this.attr('aria-expanded');

    if ($expand === 'false') {
      $elm.not($this).removeClass('is-active').attr('aria-expanded', 'false').next().removeClass('is-open').attr('aria-hidden', 'true'); // element

      var $parentElm = $this.closest('nav'); // document

      var $targetElmDocPosX = $this.offset().left;
      var $parentElmDocPosX = $parentElm.offset().left; // relative from parent

      var $targetElmPosX = $targetElmDocPosX - $parentElmDocPosX; //width

      var $parentElmW = $parentElm.innerWidth();
      var $megaElmW = $megaElm.width(); //adjust

      var $difX;
      var $megaElmPosX;

      if ($targetElmPosX + $megaElmW > $parentElmW) {
        $difX = $targetElmPosX + $megaElmW - $parentElmW;
        $megaElmPosX = $targetElmPosX - $difX;
      } else {
        $megaElmPosX = $targetElmPosX;
      }

      $megaElm.css('left', $megaElmPosX);
      $this.addClass('is-active').attr('aria-expanded', 'true');
      $megaElm.addClass('is-open').attr('aria-hidden', 'false');
    } else {
      $this.removeClass('is-active').attr('aria-expanded', 'false');
      $megaElm.removeClass('is-open').attr('aria-hidden', 'true');
    }
  });
  })(jQuery||jqBase);
}

function headerSearch(target) {
  (function ($) {
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
  })(jQuery||jqBase);
}

function pullDown(target) {
  (function ($) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $this = $(this);
    var $expand = $this.attr('aria-expanded');

    if ($expand === 'false') {
      $this.addClass('is-active').attr('aria-expanded', 'true').next().addClass('is-open').attr('aria-hidden', 'false');
    } else {
      $this.removeClass('is-active').attr('aria-expanded', 'false').next().removeClass('is-open').attr('aria-hidden', 'true');
    }
  });
  })(jQuery||jqBase);
}

function megaClose(target) {
  (function ($) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $this = $(this);
    $this.closest('[id]').removeClass('is-open').attr('aria-hidden', true).prev().attr('aria-expanded', false).focus();
  });
  })(jQuery||jqBase);
}

function searchClose(target) {
  (function ($) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $this = $(this);
    $this.closest('[id]').removeClass('is-open').attr('aria-hidden', true).fadeOut(300).prev().attr('aria-expanded', false).focus();
  });
  })(jQuery||jqBase);
}

function globalNav(target) {
  (function ($) {
  var $elm = $(target);
  $elm.on('click', function () {
    var $wY = $(window).scrollTop();
    var $state = $(this).data('modal-trigger');
    var $id = '#' + $(this).data('modal-target');
    var $gnav = $($id);

    if ($state == 'open') {
      $gnav.attr('aria-modal', 'true').attr('role', 'dialog').addClass('is-open').fadeIn(300);
      $('[data-modal-trigger="close"]').focus();
      $('body').css({
        'height': '100%',
        'overflow': 'hidden'
      });
    } else if ($state == 'close') {
      $gnav.removeAttr('aria-modal').removeAttr('role').removeClass('is-open').fadeOut(300, function () {
        $('.js-trigger[data-modal-trigger="open"]').focus();
      });
      $('body').css({
        'height': '',
        'overflow': ''
      });
      window.scrollTo(0, $wY);
    }
  });
  $('[data-modal-position="start"],[data-modal-position="end"]').on("focus", function (e) {
    $('[data-modal-trigger="close"]').focus();
  });
  })(jQuery||jqBase);
}

function megaEscape(target) {
  (function ($) {
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
          $focusElm.next().removeClass('is-open').attr('aria-hidden', true);
          $focusElm = '';
        }
      } else if ($focusElm == '' && $modalFlag == 1) {
        $('#main-menu').fadeOut(300);
        console.log($modalFlag);
        $modalFlag = 0;
      }
    }
  });
  })(jQuery||jqBase);
}

function expect() {
  (function ($) {
  $(document).on('click', function (e) {
    var $w = $(window).width(); // search

    var $searchBtn = $('.js-trigger[data-type="search"]');
    var $searchArea = $searchBtn.parent(); // pull

    var $pullBtn = $('.js-trigger[data-type="pull"]');
    var $pullArea = $pullBtn.parent(); // mega

    var $megaBtn = $('.js-trigger[data-type="mega-down"]');
    var $megaArea = $megaBtn.parent();

    if (!$(e.target).closest($searchArea).length) {
      $searchBtn.removeClass('is-active').attr('aria-expanded', 'false').next().fadeOut(300, function () {
        $searchBtn.removeClass('is-open').attr('aria-hidden', 'true');
      });
    }

    if (!$(e.target).closest($pullArea).length) {
      $pullBtn.removeClass('is-active').attr('aria-expanded', 'false').next().removeClass('is-open').attr('aria-hidden', 'true');
    }

    if (!$(e.target).closest($megaArea).length) {
      $megaBtn.removeClass('is-active').attr('aria-expanded', 'false').next().removeClass('is-open').attr('aria-hidden', 'true');
    }
  });
  })(jQuery||jqBase);
}