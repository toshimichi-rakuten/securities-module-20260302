$(function(){
	setTimeout(function(){if(window.pageYOffset===0){window.scrollTo(0,1);}},100);
    
    $("div.toggleTtl, div.btnMoreInfo").click(function () {
      $(this).next().slideToggle();
	  $(this).toggleClass('open');
    });
	
	$("div.btnMoreInfo").hover(function () {
	  $("div.btnMoreInfo span").toggleClass('over');
	},
	function () {
	  $("div.btnMoreInfo span").removeClass('over');	
	});	

    $("p.btnAccToggle").click(function () {
      $(this).next().toggle();
    });

});

