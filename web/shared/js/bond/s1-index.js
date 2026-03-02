function createMain(){
  var tempHead = '<table class="s1-tbl-data01 s1-tbl--width-full"><thead><tr><th class="s1-tbl--width-10">通貨</th><th>銘柄名</th><th class="s1-tbl--width-20">利率（税引前）</th><th class="s1-tbl--width-30">利率（税引後）</th></tr></thead><tbody>';
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
    var rate3 = (n.plan=='')?('<td class="ta-r fw-b fc-r-01 va-m">'+n.rate3+'％</td><td class="ta-r va-m">'+n.zrate3+'％</td>'):(plan);
    var rate5 = (n.plan=='')?('<td class="ta-r fw-b fc-r-01 va-m">'+n.rate5+'％</td><td class="ta-r va-m">'+n.zrate5+'％</td>'):(plan);
    var rate10 = (n.plan=='')?('<td class="ta-r fw-b fc-r-01 va-m">'+n.rate10+'％</td><td class="ta-r va-m">'+n.zrate10+'％</td>'):(plan);
    bnrtxt = '当社販売期間：'+n.term;
    //bnrtxt = bnrtxt.replace(/（.）/g,'')
    src = '<tr><td class="ta-c"><img src="/web/shared/images/flags/flag_japan.svg" alt="日本円（JPY）" class="flg-width--30 flag-border"></td><td class="va-m"><a href="/web/bond/jbond/individual_jgb/">個人向け国債 固定3年（第'+n.name3+'回）</a></td>'+rate3+'</tr>' +
    '<tr><td class="ta-c"><img src="/web/shared/images/flags/flag_japan.svg" alt="日本円（JPY）" class="flg-width--30 flag-border"></td><td class="va-m"><a href="/web/bond/jbond/individual_jgb/">個人向け国債 固定5年（第'+n.name5+'回）</a></td>'+rate5+'</tr>' +
    '<tr><td class="ta-c"><img src="/web/shared/images/flags/flag_japan.svg" alt="日本円（JPY）" class="flg-width--30 flag-border"></td><td class="va-m"><a href="/web/bond/jbond/individual_jgb/">個人向け国債 変動10年（第'+n.name10+'回）</a></td>'+rate10+'</tr>'
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
  var arr = [];
  var cnt = 0;
  var tempHead = '<div class="s1-swiper swiper"><div class="swiper-wrapper">';
  var tempFoot = '</div></div><div class="swiper-pagination">';
  fetch("/web/bond/json/banner.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < data.length; i++){
      if(cnt < 5){
        var n = data[i];
        var flag = n.slid;
        if(flag == "individual-jgb"){
          var flag1 = " class=\"jbond-banner\"";
          var flag2 = "<span class=\"jbond-banner__txt jbond-banner__txt--1\">"+bnrtxt+"</span>"
        }else{
          var flag1 = "";
          var flag2 = "";
        }
        if (n.bond !== "") {
          arr.push(n.pagination);
          str = str + '<div class="swiper-slide"><a href="'+n.urpc+'?l-id=bondtop-full-banner_'+n.slid+'" data-ratid="bondtop-full-banner_'+n.slid +'" data-ratevent="click" data-ratparam="all"'+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+''+flag1+'><img src="'+n.img+'876x220.png" width="876" height="220" alt="' + n.title + '"></a>'+flag2+'</div>'//ここ修正
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
  fetch("/web/shared/json/info/info_bond.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.length <= 0) {
      $('.u-info-item').remove();
    } else {
      for(let i=0; i < data.length; i++){
        var n = data[i];
        src = src + '<li class="s1-list-info__item"><div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--'+ n.label_en +'">'+ n.label +'</span></div><div class="s1-list-info__content"><a href="' + n.pc_url + '" '+(n.blank =="〇" ? 'target=\"_blank\" ' : '' )+'data-ratid="bondtop_info-' + n.slid + '" data-ratevent="click" data-ratparam="all">' + n.txt + '</a></div></li>'
      }
      src = tempHead + src + tempFoot;
      $("#data-json-info").replaceWith(src);
    }
  });
}

createMain();
createInfo();