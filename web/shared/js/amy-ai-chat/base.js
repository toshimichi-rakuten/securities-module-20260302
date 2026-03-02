'use strict';

// サジェストの一つ前の検索ワードを保持
var beforeQuery = '';

//devicePixelRatioに応じてbodyにクラス「sp」を付加
var checkRatio = function () {
    var ratio = window.devicePixelRatio || 1;
    if (ratio > 1) {
        var x = document.getElementsByTagName('body')[0].classList.add('sp');
    }
}();

//テキストエリアの中身をクリア、高さも1行分にリセット
function textareaReset() {
    document.getElementById('query').value = '';
    document.getElementById('query').style.height = 'auto';
    // 一緒にサジェストもクリア
    beforeQuery = '';
    document.getElementById('query-result').innerHTML = '';
    common_focus();
}

// スマホのタッチイベント処理
function touchDocument(e) {
    if (e.target.tagName !== 'A' && document.activeElement.id === 'query') {
        $('#query_button').focus();
    }
    // 送信ボタンをクリックした場合
    if (e.target.tagName === 'BUTTON') {
        $('#query_button').click();
    }
}


//検索エリアに応じた余白をbodyに指定
function adjustBody() {
//	document.getElementsByTagName('body')[0].setAttribute('style', 'padding-bottom:' + (document.getElementById('area-form').offsetHeight + 20
//		+ document.getElementById('footer').offsetHeight ) + 'px;');
    document.getElementsByTagName('body')[0].setAttribute('style', 'padding-bottom:' + (document.getElementById('area-form').offsetHeight + 20) + 'px;');
    adjustFormBody();
}

//iOSで入力候補表示時にフォームの位置を調整
var aiChatFormValue;
var aiChatFormFlag = true;
var queryformQuery = queryform.query
var areaForm = document.getElementById('area-form');
var areaFormButton  = areaForm.getElementsByClassName('right')[0];

function adjustFormBody() {
    var ua = navigator.userAgent;
    var isIOS = ua.indexOf("iPhone") >= 0 || ua.indexOf("iPad") >= 0 || navigator.userAgent.indexOf("iPod") >= 0;

    var formValue = queryform.query.value;

    if (aiChatFormValue == "" && formValue !== "" && aiChatFormFlag) {
        aiChatFormFlag = false;
    }
    if (isIOS ) {
        if (!aiChatFormFlag) {
            areaForm.setAttribute('style', 'padding-bottom:50px');
            areaFormButton.setAttribute('style', 'padding-bottom:42px');
        } else {
            areaForm.setAttribute('style', 'padding-bottom:8px');
            areaFormButton.setAttribute('style', 'padding-bottom:0px');
        }
    }
    aiChatFormValue = formValue;
}
queryformQuery.addEventListener( "blur", function() {
    aiChatFormFlag = true;
    setTimeout(function() {
        areaForm.setAttribute('style', 'padding-bottom:8px');
        areaFormButton.setAttribute('style', 'padding-bottom:0px');
    }, 100);
}) ;


