// Chooses random background from jSON data based on set probabilities

(function ($) {

    $.fn.randomBkg = function() {

        var $area     = this,
            $imgInner = $area.find('.s-image-load-inner'),
            $link     = $area.find('.s-panel-link'),
            $title    = $link.find('.s-panel-ttl'),
            $linkText = $link.find('.s-panel-linkText'),
            $list     = $area.find('.s-list-slides'),
            $listSlides;

        function setPanelInfo(data, n) {
            $link.attr('href', data[n].link);
            $link.css('background-color', data[n].accentColor);
            $title.html(data[n].title);
            $linkText.html(data[n].linkText+'<span class=".s-link-arrow">&nbsp;&gt;</span>');
            $listSlides.removeClass('active');
            $listSlides.eq(n).addClass('active');
        }

        function onSuccess(data){
            var randomNum = Math.random()*100,
                cacheImg = [],
                bkgImg = new Image(),
                minPer = 0,
                maxPer,
                flag = false,
                n, i, l;

            for (i=0,l=data.length; i<l; i++) {
                maxPer = minPer + data[i].probability;
                if(data[i].probability > 0) {
                    $list.append('<li><a href="#main-'+(i+1)+'">'+(i+1)+'</a></li>');
                }
                if(randomNum >= minPer && randomNum < maxPer) {
                    n = i;
                }
                if(n === undefined && i+1 === l) {
                    n = i;
                }
                minPer = maxPer;
            }

            $listSlides = $list.find('li a'),

            bkgImg.onload = function () {
                $area.css('background-image', 'url(' + data[n].bkgImage + ')');
                $imgInner.css('background-image', 'url(' + data[n].bkgImage + ')');
            };
            bkgImg.src = data[n].bkgImage;

            setPanelInfo(data, n);

            $listSlides.each(function(index) {
                var $this = $(this),
                    n1 = index,
                    fadeBkg = new Image();

                function fadeImg() {
                    setPanelInfo(data, n1);

                    $imgInner.css({'background-image': 'url('+ data[n].bkgImage + ')', 'opacity': '1'});
                    $area.css('background-image', 'url(' + data[n1].bkgImage + ')');
                    $imgInner.delay(20).animate({
                        'opacity': 0
                    }, 500, function() {
                        n = n1;
                        flag = false;
                    });
                }

                $this.click(function(e){
                    var cached = false,
                        nextImg;

                    e.preventDefault();

                    // don't animate if already animating
                    if (flag) { return; }

                    flag = true;
                    nextImg = data[n1].bkgImage;
                    cached = ($.inArray(nextImg, cacheImg) > -1);

                    if(cached) {
                        fadeImg();
                    } else {
                        fadeBkg.onload = function () {
                            cacheImg.push(nextImg);
                            fadeImg();
                        };
                        fadeBkg.src = nextImg;
                    }
                });
            });
        }

        $.ajax({
            type: 'GET',
            url: 'ITS/pattern.json',
            dataType: 'json',
            success: onSuccess
        });

        return this;
    };

}(jQuery));
