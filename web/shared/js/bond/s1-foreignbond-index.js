function createBanner(){
  var str = "";
  var tempHead = '<div class="s1-swiper-lower"><div class="swiper-wrapper s1-swiper-lower-list">';
  var tempFoot = '</div><div class="s1-swiper-lower__btn-prev"></div><div class="s1-swiper-lower__btn-next"></div></div>';
  fetch("/web/bond/json/banner.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < data.length; i++){
      var n = data[i];
      var flag = n.slid;
      if (n.fbond !== "") {
        str = str + '<div class="swiper-slide s1-swiper-lower-list__item"><a href="' + n.urpc + '" data-ratid="foreignbondtop-full-banner_' + n.slid + '" data-ratevent="click" data-ratparam="all"'+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+'><img decoding="async" src="' + n.img + '220x220.png" alt="' + n.title + '"></a></div>';
      }
    }
    str = tempHead + str + tempFoot;
    $("#data-json-banner").replaceWith(str);

    const swiper = new Swiper(".s1-swiper-lower", {
      slidesPerView: 'auto'/* この行を追加 */,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true
      },
      navigation: {
        nextEl: '.s1-swiper-lower__btn-next',
        prevEl: '.s1-swiper-lower__btn-prev'
      }
    });
  })
}


createBanner();


// 表組のスタイル修正
$('.include_contents table thead tr th').removeClass();
$('.include_contents table thead tr th:nth-child(2)').addClass('s1-tbl--width-25');
$('.include_contents table thead tr th:nth-child(3)').addClass('s1-tbl--width-10');
$('.include_contents table thead tr th:nth-child(4)').addClass('s1-tbl--width-10');

// 遅延表示
setTimeout(function() {
  $('.include_contents').css('display','block');
}, 500);