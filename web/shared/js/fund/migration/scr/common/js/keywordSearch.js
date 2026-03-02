function searchNow(sendForm, loc) {

	var str = sendForm['form-text-01'].value;
    if (str.indexOf("ファンド名") != -1 && str.indexOf("委託会社") != -1) {
        sendForm['form-text-01'].value = '';
    }
    
    //check if there is a keyword    
    if (sendForm['form-text-01'].value) {
        //b_fand + '*' + document.getElementById('v_fand').value + '*';
        sendForm['condition1'].value = fund + "*" + sendForm['form-text-01'].value + "*";
    }

    sendForm.method = "get";
    sendForm.action = loc; 
    sendForm.submit();
}