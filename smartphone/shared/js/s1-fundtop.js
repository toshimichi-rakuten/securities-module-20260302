$(function(){
  var idname = $('.s1-float-local-nav li form').attr('id','searchCondition3');
});

function searchKeyword() {

    var sendForm01 = document.getElementById('searchCondition1');
    var sendForm02 = document.getElementById('searchCondition2');
    var sendForm03 = document.getElementById('searchCondition3');

    DoSearchKeyword01(sendForm01);
    DoSearchKeyword02(sendForm02);
    DoSearchKeyword03(sendForm03);
}

function DoSearchKeyword01(sendForm01) {

  sendForm01['pg'].value = '1';
  sendForm01['recsPerPage'].value = '20';
  sendForm01['result'].value = 'ファンド名称';
  sendForm01['count'].value = '9999';
  sendForm01['sort'].value = 'week_all_all=up';
  sendForm01.method = "post";
  sendForm01.action = "/web/fund/smartphone/products/fund/search/result.html";
  sendForm01['form-text-01'].value = sendForm01['stockSearch_input'].value;
  sendForm01['selectedCondition'].value = "{\"COND_NAME\":\"\",\"FREE_TEXT\":\"" + sendForm01['stockSearch_input'].value + "\"}";


  //キーワード/ファンド名
  sendForm01['condition1'].value = null;
  if (sendForm01['stockSearch_input'].value) {
      sendForm01['condition1'].value = fund + "*" + sendForm01['stockSearch_input'].value + "*";
  }
  else
  {
    sendForm01['condition1'].value = fund + " ";
  }


  sendForm01.submit();

}
function DoSearchKeyword02(sendForm02) {

     sendForm02['pg'].value = '1';
     sendForm02['recsPerPage'].value = '20';
     sendForm02['result'].value = 'ファンド名称';
     sendForm02['count'].value = '9999';
     sendForm02['sort'].value = 'week_all_all=up';
     sendForm02.method = "post";
     sendForm02.action = "/web/fund/smartphone/products/fund/search/result.html";
     sendForm02['form-text-01'].value = sendForm02['stockSearch_input'].value;

     sendForm02['selectedCondition'].value = "{\"COND_NAME\":\"\",\"FREE_TEXT\":\"" + sendForm02['stockSearch_input'].value + "\"}";

     //キーワード/ファンド名
     sendForm02['condition1'].value = null;
     if (sendForm02['stockSearch_input'].value) {
         sendForm02['condition1'].value = fund + "*" + sendForm02['stockSearch_input'].value + "*";
     }
     else
     {
         sendForm02['condition1'].value = fund + " ";
     }

     sendForm02.submit();
}

function DoSearchKeyword03(sendForm03) {
     sendForm03['pg'].value = '1';
     sendForm03['recsPerPage'].value = '20';
     sendForm03['result'].value = 'ファンド名称';
     sendForm03['count'].value = '9999';
     sendForm03['sort'].value = 'week_all_all=up';
     sendForm03.method = "post";
     sendForm03.action = "/web/fund/smartphone/products/fund/search/result.html";
     sendForm03['form-text-01'].value = sendForm03['stockSearch_input'].value;

     sendForm03['selectedCondition'].value = "{\"COND_NAME\":\"\",\"FREE_TEXT\":\"" + sendForm03['stockSearch_input'].value + "\"}";

     //キーワード/ファンド名
     sendForm03['condition1'].value = null;
     if (sendForm03['stockSearch_input'].value) {
         sendForm03['condition1'].value = fund + "*" + sendForm03['stockSearch_input'].value + "*";
     }
     else
     {
         sendForm03['condition1'].value = fund + " ";
     }

     sendForm03.submit();
}

// ------------------------------------------------------

function ShortcutMenu(inval){

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
  sendForm['myconditions'].value = "";

  sendForm['fdcflag2_form28'].value = "";
  sendForm['lipperflag1_form28'].value = "";
  sendForm['fdcflag2_form29'].value = "";

  sendForm['fdcflag1_form13'].value = "";
  sendForm['fdcflag1_form1'].value = "";
  sendForm['fdcflag1_form19'].value = "";
  sendForm['lipperflag1_form9'].value = "";
  sendForm['selectedCondition'].value = "";
  sendForm['form-text-01'].value = "";
  sendForm['sortcolumn'].value = "";



  if(inval == 6) {
    // ノーロード
    sendForm['condition31'].value = "ファンド名称like*";
    sendForm['condition35'].value = "fdcflag1^ampsymbol;11";
    //sendForm['condition2'].value = "最大手数料=0";
    //sendForm['form-text-01'].value = "#オススメノーロード";
    sendForm['fdcflag1_form13'].value = "on";
    sendForm['selectedCondition'].value = "s4_1";
    //sendForm['recsPerPage'].value = '10';
  }else if (inval == 23) {
    // ファンドスコアー
    //sendForm['condition1'].value = "ファンド名称like*#吉井ピックアップ*";
    //sendForm['form-text-01'].value = "#吉井ピックアップ";
    //sendForm['selectedCondition'].value = "#吉井ピックアップ";
    sendForm['focus'].value = 'table7';
    sendForm['condition27'].value = "l2=5";
    sendForm['recsPerPage'].value = '20';
  }else{
    window.alert('unknown shortcut');
  }

  sendForm['result'].value = 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2';
  sendForm['count'].value = '9999';
  //sendForm['myconditions'].value = **

  sendForm.method = "post";
  sendForm.action = "./search/result.html";
  sendForm.submit();

}

