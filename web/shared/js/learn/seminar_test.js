// JavaScript Document
(function($) {
	$(function(){
		//get current time
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minutes = date.getMinutes();
		if(month<10) month = "0"+month;
		if(day<10) day = "0"+day;
		if(hour<10) hour = "0"+hour;
		if(minutes<10) minutes = "0"+minutes;
		var currentTime = year+""+month+""+day+""+hour+""+minutes;

		$('#str-main td.status:empty').each(function (){
			var targetTime = $(this).parent('tr').find('span.date').html();
			var endTime = $(this).parent('tr').find('span.eDate').html();
			var startTime = $(this).parent('tr').find('span.sDate').html();
			var startMonth = startTime.slice(4,6);
			var startDay = startTime.slice(6,8);
			if(startMonth.slice(0,1) == 0) startMonth = startMonth.slice(1,2);
			if(startDay.slice(0,1) == 0) startDay = startDay.slice(1,2);

			if(currentTime > targetTime) {
				$(this).html('開催済');
				$(this).parent('tr').find('td.status2').text('-');
			}else if(currentTime > endTime){
				$(this).html('受付終了');
			}else if(currentTime > startTime){
				$(this).html('受付中');
			}else{
				$(this).html(startMonth+'/'+startDay+'～受付');
			}
		});
	});
})(jQuery);