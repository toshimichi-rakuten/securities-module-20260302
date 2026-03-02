'use strict';

var mySocket = null;
var ping_interval_ms;
var ping_timer_id;
var is_client_ssl;

$(function () {
    ping_interval_ms = parseInt($("#ping_interval_ms").val()) || 50000;
    is_client_ssl = $("#is_client_ssl").val() == "True";
    if (is_admin() && is_room_enabled()) {
        connectSocket();
    }
});

function createUserCharacterTypeElement() {
    // ユーザー設定
    return $("<div class='face user'>&nbsp;</div>");
}

function is_mine(sender) {
    var user_id = $("#user_id").val();
    var session_id = $("#session_id").val();
    return user_id == sender || session_id == sender;
}

function is_admin() {
    var is_admin = $("#is_admin").val();
    var session_id = $("#session_id").val();
    return is_admin == "True";
}

function post_admin_message(state_string) {
//    $("#connection-state").text(state_string);
    post_message_on_talk_board(1, state_string);

}

function set_ping() {
    ping_timer_id = setTimeout(function () {
        send_ping();
    }
    , ping_interval_ms);
}

function clear_ping() {
    clearTimeout(ping_timer_id);
}

function post_message_on_talk_board(role, result) {
    // トークボードにメッセージを追加する
    // 一定時間後に処理を行う
    setTimeout(function () {
        var talk_board = $("#talk_board");
        var photo_swipe_flg = false;
        var one_data;
        var message = result;
        var character_type = character_type == CHARACTER_TYPE.NORMAL;
        var last_element;

        // 相手から送信されたメッセージを HTML エスケープする
        one_data = makeSafeContent(message);

        // オペレータ表情設定
        if (role == 1) {
            character_type = resolveCharacterTypeElement(character_type)
        } else {
            character_type = createUserCharacterTypeElement()
        }
        // オペレータのレイアウト枠の作成
        var operator_base_layout = $("<li class='op smile clearfix'></li>");
        operator_base_layout.append(character_type);
        operator_base_layout.append(one_data);
        last_element = operator_base_layout;
        // トークボードに内容を追加する
        talk_board.append(operator_base_layout);

        targetFadeIn($("li"));
        addListEventLinks();
        adjustBody();
        scrollToLastElement(talk_board, last_element);
        if (photo_swipe_flg) {
            initPhotoSwipeFromDOM('.my-gallery');
        }

    }, access_delay_time);
}

function serialize_object_to_xml(o) {
    var str = new XMLSerializer().serializeToString(o);
    return str;
}
function get_talk_board_xml_string() {
  var talk_board = $("#talk_board");
  var tbb = document.getElementById("talk_board");
  return serialize_object_to_xml(tbb);
}

function deserialize_and_append_to_talk_board(xml_str) {
    if (xml_str != '') {
        var dp = new DOMParser();
        var conv_dom = dp.parseFromString(xml_str, "text/xml");
        var talk_board = $("#talk_board");
        for (var i = 0; i<conv_dom.childNodes.length; i++) {
            talk_board.append(conv_dom.childNodes[i]);
        }
    }
}

function update_connection_state(connected) {
    $("#is_active_manual_chat").val("" + connected);
    if (!connected) {
        clear_ping();
    }
}

function is_manual_chat_active() {
    var active = $("#is_active_manual_chat").val();
    return is_room_enabled() && active.toLowerCase() == "true";
}

function should_append_old_conversation(room_data) {
    var old_room_id = $("#room_id").val();
    return is_admin() && room_data != '' && old_room_id != ''
}

function should_send_conversation(request_type) {
    return (!is_admin()) && request_type == "open";
}

function is_room_enabled() {
    var is_room_enabled = $("#is_room_enabled").val();
    return is_room_enabled.toLowerCase() == "true";
}

function closeSocket() {
    if (mySocket != null) {
        mySocket.close();
    }
}

function connectSocket() {
        // create websocket instance
        var host_url = $(location).attr('hostname') + ":8088/room";
        if (is_client_ssl) {
            host_url = "wss://" + host_url;
        } else {
            host_url = "ws://" + host_url;
        }
        mySocket = new WebSocket(host_url);
        mySocket.onmessage = function (event) {
            var parsed_data = JSON.parse(event.data);
            var method = parsed_data["method"];
            if (method == "list") {
                return;
            }
            if (method == "ping") {
                set_ping();
                return;
            }
            if (method == "open") {
                var room_id = parsed_data["room_id"];
                var room_data = parsed_data["room"];
                $("#room_id").val(room_id);
                if (should_append_old_conversation(room_data)) {
                    var conversation_dom = room_data["conversation_dom"];
                    deserialize_and_append_to_talk_board(conversation_dom);
                }
                post_admin_message("サーバーに接続されました");
                set_ping();
                return;
            }
            var result = '';
            var role = '';
            var type = ANSWER_TYPE.TEXT;
            var user_id = $("#user_id").val();
            var sender = parsed_data["sender"];
            if (is_mine(sender)) {
                return;
            }
            if (method == "join") {
                result = sender + 'が入室しました';
                role = 1;
            }
            if (method == "close") {
                result = sender + 'が退出しました';
                role = 1;
                if (!is_admin()) {
                    closeSocket();
                    return;
                }
            }
            if (method == "send") {
                result = parsed_data["message"];
                role = parsed_data["role"];
            }
            post_message_on_talk_board(role, result);
        };

        mySocket.onopen = function (event) {
            update_connection_state(true);
            var json = createChatRequestJSON("open", '');
            sendWebSocketRequestAPI(json);
        };
        mySocket.onclose = function (event) {
            post_admin_message("サーバーから切断されました。");
            update_connection_state(false);
        };
        mySocket.onerror = function (event) {
            alert("有人チャットでエラーが発生しました。");
            post_admin_message("有人チャットでエラーが発生しました。")
            update_connection_state(false);
        };
}

function createConversationDom() {
    var str_xml = get_talk_board_xml_string();
    return str_xml;
}

function createChatRequestJSON(request_type, message) {

    var dict_data;

    var session_id = $("#session_id").val();
    var user_id = $("#user_id").val();
    var is_admin = $("#is_admin").val();
    var room_id = $("#room_id").val();
    var site_id = $("#site_id").val();
    var conversation_dom = should_send_conversation(request_type) ? createConversationDom() : ''
    dict_data = {
        'account_id': '123456789',
        'user_id': user_id,
        'session_id': session_id,
        'request_type': request_type,
        'message': message,
        'conversation_dom': conversation_dom,
        'is_admin': is_admin,
        'room': room_id,
        'site_id': site_id
    };

    return dict_data;
}

function sendWebSocketRequestAPI(requestJson) {
    var dat = JSON.stringify(requestJson);
    mySocket.send(dat);
}

function accessChatAPI(requestJson) {

    clearTimeout(chase_timeout_id);
    clearTimeout(solve_dialog_timeout_id);
    sendWebsocketRequestAPI(requestJson);
}

function send_chat_message() {
    var message = $('#query').val();
    add_question_to_talk_board(message);
    var json = createChatRequestJSON("send", message);
    sendWebSocketRequestAPI(json);
}

function send_ping() {
    console.log("pingping")
    var json = createChatRequestJSON("ping", '');
    sendWebSocketRequestAPI(json);
}
