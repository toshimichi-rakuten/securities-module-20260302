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
          // ?が含まれているか確認
          var lidParam = n.urpc.indexOf("?") > -1 ? "&l-id=" : "?l-id=";
          arr.push(n.pagination);
          str = str + '<div class="swiper-slide"><a href="'+n.urpc+lidParam+'fund_top_banner_'+n.slid+'" data-ratid="fund_top_banner_'+n.slid +'" data-ratevent="click" data-ratparam="all"'+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+'><img src="'+n.img+'876x220.png" width="876" height="220" alt="' + n.title + '"></a></div>'
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
        var lidParam = r.vUrl.indexOf("?") > -1 ? "&l-id=" : "?l-id=";
        src = src + '<li class="s1-list-info__item"><div class="s1-list-info__content s1-list-info__content--label"><span class="fund-top-info__label fund-top-info__label--'+ r.label[0] +'">'+ r.label[1] +'</span></div><div class="s1-list-info__content"><a href="' + r.vUrl + lidParam + 'fund_top_pickup_txt_'+ r.slid +'" data-ratid="fund_top_pickup_txt_' + r.slid + '" data-ratevent="click" data-ratparam="all">' + r.Title + '</a></div></li>'
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

// お気に入りフッター開閉
$('.footer-fav__checked-button').click(function() {
  var $this = $(this);
  var $slide = $('.footer-fav');
  if ($slide.hasClass('footer-fav--open')) {
    $slide.removeClass('footer-fav--open');
    $slide.animate({
      bottom: "-=175"
    }, 100, function() {
      $this.children(":first").html('&#xf11d;');
    });
  } else {
    $slide.addClass('footer-fav--open');
    $slide.animate({
      bottom: "+=175"
    }, 100, function() {
      $this.children(":first").html('&#xf11a;');
    });
  }
});

// ファンド名称 condition1
var fund = 'ファンド名称like';    // 1

function search() {
    var sendForm = document.getElementById('searchCondition');
    sendForm['result'].value = 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2';
    sendForm['sort'].value = 'week_all_all=up';
    sendForm['count'].value = '9999';
    sendForm['recsPerPage'].value = '20';
    searchNow(sendForm, "search/result.html");
}


