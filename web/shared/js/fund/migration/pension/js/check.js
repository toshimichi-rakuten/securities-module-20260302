$(function(){
	/*
	 * author: yossy
	 * created: 2012/5/18
	 * version: 1.0.0 
	 */
	
	/*-------------------------------------------
	 *  Level check
	 --------------------------------------------*/
	// variables
	var checkBtn = $('a.check','.btnNext');
	var checkBackBtn = $('a.checkBack','.btnNext');
	
	// initialize
	$('#levelCheck :checkbox').attr('checked', false);
	
	// events
	$(checkBtn).click(function(){
		$('#toRes').hide();
		$('#test').hide();
		var cnt = $('#levelCheck :checked').length;
		var idx = '';
		if(cnt === 9){
			idx = '01';
		} else if(cnt === 8 || cnt === 7){
			idx = '02';
		} else if(4 <= cnt && cnt <= 6) {
			idx = '03';
		} else if(1 <= cnt && cnt <= 3) {
			idx = '04';
		} else {
			idx = '05'
		}
		$('#toTest').fadeIn();
		$('#res'+idx).fadeIn();
	});
	
	$(checkBackBtn).click(function(){
		$('.res').hide();
		$('#toTest').hide();
		$('#test').show();
		$('#toRes').show();
	});
	
	/*-------------------------------------------
	 *  Bubble tip
	 --------------------------------------------*/
	// initialize
	$('div.termTip').css('opacity', '0.8').hide();
	
	// events
	$('span.term').hover(function(){
		var idx = $('span.term').index(this);
		$('div.termTip').eq(idx).fadeIn().css({
			'top': $(this).offset().top - $('div.termTip').eq(idx).height() - 8 + 'px',
			'left': $(this).offset().left + $(this).width() - 90 + 'px'
		});
	},function(){
		var idx = $('span.term').index(this);
		$('div.termTip').eq(idx).fadeOut();
	});
	
	/*-------------------------------------------
	 *  Carousel
	 --------------------------------------------*/
	// variables
	var idx = 0;
	var inqNum = $('#inqWrap').find('.inqList').length;
	var scrollPos = $('#inquiry').offset().top;
	
	// initialize
	$('#prev').hide();
	$('div#inqInner').height($('div.inqList:eq('+idx+')').height());
	
	// events
	$('#prev').click(function(){
		idx--;
		var mgn = '+=' + $('div.inqList').width();
		carousel(mgn);
	});
	$('#next').click(function(){
		idx++;
		var mgn = '-=' + $('div.inqList').width();
		carousel(mgn);
	});
	$('a', '#answerList').click(function(){
		if(idx === $('a', '#answerList').index(this)){
			return false;
		}
		idx = $('a', '#answerList').index(this);
		var mgn = $('div.inqList').width() * -idx;
		carousel(mgn);
		return false;
	});
	
	function carousel(mgn){
		$('.carouselBtn').hide();
		$('html, body').stop().animate({scrollTop: scrollPos}, 'fast', function(){
			$('div#inqInner').stop().animate({marginLeft: mgn}, 'slow', 'easeInOutExpo', function(){
				if(idx === (inqNum-1)){
					$('#prev').show();
				} else if(idx === 0) {
					$('#next').show();
				} else {
					$('.carouselBtn').show();
				}
			});
		});
		$('div#inqInner').animate({height: $('div.inqList:eq('+idx+')').height()}, 'fast');
	}
	
	//get pageId from URL query to set initail page of the carousel.
	function getPageID(params){
		var id = params.pageId;
		var query = location.search+'&';
		var pageId;
		
		try {
			pageId = query.match(new RegExp('[\?&]'+id+'=(.*?)&'))[1]-1;
		} catch(e){
			pageId = 0;
		} finally {
			$('a', '#answerList').eq(pageId).trigger('click');
		}
	}
	getPageID({ pageId: 'pageId' });
});