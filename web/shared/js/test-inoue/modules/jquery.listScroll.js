// Starts sliding animation for vertical lists

(function ($) {

    $.fn.listScroll = function() {
        var $list = this,
            endlessScroll = function() {
                var listTop,
                    $firstItem = $list.find('li').eq(0);
                
                listTop = 50; // Amount for scroller to slide
                $list.animate({
                    top: '-=' + listTop
                }, 1000, function(){
                    $list.css('top', '0');
                    $firstItem.appendTo($list);
                });
            };

        setInterval(function() {
            endlessScroll();
        }, 7000);

        return this;
    };

}(jQuery));