// JavaScript Document
(function($) {
	$(function(){
		//get current time
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		if(month<10) month = "0"+month;
		if(day<10) day = "0"+day;
		var currentTime = year+""+month+""+day;
        
		var endTime = $('div span.eDate').html();
		if(currentTime > endTime){
			$('div span.eDate').replaceWith('<p class="close"><strong>お申込は締め切らさせていただきました</strong></p><!--  -->');
		}else{
			$('div span.eDate').hide();
		}

    });
})(jQuery);
