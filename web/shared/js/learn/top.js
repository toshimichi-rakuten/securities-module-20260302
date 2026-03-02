// JavaScript Document
function newUp(y, m, d, c) {
  delDay = 7; 
  oldDay = new Date(y + "/" + m + "/" +d);
  newDay = new Date();
  d =(newDay - oldDay) / (1000 * 24 * 3600);
  if(d <= delDay) {
    if(c == "new") document.write("<span class='icon-new'>NEW</span>");
  }
}

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

        var openSeminarNum = 0;
		$('tr.stats').each(function (){
			var endTime = $(this).find('span.eDate').html();
			if(currentTime <= endTime){
				$(this).show();
                openSeminarNum ++;
			}else{
				$(this).hide();
			}
		});
        if (openSeminarNum == 0) {
			$('table.tbl-data-04').hide();
            $('ul.list-link-02').eq(0).replaceWith('<ul class="" style="margin:15 0 15 20;"><li class="selected">現在申込受付中の勉強会はありません</li></ul>');
        }
    });
})(jQuery);