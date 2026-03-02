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

  $.ajax({
    async : false,
    url : "/web/shared/json/info/info_bo.json",
    type : "get",
    dataType : "json",
    cache : false,
    success : function(data){
      for(var i=0; i < data.length; i++) {
        var n = data[i];
        str1 = str1 +
          '<li class="s1-list-info__item">'+
          '<div class="s1-list-info__content s1-list-info__content--time">'+n.date+'</div>'+
          '<div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--' +n.label_en+ '">'+n.label+'</span></div>'+
          '<div class="s1-list-info__content"><a href="'+n.pc_url+'"target="'+n.blank+'" data-ratid="bo_info_'+n.slid+'" data-ratevent="click" data-ratparam="all">'+n.txt+'</a></div>'+
          '</li>';
        cnt1++;
        }
      str1 = tempHead1 + str1 + tempFoot1;
      str1 = str1.replace(/target=\"〇\"/g,' target=\"_blank\"')
      str1 = str1.replace(/target=\"×\"/g,'')
      //console.log(str1);
      $("#data-json-info").append(str1);
    }
  });
}

createInfo();
