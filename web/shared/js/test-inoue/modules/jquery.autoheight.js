/*
 jquery.autoheight.js

 code sample
 grid__cell-1-3の高さが揃う
 <div class="grid is-autoheight">
  <div class="grid__cell-1-3"></div>
  <div class="grid__cell-1-3"></div>
  <div class="grid__cell-1-3"></div>
 </div>
 */

(function($) {
  $(function() {

    $(window).load(function() {
      var $targets = $('.is-autoheight');
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
    });
  });
})(window.jqBase || jQuery);
