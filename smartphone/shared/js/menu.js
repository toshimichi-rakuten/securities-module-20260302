  //header分の空ボックスを作成
  var headerheight = document.getElementById("VHEAD").clientHeight;
  $('.s3-marginbox--header').css('height', headerheight + 'px');
  
  //Menuの表示
  var btn = document.getElementById('s3-nav--button');
  var box = document.getElementById('s3-menu--opened');
  btn.onclick = function () {
    $('.s3-menu-trigger').toggleClass('active');
    box.classList.toggle('s3-menu--is-show');
    var boxmargin = parseInt($('.s3-menu__container').css('margin-bottom'), 10);
    $('.s3-menu__container--margentop').css('margin-top', headerheight + boxmargin + 'px');
    return false;
  }

//アコーディオン開閉icon
var accordionclose = '閉じる'
var accordionopen =　'開く'
$(function(){
  $('.s3-menu__links-title--top0').click(function() {
      if ($('.switch').prop('checked')) {
          $('.s3-menu--accordion__icon').removeClass('active');
          $('.s3-menu--right__text').text(accordionopen);
      } else {
          $('.s3-menu--accordion__icon').addClass('active');
          $('.s3-menu--right__text').text(accordionclose);
      }
  });
});