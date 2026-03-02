/*!
 * font-size.js
 *
 */
(function($) {
    var listItem = $('.s1-font-size__btn').find('li');
	//デフォルトをmediumにする
	if(!$.cookie("fontsize")) $.cookie("fontsize", "medium");
	var cookiefont = $.cookie("fontsize");
	//イベントハンドラ
    $('.s1-font-size__btn-item').click(function() {
      listItem.removeClass('is-selected');
      var className = $(this).attr('class').slice(47);
	  //cookieにsize保存
	  $.cookie("fontsize", className);
      $(this).addClass('is-selected');
	  chengeFont(className);
    });//end of handler

    listItem.removeClass('is-selected');
	//cookie読み込み
	//cookieのフォントを設定する
	chengeFont(cookiefont);

	$('.s1-font-size__btn li').each(function(){
		var className2 = $(this).attr('class').slice(47);
		if(className2 == cookiefont){
			$(this).addClass('is-selected');
		}
	})

	function chengeFont(className){
	 if(className == 'small') {
        $('.s1-content-area, .s1-breadcrumbs').css('font-size', '87%');
      } else if(className == 'large') {
        $('.s1-content-area, .s1-breadcrumbs').css('font-size', '115%');
      } else {
        $('.s1-content-area, .s1-breadcrumbs').css('font-size', '100%');
      }	
	}
})(jqBase);
