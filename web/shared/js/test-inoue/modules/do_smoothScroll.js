(function ($) {
  $(function($){
	$('a[href^="#"]:not(.s1-mfp-popup-modal)').SmoothScroll({
		  duration: 1000,
		  easing: 'easeOutQuint'
	}); 
  });
})(jqBase);