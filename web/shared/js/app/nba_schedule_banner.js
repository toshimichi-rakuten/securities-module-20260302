/***
 * CPボタンの表示制御プログラム
 *
 **/
 
 var campaignSchedules = [
	{'year':2018, 'month':04, 'day':01, 'hour':09, 'min':00, 'sec':00, 'flg':1 }, //start
 	{'year':2018, 'month':04, 'day':14, 'hour':23, 'min':59, 'sec':59, 'flg':2 } //end
];

(function(schedules, jqBase){
	var endFlg = false;
	var run = function(s, $){
		var today = new Date();// 今日の日付を取得
		var targetDay = [];//ターゲット日時を格納
		var res_time = []; //ターゲット日時までの時間

		// console.log(s[0].year);

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
						$(".cp_start").css("display","block");
						break;

					case 2: //end
						$(".cp_start").css("display","none");
						$("#end_message").css("display","block");
						endFlg = true;
						break;
				}
			}
		}
	};

	run(schedules, jqBase);

	//10000マイクロ秒毎(10秒毎)に実行
	setInterval(function(){run(schedules, jqBase)}, 10000);

})(campaignSchedules, jqBase);
