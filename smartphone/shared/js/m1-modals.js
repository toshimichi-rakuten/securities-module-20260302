(function () {

	if($('#backButtonPressed').length !== 0) {
		if ( window.history.pushState) {
			window.history.pushState('forward', null, currentModal);
			history.pushState(null, null, location.href);
			$(window).on('popstate', function(event) {
				if(event.state!==null) {
					$('.m1-modal').hide();
					$('body').removeClass('m1-modal-open');
					$('body').css('overflow','scroll');
				}
			});
			history.go(1);
		}
	}
	
    var isModalOpened;
    //// For showing full screen modal and apply scroll to it so other content visible
    if ($('.js-windowModal').length !== 0) {
        isModalOpened = 1;
        setHeight();
    }

    //// if window switched to landscape mode or portrait mode then neeed to position modal again.
    $(window).resize(function () {
        //// If modal is closed or user dont open any modal then to prevent execution of this method this if loop is added.
        if (isModalOpened !== 0 && isModalOpened !== undefined) {
            setHeight();
        }
    });
    
	//// For Hiding attachment icon on click of edit button for SP030101.html Edit Modal
	$('.js-fav-edit-modal').click(function (e) {
	    $("#myModal").css('z-index', 99999);
	});

    //// When we open the popup and type some text in textbox then cursor of the textbox scrolls with the page
    $('#myModal').scroll(function () {
        $('#test').css('cursor', 'none');
    });

    //// on click of this modal opens hence disable scrolling of body.
	$('.js-hidden-scroll').click(function () {
	    $("body").addClass('m1-modal-open-small');
	});

    //// Showing modal on click of js-ranking-modal.
	$('.js-ranking-modal').click(function (e) {
		
	    currentModal = '#ranking';
	    $('#ranking').css("display", "block");
	    $('#ranking').css("aria-hidden", "false");
		$("body").css('overflow', 'hidden');
		$("body").addClass('m1-modal-open-small');
		$('.m1-modal-overlay').show();
		e.preventDefault();
	});

	 //// Showing modal on click of js-basicSearch-modal.
	$('.js-favourite-modal').click(function (e) {			 
		e.preventDefault();
		if ($('#basicSearch').length !== 0) {
		    currentModal = '#basicSearch';
	    	$('#basicSearch').css("display", "block");
	    	$('#basicSearch').css("aria-hidden", "false");
			$("body").css('overflow', 'hidden');
			$("body").addClass('m1-modal-open-small');
			$('.m1-modal-overlay').show();
		}
		if ($('#oprationResult').length !== 0) {
		    currentModal = '#oprationResult';
	    	$('#oprationResult').css("display", "block");
	    	$('#oprationResult').css("aria-hidden", "false");
			$("body").css('overflow', 'hidden');
			$("body").addClass('m1-modal-open-small');
			$('.m1-modal-overlay').show();
		}
	});


    //// on click of favmodal button need to open mymodal which is of fullscreen.
    $('#favModal, #favModal_bottom, #favModal2, #favModal3').click(function () {
        var modal = $('#myModal');
        $("body").css('overflow', 'hidden');
        $("body").addClass('m1-modal-open');
        modal.show();
    });

    //// Added this funcation for Open FundQuiz modal
    $('.js-fundQuizModal').click(function () {
        $("body").css('overflow', 'hidden');
        $("body").addClass('m1-modal-open');
        $('#fundQuiz').fadeIn(700);
        $('.m1-modal-backdrop').fadeIn(700);
    });

    //// Added this funcation for Closed FundQuiz modal
    $('.m1-modal-s-close').click(function () {
        $("body").css('overflow', 'auto');
        $("body").removeClass('m1-modal-open');
        $('#fundQuiz').fadeOut(700);
        $('.m1-modal-backdrop').fadeOut(700);
    });

    //// Class close to js-close on click of that need to close modal opened during fav modal.
    $('.js-close').click(function () {
        isModalOpened = 0;
        var modal = $('#myModal');
        $("body").removeClass('m1-modal-open');
        $("body").css('overflow', 'auto');
        modal.hide();
    });

    //on click of outside window close modal
    $(window).on('click touchstart', function (event) {
        if (currentModal !== "" && currentModal !== undefined) {
            var modal = document.getElementById(currentModal.replace("#", ""));
            if (event.target == modal) {
                setClassToDisplayNone(currentModal);
            }
        }
    });
})();

//// on window click other than modal then close help modal for that storing modal ID currently open and on close we are clearing this var value 
var currentModal;

//// Function to align div in middle
function setModalMiddle(val)
{
    currentModal = val;
    $('body').css('overflow','hidden');
    $('body').addClass('m1-modal-open-small');
    $('.m1-modal-overlay').show();
    $(val).show();
}

//// Function to align FooterModal or chartTab modal in middle
function setFooterModalMiddle(val) {
    currentModal = val;
    $(val).css('display', 'block');
    $(val).css("opacity", "1");
    $("body").css('overflow', 'hidden');
    $("body").addClass('m1-modal-open-small');
    $('.m1-modal-overlay').show();
}

////For closing modals this method is used
function setClassToDisplayNone(id) {
    currentModal = "";
    $('body').removeClass('m1-modal-open-small');
	$("body").css('overflow', 'auto');
    $(id).hide();
    $('.m1-modal-overlay').hide();
}

//// setting  modal height
function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.js-windowModal').css('min-height', windowHeight);
};