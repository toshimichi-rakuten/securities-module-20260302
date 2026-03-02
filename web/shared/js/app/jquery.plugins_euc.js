$(function() {
	
	$.fn.myCountDown = function(options) {
		var o = $.extend({
			targetID: '#cd-img', //ターゲットにするセレクタ
			type: 'image', //画像を切り替える場合はimage テキストカウントダウンはtext
			myYear: 2012, //目標にする年
			myMonth: 2, //目標にする月
			myDay: 22, //目標にする日
			myHour: 10,
			imgCoundDay: 5, //画像切り替えの場合のカウントダウンする日数（何日前からカウントダウンするか）
			textCoundDay: 14, //テキストカウントダウンの場合のカウントダウンする日数
			path: '/ITS/rakuten_g/?l-id=vtoprbnr_rakuten_g', //画像のリンクパス
			defSrc: '/web/images/index-main-12200-r02.jpg', //デフォルトで表示する画像
			cngSrc: '/web/images/index-main-12200-r02-count', //カウントダウンする画像
			imgWidth: 372, //画像の幅
			imgHeight: 272, //画像の高さ
			imgAlt: '期間限定！口座開設するなら今！ポイントプレゼントキャンペーン実施中！', //画像の代替テキスト
			cdTextDaysF: 'キャンペーン受付終了まであと', //テキストカウントダウンの前の文
			cdTextDaysB: '締め切り！', //テキストカウントダウンの後ろの文
			cdTextEnd1: '本日キャンペーン受付終了！', //当日表示する文
			cdTextEnd2: 'キャンペーンの受付は終了しました。' //終了時の文
		},options);
		
		$(o.targetID).each(function() {
			var myNow = new Date();
			var myRunDate = new Date(o.myYear, o.myMonth-1, o.myDay);
			var myNowHour = myNow.getHours();
			var myMsec = myNow.getTime()-myRunDate.getTime();
			var myDayCount = Math.floor(myMsec/(1000*60*60*24));
			var tempMyCnt = myDayCount*(-1); //設定月日からの残り日数
			
			//画像を切り替えるパターン
			if(o.type == 'image') {
				//imgCountDay日前からカウントダウン
				if (tempMyCnt <= o.imgCoundDay && tempMyCnt >= 0) {
					$(o.targetID)
					.append('<img width="' +o.imgWidth+ '" height="' +o.imgHeight+ '" border="0" alt="' +o.imgAlt+ '" src="' +o.cngSrc + tempMyCnt +'.jpg" />')
					.wrapInner('<a href="' +o.path+ '"></a>');
					//alert(tempMyCnt);
				} else {
					$(o.targetID)
					.append('<img width="' +o.imgWidth+ '" height="' +o.imgHeight+ '" border="0" alt="' +o.imgAlt+ '" src="' +o.defSrc+ '" />')
					.wrapInner('<a href="' +o.path+ '"></a>');
				}
			}
			
			//テキストを切り替えるパターン
			if(o.type == 'text') {
				//textCoundDay日前からカウントダウン
				if (tempMyCnt > 0 && tempMyCnt <= o.textCoundDay) {
					$(o.targetID)
					.append('<strong>' +o.cdTextDaysF+ '<strong style="font-size:30px;">' +tempMyCnt+ '</strong>日！' +o.cdTextDaysB+ '</strong>');
				} else if (tempMyCnt == 0) {
					if(myNowHour >= o.myHour) {
						$(o.targetID).append('<strong>' +o.cdTextEnd2+ '</strong>');
					} else {
						$(o.targetID).append('<strong>' +o.cdTextEnd1+ '</strong>');
					}
				} else if (tempMyCnt < 0) {
					$(o.targetID)
					.append('<strong>' +o.cdTextEnd2+ '</strong>');
				} else {
					$(o.targetID).css('display', 'none');
				}
			}
			
			//指定日に画像を消す場合
			if(o.type == 'hidden') {
				if (tempMyCnt <= 0) {
					$(o.targetID).css({display: 'none'});
				} else {
					$(o.targetID).css({display: 'block'});
				}
			}
			
		});
		
		return this;
	};
	
});(jQuery);


