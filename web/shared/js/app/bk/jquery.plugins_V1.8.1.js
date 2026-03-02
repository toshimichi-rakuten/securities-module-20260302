/*
 * jquery.plugins.js
 * ver 1.8.1
 * update 2014.8.18
 *
 * History
 * 2014.8.18
 * キャンペーンページに計測タグが反映されていなかったので反映されるように改修
 *
 * 2014.3.25
 * newアイコンを制御する機能追加
 *
 * 2013.7.22
 * rollover機能追加
 *
 * 2013.7.22
 * ビジタートップシンプル化対応
 *
 * 2013.6.17
 * 投信トップにキャンペーンを表示させる項目を追加
 *
 * 2013.5.15
 * キャンペーン一覧をVTOP、マーケットトップ、ログアウト、キャンペーン一覧に表示させるプラグインを追加
 * タブにパラメータを付けてアクセス出来るように改修（jquery.tabs.jsを統合）
 *
 * 2013.1.30
 * 指定日時になったら画像やテキストを表示・非表示出来るように改修
 *
 * 2012.6.29
 * テキストカウントダウンでmyHourに時間を設定すると時間指定で終了ステータスに変更出来るように改修
 *
 * 2012.6.7
 * wrap -> wrapInner に変更し、pタグの外にaタグが入るバグを修正
 * stripeメソッドを追加
 *
 * copyright Rakuten Securities, Inc.
 *
 */

