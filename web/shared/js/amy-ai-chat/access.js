'use strict';

// TODO: モジュール化して名前衝突に備える

/**
 * consoleが利用できない環境(IEなど)のために、スタブを定義する
 */
(function () {
    if (typeof window.console === "undefined") {
        window.console = {}
    }
    if (typeof window.console.log !== "function") {
        window.console.log = function () {
        }
    }
})();

// トークボード DOM ホルダー
var $talk_board = null;

// フェードイン遅延（ミリ秒）
var millis_of_fadein = 1000;

// 回答遅延（ミリ秒）
var access_delay_time = 1000;

// ディレイトーク通知までの遅延時間 ユーザー設定値（ミリ秒）
var delay_talk_interval_const = null;

// 回答後アンケート表示までの遅延時間 ユーザー設定比例定数値(ミリ秒)
var delay_solve_dialog_proportionality_const = null;

var is_delay = null;

var chase_timeout_id = null;

var solve_dialog_timeout_id = null;
var system_error_text = null;  // システムエラー時メッセージ
var search_params = new URLSearchParams(window.location.search);  // クエリ文字列
var search_params_site_id = null;  // クエリ文字列site
var answer_mode = null;  // 回答モード

// Elasticsearch用のクライアント準備
var client = new $.es.Client({
    host: $("#prefix_url").val() + '/es/',
    log: 'trace',
    cors: {enabled: true}
});

/**
 * 回答タイプ
 * （ResponseData.ContentTypeと同じ）
 */
var ANSWER_TYPE = {
    TEXT: 1,
    IMAGE: 2
};

/**
 * キャラクタータイプ
 * （app.agent.faq_enum.CharacterTypeと同じ）
 */
var CHARACTER_TYPE = {
    NORMAL: 1,
    HAPPY_FACE: 2,
    SAD_FACE: 3
};

/**
 * 回答モード
 * （app.agent.faq_enum.AnswerModeと同じ）
 */
var ANSWER_MODE = {
    MAINTENANCE: -3,  // メンテナンス中
    NOT_API_ANSWER: -2,  // メソッド非回答
    NOT_ANSWER: -1,  // 回答不可
    SILENT: 0,  // サイレント
    ANSWER: 1,  // 正常
    ASK_CONFIRM: 2,  // 聞き返し
    ASK_SELECT: 3,  // 選択肢候補
    FREE_TALK: 4,  // フリートーク応答
    API_ANSWER: 5,  // API
    GLOSSARY: 6,  // 用語集
    OPENING_TALK: 7,  // オープニングトーク
    DELAY_TALK: 8,  // ディレイトーク
    TOP_TALK: 9,  // トップトーク
    SOLVE_TALK: 10  // フィードバック回答
};

/**
 * 質問タイプ
 * （RequestData.MessageContent.Typeと同じ）
 */
var QUESTION_TYPE = {
    TEXT: 1,
    ID_SPECIFIED: 100,
    DELAY: 101,
    OPENING_TALK: 102,
    TOP_TALK: 103
};

var beforeSendToAPI = null;
var prefix_url = null;
var default_site_id = null;
var user_fp = '';

$(function () {
    // サーバから受け取った値を変数に格納
    prefix_url = $("#prefix_url").val();
    default_site_id = $("#default_site_id").val();
    delay_talk_interval_const = parseInt($("#delay_talk_interval_ms").val());
    if (isNaN(delay_talk_interval_const)) {
        delay_talk_interval_const = 30000;
    }
    delay_solve_dialog_proportionality_const = parseInt($("#delay_solve_dialog_proportionality_const").val()) || 100;
    is_delay = Boolean($("#is_delay").val());
    search_params_site_id = search_params.get("site_id") || default_site_id;
    system_error_text = $("#system_error_text").val();

    // DOM 参照を取得
    $talk_board = $("#talk_board");

    /**
     * Ajax通信用のAPIアクセス前ハンドラ
     */
    beforeSendToAPI = (function () {
        var client_id = $("#x_agent_client_id").val();
        var client_secret = $("#x_agent_client_secret").val();
        var requested_with = $("#x-requested-with").val();
        return function (xhr) {
            // configのclientデータ変数
            xhr.setRequestHeader("X-Agent-Client-Id", client_id);
            xhr.setRequestHeader("X-Agent-Client-Secret", client_secret);
            xhr.setRequestHeader("X-Requested-With", requested_with);
        }
    })();

    // session_id取得
    $.ajax({
        url: prefix_url + '/agent/v1/chat/session_id',
        type: 'get',
        crossDomain: true,
        beforeSend: beforeSendToAPI,
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        error: function (e) {console.error();},
        success: function (data) {
            $("#session_id").val(data.session_id);
            // invokeOpeningTalk();
        }
    });

});

