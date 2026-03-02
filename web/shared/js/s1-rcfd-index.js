const swiper = new Swiper(".s1-swiper", {
    slidesPerView: 1　/* この行を追加 */,
    // ナビボタンが必要なら追加
    pagination: {
        el: '.swiper-pagination', // ページネーション要素のクラス
        clickable: true, // クリックによるスライド切り替えを有効にする
        type: 'bullets' // 'bullets'（デフォルト） | 'fraction' | 'progressbar'
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },

    loop: true,
    autoplay: {
		delay: 3000,
		disableOnInteraction: true
	},
});

function createInfo(){
  var str1 = ""
  var cnt1 = "0"
  var tempHead1 = '<ul class="s1-list-info">';
  var tempFoot1 = '</ul>';

  $(function() {
    $.ajax({
      async : false,
      url : "/web/shared/json/info/info_rcfd.json",
      type : "get",
      dataType : "json",
      cache : false,
      success : function(data){
        for(var i=0; i < data.length; i++) {
          var n = data[i];
          if(n.us_pc !== ''){
            str1 = str1 +
            '<li class="s1-list-info__item">'+
            '<div class="s1-list-info__content s1-list-info__content--time">'+n.date+'</div>'+
            '<div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--' +n.label_en+ '">'+n.label+'</span></div>'+
            '<div class="s1-list-info__content"><a href="'+n.pc_url+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+'" data-ratid="rcfd_info_'+n.slid+'" data-ratevent="click" data-ratparam="all">'+n.txt+'</a></div>'+
            '</li>';
            cnt1++;
            if(i>5){
              break;
            }
          }
        }
        str1 = tempHead1 + str1 + tempFoot1;
        $("#data-json-info").append(str1);
      }
    });
  });
}

createInfo();

//トウシル記事表示
$.ajax({
  url : "https://media.rakuten-sec.net/list/feed/choice_cfd.js",
  type : "get",
  dataType : "jsonp",
  scriptCharset : "UTF-8",
  cache : false,
  timeout: 10000,
  complete :  function(data){
  }
});

function choice_cfd(json)
{
var str = "";

$.each(json.List, function(i, data) {
  if(i >= 4) return false;
  atid = data.Link.split("-/");
  aymd = data.Date.split("/");

  str = str + '<div class="s1-grid__cell--thin-1-4"><div class="s1-link-box-03 s1-link-box-03--padding"><a href="'+ data.Link +'" target="_blank" data-ratid="v_domestic_top_report_'+ aymd[0] + aymd[1] + aymd[2] + '_' + atid[1] +'" data-ratevent="click" data-ratparam="all"></a><div class="s1-box-media"><p><img decoding="async" src="' + data.Image + '" alt="" width="182"></p></div><p class="fc-b-01 fw-b">'+ data.Title +'</p><p class="fs-xs">'+ data.Date +'更新</p></div></div>'
});
$("#REPLST").prepend(str);
}
