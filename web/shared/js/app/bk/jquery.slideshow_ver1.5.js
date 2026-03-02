/**
 *	jquery.slideshow.js
 *  Latest Version
 *  Ver 1.5
 *
 *	2013.12.09 ナビの背景をJSONから引っ張れる用に改修。thumbsDispなどのサムネイル関連のパラメータを完全排除
 *	2013.07.01 オンマウスで画像が切り替わるように変更（サムネイル表示は廃止）
 *	2013.05.14 ループの後にappendするように変更
 *	2013.03.14 JSONをキャッシュさせないように変更
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
			delayTime: 5000                   //スライドの切り替えディレイタイム
		}, options);

		$(o.targetID).each(function() {
			//初期の要素を生成する
			$(o.bnrID).append('<ul></ul>');
			$(o.navID).append('<ul></ul>');

			$.getJSON(
				o.jsonFile, {
					ts: new Date().getTime()
				},
				function(data) {
					var len = data.length;
					var lenB = len - 1;
					var bannerCount = 0;
					var clickCheck = 0;
					var bnrList = ''; //バナーリスト
					var navList = ''; //ナビリスト

					for(var i in data) {
						bnrList += '<li><a href="' + data[i].linkpath + '"><img src="' + data[i].imagepath + '" width="' + o.bnrWidth + '" height="' + o.bnrHeight + '" alt="' + data[i].imagealt + '" /></a></li>';
						navList += '<li id="' + o.navBtnID + i + '"><a href="' + data[i].linkpath + '" style="background-image:url(' + data[i].buttonpath + '); background-repeat: no-repeat;">btn' + i + '</a></li>';
					}

					$(o.bnrID).find('ul').html(bnrList);
					$(o.navID).find('ul').html(navList);

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

					navigation.bind('mouseover', function() {
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