/**
 * 受け取ったメッセージから吹き出し DOM を作成します。
 * メッセージは HTML エスケープされます。
 * @param message メッセージ
 * @returns {void|*|jQuery} 吹き出し DOM
 */
function makeSafeContent(message) {
    var message_tag = $("<div>").text(message);
    return $("<div class='message'></div>").append(message_tag);
}

/**
 * トークボードにテキストのみのトークを追加します。
 * @param message メッセージ
 * @param character_type キャラクタータイプ
 */
function talkSimply(message, character_type) {
    var talk = $("<li class='op smile clearfix'></li>");
    talk.append(resolveCharacterTypeElement(character_type));
    talk.append(makeContentFromAnswerForText(message));
    $talk_board.append(talk);
    targetFadeIn($("#talk_board").children("li"));
    adjustBody();
    scrollToLastElement($talk_board, talk);
}

function makeContentFromAnswerForText(answer) {
    var message = replaceTagURL(answer);
    var one_data = $("<div class='message'></div>");
    var regExp = new RegExp("\n", "g");
    message = message.replace(regExp, "<br/>");
    one_data.append("<div>" + message + "</div>");
    return one_data;

}

function makeContentFromAnswerForImage(answer) {
    var one_data = $("<div class='message'></div>");
    var image_data = $("<div class='my-gallery' data-pswp-uid='1'></div>");
    var message = replaceTagImage(answer);
    image_data.append(message);
    one_data.append(image_data);
    return one_data;
}


function makeSelectList(select_list, scenario_id, confirm_id, answer_mode) {
    var ul_links = $('<ul class="list-link selection"></ul>');

    var div_layout = $("<div></div>");

    for (var k = 0, len = select_list.length; k < len; k++) {
        var select_item = select_list[k];
        var option_massage = select_item["option_massage"];
        var send_id = select_item["send_id"];

        //存在チェック
        var option_id = null;

        if ("option_id" in select_item) {
            option_id = select_item["option_id"];
        }

        var one_list = $('<li></li>');
        var param_send_scenario_id = $('<input type="hidden"/>').attr("name", "send_scenario_id").val(send_id);
        var param_from_scenario_id = $('<input type="hidden"/>').attr("name", "from_scenario_id").val(scenario_id);
        var param_option_id = $('<input type="hidden"/>').attr("name", "option_id").val(option_id);
        var param_confirm_id = $('<input type="hidden"/>').attr("name", "confirm_id").val(confirm_id);
        var param_from_answer_mode = $('<input type="hidden"/>').attr("name", "from_answer_mode").val(answer_mode);

        var one_link = $('<a></a>').text(option_massage);
        one_list.append(one_link);
        one_list.append(param_send_scenario_id);
        one_list.append(param_from_scenario_id);
        one_list.append(param_option_id);
        one_list.append(param_confirm_id);
        one_list.append(param_from_answer_mode);
        ul_links.append(one_list);
    }

    if (answer_mode == 3 && is_room_enabled()) {
        var one_list = $('<li></li>');
        one_list.attr("id", 'manual_chat_link_section');
        var one_link = $('<a></a>').attr("id", 'manual_chat_link').attr("href", '#').text('有人チャット');
        one_list.append(one_link);
        ul_links.append(one_list);
    }
    return div_layout.append(ul_links);
}


