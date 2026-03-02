// ファンド名称 condition1
var fund = 'ファンド名称like';    // 1
var a_fand = 'S01_01';          // 1    ファンド名称=

function search1() {
    var sendForm = document.getElementById('searchCondition1');
    DoSearch(sendForm);
}

function search2() {    
    var sendForm = document.getElementById('searchCondition2');
    DoSearch(sendForm);
}

function DoSearch(sendForm) {
    sendForm['pg'].value = '1';
    sendForm['recsPerPage'].value = '25';
    sendForm['result'].value = 'ファンド名称';
    sendForm['count'].value = '9999';
    sendForm['sort'].value = 'week_all_all=up';
    sendForm.method = "get";
    sendForm.action = "../search/result.html";

    //キーワード/ファンド名
    sendForm['condition1'].value = null;
    if (sendForm['stockSearch_input'].value) {
        sendForm['condition1'].value = fund + "*" + sendForm['stockSearch_input'].value + "*";
    }
    
    sendForm.submit();
}