window.jqBase = $.noConflict(true);

(function($){
    $(function() {

        var $feedbackPopup = $('[data-toggle=feedback]');
        if($feedbackPopup.length > 0) {
            // $feedbackPopup.framePopup({
            //     width: 510,
            //     height: 540
            // });

            $feedbackPopup.click(function(e){
                var _url = 'http://rakuten-sec.dga.jp/web_enq/feedback.html?current_url=' + document.location.pathname;
                window.open(_url, 'お客様の声をお聞かせください', 'width=540,height=460,menubar=no,toolber=no,location=no,status=no,resizable=no,scrollbars=no');
                e.preventDefault();
            });
        }

        var $pagetopAnchor = $('.s-pagetop-anchor');
        if($pagetopAnchor.length > 0) {
            $pagetopAnchor.pagetopAnchor();
        }

        var $lazyImages = $('img.s-lazy');
        if($lazyImages.length > 0) {
            $lazyImages.lazyload({
                effect: 'fadeIn',
                placeholder: '/web/shared/img/blank.png'
            });
        }

    });

})(jqBase);