function makeQuestionnaire(solution_id, scenario_id, selected_log_id) {
    // YES or NO selection
    var div_links = $('<div></div>');
    var ul_links = $('<ul class="list-link solve"></ul>');

    //YES
    var yes_one = $('<li class="yes-no-select"></li>');
    var yes_link = $('<a>はい</a>');
    yes_one.append(yes_link);
    yes_one.append($('<input type="hidden"/>').attr("name", "solution_id").val(solution_id));
    yes_one.append($('<input type="hidden"/>').attr("name", "selected_log_id").val(selected_log_id));
    yes_one.append($('<input type="hidden"/>').attr("name", "scenario_id").val(scenario_id));
    yes_one.append($('<input type="hidden"/>').attr("name", "is_solved").val(true));

    ul_links.append(yes_one);

    //NO
    var no_one = $('<li class="yes-no-select"></li>');
    var no_link = $('<a>いいえ</a>');
    no_one.append(no_link);
    no_one.append($('<input type="hidden"/>').attr("name", "solution_id").val(solution_id));
    no_one.append($('<input type="hidden"/>').attr("name", "selected_log_id").val(selected_log_id));
    no_one.append($('<input type="hidden"/>').attr("name", "scenario_id").val(scenario_id));
    no_one.append($('<input type="hidden"/>').attr("name", "is_solved").val(false));

    ul_links.append(no_one);
    div_links.append(ul_links);
    return div_links;
}

/**
 * チャットAPIにアクセスする。フィンガープリントがない場合は取得してから実行する。
 * @param requestJson リクエストJSON
 */
function accessAPIWithFPID(requestJson) {
    if (user_fp === '') {
        // FP
        new Fingerprint2().get(function (result, components) {
            user_fp = result;
            requestJson["user_fingerprint"] = user_fp;
            accessAPI(requestJson);
        });
    } else {
        accessAPI(requestJson);
    }
}

/**
 * チャットAPIにアクセスする
 * @param requestJson リクエストJSON
 */
