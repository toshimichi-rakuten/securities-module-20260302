// ファンド名称 condition1
var fund = 'ファンド名称like';    // 1

function search() {
    var sendForm = document.getElementById('searchCondition');    
    sendForm['result'].value = 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2';    
    sendForm['sort'].value = 'week_all_all=up';
    sendForm['count'].value = '9999';
    sendForm['recsPerPage'].value = '20';
    searchNow(sendForm, "/web/fund/find/search/result.html");
}

function getReport() {
    var sendForm = document.getElementById('searchCondition');
    sendForm['result'].value = 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2';        
    sendForm['sort'].value = 'week_all_all=up';
    sendForm['count'].value = '9999';
    sendForm['recsPerPage'].value = '20';    
    sendForm['tab'].value = "report";
    sendForm.method = "get";
    sendForm.action = "/web/fund/find/search/result.html";
    sendForm.submit();
}

function ShowSearch() {
    window.location = "/web/fund/find/search/result.html";
}    
