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

$(function(){
  $.ajax({
    url: "https://www.trkd-asia.com/rakutensecj/pagecontent?pid=102",
    type: "get",
    dataType: "jsonp",
    scriptCharset: "UTF-8",
    cache: false,
    timeout: 3000,
    complete: function() {}
  });
});
  function indexFuture(json) {
    var p = json.list;

    //jnic1
    $(".jnic1rt1").html(p[0][2] + "　<span class=\"" + getColor(p[0][4]) + "\">" + p[0][4] + "</span>");
    $(".jnic1tm1").text(p[0][3] + "　10分ディレイ");

    //jnic1
    $(".jnic1rt").text(p[0][2]);
    $(".jnic1cp").text(p[0][4]);
    $(".jnic1cp").addClass(getColor(p[0][4]));
    $(".jnic1tm").text(p[0][3]);

    //jmic1
    $(".jmic1rt").text(p[14][2]);
    $(".jmic1cp").text(p[14][4]);
    $(".jmic1cp").addClass(getColor(p[14][4]));
    $(".jmic1tm").text(p[14][3]);

    //ymc1
    $(".ymc1rt").text(p[7][2]);
    $(".ymc1cp").text(p[7][4]);
    $(".ymc1cp").addClass(getColor(p[7][4]));
    $(".ymc1tm").text(p[7][3]);

  }

  function getColor(val) {
    if( val > 0) {
      return("up-02");
    } else if( val < 0) {
      return("down-02");
    }
    rerurn("");
  }

function createInfo(){
  var str1 = ""
  var cnt1 = "0"
  var tempHead1 = '<ul class="s1-list-info">';
  var tempFoot1 = '</ul>';

  $.ajax({
    async : false,
    url : "/web/fop/json/fop_info.json",
    type : "get",
    dataType : "json",
    cache : false,
    success : function(data){
      for(var i=0; i < data.length; i++) {
        var n = data[i];
        if(n.fop_pc !== ''){
          if(cnt1 < 5){
            str1 = str1 +
            '<li class="s1-list-info__item">'+
            '<div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--' +n.class+ '">'+n.label+'</span></div>' +
            '<div class="s1-list-info__content"><a href="'+n.urpc+'"target="'+n.blank+'" data-ratid="fop_info_'+n.slid+'" data-ratevent="click" data-ratparam="all">'+n.title+'</a></div>'+
            '</li>';
            cnt1++;
          }
        }
      }
      str1 = tempHead1 + str1 + tempFoot1;
      str1 = str1.replace(/target=\"〇\"/g,' target=\"_blank\"')
      str1 = str1.replace(/target=\"×\"/g,'')
      $("#data-json-info").append(str1);
    }
  });
}
createInfo();

function getPCR() {
  $.ajax({
    async : false,
    url : "/web/market/rsec/pcr.csv",
    type : "get",
    dataType : "text",
    scriptCharset : "UTF-8",
    cache : false,
    timeout: 3000,
    success :  function(data){
      var pcr = [];
      data = data.replace(/"/g, '');
      $.each(data.split(/\r\n|\r|\n/), function(i, val){
        pcr.push(val.split(/,/));
      });
      var str2 = "";
      str2 = str2 +
      '<li class="s1-list-info__item">'+
      '<div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--trade">お取引</span></div>' +
      '<div class="s1-list-info__content"><a href="/web/market/rsec/pcr.html" data-ratid="fop_info_market_rsec_pcr" data-ratevent="click" data-ratparam="all">プット・コールレシオの推移（算出期間：'+pcr[0][0]+'～'+pcr[4][0]+'分）</a></div>'+
      '</li>';
      $(".s1-list-info").prepend(str2);
    }
  });
}
getPCR();