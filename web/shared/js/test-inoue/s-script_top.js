(function ($) {
    $(function() {
        // Apply random background plugin to main div
        var $visitorMainArea = $('.s-main-area');

        if($visitorMainArea.length > 0) {
            $visitorMainArea.randomBkg();
        }

        // Adding expanding backgrounds for IE7 and 8
        $('.s-main-area')
            .add('.s-features-ttl')
            .add('.s-tools-ttl')
            .add('.s-reports-ttl')
            .add('.s-security-ttl')
            .add('.s-profile-ttl')
            .add('.s-support')
            .add('.s-image-load-inner')
            .css('background-size', 'cover');

        // Lazy load images
        var $slider = $('.s-carousel-inner'),
            $slides = $slider.children('li');

        $slides.find('img').lazyload({
            event: 'slideappear',
            effect: 'fadeIn',
            placeholder: '/web/shared/img/blank.png'
        });

        // Start carousel
        $slider.bxSlider({
            controls: false,
            auto: true,
            pause: 10000,
            autoHover: true,
            responsive: false,
            onSliderLoad: function(currentIndex) {
                $slides.eq(currentIndex).find('img').trigger('slideappear');
            },
            onSlideBefore: function($slideElement) {
                $slideElement.find('img').trigger('slideappear');
            }
        });

        // Search form sender
        $('#s-search-form').submit(function(e){
            $(this).changeSearchResult(this.name);
            e.preventDefault();
        });

        // Start scroll for news items
        $('.s-list-scroll').listScroll();

        // Add market data to HTML
        window.callback = function(data) {
            var nikkeiAve = (data.market.list[0])[1],
                nikkeiPrev = (data.market.list[0])[2],
                nikkeiUpDown = (data.market.list[0])[3],
                nikkeiDate = (data.market.list[0])[5],
                yenDollar = (data.market.list[25])[1],
                yenDollarPrev = (data.market.list[25])[2],
                yenDollarUpDown = (data.market.list[25])[3],
                nikkeiAveInt = (nikkeiAve.split('.'))[0],
                nikkeiAveDec = (nikkeiAve.split('.'))[1],
                yenDollarInt = (yenDollar.split('.'))[0],
                yenDollarDec = (yenDollar.split('.'))[1],
                $nikkeiNum = $('.s-market-info .s-list-horizontal').find('li').eq(0),
                $yenDollarNum = $('.s-market-info .s-list-horizontal').find('li').eq(1);
                $nikkeiNum.find('.s-num').text(nikkeiAveInt);
                $nikkeiNum.find('.s-num-sub').text('.'+nikkeiAveDec);
                $nikkeiNum.find('.s-text-sub-01').addClass(nikkeiUpDown).text(nikkeiPrev+'円');
                $nikkeiNum.find('.s-text-sub-02').text('（'+nikkeiDate+'）');
                $yenDollarNum.find('.s-num').text(yenDollarInt);
                $yenDollarNum.find('.s-num-sub').text('.'+yenDollarDec);
                $yenDollarNum.find('.s-text-sub-01').addClass(yenDollarUpDown).text(yenDollarPrev+'円');
        };

        // Add system info to HTML
        $.ajaxSetup({ cache: false });
        $.ajax({
            accepts: '*/*',
            type: 'GET',
            url: '/ITS/system_info_web.xml',
            dataType: 'xml'
        }).done(function(resp) {
            $('#system_info').empty().append((resp.documentElement.firstChild.nodeValue).replace(/system_info\//g, '/ITS/system_info/'));
        });

        // Get market data
        $.ajax({
            type: 'GET',
            url: 'https://www.trkd-asia.com/rakutensec/f_index1.jsp',
            jsonp: false,
            jsonpCallback: 'callback',
            dataType: 'jsonp'
        });

        // Fix bug with resizable backgrounds in IE7 and 8
        $(window).on('resize', function(){
            $(window).trigger('throttledresize');
        });

        // Discrimination cookie data
        $('#homeid').bind('change', function() {
            $.cookie('homeid', $('#homeid').val(),{ expires:30, path:'/'});
        });
        var cookie = $.cookie('homeid');
        if(cookie !== null) {
            $('#homeid').val(cookie);
        }
    });
}(jqBase));