function search2() {

    var sendForm=document.getElementById('newSearch');

    sendForm["condition36"].value = null;
    sendForm["condition40"].value = null;
    sendForm["condition35"].value = null;
    sendForm["condition32"].value = null;
    sendForm["selectedCondition"].value = null;


    if (sendForm['form-text-01'].value) {
        var str = sendForm['form-text-01'].value;
        str = str.replace(/\(/g, "（");
        str = str.replace(/\)/g, "）");

        str = str.replace(/\"/g,'&quot;');
        str = str.replace(/\//g,'／');

        str = str.replace(/－/g, "-");
        str = str.replace(/―/g, "-");

        str = str.replace(/</g, "＜");
        str = str.replace(/>/g, "＞");

        sendForm['form-text-01'].value = str;
        sendForm['condition31'].value = fund + "*" + str + "*";
    }
    else
        sendForm['condition31'].value = null;

    sendForm.action = "find/search/result.html";
    sendForm.method = "get";
    sendForm.submit();
    return false;
}

function getReport() {
    var sendForm = document.getElementById('searchCondition');
    sendForm['condition1'].value = "";
    sendForm['result'].value = 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2';
    //sendForm['sort'].value = '純資産(億円）=down';
    sendForm['sort'].value = 'week_all_all=up';
    sendForm['count'].value = '9999';
    sendForm['recsPerPage'].value = '20';
    sendForm['tab'].value = "report";
    sendForm.method = "get";
    sendForm.action = "search/result.html";
    sendForm.submit();
}

function ShowSearch() {
    window.location = "search/result.html";
}

function ShortcutMenu(inval)
{
    var sendForm = document.getElementById('searchCondition');

    sendForm['sort'].value = 'week_all_all=up';
    sendForm['condition1'].value = "";
    sendForm['condition2'].value = "";
    sendForm['condition3'].value = "";
    sendForm['condition27'].value = "";
    sendForm['condition31'].value = "";
    sendForm['condition32'].value = "";
    sendForm['condition35'].value = "";
    sendForm['condition36'].value = "";
    sendForm['condition37'].value = "";
    sendForm['condition38'].value = "";
    sendForm['condition39'].value = "";
    sendForm["condition41"].value = "";
    sendForm['condition47'].value = "";

    sendForm['fdcflag2_form28'].value = "";
    sendForm['fdcflag2_form29'].value = "";

    sendForm['fdcflag1_form13'].value = "";
    sendForm['fdcflag1_form1'].value = "";
    sendForm['fdcflag1_form19'].value = "";
    sendForm['lipperflag1_form28'].value = "";
    sendForm['lipperflag1_form9'].value = "";
    sendForm['selectedCondition'].value = "";
    sendForm['form-text-01'].value = "";
    sendForm['sortcolumn'].value = "";

    if(inval == 1){
        sendForm['condition1'].value = "sp_contents=1";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 2) {
        sendForm['condition1'].value = "ﾘｽｸ(年率)1年>=0";
        sendForm['condition2'].value = "ﾘｽｸ(年率)1年<12.0";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 3) {
        // 毎月分配
        sendForm['condition31'].value = "ファンド名称like*";
        sendForm['condition32'].value = "fdcflag1^ampsymbol;-";
        //sendForm['condition2'].value = "分配方法=毎月分配";
        //sendForm['form-text-01'].value = "#オススメ毎月分配";
        sendForm['fdcflag1_form1'].value = "on";
        sendForm['selectedCondition'].value = "s1_1";
        //sendForm['recsPerPage'].value = '10';
    }else if(inval == 5) {
        sendForm['condition1'].value = "ﾘｽｸ(年率)1年>=12.0";
        sendForm['condition2'].value = "ﾘｽｸ(年率)1年<22.0";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 6) {
        // ノーロード
        sendForm['condition31'].value = "ファンド名称like*";
        sendForm['condition35'].value = "fdcflag1^ampsymbol;11";
        //sendForm['condition2'].value = "最大手数料=0";
        //sendForm['form-text-01'].value = "#オススメノーロード";
        sendForm['fdcflag1_form13'].value = "on";
        sendForm['selectedCondition'].value = "s4_1";
        //sendForm['recsPerPage'].value = '10';
    }else if(inval == 7) {
        sendForm['sort'].value = 'pv=down';
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 8){
        sendForm['condition1'].value = "ﾘｽｸ(年率)1年>=22.0";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 9){
        sendForm["condition41"].value = "fdcflag3^ampsymbol;0";
        sendForm['fdcflag2_form28'].value = "on";
        sendForm['selectedCondition'].value = "s10_1";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 10){
        sendForm['sort'].value = "compare_view=down"
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 11){
        sendForm['condition1'].value = "投資地域(ファンド)=日本";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 12){
        sendForm['condition1'].value = "投資地域(ファンド)=ｱｼﾞｱ･ｵｾｱﾆｱ,投資地域(ファンド)=ｴﾏｰｼﾞﾝｸﾞ,投資地域(ファンド)=ｸﾞﾛｰﾊﾞﾙ,投資地域(ファンド)=欧州,投資地域(ファンド)=北米";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 13){
        // 海外リート
        sendForm['condition31'].value = "ファンド名称like*";
        sendForm['condition36'].value = "fdcflag1^ampsymbol;17";
        //sendForm['condition2'].value = "アセットタイプ2=海外不動産";
        //sendForm['form-text-01'].value = "#オススメ海外リート";
        sendForm['fdcflag1_form19'].value = "on";
        sendForm['selectedCondition'].value = "s5_6";
        //sendForm['recsPerPage'].value = '10';
    }else if(inval == 14){
        // トータルリターン
        //sendForm['condition1'].value = "ﾘﾀｰﾝ(年率)1年>=20";
        //sendForm['condition39'].value = "fdcflag1^ampsymbol;27";
        //sendForm['selectedCondition'].value = "s7_1";
        sendForm['recsPerPage'].value = '20';
        sendForm['sort'].value = "ﾘﾀｰﾝ(年率)1年=down"
        //sendForm['focus'].value = 'table3';
        sendForm['sortcolumn'].value = "col5";
    }else if(inval == 15){
        // ブル
        sendForm['condition1'].value = "ファンド名称like*ブル*";
        sendForm['form-text-01'].value = "ブル";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 16){
        // ベア
        sendForm['condition1'].value = "ファンド名称like*ベア*";
        sendForm['form-text-01'].value = "ベア";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 17){
        // 豪ドル
        sendForm['condition1'].value = "ファンド名称like*豪ドル*";
        sendForm['form-text-01'].value = "豪ドル";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 18){
        // ブルベア
        sendForm['condition37'].value = "lipperflag1^ampsymbol;26";
        sendForm['lipperflag1_form28'].value = "on";
        sendForm['selectedCondition'].value = "s6_17";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 19){
        // 金先物
        sendForm["condition47"].value = "lipperflag1^ampsymbol;7";
        sendForm['lipperflag1_form9'].value = "on";
        sendForm['selectedCondition'].value = "s5_16";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 20){
        // 100円投資
        sendForm["condition41"].value = "fdcflag3^ampsymbol;1";
        sendForm['fdcflag2_form29'].value = "on";
        sendForm['selectedCondition'].value = "s10_2";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 21){
        // オススメ特集
        sendForm['condition1'].value = "ファンド名称like*#ベストファンド30*";
        sendForm['form-text-01'].value = "#ベストファンド30";
        sendForm['selectedCondition'].value = "#ベストファンド30";
        sendForm['recsPerPage'].value = '40';
    }else if(inval == 22){
        // 吉井ピックアップ
        sendForm['condition1'].value = "ファンド名称like*#吉井ピックアップ*";
        sendForm['form-text-01'].value = "#吉井ピックアップ";
        sendForm['selectedCondition'].value = "#吉井ピックアップ";
        sendForm['recsPerPage'].value = '20';
    }else if (inval == 23) {
        // ファンドスコアー
        //sendForm['condition1'].value = "ファンド名称like*#吉井ピックアップ*";
        //sendForm['form-text-01'].value = "#吉井ピックアップ";
        //sendForm['selectedCondition'].value = "#吉井ピックアップ";
        sendForm['focus'].value = 'table7';
        sendForm['condition27'].value = "l2=5";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 24){
        // DC
        sendForm['condition1'].value = "ファンド名称like*DCセレクション*";
        sendForm['form-text-01'].value = "DCセレクション";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 25){
        //検索条件=「スマートコスト」
        sendForm['condition1'].value = "ファンド名称like*スマートコスト*";
        sendForm['form-text-01'].value = "スマートコスト";
        sendForm['recsPerPage'].value = '20';
    }else if(inval == 26){
        window.location = "https://www.rakuten-sec.co.jp/web/fund/info/new_inventory/sec_raising.html";
    }
    else{
        window.alert('unknown shortcut');
    }

    sendForm['result'].value = 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2';
    sendForm['count'].value = '9999';

    sendForm.method = "get";
    sendForm.action = "find/search/result.html";
    sendForm.submit();
}

function OpenLink(linkCode){
    if(linkCode == "1"){
        window.location = "https://www.rakuten-sec.co.jp/web/fund/info/new_inventory/sec_raising.html";
    }
}


function compareTopfive(codes) {
    window.location = "/web/fund/comparison/index.html?codes=" + codes;
}

function SearchBunrui(inval)
{
    window.location = "find/search/result.html?condition55=rsbn=" + encodeURI(inval);
}

function CompareRecent(inval) {
    var compareForm = document.getElementById('compareCondition');
    var codes = "<%=replace(request.cookies('ttid')('recent'),',','_')%>";

    if(inval+1 <= 1){
        window.alert("２件以内を比較できません。");
        return;
    }

    window.location = "/web/fund/comparison/index.html?codes=" + codes;
}