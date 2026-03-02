function createBanner(){
  var str = "";
  var arr = [];
  var cnt = 0;
  var tempHead = '<div class="s1-swiper swiper"><div class="swiper-wrapper">';
  var tempFoot = '</div></div><div class="swiper-pagination">';
  fetch("/web/shared/json/fund/banner.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < data.length; i++){
      if(cnt < 5){
        var n = data[i];
        if (n.fvt !== "") {
          arr.push(n.pagination);
          str = str + '<div class="swiper-slide"><a href="'+n.urpc+'?l-id=fundtop-full-banner_'+n.slid+'" data-ratid="fundtop-full-banner_'+n.slid +'" data-ratevent="click" data-ratparam="all"'+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+'><img src="'+n.img+'876x220.png" width="876" height="220" alt="' + n.title + '"></a></div>'
          cnt = cnt + 1;
        }
      }
    }
    str = tempHead + str + tempFoot;
    $("#data-json-banner").replaceWith(str);

    const swiper = new Swiper(".s1-swiper", {
      slidesPerView: 1　/* この行を追加 */,
      // ナビボタンが必要なら追加
      pagination: {
        el: '.swiper-pagination', // ページネーション要素のクラス
        clickable: true, // クリックによるスライド切り替えを有効にする
        type: 'bullets', // 'bullets'（デフォルト） | 'fraction' | 'progressbar'
        renderBullet: function(index, className) {
          //中の文字を表示
          return '<span class="' + className + ' swiper-pagination-bullet--' + index + '">' + arr[index] + '</span>';
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

function createInfo(){
  var tempHead = '<ul class="s1-list-info">';
	var tempFoot = '</ul>'
  var cnt = '0';
  var src = '';
  fetch("/web/shared/json/fund/pickup_fund.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i<data.num; i++){
      var r = data.docs[i];
      if(r.Channel.indexOf("t") > -1 && r.Channel.indexOf("v") > -1){
        // r.vUrlに?が含まれているか確認
        var lidParam = r.vUrl.indexOf("?") > -1 ? "&lid=" : "?lid=";
        src = src + '<li class="s1-list-info__item"><div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--'+ r.label[0] +'">'+ r.label[1] +'</span></div><div class="s1-list-info__content"><a href="' + r.vUrl + lidParam + 'fund_top_pickup_text_'+ r.slid +'" data-ratid="v_fund_top_pickup_txt_' + r.slid + '" data-ratevent="click" data-ratparam="all">' + r.Title + '</a></div></li>'
      }
    }
    src = tempHead + src + tempFoot;
    $("#data-json-info").replaceWith(src);
  });
}

createBanner();
createInfo();

//トウシル記事表示
$.ajax({
  url : "https://media.rakuten-sec.net/list/feed/choice_fund.js",
  type : "get",
  dataType : "jsonp",
  scriptCharset : "UTF-8",
  cache : false,
  timeout: 10000,
  complete :  function(data){
  }
});

function choice_fund(json){
  var str = "";

  $.each(json.List, function(i, data) {
    if(i >= 4) return false;
    atid = data.Link.split("-/");
    aymd = data.Date.split("/");

    str = str + '<div class="s1-grid__cell--thin-1-4"><div class="s1-link-box-03 s1-link-box-03--padding"><a href="'+ data.Link +'" target="_blank" data-ratid="v_domestic_top_report_'+ aymd[0] + aymd[1] + aymd[2] + '_' + atid[1] +'" data-ratevent="click" data-ratparam="all"></a><div class="s1-box-media"><p><img decoding="async" src="' + data.Image + '" alt="" width="182"></p></div><p class="fc-b-01 fw-b">'+ data.Title +'</p><p class="fs-xs">'+ data.Date +'更新</p></div></div>'
  });
  $("#REPLST").prepend(str);
}