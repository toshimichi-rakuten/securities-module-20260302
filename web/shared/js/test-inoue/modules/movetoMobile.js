(function($){

var moveToMobile = function() {


    var cookie = $.cookie('select_pc');

    var smartphoneUrl = (function(){
        var el = document.getElementsByTagName('link'),
           len = el.length,
          reg1 = /alternate/,
          reg2 = /only screen/;
        for(var i=0; i < len ; i++) {
            var media = el[i].getAttribute('media'),
                  rel = el[i].getAttribute('rel');
            if(!rel || !media) {continue;}
            if(media.match(reg2) && rel.match(reg1)){
                var re = el[i].getAttribute('href');
                return re.match(/\?/)? re + '&': re + '?';
            }
        }
        return '';
    })();

    var mobileCheck = (function(){

        var referrer = document.referrer.indexOf('rakuten-sec.co.jp');

        var userAgent = (function(){
            var userAgent = navigator.userAgent;
            return {
                  iPhone : userAgent.indexOf('iPhone'),
                  iPad   : userAgent.indexOf('iPad'),
                  iPod   : userAgent.indexOf('iPod'),
                 Android : userAgent.indexOf('Android'),
                  Mobile : userAgent.indexOf('Mobile'),
            WindowsPhone : userAgent.indexOf('Windows Phone')
            };
        })();

        if (referrer === -1 && (
        (userAgent.iPhone > 0 && userAgent.iPad === -1) ||
        userAgent.iPod > 0 ||
        (userAgent.Android > 0 && userAgent.Mobile > 0) ||
        userAgent.WindowsPhone > 0 )) {return true;}
        return false;
    })();

    var init = function(){
        if(smartphoneUrl && mobileCheck && !cookie){
            if(confirm('楽天証券スマートフォン専用サイトへ移動しますか？')) {
              location.href = smartphoneUrl + 'l-id=select_sp';
            }else{
                $.cookie('select_pc' , 1 , {path: '/' });
            }
        }
    };
    init();
};

moveToMobile();

})(window.jqBase || jQuery);
