
$(function(){

// pagetop
	$('.anchor a, a.anchor').click(function(){
		$('html,body').animate({ scrollTop: $($(this).attr('href')).offset().top });
		return false;
	});

// accordion
	$('.acco-btn').click(function() {
		_open($(this));
		$(this).next().slideToggle(100);
	});
	function _open($this) {
		if ($this.hasClass('open')) {
			$this.removeClass('open');
		}
		else {
			$this.addClass('open');
		}
	}

// tab
	$('.tab-content__item:not(.is-active)').hide();
	$('.tab li').click(function() {
		var num = $(this).parent().children('li').index(this);
		$(this).parent('.tab').each(function(){
			$('>li',this).removeClass('is-active').eq(num).addClass('is-active');
		});
		$(this).parent().next().children().hide().eq(num).fadeIn('fast');
	}).first().click();
	
// indent-align
	if($('.indent-align__image').length){
		$('.indent-align__image').each(function(){
			var img_width = $(this).width();
			$(this).parents('.indent-align').css({'width': img_width})
		})
	}
// matchHeight
	if($('.matchHeight').length){
		$('.matchHeight').matchHeight();
		$('.font-size__buttons li').click(function(){
			setTimeout(function(){
				$('.matchHeight').matchHeight();
			}, 500);
		});
	}
	
//run again
	$('.tab li, .acco-btn').click(function() {

	// indent-align
		if($('.indent-align__image').length){
			$('.indent-align__image').each(function(){
				var img_width = $(this).width();
				$(this).parents('.indent-align').css({'width': img_width})
			})
		}
	// matchHeight
		if($('.matchHeight').length){
			$('.matchHeight').matchHeight();
			$('.font-size__buttons li').click(function(){
				setTimeout(function(){
					$('.matchHeight').matchHeight();
				}, 500);
			});
		}
	});

});
