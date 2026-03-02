new Swiper('#js-pcmm-carousel-tickers', {
  loop: true,
  slidesPerView: 4,
  // slidesPerGroup: 5,
  width: 842,
  spaceBetween: 5,
  navigation: {
    nextEl: '#js-pcmm-carousel-tickers-navigation > .swiper-button-next',
    prevEl: '#js-pcmm-carousel-tickers-navigation > .swiper-button-prev'
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: true
  }
});

function createBanner(){
  var str2 = "";
  let arr2 = [];
  var tempHead2 = '<div class="s1-swiper swiper"><div class="swiper-wrapper">';
  var tempFoot2 = '</div></div><div class="swiper-pagination">';
  fetch("/web/nisa/json/banner.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < 5; i++){
      var n = data[i];
      arr2.push(n.pagination);
      // ?が含まれているか確認
      var lidParam = n.urpc.indexOf("?") > -1 ? "&l-id=" : "?l-id="; 
      str2 = str2 + '<div class="swiper-slide"><a href="'+n.urpc+lidParam+'nisatop-full-banner_'+n.slid+'" data-ratid="nisatop-full-banner__'+n.slid +'" data-ratevent="click" data-ratparam="all"'+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+'><img src="'+n.img+'876x220.png" width="876" height="220" alt="'+n.title+'"></a></div>'
    }
    str2 = tempHead2 + str2 + tempFoot2;
    //console.log(str2);
    $("#data-json-banner").replaceWith(str2);

    const swiper = new Swiper(".s1-swiper", {
      slidesPerView: 1　/* この行を追加 */,
      // ナビボタンが必要なら追加
      pagination: {
        el: '.swiper-pagination', // ページネーション要素のクラス
        clickable: true, // クリックによるスライド切り替えを有効にする
        type: 'bullets', // 'bullets'（デフォルト） | 'fraction' | 'progressbar'
        renderBullet: function(index, className) {
          //中の文字を表示
          return '<span class="' + className + ' swiper-pagination-bullet--' + index + '">' + arr2[index] + '</span>';
        }
      },
      loop: true,
      autoplay: {
      delay: 3000,
      disableOnInteraction: true
      },
    });
  })
}

/* ========================================================================
 * カレント
 * ======================================================================== */
document.addEventListener("DOMContentLoaded", function() {
  var currentPagePath = window.location.pathname;
  var navLinks = document.querySelectorAll(".s1-nisa-lnavi-list li a");

  navLinks.forEach(function(link) {
    var href = link.getAttribute("href");
    if (href === currentPagePath) {
      link.classList.add("active");
    }
  });
});


function createInfo(){
  var tempHead = '<ul class="s1-list-info">';
	var tempFoot = '</ul>'
  var cnt = '0';
  var src = '';
  fetch("/web/shared/json/info/info_nisa.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < data.length; i++){
      var n = data[i];
      src = src +
      '<li class="s1-list-info__item">'+
      '<div class="s1-list-info__content s1-list-info__content--time">'+n.date+'</div>'+
      '<div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--' +n.label_en+ '">'+n.label+'</span></div>'+
      '<div class="s1-list-info__content"><a href="'+n.pc_url+'" '+(n.blank =="〇" ? 'target=\"_blank\" ' : '' )+'data-ratid="nisa_info_'+n.slid+'" data-ratevent="click" data-ratparam="all">'+n.txt+'</a></div>'+
      '</li>';
      if(i>4){
        break;
      }
    }
    src = tempHead + src + tempFoot;
    $("#data-json-info").replaceWith(src);
  });
}

createBanner();
createInfo();