$(function() {


	//addNewIcon.js ver 1.0
	$.fn.addNewIcon = function(options) {
    	var o = $.extend({
    		distance: -3,
      		targetClass: '.icon-new'
    	}, options);

    	$(o.targetClass).each(function() {
    		$(this).hide();
      		//今日の日付
      		var today = new Date();
      		var y = today.getFullYear();
      		var m = today.getMonth() + 1;
      		var d = today.getDate();

      		//NEWマークを消す日を計算する
			var setDate = calcDate(y, m, d, o.distance);
			var sY = setDate.getFullYear();
			var sM = setDate.getMonth() + 1;
			if (sM < 10) {
				sM = '0' + sM;
			}
			var sD = setDate.getDate();
			if (sD < 10) {
				sD = '0' + sD;
			}
			var targetTime = String(sY) + String(sM) + String(sD);
			targetTime = Number(targetTime);

			var textVal = $(this).text();
			var temp = targetTime - textVal;
			if(temp < 0) {
				$(this).css({'display': 'inline-block'});
			}

			//n日前を計算するfunction
			function calcDate(year, month, day, addDays) {
				var dt = new Date(year, month - 1, day);
				var baseSec = dt.getTime(); //経過ミリ秒数に変換
				var addSec = addDays * 86400000; //addDaysをミリ秒数に変換
				var targetSec = baseSec + addSec; //日付を経過ミリ秒数で求める
				dt.setTime(targetSec); //日付オブジェクトに変換
				return dt; //日付を返す
			}
    	});
    	return this;
  	};

	// myCountDown.js ver 1.3
	$.fn.myCountDown = function(options) {
		var o = $.extend({
			targetID: '#cd-img', //ターゲットにするセレクタ
			type: 'image', //画像を切り替える場合はimage テキストカウントダウンはtext
			myYear: 2012, //目標にする年
			myMonth: 2, //目標にする月
			myDay: 22, //目標にする日
			myHour: 10, //目標にする時間
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
					.append('<strong>' +o.cdTextDaysF+ '<strong style="font-size:30px;">' +tempMyCnt+ '</strong>日！' +o.myMonth+ '月' +o.myDay+ '日' +o.cdTextDaysB+ '</strong>');
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

			//指定日、指定時間に何かを表示する場合
			if(o.type == 'showObj') {
				if (tempMyCnt > 0) {
					$(o.targetID).css({display: 'none'});
				} else if (tempMyCnt == 0) {
					if(myNowHour >= o.myHour) {
						$(o.targetID).css({display: 'block'});
					} else {
						$(o.targetID).css({display: 'none'});
					}
				} else {
					$(o.targetID).css({display: 'block'});
				}
			}

			//指定日、指定時間に何かを消す場合
			if(o.type == 'hiddenObj') {
				if (tempMyCnt > 0) {
					$(o.targetID).css({display: 'block'});
				} else if (tempMyCnt == 0) {
					if(myNowHour >= o.myHour) {
						$(o.targetID).css({display: 'none'});
					} else {
						$(o.targetID).css({display: 'block'});
					}
				} else {
					$(o.targetID).css({display: 'none'});
				}
			}
		});
		return this;
	};


	// jquery.tabs.js ver 1.1.2
	$.fn.tabs = function(options) {

		var o = $.extend({
			targetID: '#tab',
			tabElement: '.tab-list li',
			boxElement: '.tab-box',
			parmName: 'tab',
			tabName01: 'default',
			tabName02: 'corporation',
			tabName03: 'municipal',
			tabName04: 'tab04'
		}, options);

		$(o.tabElement, o.targetID).each(function() {
			$(this).css('cursor', 'pointer');
			if($(this).is(':first-child')) {
				$(this).addClass('selected');
			}
			$(o.boxElement, o.targetID).not(':first').hide();
			$(this).click(function() {
				var tabIndex = $(o.tabElement, o.targetID).index(this);
				$(o.tabElement, o.targetID).removeClass('selected');
				$(this).addClass('selected');
				$(o.boxElement, o.targetID).hide().eq(tabIndex).fadeIn();
			});
		});

		var parm = getUrlVars();
		if(o.parmName in parm) {
			key = decodeURI(parm[o.parmName]);
			if(key == o.tabName02) {
				$(o.tabElement, o.targetID).removeClass("selected");
				$(o.tabElement, o.targetID).eq(1).addClass("selected");
				$(o.boxElement, o.targetID).hide();
				$(o.boxElement, o.targetID).eq(1).fadeIn();
			} else if(key == o.tabName03) {
				$(o.tabElement, o.targetID).removeClass("selected");
				$(o.tabElement, o.targetID).eq(2).addClass("selected");
				$(o.boxElement, o.targetID).hide();
				$(o.boxElement, o.targetID).eq(2).fadeIn();
			} else if(key == o.tabName04) {
				$(o.tabElement, o.targetID).removeClass("selected");
				$(o.tabElement, o.targetID).eq(3).addClass("selected");
				$(o.boxElement, o.targetID).hide();
				$(o.boxElement, o.targetID).eq(3).fadeIn();
			} else if(key == o.tabName05) {
				$(o.tabElement, o.targetID).removeClass("selected");
				$(o.tabElement, o.targetID).eq(4).addClass("selected");
				$(o.boxElement, o.targetID).hide();
				$(o.boxElement, o.targetID).eq(4).fadeIn();
			} else if(key == o.tabName06) {
				$(o.tabElement, o.targetID).removeClass("selected");
				$(o.tabElement, o.targetID).eq(5).addClass("selected");
				$(o.boxElement, o.targetID).hide();
				$(o.boxElement, o.targetID).eq(5).fadeIn();
			} else {
				$(o.tabElement, o.targetID).removeClass("selected");
				$(o.tabElement, o.targetID).eq(0).addClass('selected');
				$(o.boxElement, o.targetID).not(':first').hide();
			}
		}
		// jquery.tabs.js ver 1.3 cookie ver
		/*$(o.tabElement, o.targetID).each(function() {
			var selectedTab = $.cookie(o.targetID + 'selectedTab');
			if (selectedTab) {
				$(o.boxElement, o.targetID).eq(selectedTab).show();
				$(o.boxElement, o.targetID).not(':eq(' +selectedTab+')').hide();
				$(o.tabElement, o.targetID).filter(':eq(' +selectedTab+')').addClass('selected');
			} else {
				$(o.boxElement, o.targetID).not(':first').hide();
				$(o.tabElement, o.targetID).eq(0).addClass('selected');
			}

			$(this).click(function(){
				var tabIndex = $(o.tabElement, o.targetID).index(this);
				$.cookie(o.targetID + 'selectedTab', tabIndex);
				$(o.tabElement, o.targetID).removeClass('selected');
				$(this).addClass('selected');
				$(o.boxElement, o.targetID).hide().eq(tabIndex).addClass('selected').fadeIn();
			});

		});*/
		return this;
	};

	// stripe.js ver1.0
	$.fn.stripe = function(options) {
		var o = $.extend({
			targetID: '#today-index',
			oddClass: 'odd',
			evenClass: 'even'
		}, options);

		$('tbody', o.targetID).each(function() {
			$(this).children('tr:odd').addClass(o.oddClass);
			$(this).children('tr:even').addClass(o.evenClass);
		});
		return this;
	};

	// panel.load ver1.0
	$.fn.loadPages = function(options) {
    	var o = $.extend({
      		targetHTML: '/web/shared/include/vtop/panel.html',
      		targetID: '#panel-domestic-contents',
      		dispID: 'div#panel-domestic'
    	}, options);

    	$(o.dispID).each(function() {
      		$(this).load(o.targetHTML + ' ' + o.targetID);
    	});
    	return this;
  	};



	// campaign.js ver1.2
	$.fn.campaignShow = function(options) {
		var o = $.extend({
			targetID: '#campaign-box',
			jsonFile: '/web/campaign/campaign.json',
			pageType: 'campaign' //campaign, vtop, market, logout, fund
		}, options);

		$(o.targetID).each(function() {

			$.getJSON(
				o.jsonFile, {
					ts: new Date().getTime()
				},
				function(data) {

					if(o.pageType == 'campaign') {
						var contentDataJoint = '';
						for(var i in data) {
							if(data[i].lidTrack) {
								var lidTrack = '?l-id=' + data[i].lidTrack;
							} else {
								var lidTrack = '';
							}
							var contentDataFront = '<li><div class="box-inner-01"><dl><dt><a href="' + data[i].linkpath + lidTrack + '">'+ data[i].cpTitle;
							var contentDataBack = '<img src="'+data[i].imagepath+'" class="thumb" alt="' + data[i].cpTitle + '" width="160" height="120" /></a></dt><dd>' + data[i].description + '</dd><dd class="schedule"><span>期間</span> ' + data[i].distance + '</dd></dl></div></li>';
							if(data[i].newFlag == true) {
								contentDataJoint += contentDataFront + '<span class="icon-new">NEW</span>' + contentDataBack;
							} else {
								contentDataJoint += contentDataFront + contentDataBack;
							}
						}
						$(o.targetID).find('ul').html(contentDataJoint);

					} else if(o.pageType == 'vtop') {
						var contentDataJoint = '';
						for(var i in data) {
							if (data[i].topTitle) {
								var vtitle = data[i].topTitle;
							} else {
								var vtitle = data[i].cpTitle;
							}
							if(data[i].topFlag == true) {
								var contentDataFront = '<tr><td><a onclick="s.lidTrack(\'vtop_campaign_' + data[i].lidTrack + '\')" href="' + data[i].linkpath + '">'+vtitle;
								var contentDataBack = '</a></td></tr>';
								if(data[i].newFlag == true) {
								contentDataJoint += contentDataFront + '<span class="icon-new">NEW</span>' + contentDataBack;
								} else {
									contentDataJoint += contentDataFront + contentDataBack;
								}
							}
						}
						$(o.targetID).find('tbody').html(contentDataJoint);

					} else if(o.pageType == 'market') {
						var contentDataJoint = '';
						for(var i in data) {
							if (data[i].topTitle) {
								var vtitle = data[i].topTitle;
							} else {
								var vtitle = data[i].cpTitle;
							}
							if(data[i].topFlag == true) {
								var contentDataFront = '<tr><td><a href="' + data[i].linkpath + '">'+vtitle;
								var contentDataBack = '</a></td></tr>';
								if(data[i].newFlag == true) {
									contentDataJoint += contentDataFront + '<span class="icon-new">NEW</span>' + contentDataBack;
								} else {
									contentDataJoint += contentDataFront + contentDataBack;
								}
							}
						}
						$(o.targetID).find('tbody').html(contentDataJoint);

					} else if(o.pageType == 'logout') {
						var contentDataJoint = '';
						for(var i in data) {
							if(data[i].logoutFlag == true) {
								var contentDataFront = '<li><a onclick="s.lidTrack(\'mlogout_textlink_' + data[i].lidTrack + '\')" href="' + data[i].linkpath + '">'+ data[i].logoutTitle;
								var contentDataBack = '</a></li>';
								if(data[i].newFlag == true) {
									contentDataJoint += contentDataFront + '<span class="icon-new">NEW</span>' + contentDataBack;
								} else {
									contentDataJoint += contentDataFront + contentDataBack;
								}
							}
						}
						$(o.targetID).find('ul').html(contentDataJoint);

					} else if(o.pageType == 'fund') {
						var contentDataJoint = '';
						for(var i in data) {
							if (data[i].fundTitle) {
								var vtitle = data[i].fundTitle;
							} else {
								var vtitle = data[i].cpTitle;
							}
							if(data[i].fundFlag == true) {
								var contentDataFront = '<tr><td><a onclick="s.lidTrack(\'fund_top_campaign_' + data[i].lidTrack + '\')" href="' + data[i].linkpath + '">'+vtitle;
								var contentDataBack = '</a></td></tr>';
								if(data[i].newFlag == true) {
								contentDataJoint += contentDataFront + '<span class="icon-new">NEW</span>' + contentDataBack;
								} else {
									contentDataJoint += contentDataFront + contentDataBack;
								}
							}
						}
						$(o.targetID).find('tbody').html(contentDataJoint);

					} else {
						//何もしない
					}
				}
			);
		});

		return this;
	};

	// rollover ver1.0
	$.fn.rollOver = function(options) {
		var o = $.extend({
			normalSuffix: '_off',
			hoverSuffix: '_on'
			}, options);

		// for IE indexOf extended
		if (!Array.indexOf) {
			Array.prototype.indexOf = function(sarch, from) {
				var len = this.length;
				from = from || 0;
				from += (from < 0) ? len : 0;
				for (; from < len; ++from) {
					if (this[from] === sarch) {
						return from;
					}
				}
				return -1;
			}
		}

		//preload
		$('a').find('img.rollover').each(function() {
			if(String($(this).attr('src')).match(/o.normalSuffix\.(.*)$/)){
				var img = new Image();
				img.src = String($(this).attr('src')).replace(/o.normalSuffix\.(.*)$/, o.hoverSuffix.$1, o.currentSuffix.$1);
			}
		});

		//rollover
		$('a').find('img.rollover').hover(function() {
			$(this).attr('src', $(this).attr('src').replace(o.normalSuffix, o.hoverSuffix));
		}, function() {
			$(this).attr('src', $(this).attr('src').replace(o.hoverSuffix, o.normalSuffix));
		});

		return this;
	};

});(jQuery);


function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('#');
	for(var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = decodeURI(hash[1]);
	}
	return vars;
}
