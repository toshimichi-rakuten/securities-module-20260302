/*========================
右ナビログインフォーム開閉
========================*/
(function($) {
  $('.s1-login-form__toggle-button').on('click', function() {
      var $this = $(this);
      if ($this.hasClass('s1-login-form__heading--close')) {
        $this.removeClass('s1-login-form__heading--close');
        $this.addClass('s1-login-form__heading--open');
        $('.s1-login-form__body').slideDown(100, function() {
          $this.children(":first").html('&nbsp;&#xf11d;');
        });
      } else {
        $('.ui-dialog-titlebar-close').click();
        $('.s1-login-form__body').slideUp(100, function() {
          $this.removeClass('s1-login-form__heading--open');
          $this.addClass('s1-login-form__heading--close');
          $this.children(":first").html('&nbsp;&#xf11a;');
        });
      }
    });
})(jqBase);
