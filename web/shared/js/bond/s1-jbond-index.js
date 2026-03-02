function createMain(){
  var tempHead = '<table class="s1-tbl-data01 s1-tbl--width-full fs-s"><thead><tr><th>通貨</th><th>銘柄名</th><th>利率<br>（税引前）</th><th>利率<br>（税引後）</th><th>買付単位</th><th>償還日</th><th>買付単価</th><th>格付け</th><th>利払日</th></tr></thead><tbody>';
	var tempFoot = '</tbody></table>'
  fetch("/web/bond/jbond/json/jgb.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    var src = "";
    var cnt = 0;
    var bnrtxt = "";
    var i = 0;
    var n = data[i];
    var plan = '<td class="fc-r-01 fw-b ta-l va-m" colspan="2">※'+n.plan+'条件決定予定</td>'
    var rate3 = (n.plan=='')?('<td class="fw-b fc-r-01 ta-r va-m">'+n.rate3+'％</td><td class="ta-r va-m">'+n.zrate3+'％</td>'):(plan);
    var rate5 = (n.plan=='')?('<td class="fw-b fc-r-01 ta-r va-m">'+n.rate5+'％</td><td class="ta-r va-m">'+n.zrate5+'％</td>'):(plan);
    var rate10 = (n.plan=='')?('<td class="fw-b fc-r-01 ta-r va-m">'+n.rate10+'％</td><td class="ta-r va-m">'+n.zrate10+'％</td>'):(plan);
    bnrtxt = '当社販売期間：'+n.term;
    //bnrtxt = bnrtxt.replace(/（.）/g,'')
    bnrtxt = bnrtxt.replace(/年/g,'年<br>')
    bnrtxt = bnrtxt.replace(/～/g,'～<br>')
    src = '<tr><td class="ta-c va-m"><img src="/web/shared/images/flags/flag_japan.svg" alt="日本円（JPY）" class="brand-table_icon"></td><td class="ta-l va-m"><a href="/web/bond/jbond/individual_jgb/">個人向け国債 固定3年（第'+n.name3+'回）</a></td>'+rate3+'<td class="ta-c va-m">1万円以上<br>1万円単位</td><td class="ta-c va-m">'+n.rede3+'</td><td class="ta-c va-m">100.00％</td><td class="ta-c va-m">-</td><td class="ta-c va-m">年2回<br>'+n.pay+'</td></tr>' +
    '<tr><td class="ta-c va-m"><img src="/web/shared/images/flags/flag_japan.svg" alt="日本円（JPY）" class="brand-table_icon"></td><td class="ta-l va-m"><a href="/web/bond/jbond/individual_jgb/">個人向け国債 固定5年（第'+n.name5+'回）</a></td>'+rate5+'<td class="ta-c va-m">1万円以上<br>1万円単位</td><td class="ta-c va-m">'+n.rede5+'</td><td class="ta-c va-m">100.00％</td><td class="ta-c va-m">-</td><td class="ta-c va-m">年2回<br>'+n.pay+'</td></tr>' +
    '<tr><td class="ta-c va-m"><img src="/web/shared/images/flags/flag_japan.svg" alt="日本円（JPY）" class="brand-table_icon"></td><td class="ta-l va-m"><a href="/web/bond/jbond/individual_jgb/">個人向け国債 変動10年（第'+n.name10+'回）</a></td>'+rate10+'<td class="ta-c va-m">1万円以上<br>1万円単位</td><td class="ta-c va-m">'+n.rede10+'</td><td class="ta-c va-m">100.00％</td><td class="ta-c va-m">-</td><td class="ta-c va-m">年2回<br>'+n.pay+'</td></tr>'
    src = src.replace(/(\d+)月(\d+)日/g, '$1/$2');
    src = src.replace(/(\d{4})年/g, '$1/');
    src = tempHead + src + tempFoot;
    //$("#data-json-jbond-txt").replaceWith(bnrtxt);
    $("#data-json-jbond-table").replaceWith(src);
    createBanner(bnrtxt);
  });
}

function createBanner(bnrtxt){
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
      if(flag == "individual-jgb"){
        var flag1 = " class=\"jbond-banner-220\"";
        var flag2 = "<span class=\"jbond-banner-220__txt\">"+bnrtxt+"</span>"
      }else{
        var flag1 = "";
        var flag2 = "";
      }

      if (n.jbond !== "") {
        str = str + '<div class="swiper-slide s1-swiper-lower-list__item"><a href="' + n.urpc + '" data-ratid="jbondtop-full-banner_' + n.slid + '" data-ratevent="click" data-ratparam="all"'+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+''+flag1+'><img decoding="async" src="' + n.img + '220x220.png" alt="' + n.title + '"></a>'+flag2+'</div>';
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


createMain();


// 表組のスタイル修正
$('.include_contents table thead tr th').removeClass();
$('.include_contents table thead tr th:nth-child(2)').addClass('s1-tbl--width-20');
$('.include_contents table thead tr th:nth-child(3)').addClass('s1-tbl--width-10');
$('.include_contents table thead tr th:nth-child(4)').addClass('s1-tbl--width-10');

// 遅延表示
setTimeout(function() {
  $('.include_contents').css('display','block');
}, 500);