//ページロード後の処理
$(function () {

    var word = '査';	//検索候補リスト表示用キーワード

//	//ユーザの入力に応じた質問と答えの表示
//	var displayQuestions = function (evt) {
//		var target,
//		    tmp,
//			dur = 1000;
//
//		//スムーススクロール
//		var smoothScroll = function (hash) {
//			var offsetY = -60,
//					time = 500,
//					targetY = target.offset().top + offsetY;
//			$('html, body').animate({ scrollTop: targetY }, time, 'swing');
//			// ハッシュ書き換え
//			window.history.pushState(null, null, hash);
//		};
//
//		evt.preventDefault();
//		target = $(evt.target.getAttribute('href'));
//		if (!target.length || evt.target.getAttribute('href') === '#') { return; }
//		tmp = target;
//
//
//		//検索候補リスト内のリンクだった場合は検索窓と検索窓の高さをリセット
//		if (evt.target.parentNode.parentNode.getAttribute('id') === 'query-result') {
//			textareaReset();
//			document.getElementById('query-result').classList.remove('on');
//			document.getElementById('notes').classList.remove('on');
//		}
//
//		//フェードイン 1000ミリ秒
//		target.fadeIn(dur);
//		while (tmp.next()[0] != null && tmp.next()[0].tagName === 'DD') {
//			tmp = tmp.next();
//			tmp.fadeIn(dur);
//		}
//		smoothScroll(this.hash);
//	};

    //フォーム関連
    var formFunc = function () {
        var form = document.forms.queryform,
            queryResult = document.getElementById('query-result'),
            notes = document.getElementById('notes'),
            onClass = 'on';

        // 入力欄にフォーカスがあたった時
        form.query.addEventListener('focus', function () {
            // 注意書きの表示
            if (!notes.classList.contains(onClass)) {
                notes.classList.add(onClass);
            }
            // サジェストの表示
            if (!queryResult.classList.contains(onClass)) {
                queryResult.classList.add(onClass);
            }
            // スマホのタッチイベントを追加する
            document.addEventListener('touchstart', touchDocument, false);
        }, false);

        // 入力欄に入力された時
        form.query.addEventListener('input', function () {
            // 前回と同じ内容を重複してElasticsearchに飛ばさない用にチェックする
            if (this.value === beforeQuery) {
                return;
            }
            beforeQuery = this.value;

			// サジェスト処理
			searchSuggestWord(this.value);
        }, false);

        //送信ボタンを押した時の処理
        document.getElementById('query_button').addEventListener('click', function () {
			// TODO: このチェックをsend_message側で行う（集約化のため）
            if ($("#query").val().replace(/\s/g, "").length === 0) {
                return;
            }
            if (is_manual_chat_active()) {
                send_chat_message();
            } else {
                send_message();
            }
            // TODO 機能を止める
            // window.dataLayer.push({'event': 'FormEvent', 'eventLabel':$("#query").val()});
            textareaReset();
        }, false);

        // 入力欄のキーダウンイベントでEnterキーの場合に送信ボタンのクリックイベントを動作させる
        $("#query").keydown(
            function (e) {
                if (e.keyCode === 13) {
                    $('#query_button').click();
                    if(is_ios_android()){
                        $(this).blur();
                    }
                    return false;
                }
            }
        );

        // 入力欄からフォーカスが外れた時
        // ※blurイベントにしてしまうと、clickイベントが発生しなくなる
        $("#query").focusout(
            function (e) {
                if($('.suggest_word'+':hover').length === 0 ) {

                    // 注意書きの非表示
                    if (notes.classList.contains(onClass)) {
                        notes.classList.remove(onClass);
                    }

                    // サジェストの非表示
                    if (queryResult.classList.contains(onClass)) {
                        queryResult.classList.remove(onClass);
                    }
                }
                // スマホのタッチイベントを外す
                document.removeEventListener('touchstart', touchDocument, false);
            }
        );

        //検索窓の自動リサイズ
        $('#area-form textarea').autoExpand();
    }();

    //リサイズイベント登録
    window.addEventListener('resize', adjustBody, false);
    //ユーザの入力に応じた質問と答えの表示用イベント登録
    //$('main a[href^="#"]').on('click', displayQuestions);
    addListEventLinks();
    // invokeOpeningTalk();
    common_focus();

});

/**
 * オープニングトークリクエストを送信する
 */
function invokeOpeningTalk() {
    var json = createRequestJSON(QUESTION_TYPE.OPENING_TALK, "", null, null, null, null);
    accessAPIWithFPID(json);
}

/**
 * トップトークリクエストを送信する
 */
function invokeTopTalk() {
    var json = createRequestJSON(QUESTION_TYPE.TOP_TALK, "", null, null, null, null);
    accessAPIWithFPID(json);
}

//選択候補のクリックイベントにメソッドを付与
var addListEventLinks = function () {
    var nodeList = document.querySelectorAll("#talk_board ul.selection li");
    for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].addEventListener("click", clickSelectList, false);
    }

    var solveNodeList = document.querySelectorAll("#talk_board ul.solve li");
    for (var j = 0; j < solveNodeList.length; j++) {
        solveNodeList[j].addEventListener("click", solveSelectList, false);
    }
};




//選択候補のクリックイベント内容
var clickSelectList = function () {

    if (is_manual_chat_active()) {
        return;
    }

    //メッセージを設置
    var $link = $(this).find("a");
    if ($link.attr("id") == "manual_chat_link") {
        connectSocket();
        return;
    }
    //var send_id = $link.attr("href").replace("#", "");

    var send_scenario_id = $(this).find("[name=send_scenario_id]").val();
    var scenario_id = $(this).find("[name=from_scenario_id]").val();
    var option_id = $(this).find("[name=option_id]").val();
    var confirm_id = $(this).find("[name=confirm_id]").val();
    var from_answer_mode = $(this).find("[name=from_answer_mode]").val();

    //メッセージ設置
    var div_tag = $("<div>").text($(this).text());
    var div_wrapper_tag = $("<div class='message'></div>").append(div_tag);
    var message_html = $("<li>").append(div_wrapper_tag);
    $("#talk_board").append(message_html);

    targetFadeIn($("li"));
    adjustBody();
    endScroll();
    var json = createRequestJSON(QUESTION_TYPE.ID_SPECIFIED, $(this).text(), send_scenario_id, scenario_id, option_id, 0, confirm_id, from_answer_mode);

    accessAPIWithFPID(json);

    common_focus();
};

/**
 * フェードイン
 * @param target
 */
function targetFadeOut(target) {
    target.fadeOut(1500);
}

function target_remove(target){
    target.remove();
}

/**
 * 解決セレクト
 */
var solveSelectList = function () {

    if (is_manual_chat_active()) {
        return;
    }

    var solution_id = $(this).find("[name=solution_id]").val();
    var selected_log_id = $(this).find("[name=selected_log_id]").val();
    var scenario_id = $(this).find("[name=scenario_id]").val();
    var is_solved = $(this).find("[name=is_solved]").val();

    sendIsSolved(solution_id, selected_log_id, scenario_id, is_solved);
    common_focus();

    adjustBody();
};
