(function(){
    var $body = $("body");
    var $promotion = $("#promotion-fixed");
    var $window = $(window);
    var height = 0;

    $body.css("padding-bottom", 110);

    $window.scroll(function(){
        if ($window.scrollTop() > 200 && $promotion.css("display") == "none") {
            $promotion.show();
        } else if ($window.scrollTop() < 200 && $promotion.css("display") == "block") {
            $promotion.hide();
        }
    });
})();