function accessAPI(requestJson) {
    clearTimeout(chase_timeout_id);
    clearTimeout(solve_dialog_timeout_id);

    if (is_manual_chat_active()) {
        return;
    }

    sendRequestToAPI('/agent/v1/chat/message', requestJson,
        function (json) {
            var result = json["result"];
            var message_content = result["message_content"];
            var answer_mode = result["answer_mode"];

            if (message_content === null || message_content.length <= 0 || answer_mode === ANSWER_MODE.SILENT) {
                return;
            }

            // 一定時間後に処理を行う
            setTimeout(function () {
                var talk_board = $("#talk_board");
                var photo_swipe_flg = false;
                var first_element;
                var delay_talk_interval_ms = delay_talk_interval_const;
                for (var i = 0; i < message_content.length; i++) {
                    var one_data = null;
                    var mc = message_content[i];
                    var message = mc["content"];
                    var type = mc["type"];
                    var character_type = mc["character_type"];

                    if (type === ANSWER_TYPE.TEXT) {
                        // テキストの場合
                        if (message === "") {
                            continue;
                        }
                        one_data = makeContentFromAnswerForText(message);
                    }

                    if (type === ANSWER_TYPE.IMAGE) {
                        // 画像の場合
                        one_data = makeContentFromAnswerForImage(message);
                        photo_swipe_flg = true
                    }

                    if (type === ANSWER_TYPE.HTML) {
                        // HTMLの場合
                        // レスポンスHTMLを吹き出しの外に追加する
                        talk_board.append($(message));
                        continue;
                    }

                    // 最後の要素の場合
                    if (i === (message_content.length - 1)) {
                        var select_list = result["select_list"];

                        if (one_data !== null && select_list !== null && select_list.length > 0) {
                            var scenario_id = result["scenario_id"];
                            var confirm_id = result["confirm_id"];
                            one_data.append(makeSelectList(select_list, scenario_id, confirm_id, answer_mode));
                        }
                    }

                    // オペレータ表情設定
                    character_type = resolveCharacterTypeElement(character_type);
                    // オペレータのレイアウト枠の作成
                    var operator_base_layout = $("<li class='op smile clearfix'></li>");
                    operator_base_layout.append(character_type);
                    operator_base_layout.append(one_data);
                    if (i === 0) {
                        first_element = operator_base_layout;
                    }
                    // トークボードに内容を追加する
                    talk_board.append(operator_base_layout);
                }

                var is_display_solve_view = result["is_display_solve_view"];
                var selected_log_id = result["selected_log_id"];
                var solution_id = result["solution_id"];

                if (is_display_solve_view === true) {
                    var delay_solve_dialog_interval_ms = delay_solve_dialog_proportionality_const;
                    if (typeof message === "string") {
                        // 回答後アンケートの表示遅延時間 = URLを除いたmessage文字数 * 比例定数
                        var readable_message = message.replace(/(http(s)?:\/\/[\w-.!'()*;/?:@&=+$,%#]+)/, "");
                        delay_solve_dialog_interval_ms = readable_message.length * delay_solve_dialog_proportionality_const;
                    }
                    delay_talk_interval_ms += delay_solve_dialog_interval_ms;
                    var solve_data = makeContentFromAnswerForText(result["questionnaire_text"]);
                    solve_data.append(makeQuestionnaire(solution_id, scenario_id, selected_log_id));
                    solve_dialog_timeout_id = setTimeout(function () {
                        solve_dialog_timeout_id = null;
                        var operator_base_layout2 = $("<li class='op smile clearfix solve'></li>");
                        operator_base_layout2.attr("id", "solution_id_" + solution_id);
                        var character_type2 = $("<div class='face brown normal'>&nbsp;</div>");

                        operator_base_layout2.append(character_type2);
                        operator_base_layout2.append(solve_data);

                        $talk_board.append(operator_base_layout2);
                        targetFadeIn($("#talk_board").children("li"));
                        addListEventLinks();
                        adjustBody();
                        scrollToLastElement($talk_board, operator_base_layout2);
                    }, delay_solve_dialog_interval_ms);
                }

                // ディレイトークリクエスト
                if (answer_mode !== ANSWER_MODE.DELAY_TALK && answer_mode !== ANSWER_MODE.MAINTENANCE) {
                    postChaseMessage(delay_talk_interval_ms);
                }

                targetFadeIn($("#talk_board").children("li"));
                addListEventLinks();
                adjustBody();
                scrollToLastElement($talk_board, first_element);
                if (photo_swipe_flg) {
                    initPhotoSwipeFromDOM('.my-gallery');
                }

            }, access_delay_time);
        },
        function (json) {
            talkSimply(system_error_text, CHARACTER_TYPE.SAD_FACE);
        });
}

function resolveCharacterTypeElement(character_type) {
    // オペレータ表情設定
    if (character_type === CHARACTER_TYPE.NORMAL) {
        return $("<div class='face normal'>&nbsp;</div>");
    }
    else if (character_type === CHARACTER_TYPE.HAPPY_FACE) {
        return $("<div class='face happy'>&nbsp;</div>");
    }
    else if (character_type === CHARACTER_TYPE.SAD_FACE) {
        return $("<div class='face sad'>&nbsp;</div>");
    }
    return $("<div class='face normal'>&nbsp;</div>");
}

/**
 * ディレイトークリクエストを指定時間後に送信します。
 * @param talk_delay_time
 */
function postChaseMessage(talk_delay_time) {
    if (!is_delay || talk_delay_time === 0) {
        return;
    }

    chase_timeout_id = setTimeout(function () {
        var json = createRequestJSON(QUESTION_TYPE.DELAY, "", null, null, null, null, null, null);
        accessAPIWithFPID(json);
    }, talk_delay_time);
}

/**
 * PhotoSwipe 用のディレイ制御オブジェクト
 */
var CHART = {
    ClOSE: function () {
        clearTimeout(chase_timeout_id)
    },
    OPEN: function () {
        if (answer_mode !== ANSWER_MODE.DELAY_TALK) {
            postChaseMessage(delay_talk_interval_const)
        }
    }
};

/**
 * チャット API へのリクエスト JSON を作成します。
 * @param type 質問タイプ
 * @param message メッセージ内容
 * @param send_id 遷移先 ID
 * @param scenario_id シナリオ ID
 * @param option_id 選択肢 ID
 * @param is_suggest サジェストフラグ
 * @param confirm_id 確認 ID
 * @param from_answer_mode 元回答モード
 * @returns {*}
 */
function createRequestJSON(type, message, send_id, scenario_id, option_id, is_suggest, confirm_id, from_answer_mode) {
    var dict_data;

    var session_id = $("#session_id").val();
    var user_id = $("#user_id").val();

    // undefinedだった場合は、nullをセット
    if (typeof(scenario_id) === "undefined") {
        scenario_id = null;
    }

    if (typeof(send_id) === "undefined") {
        send_id = null;
    }

    if (typeof(option_id) === "undefined") {
        option_id = null;
    }

    if (typeof(is_suggest) === "undefined") {
        is_suggest = null;
    }

    if (typeof(confirm_id) === "undefined") {
        confirm_id = null;
    }

    if (typeof(from_answer_mode) === "undefined") {
        from_answer_mode = null;
    }

    // 全タイプ共通項目を埋める
    dict_data = {
        'account_id': '123456789',
        'user_id': user_id,
        'user_fingerprint': user_fp,
        'user_meta_info': {},
        'from_answer_mode': from_answer_mode,
        'message_content': {
            'type': type,
            'content': message
        },
        'session_id': session_id,
        'reply_necessity': true,
        'replied_message': null,
        'is_suggest': is_suggest
    };

    if (type === QUESTION_TYPE.TEXT) {
        return dict_data
    }

    if (type === QUESTION_TYPE.ID_SPECIFIED) {
        dict_data.message_content.scenario_id = scenario_id;
        dict_data.message_content.option_id = option_id;
        dict_data.message_content.send_id = send_id;
        dict_data.message_content.confirm_id = confirm_id;
        return dict_data;
    }

    if (type === QUESTION_TYPE.DELAY) {
        return dict_data;
    }

    if (type === QUESTION_TYPE.OPENING_TALK || type === QUESTION_TYPE.TOP_TALK) {
        return dict_data;
    }

    return null;
}

function endScroll() {
    var offsetY = $(document).outerHeight(true) - $(window).height();
    return scrollToImpl(offsetY);
}

function scrollToLastElement(base_elem, target_elem) {
    if (target_elem == null) {
        return endScroll();
    }
    var offsetY = target_elem.offset().top - base_elem.offset().top + base_elem.scrollTop();
    return scrollToImpl(offsetY);
}

function scrollToImpl(offsetY) {
    var time = 500;
    if (offsetY > 0) {
        $('.main').animate({scrollTop: offsetY}, time, 'swing');
    }
    return false;
}


/**
 * 質問文をトークボードに追加する
 * @param message 質問文
 */
function add_question_to_talk_board(message) {
    var message_tag = $('<p></p>').text(message);
    var message_div_tag = $('<div class="message"></div>').append($("<div>").append(message_tag));
    var message_html = $('<li></li>').append(message_div_tag);
    var talk_board = $("#talk_board");
    talk_board.append(message_html);
    targetFadeIn($("#talk_board").children("li"));
    adjustBody();
    scrollToLastElement($talk_board, message_html);
}

/**
 * 入力された質問文をトークボードに追加し、APIに送信する。
 */
function send_message() {
    var message = $('#query').val();
    add_question_to_talk_board(message);
    var json = createRequestJSON(QUESTION_TYPE.TEXT, message, null, null, null, null, null, null);
    accessAPIWithFPID(json);
}

function replaceTagURL(str) {
    //URLテキストの置換
    var regexp = new RegExp("(\\[.*?\\])\\(([^)]+)\\)", "gi");
    var matchArray = str.match(regexp);
    if (matchArray != null) {
        for (var i = 0; i < matchArray.length; i++) {
            var regURL = matchArray[i];

            var replaceLink = regURL.replace(/\[([^\]]+)\]\(([^)"]+)(?: \"([^\"]+)\")?\)/, "<a href='$2' target='_blank'>$1</a>");

            str = str.replace(regURL, replaceLink);
        }
    }
    return str;
}


/**
 * 画像付きURLテキストを置換する
 *
 * @param content 回答内容
 * @returns {*} 画像タグ文字列
 */
function replaceTagImage(content) {
    if (!Array.isArray(content)) {
        return content;
    }

    var result = '';
    for (var i = 0, len = content.length; i < len; i++) {
        var data = content[i];
        var dataSize = data.width + 'x' + data.height;
        result += '<figure><a href=' + data.src + ' data-size=' + dataSize + ' ><img src=' + data.src + '  alt="画像" class="vertical"/></a></figure>';
    }
    return result;
}

/**
 * フェードイン
 * @param target
 */
function targetFadeIn(target) {
    target.fadeIn(millis_of_fadein);
}

/**
 * 解決APIにデータを送信する
 * @param solution_id 解決ID
 * @param selected_log_id 選択ログID
 * @param scenario_id シナリオID
 * @param is_solved 解決したか
 */
function sendIsSolved(solution_id, selected_log_id, scenario_id, is_solved) {
    var session_id = $("#session_id").val();
    var requestJson = {
        "solution_id": solution_id,
        'session_id': session_id,
        "selected_log_id": selected_log_id,
        "scenario_id": scenario_id,
        "is_solved": is_solved
    };
    sendRequestToAPI('/agent/solve', requestJson,
        function (json) {
            var talk_board = $("#talk_board");
            var result = json["result"];
            var message_content = result["message_content"];
            if (message_content.length > 0) {
                var mc = message_content[0];
                var message = mc["content"];
                var character_type = resolveCharacterTypeElement(mc["character_type"]);
                var one_data = makeContentFromAnswerForText(message);
                // オペレータのレイアウト枠の作成
                var operator_base_layout = $("<li class='op smile clearfix'></li>");
                operator_base_layout.append(character_type);
                operator_base_layout.append(one_data);

                // トークボードに内容を追加する
                talk_board.append(operator_base_layout);
                targetFadeIn($("#talk_board").children("li"));
                addListEventLinks();
                adjustBody();
                endScroll();
            }

            var target = $("#solution_id_" + $.escapeSelector(solution_id));
            target.fadeOut(700);
            setTimeout(function () {
                target_remove(target);
                invokeTopTalk();
            }, 700);
        },
        function () {
            alert("jsonファイルの読み込みに失敗しました");
        }
    );
}


/**
 * サジェストの検索
 * @param word
 */
function searchSuggestWord(word) {
    if (is_manual_chat_active()) {
        return;
    }

    var queryResult = $('#query-result');

    // 指定された文字列がスペースを除き指定されていたら
    if (word.replace(/\s/g, "").length > 0) {
        client.search({
            index: 'suggest',
            type: 'question',
            from: 0,
            size: 3,
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                match: {
                                    question: {
                                        query: word,
                                        operator: 'and'
                                    }
                                }
                            },
                            {
                                terms: {
                                    site_id: [-1, search_params_site_id]
                                }
                            }
                        ]
                    }
                }
            },
            sort: '_score'
        }).then(function (body) {
            queryResult.html('');
            for (var i in body.hits.hits) {

                var one_list = $('<li></li>');
                var scenario_id_list = $('<input type="hidden"/>').attr("name", "scenario_id");
                var option_id_list = $('<input type="hidden"/>').attr("name", "option_id");
                var one_link = $('<a class="suggest_word"></a>').text(body.hits.hits[i]._source.question);
                one_link.attr("href", "#" + body.hits.hits[i]._source.send_id);
                one_link.click(clickSuggestList);
                one_list.append(one_link);
                one_list.append(scenario_id_list);
                one_list.append(option_id_list);
                queryResult.append(one_list);
            }

            // サジェストリストの引き上げ幅を算出する
            var pxToPullUp = queryResult.outerHeight(true) - $('#notes').outerHeight(true) - 7;
            pxToPullUp = Math.min(0, -pxToPullUp) - 30;

            // サジェストリストの縦位置を設定する
            queryResult.css('top', pxToPullUp + 'px');
        }, function (error) {
            console.error(error.message);
            queryResult.html('');
        });
    } else {
        queryResult.html('');
    }
}

