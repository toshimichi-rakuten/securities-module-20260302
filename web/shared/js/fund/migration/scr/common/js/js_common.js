function showReport(thisCode, type) {
    day = new Date();
    id = day.getTime();
    eval("page" + type + " = window.open('../scr/common/goReport.asp?thisCode=" + thisCode + "&type=" + type + "', 'WAM_FundInfo_pdf_' + type ,'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=700,height=600,left=150,top=75');");
}

function showDoc(type, doc) {
    day = new Date();
    id = day.getTime();    
    eval("page" + id + " = window.open('../scr/common/showdocument.asp?type=" + type + "&doc=" + doc + "', '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=700,height=600,left=150,top=75');");
}



    function search() {
    	if(document.forms[form].elements['form-text-01'].value == 'ファンド名\u2044委託会社'){
		document.forms[form].elements['form-text-01'].value = '';
		}
        var sendForm = document.getElementById('searchCondition');
        sendForm['result'].value = "ファンド名称,url,運用会社,アセットタイプ2,基準価額,前日比円,純資産(億円),手数料テキスト,信託報酬 合計,目論見書,LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年,ﾘﾀｰﾝ(年率)6ヶ月,ﾘﾀｰﾝ(年率)1年,ﾘﾀｰﾝ(年率)3年,ｼｬｰﾌﾟﾚｼｵ 1年,分配金累計(1年),分配方法,設定来 高値,設定来 高値日付,設定来 安値,設定来 安値日付,基準日,fundFlags,fundFlags2,積立フラグ,suishouFlag,再投資フラグ,wam_report_week,wam_report_month";        
        sendForm['sort'].value = 'week_all_all=up';
        sendForm['count'].value = '9999';
        sendForm['recsPerPage'].value = '20';
        searchNow(sendForm, "../search/result.html");
    }
