
  $(function() {
      // Add system info to HTML
      $.ajaxSetup({ cache: false });
      $.ajax({
          accepts: '*/*',
          type: 'GET',
          url: '/ITS/system_info_web.xml',
          dataType: 'xml'
      }).done(function(resp) {
          $('#system_info').empty().append((resp.documentElement.firstChild.nodeValue).replace(/system_info\//g, '/ITS/system_info/'));
      });
  });



$(function() {

    var $form = $("form#smtloginform");
    var $form_passkey = $("form#smtloginpasskeyform"); // passkeyフォームの要素を取得

    var $input_id = $("input#form-login-id");
    var $input_pass = $("input#form-login-pass");
    var $input_passkey_homeid = $("input#passkeyhomeid"); // passkeyhomeidのhiddenフィールドを取得

    var url = {
        // 総合トップ（スマートフォン） - login_type=1
        smt: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?login_type=1",
        // らくらく投資トップ（スマートフォン） - login_type=1
        rab: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=SMT_FUNAVI_TOP",
        // 楽ラップトップ（スマートフォン） - login_type=1
        rakurap: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=WRAP_TOP",
        // 総合トップ（PC） - login_type=1
        pc: "https://member.rakuten-sec.co.jp/bv/app/MhLogin.do?login_type=1",
        // FX（スマートフォン） - login_type=1
        fx_sp: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=SMT_FX_SSO_LOGIN",
        // FX（PC） - login_type=1
        fx: "https://member.rakuten-sec.co.jp/bv/app/MhLogin.do?homeid=FX_SSO_LOGIN",
        // バイナリ―オプション（スマートフォン） - login_type=1
        bo: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=BO_SSO_LOGIN",
        // 楽天CFD（スマートフォン） - login_type=1
        SMT_NCFD_TOP: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=SMT_NCFD_TOP",

        // ★新しいフォーム用のURL (login_type=2)
        // 既存のURLからlogin_type=1をlogin_type=2に変更するか、homeidがあれば&login_type=2を追加。
        smt_passkey: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=HOME&login_type=2",
        rab_passkey: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=SMT_FUNAVI_TOP&login_type=2",
        rakurap_passkey: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=WRAP_TOP&login_type=2",
        pc_passkey: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=HOME&login_type=2",
        fx_sp_passkey: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=SMT_FX_SSO_LOGIN&login_type=2",
        fx_passkey: "https://member.rakuten-sec.co.jp/bv/app/MhLogin.do?homeid=FX_SSO_LOGIN&login_type=2",
        bo_passkey: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=BO_SSO_LOGIN&login_type=2",
        SMT_NCFD_TOP_passkey: "https://member.rakuten-sec.co.jp/bv/app/SmtMhLogin.do?homeid=SMT_NCFD_TOP&login_type=2",
    };

    // passkeyhomeid の value に設定する値を定義
    // homeidのクエリパラメータに対応する値を設定します。
    // login_type=1のURLからhomeidを抽出するか、別途定義が必要です。
    var passkey_homeid_values = {
        smt: "HOME", // 初期値またはデフォルト
        rab: "SMT_FUNAVI_TOP",
        rakurap: "WRAP_TOP",
        pc: "HOME", // PC版もhomeidはHOMEと仮定
        fx_sp: "SMT_FX_SSO_LOGIN",
        fx: "FX_SSO_LOGIN",
        bo: "BO_SSO_LOGIN",
        SMT_NCFD_TOP: "SMT_NCFD_TOP",
    };

    var name_id = {
        smt: "loginid", rab: "loginid", rakurap: "loginid", pc: "loginid",
        fx_sp: "loginid", fx: "loginid", bo: "loginid", SMT_NCFD_TOP: "loginid",
    };
    var name_pass = {
        smt: "passwd", rab: "passwd", rakurap: "passwd", pc: "passwd",
        fx_sp: "passwd", fx: "passwd", bo: "passwd", SMT_NCFD_TOP: "passwd",
    };

    //selectイベントハンドラ
    $("select#select-loginform").change(function() {
        var ch = $(this).val();

        // 既存フォームのactionと入力フィールドのname属性を変更
        // passkeyフォームのactionとhiddenフィールドのvalueを変更
        switch (ch) {
            case 'rab':
                $form.attr("action", url.rab);
                $form_passkey.attr("action", url.rab_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.rab); // ★追加
                $input_id.attr("name", name_id.rab);
                $input_pass.attr("name", name_pass.rab);
                break;
            case 'rakurap':
                $form.attr("action", url.rakurap);
                $form_passkey.attr("action", url.rakurap_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.rakurap); // ★追加
                $input_id.attr("name", name_id.rakurap);
                $input_pass.attr("name", name_pass.rakurap);
                break;
            case 'smt':
                $form.attr("action", url.smt);
                $form_passkey.attr("action", url.smt_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.smt); // ★追加
                $input_id.attr("name", name_id.smt);
                $input_pass.attr("name", name_pass.smt);
                break;
            case 'pc':
                $form.attr("action", url.pc);
                $form_passkey.attr("action", url.pc_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.pc); // ★追加
                $input_id.attr("name", name_id.pc);
                $input_pass.attr("name", name_pass.pc);
                break;
            case 'fx_sp':
                $form.attr("action", url.fx_sp);
                $form_passkey.attr("action", url.fx_sp_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.fx_sp); // ★追加
                $input_id.attr("name", name_id.fx_sp);
                $input_pass.attr("name", name_pass.fx_sp);
                break;
            case 'fx':
                $form.attr("action", url.fx);
                $form_passkey.attr("action", url.fx_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.fx); // ★追加
                $input_id.attr("name", name_id.fx);
                $input_pass.attr("name", name_pass.fx);
                break;
            case 'bo':
                $form.attr("action", url.bo);
                $form_passkey.attr("action", url.bo_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.bo); // ★追加
                $input_id.attr("name", name_id.bo);
                $input_pass.attr("name", name_pass.bo);
                break;
            case 'SMT_NCFD_TOP':
                $form.attr("action", url.SMT_NCFD_TOP);
                $form_passkey.attr("action", url.SMT_NCFD_TOP_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.SMT_NCFD_TOP); // ★追加
                $input_id.attr("name", name_id.SMT_NCFD_TOP);
                $input_pass.attr("name", name_pass.SMT_NCFD_TOP);
                break;
        }

        //cookieにselect値を格納
        $.cookie("chid", ch, {
            expires: 30,
            path: "/"
        });
    });

    /***
     / ページアクセス時の処理
     */
    var cookie = $.cookie("chid");
    if (cookie != null) {
        $("select#select-loginform").val(cookie);
        switch (cookie) {
            case 'rab':
                $form.attr("action", url.rab);
                $form_passkey.attr("action", url.rab_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.rab); // ★追加
                $input_id.attr("name", name_id.rab);
                $input_pass.attr("name", name_pass.rab);
                break;
            case 'rakurap':
                $form.attr("action", url.rakurap);
                $form_passkey.attr("action", url.rakurap_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.rakurap); // ★追加
                $input_id.attr("name", name_id.rakurap);
                $input_pass.attr("name", name_pass.rakurap);
                break;
            case 'smt':
                $form.attr("action", url.smt);
                $form_passkey.attr("action", url.smt_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.smt); // ★追加
                $input_id.attr("name", name_id.smt);
                $input_pass.attr("name", name_pass.smt);
                break;
            case 'pc':
                $form.attr("action", url.pc);
                $form_passkey.attr("action", url.pc_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.pc); // ★追加
                $input_id.attr("name", name_id.pc);
                $input_pass.attr("name", name_pass.pc);
                break;
            case 'fx_sp':
                $form.attr("action", url.fx_sp);
                $form_passkey.attr("action", url.fx_sp_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.fx_sp); // ★追加
                $input_id.attr("name", name_id.fx_sp);
                $input_pass.attr("name", name_pass.fx_sp);
                break;
            case 'fx':
                $form.attr("action", url.fx);
                $form_passkey.attr("action", url.fx_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.fx); // ★追加
                $input_id.attr("name", name_id.fx);
                $input_pass.attr("name", name_pass.fx);
                break;
            case 'bo':
                $form.attr("action", url.bo);
                $form_passkey.attr("action", url.bo_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.bo); // ★追加
                $input_id.attr("name", name_id.bo);
                $input_pass.attr("name", name_pass.bo);
                break;
            case 'SMT_NCFD_TOP':
                $form.attr("action", url.SMT_NCFD_TOP);
                $form_passkey.attr("action", url.SMT_NCFD_TOP_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.SMT_NCFD_TOP); // ★追加
                $input_id.attr("name", name_id.SMT_NCFD_TOP);
                $input_pass.attr("name", name_pass.SMT_NCFD_TOP);
                break;
            default:
                $form.attr("action", url.smt);
                $form_passkey.attr("action", url.smt_passkey);
                $input_passkey_homeid.val(passkey_homeid_values.smt); // ★追加: デフォルトも設定
                break;
        }
    } else {
        $.cookie("chid", "smt", {
            expires: 30,
            path: "/"
        });
        // Cookieがnullの場合、デフォルトでsmtのURLとhomeidを設定
        $form.attr("action", url.smt);
        $form_passkey.attr("action", url.smt_passkey);
        $input_passkey_homeid.val(passkey_homeid_values.smt); // ★追加
    }
});


if(navigator.userAgent.indexOf('Tizen') > 0){
  document.getElementById('switch_tizen').style.display="none";
  document.write('<p class="lead">Tizen OSに関しては、現在動作検証中です。</p>');
}

$(function() {
  // パスワードの表示・非表示切替
  $('.passwd-form__toggle').on('click',function () {
  
    // アイコンの切り替え
    $(this).toggleClass('is-active');
    // 入力フォームの取得
    var input = $('#form-login-pass');
    // type切替
    if (input.attr('type') == 'password') {
      input.attr({
        type:'text'
      });
    } else {
      input.attr({
        type:'password'
      });
    }
  });
});