// ------------------------------------------------------




// ------------------------------------------------------
// お知らせ : start
// ------------------------------------------------------
$(function(){
  var str = "";
  fetch("/web/shared/json/fund/pickup_fund.json", {
    method: "get",
    cache: "no-store",
  })
  .then(response => response.json())
  .then(data => {
      for(var i=0; i<data.num; i++) {
        var r = data.docs[i];
        if(r.Channel.indexOf("t") > -1 && r.Channel.indexOf("v") > -1){
          // r.vUrlに?が含まれているか確認
          var lidParam = r.vUrl.indexOf("?") > -1 ? "&l-id=" : "?l-id=";
          str = str + "<dt class=\"normal-header__main-info-label normal-header__main-info-label--" + r.label[0] + "\">" + r.label[1] + "</dt>";
          str = str + "<dd class=\"normal-header__main-info-desc\"><a href=\"" + r.vSpUrl + lidParam + "fund_top_sp_pickup_txt_"+ r.slid + "\" onclick=\"s.lidTrack(\'fund_top_sp_pickup_txt_" + r.slid + "\')\;\">" + r.Title + "</a></dd>";
        }
      }
      $(".normal-header__main-info-box").eq(0).append(str);
  })
});
// ------------------------------------------------------
// お知らせ : end
// ------------------------------------------------------


// ::::::::::::: ▼▼ トウシル記事取得 : start ▼▼ ::::::::::::::::: 
  $(document).ready(function(){
      $.ajax({
        url : "https://media.rakuten-sec.net/list/feed/choice01.js",
        type : "get",
        dataType : "jsonp",
        scriptCharset : "UTF-8",
        cache : false,
        timeout: 10000,
        complete :  function(data){
        }
      });
  });
  function choice01(data)
  {

     var gz = getCookie("Rg_sec");
     var str = "";

     for(i=0; i<3; i++) {
         str = str + "<li  class=\"toushiru__item\">";
         if(gz != null) {
           str = str + "<a href=\"" + data.List[i].Link + "\" onclick=\"s.lidTrack(\'" + makeSID("sp_vtop_m_report_", data.List[i].Date, data.List[i].Link) + "\')\" target=\"_blank\">";
         } else {
           str = str + "<a href=\"" + data.List[i].Link + "\" onclick=\"s.lidTrack(\'" + makeSID("sp_vtor_v_top_report_", data.List[i].Date, data.List[i].Link) + "\')\" target=\"_blank\">";
         }
         str = str + "<span class=\"clearfix\">";
         str = str + "<img src=\"" + data.List[i].Image + "\" alt=\"\" width=\"120\" height=\"75\">";
         str = str + "<span class=\"txt\">" +  data.List[i].Title + "</span>";
         str = str + "</span>";
         str = str + "</a>";
         str = str + "</li>";
     }

     document.getElementById("REPLST").innerHTML = str;

  }

  function makeSID(prefix, date, link)
  {
   var sid = "";

   var dt = date.split("/");
   var at = link.split("/");

   sid = prefix + dt[0] + dt[1] + dt[2] + "_" + at[5];

   return sid;
  }
  function getCookie( name )
  {
    var result = null;

    var cookieName = name + '=';
    var allcookies = document.cookie;

    var position = allcookies.indexOf( cookieName );
    if( position != -1 ) {
      var startIndex = position + cookieName.length;
      var endIndex = allcookies.indexOf( ';', startIndex );
      if( endIndex == -1 ) {
        endIndex = allcookies.length;
      }
      result = decodeURIComponent( allcookies.substring( startIndex, endIndex ) );
    }
    return result;
  }
// ▲▲ トウシル記事取得 : end ▲▲

async function createBanner(){
  var str = "";
  var cnt = 0;
  var tempHead = '<ul class="slider slider-fund banner-area mb-0 pt-half pb-half">';
  var tempFoot = '</ul>';
  await fetch("/web/shared/json/fund/banner.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < data.length; i++){
       if(cnt < 5){
        var n = data[i];
        var flag = n.slid;
        if (n.fvt !== "") {
          // ?が含まれているか確認
          var lidParam = n.ursp.indexOf("?") > -1 ? "&l-id=" : "?l-id=";
          str = str + '<li class="slide-img"><a href="'+n.ursp+lidParam+'fund_top_sp_banner_'+n.slid+'" data-ratid="fund_top_sp_banner_'+n.slid +'" data-ratevent="click" data-ratparam="all"'+(n.blank =="〇" ? ' target=\"_blank\"' : '' )+'><img src="'+n.img+'660x300.png" alt="' + n.title + '"></a></li>'
          cnt = cnt + 1;
        }
      }
    }
    str = tempHead + str + tempFoot;
    $("#data-json-banner").replaceWith(str);
    // console.log(str)
  })
  
  $('.slider-fund').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    infinite: true,
    draggable:false,
    swipe: true,
    dots: true,
    dotsClass: 'dots-slider',
    arrows: false,
    centerMode: true,
    centerPadding:'20px'
  });
  
}

createBanner()
