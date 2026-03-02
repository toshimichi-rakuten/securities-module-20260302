/* global openkey: true */

(function($global){
    $global(function() {
        $global('#keyboard_opener').one('click', function(e){
            $global.getScript('/web/shared/js/keyboard-old.js', function() {
                openkey();

                $global('#keyboard_opener').click(function(e) {
                    openkey();
                    e.preventDefault();
                });
            });

            e.preventDefault();
        });
    });
})(window.jqBase || jQuery);
