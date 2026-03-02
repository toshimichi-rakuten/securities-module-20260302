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

        // for vtop.html & list.html
        var openSeminarNum = 0;
		$('tr.stats').each(function (){
			var endTime = $(this).find('span.eDate').html();
			if(currentTime < endTime){
				$(this).show();
                openSeminarNum ++;
			}else{
				$(this).hide();
			}
		});
        if (openSeminarNum == 0) {
			$('table.tbl-data-04').hide();
            $('ul.list-link-02 li').replaceWith('<li>『現在申込受付中の勉強会はありません』</li>');
        }
        
        // for detail page
		var endTime = $('div span.eDate').html();
		if(currentTime > endTime){
			$('div span.eDate').replaceWith('<p class="close"><strong>お申込は締め切らさせていただきました</strong></p><!--  -->');
		}else{
			$('div span.eDate').hide();
		}

    });
})(jQuery);
