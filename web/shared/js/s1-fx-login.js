document.getElementById("btn-login").onclick = function () {
  if (inputExist()) {
    document.getElementById("btn-login").href = "javascript:loginform.submit()";
    document.getElementById("homeid").value = "ACC_NFX_OPEN";
  } else {
    document.getElementById("btn-login").href = "https://www.rakuten-sec.co.jp/web/fx/fxaccount.html";
  }
}

document.getElementById("fx-login").onclick = function () {
  //var id =document.getElementById("homeid").value;
  var acc1 = document.getElementById("ACC1").style.display;
  var acc2 = document.getElementById("ACC2").style.display;

  //ログイン履歴がない場合
  if (acc1 == "" && acc2 == "none") {
    document.getElementById("fx-login").href = "https://www.rakuten-sec.co.jp/web/fx/login.html";
    //ログイン履歴があり、FX口座がない場合
  } else if (acc1 == "none" && acc2 == "") {
    //id・パスあり
    if (inputExist()) {

      document.getElementById("fx-login").href = "javascript:loginform.submit()";
      document.getElementById("homeid").value = "ACC_NFX_OPEN";
    } else {
      //ケース2 id・パスなし
      document.getElementById("fx-login").href = "https://www.rakuten-sec.co.jp/web/fx/fxaccount.html";
    }
    //ログイン履歴があり、FX口座がある場合
  } else {
    //id・パスあり
    if (inputExist()) {
      document.getElementById("fx-login").href = "javascript:loginform.submit()";
      document.getElementById("homeid").value = "FX_TOP_LOGIN";
    } else {
      //id・パスなし
      document.getElementById("fx-login").href = "https://www.rakuten-sec.co.jp/web/fx/login.html";
    }
  }

}



function inputExist() {
  var result = true;
  var loginId = document.getElementById("form-login-id").value;
  var passwd = document.getElementById("form-login-pass").value;

  if (loginId == null || loginId == "") {
    result = false;
  }
  if (passwd == null || passwd == "") {
    result = false;
  }
  return result;

}

$(document).ready(function() {
  // HTMLが完全に読み込まれた後に実行されます

  var acc1 = $("#ACC1").css("display");
  var acc2 = $("#ACC2").css("display");

  //ログイン履歴がない場合
  if (acc1 == "" && acc2 == "none") {
    // console.log("DOM読み込み完了: ログイン履歴がありません。");
    //ログイン履歴があり、FX口座がない場合
  } else if (acc1 == "none" && acc2 == "") {
    // console.log("DOM読み込み完了: ログイン履歴はありますが、FX口座がありません。");
    //ログイン履歴があり、FX口座がある場合
  } else {
    // console.log("DOM読み込み完了: ログイン履歴があり、FX口座があります。");
    //ログインフォームのセレクトボックス内修正
    $('#homeid').children('[value=ACC_NFX_OPEN]').remove();
    $('#homeid').children('[value=BO_TOP]').remove();
    $('#homeid').prepend($('<option value="FX_BO_TRADE">らくオプ取引</option>'));
    $('#homeid').prepend($('<option value="FX_TOP_LOGIN" selected="selected">楽天FX</option>'));
  }
});