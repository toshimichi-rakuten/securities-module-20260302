//usage
//inputarea に chfocus
//openkey でキーボード呼び出し（<div style="POSITION: relative"></dev>)のエリア
//keyboard.js と keyboard.js の呼び出し必須

//マックとウィンドウズ
OS = navigator.userAgent.toUpperCase();
browser = navigator.appName.toUpperCase();
browser_flg = true;
if(OS.indexOf("MAC") >= 0 && browser.indexOf("MICROSOFT") >= 0){
browser_flg = false;
}

//キーボード 1:表示 0:非表示
keyopflg = 0;
var focus_flag;

//キーボードオープン
function openkey(){
	if(document.loginform != null && document.loginform.loginid != null && document.loginform.loginid != undefined){
		if(focus_flag != 0 && focus_flag != 1){
			document.loginform.loginid.focus();
		}
	}
	else if(document.LoginForm != null && document.LoginForm.loginId != null && document.LoginForm.loginId != undefined){
		if(focus_flag != 0 && focus_flag != 1){
			document.LoginForm.loginId.focus();
		}
	}
	frmnm = "loginform";				//fromname
	in_nm_array = new Array("loginid","passwd");	//それぞれのinputエリア
	in_length_array = new Array("8","8");		//それぞれのmaxlength
	main();
}

//main処理
function main(page){
	if(keyopflg == 1){
	closekey();
	return;
	}
	keyopflg = 1;

	//選択されているテキストエリア
	chfocus(focus_flag);

	//キーボードを表示！
	document.getElementById('keyboard').style.display = "block";
}

//テキストボックスのフォーカスチェンジ
function chfocus(num){
	focus_flag = num;
	if(keyopflg == 0){
	return;
	}
	for(var j=0; j<in_nm_array.length; j++){
	eval("document." + frmnm + "." + in_nm_array[j]).style.backgroundColor = focus_flag == j ? "#FFF7D2" : "#FFFFFF";
	}
	change_tab();
}

//タブイメージ切り替え
function change_tab(){
	if(focus_flag == 0){
	 document.getElementById('keyarea2').style.display = "none";
	 document.getElementById('key_tab0').innerHTML ="<img src=\"/web/shared/images/keyboard/keyboard_tab_idon.gif\" alt=\"ログインID\" />";
	 document.getElementById('key_tab1').innerHTML ="<img style=\"CURSOR: pointer\" onclick=chfocus(1)  ondblclick=chfocus(1) src=\"/web/shared/images/keyboard/keyboard_tab_passoff.gif\" alt=\"パスワード\" />";
	 document.getElementById("btnArea").style.height = "160px";
	} else if(focus_flag == 1) {
	 document.getElementById('keyarea2').style.display = "block";
	 document.getElementById('key_tab0').innerHTML ="<img style=\"CURSOR: pointer\" onclick=chfocus(0)  ondblclick=chfocus(0) src=\"/web/shared/images/keyboard/keyboard_tab_idoff.gif\" alt=\"ログインID\" />";
	 document.getElementById('key_tab1').innerHTML ="<img src=\"/web/shared/images/keyboard/keyboard_tab_passon.gif\" alt=\"パスワード\" />";
	 document.getElementById("btnArea").style.height = "272px";
	}
}

//文字を入力
function keypush(num){
	var figure = document.getElementById("key" + num ).innerHTML;

	if(focus_flag == 0){
	if(eval("document." + frmnm + "." +in_nm_array[0]).value.length < in_length_array[0]){
	eval("document." + frmnm + "." +in_nm_array[0]).value += figure;
	}
	} else if(focus_flag == 1) {
	if(eval("document." + frmnm + "." +in_nm_array[1]).value.length < in_length_array[1]){
	eval("document." + frmnm + "." +in_nm_array[1]).value += figure;
	}
	} 
}

//文字を入力1
function keypush1(num){
	var figure = document.getElementById("key" + num+ "1").innerHTML;

	if(focus_flag == 0){
	if(eval("document." + frmnm + "." +in_nm_array[0]).value.length < in_length_array[0]){
	eval("document." + frmnm + "." +in_nm_array[0]).value += figure;
	}
	} else if(focus_flag == 1) {
	if(eval("document." + frmnm + "." +in_nm_array[1]).value.length < in_length_array[1]){
	eval("document." + frmnm + "." +in_nm_array[1]).value += figure;
	}
	} 
}

//オンキーの画像変換
function keyon(num){
	if(browser_flg == true){
	document.getElementById("key" + num).className = "btnsover";
	}
}

//オンキーの画像変換1
function keyon1(num){
	if(browser_flg == true){
	document.getElementById("key" + num + "1").className = "btnsover";
	}
}

//オフキーの戻し
function keyoff(num){
	if(browser_flg == true){
	document.getElementById("key" + num).className = "btns";
	}
}

//オフキーの戻し1
function keyoff1(num){
	if(browser_flg == true){
	document.getElementById("key" + num + "1").className = "btns";
	}
}

//文字を削除 0:1文字削除 1:全文字消去
function del(num){
	if(focus_flag == 0){
	eval("document." + frmnm + "." +in_nm_array[0]).value = num == 0 ? eval("document." + frmnm + "." +in_nm_array[0]).value.substring(0,eval("document." + frmnm + "." +in_nm_array[0]).value.length-1) : "";
	} else if(focus_flag == 1){
	eval("document." + frmnm + "." +in_nm_array[1]).value = num == 0 ? eval("document." + frmnm + "." +in_nm_array[1]).value.substring(0,eval("document." + frmnm + "." +in_nm_array[1]).value.length-1) : "";
	}
}

//キーボードを閉じる
function closekey(){
	document.getElementById('keyboard').style.display = "none";
	for(var j=0; j<in_nm_array.length; j++){
	eval("document." + frmnm + "." + in_nm_array[j]).style.backgroundColor = "#FFFFFF";
	}
	keyopflg = 0;
}