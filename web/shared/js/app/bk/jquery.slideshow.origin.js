/**
 *	jquery.slideshow.js
 *  Latest Version
 *  Ver 1.0
 *
 *  #Code Sample
 *
 *  <div id="rectangle-box">
 *    <div id="rectangle-screen">
 *      <div id="rectangle"> </div>
 *    </div>
 *  <div id="rectangle-nav"> </div>
 *    <noscript>
 *      noscript contents
 *    </noscript>
 *  </div>
 *  <script type="text/javascript">
 *    $(function(){
 *      $.fn.slideShow({
 *        jsonFile: '/rectangle/top.json',
 *          thumbPos: -141
 *      });
 *    });
 *  </script>
 *
 */

(function($){
	$.fn.slideShow = function(options) {
		var o = $.extend({
			targetID: '#rectangle-box',       //ターゲットのID
			jsonFile: '/rectangle/top.json',  //JSONファイル
			bnrID: '#rectangle',              //バナーを表示させるdivのID
			navID: '#rectangle-nav',          //ナビをくくるdivのID
			navBtnID: '#rectanle-btn',        //ナビボタンのID
			bnrWidth: 372,                    //バナーの高さ
			bnrHeight: 245,                   //バナーの横幅
			thumbWidth: 100,                  //サムネイルの幅
			thumbClass: '.thumb',             //サムネイルのクラスの指定
			thumbDisp: true,                  //サムネイルの表示・非表示
			thumbPos: 0,                      //サムネイルの表示位置調整
			delayTime: 4000                   //スライドの切り替えディレイタイム
		}, options);

		$(o.targetID).each(function() {
			//初期の要素を生成する
			$(o.bnrID).append('<ul></ul>');
			$(o.navID).append('<ul class="cf"></ul>');

			$.getJSON(
				o.jsonFile,
				function(data) {
					var len = data.length;
					var lenB = len - 1;
					var bannerCount = 0;
					var clickCheck = 0;

					for(var i in data) {
						//バナー生成
						$(o.bnrID).find('ul')
						.append('<li><a href="' + data[i].linkpath + '"><img src="' + data[i].imagepath + '" width="' + o.bnrWidth + '" height="' + o.bnrHeight + '" alt="' + data[i].imagealt + '" /></a></li>');

						//ナビ生成
						$(o.navID).find('ul')
						.append('<li id="' + o.navBtnID + i + '"><a href="javascript:;">btn' + i + '</a></li>');

						//サムネイル生成
						if(o.thumbDisp) {
							$(o.navID).append('<div class="thumb" style="display: none;" id="thumb' + i + '" style="z-index: 20;"><img src="' + data[i].imagepath +'" width="' + o.thumbWidth + '" alt="" /></div>');
						}
					}
					var banners = $(o.bnrID).find('li'); //バナー要素
					var navigation = $(o.navID).find('li'); //ナビ要素

					//初期設定
					banners.not(':first').hide().eq(0).addClass('selected');
					navigation.eq(0).addClass('selected');

					function fadeAnime() {
						if(bannerCount < lenB) {
							//5枚目までの処理
							bannerCount ++;
							navigation.removeClass('selected').eq(bannerCount).addClass('selected');
							banners.hide().removeClass('selected').eq(bannerCount).fadeIn('slow').addClass('selected');
						} else {
							//1枚目に戻る処理
							navigation.removeClass('selected').eq(0).addClass('selected');
							banners.hide().removeClass('selected').eq(0).fadeIn('slow').addClass('selected');
							bannerCount = 0;
						}
					}

					var countBanner = setInterval(fadeAnime, o.delayTime);

					//イベント処理
					navigation.bind('click', function() {
						var navIndex = navigation.index(this);
						navigation.removeClass('selected');
						banners.removeClass('selected');
						$(this).addClass('selected');
						banners.fadeOut().eq(navIndex).addClass('selected').fadeIn();
						$(o.thumbClass).fadeOut();
						bannerCount = navIndex;
						clearInterval(countBanner);
						clickCheck = 1;
					});
					navigation.bind('mouseover', function() {
						var navIndex = navigation.index(this);
						var navPos = $(this).position().left;
						$(o.thumbClass).css('left', navPos-o.thumbPos).eq(navIndex).fadeIn();
					});
					navigation.bind('mouseout', function() {
						$(o.thumbClass).hide();
					});
					$(o.targetID).bind('mouseleave', function() {
						if(clickCheck == 1) {
							clickCheck = 0;
							countBanner = setInterval(fadeAnime, o.delayTime);
						}
					});
				}
			);
		});
		return this;
	};
})(jQuery);
