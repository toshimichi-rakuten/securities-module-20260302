(function ($) {

    $.fn.pagetopAnchor = function(options) {
        var opts = $.extend({}, $.fn.pagetopAnchor.defaults, options);

        return this.each(function(){
            var $this = $(this),
                $button = $this.find('.s-pagetop-anchor-button'),
                status = false;

            $this.bind('click', function(){
                $('html, body').animate({
                    scrollTop: 0
                }, opts.duration, 'swing');
            });

            $(window).bind('scroll', function() {
                var breakpoint,
                    currentStatus,
                    scrollY = document.documentElement.scrollTop || document.body.scrollTop,
                    clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                    documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

                breakpoint = documentHeight - clientHeight - opts.bottomOffset;

                if(opts.floatpoint < scrollY) {
                    currentStatus = true;
                } else {
                    currentStatus = false;
                }

                if(breakpoint < scrollY) {
                    $button.css('top', breakpoint - scrollY);
                } else {
                    $button.css('top', 0);
                }

                if(status !== currentStatus) {
                    status = currentStatus;

                    if(status) {
                        $this.fadeIn(opts.fadetime);
                    } else {
                        $this.fadeOut(opts.fadetime);
                    }
                }
            });
        });
    };

    $.fn.pagetopAnchor.defaults = {
        floatpoint: 850,
        fadetime: 500,
        duration: 750,
        bottomOffset: 80
    };

}(jqBase));