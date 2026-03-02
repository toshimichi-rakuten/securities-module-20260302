(function ($) {

    $.framePopup = function(options) {
        var opts = $.extend({}, $.framePopup.defaults, options),
            $element = $('<div class="s-frame-popup">'),
            $frame = $('<iframe>'),
            $close = $('<div class="s-frame-popup-close"><i></i></div>');

        $frame.attr('scrolling', 'no');
        $frame.attr('frameborder', 0);
        $frame.attr('src', opts.src);
        $element.css({
            'width': opts.width,
            'height': opts.height,
            'top': opts.top,
            'left': opts.left
        });
        $element.append($frame);
        $element.append($close);
        $element.appendTo('body');

        $close.on('click', function() {
            $element.trigger('close');
            $element.remove();
        });

        $('html,body').animate({
            scrollTop: opts.top - 80
        }, 750, 'swing');

        return $element;
    };

    $.fn.framePopup = function(options) {
        var opts = $.extend({}, $.framePopup.defaults, options);

        this.on('click', function(e){
            var $this = $(this),
                offset = $this.offset(),
                $popup;

            if(!$this.hasClass(opts.disabledClass)) {
                $this.addClass(opts.disabledClass);
                opts.src = $this.attr('href');
                opts.top = offset.top - opts.height - opts.offset;
                opts.left = offset.left - opts.width/2 + $this.outerWidth()/2;
                $popup = $.framePopup(opts);

                $popup.on('close', function() {
                    $this.removeClass(opts.disabledClass);
                    $popup = null;
                });
            }

            e.preventDefault();
        });

        return this;

    };

    $.framePopup.defaults = {
        width: 500,
        height: 500,
        offset: 15,
        disabledClass: 's-disabled'
    };

}(jQuery));