// サジェストの候補のクリックイベント内容
var clickSuggestList = function () {
    //メッセージを設置
    var $link = $(this);
    var send_id = $link.attr("href").replace("#", "");

    if (send_id === "undefined") {
        document.getElementById('query').value = $link.text();
        $('#query_button').click();
    } else {
        var scenario_id = $(this).find("[name=scenario_id]").val();
        var option_id = $(this).find("[name=option_id]").val();

        //メッセージ設置
        add_question_to_talk_board($(this).text());
        var json = createRequestJSON(QUESTION_TYPE.ID_SPECIFIED, $(this).text(), send_id, scenario_id, option_id, 1);
        accessAPIWithFPID(json);

        textareaReset();
    }
};

/**
 * APIアクセス用の共通関数
 * @param url URL（プレフィックスは内部で付加する。スラッシュ始まりのAPIパスを指定する）
 * @param requestJson リクエストJSON
 * @param onSuccess 成功ハンドラ
 * @param onError エラーハンドラ
 */
function sendRequestToAPI(url, requestJson, onSuccess, onError) {
    // サイトIDを付加する
    requestJson.site_id = search_params_site_id;
    $.ajax({
        url: prefix_url + url,
        type: "post",
        crossDomain: true,
        beforeSend: beforeSendToAPI,
        data: JSON.stringify(requestJson),  // JSONデータ本体
        dataType: 'json',
        contentType: 'application/json', // リクエストの Content-Type
        cache: false, //ブラウザにキャッシュさせません。
        error: onError,
        success: onSuccess,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    });
}

