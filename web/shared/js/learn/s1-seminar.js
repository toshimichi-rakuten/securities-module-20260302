function seminarTime(){
	var timestamp = $("#timestamp").text()
	var flagEtr = dataArr['entry'];
	var flagTime3 = dataArr['time3'] - timestamp;
	var flagTime2 = dataArr['time2'] - timestamp;
	var flagTime1 = dataArr['time1'] - timestamp;
	var flagVod = dataArr['vod'];
	//console.log(dataArr)

    //開催済か判断
    if(flagTime3 > 0){
		//申込不要か判断
		if(flagEtr == '要申込'){
		//受付終了か判断
		if(flagTime2 > 0){
			//受付中か判断
			if(flagTime1 > 0){
			//console.log('受付前')
			}else{
			$('.time-through').show();
			}
		}else{
			$('.time-after').show();
		}
		}else{
		$('.no-entry').show();
		}
	}else{
		$('.time-end').show();
	}

	//オンデマンドテキスト変換
	if(flagVod == '〇'){
		$('#end-txt').text('本セミナーのライブ配信は終了しました。オンデマンド配信にてご覧いただけます。')
		if(flagTime3 > 0){
			$('#vod-txt-1').after('<br>同じURLで後日オンデマンド配信に切り替わります。')
			$('#vod-txt-2').after('<br>同じURLで後日オンデマンド配信に切り替わります。')
		}
	}

}
seminarTime() 