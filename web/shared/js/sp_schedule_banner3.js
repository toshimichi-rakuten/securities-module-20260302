/***
 * スケジュールバナー表示制御プログラム
 *
 **/

var run = function(id, b, s){
        var schedule_banner = document.getElementById(id); //表示領域のDOM取得
        var today = new Date();// 今日の日付を取得
        var targetDay = [];//ターゲット日時を格納
        var res_time = []; //ターゲット日時までの時間

        // ターゲット日時を配列に格納
        for(var i=0;i < s.length;i++){
            targetDay[i] = new Date(s[i].year, s[i].month-1, s[i].day, s[i].hour, s[i].min, s[i].sec );
        }

        //ターゲット日時の配列を「後ろ」から走査
        for (var i = targetDay.length - 1; i >= 0; i--) {
            res_time[i] = targetDay[i] - today; //ターゲット日時までの時間（マイクロ秒）を取得
           // console.log(i, res_time[i])
                //負の場合にバナー出力
                if(res_time[i] < 0){
					schedule_banner.src = b + s[i].img;
                    break;
                }
        }
};

//1000マイクロ秒毎に実行
setInterval(function(){run(id_array[0], img_base_path_array[0], sp_schedules)}, 1000);

