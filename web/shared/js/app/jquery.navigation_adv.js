/*
 * jquery.navigation_adv.js
 *
 * 4階層目マッチ
 *
 */

$(document).ready(function() {
	
	$("#nav-local").hide();
		
	var activeUrl3 = location.pathname.split("/")[3];
    var activeUrl4 = location.pathname.split("/")[4];
    navList = $("#nav-local").find("a");
    navList.each(function(){
        if( $(this).attr("href").split("/")[3] == activeUrl3 ) {
			$(this).parents("ul").show();
			$(this).parents("ul").parents("li").addClass("selected");
			if( $(this).attr("href").split("/")[4] == activeUrl4 ) {
				$(this).parents("li").addClass("selected");
			};
    };
	 $("#nav-local").show();
    });
});