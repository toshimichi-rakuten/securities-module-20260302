/***
 * CPボタンの表示制御プログラム
 *
 **/
(function(){
	var endFlg = false;
	var schedules = [
		{'year':2017, 'month':03, 'day':02, 'hour':10, 'min':30, 'sec':0, 'flg':1 }, //start
		{'year':2017, 'month':03, 'day':02, 'hour':10, 'min':30, 'sec':10, 'flg':2 }, //end
	];
	$("#entry-description2").css("display","block");
	var run = function(s, $){
		var today = new Date();// 今日の日付を取得
		var targetDay = [];//ターゲット日時を格納
		var res_time = []; //ターゲット日時までの時間

		// ターゲット日時を配列に格納
		for(var i=0;i < s.length;i++){
			targetDay[i] = new Date(s[i].year, s[i].month-1, s[i].day, s[i].hour, s[i].min, s[i].sec );
		}

		//ターゲット日時の配列を走査
		for (var i = 0; i <= targetDay.length - 1; i++) {
			res_time[i] = targetDay[i] - today; //ターゲット日時までの時間（マイクロ秒）を取得
			//res_timeが負の場合、トリガー作動
			if( res_time[i] < 0 && !endFlg ){
				switch (s[i].flg){

					case 1: //start
						$("#entry_btn").css("display","block");
						break;

					case 2: //end
						$(".cp_end").css("display","none");
						$("#show_message").css("display","block");
						endFlg = true;
						break;
				}
			}
		}
	};

	run(schedules, jQuery);

	//1000マイクロ秒毎に実行
	setInterval(function(){run(schedules, jQuery)}, 1000);

})();