// ios・Android端末かのチェック(タブレットは含まない)
function is_ios_android() {
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        return true;
    }
    return false;
}

// 共通のフォーカス処理
function common_focus() {
    if (is_ios_android()) {
        return;
    }
    // 入力ボックスにフォーカス
    $("textarea#query").focus();
}

// NOTE: GoogleAnalytics用コード
/*
 var sendGaEvent = function (requestMessage, suggestFlg, message_content) {
 if (requestMessage == '' || suggestFlg == 0) {
 return;
 }
 var message = '';
 var scenarioId = '';
 for (var i = 0; i < message_content.length; i++) {
 message += message_content[i].content;
 if (scenarioId == '') {
 scenarioId += message_content[i].content_scenario_id;
 } else {
 scenarioId += ',' + message_content[i].content_scenario_id;
 }
 }
 message = message.replace(/\r?\n/g, "");
 if (suggestFlg == 1) {
 window.dataLayer.push({
 'event': 'clickSuggestList',
 'eventAction': requestMessage,
 'eventLabel': message,
 'scenarioId': scenarioId
 });
 } else if (suggestFlg == null) {
 window.dataLayer.push({
 'event': 'sendQueryForm',
 'eventAction': requestMessage,
 'eventLabel': message,
 'scenarioId': scenarioId
 });
 }
 return;
 }
 */

// チャット問い合わせボタンクリック時にオープニング発話
$(function(){
    $(document).one('change','#ai-chat-trigger',function(){
        invokeOpeningTalk();
    });
});
