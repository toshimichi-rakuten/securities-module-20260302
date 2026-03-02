/**
 * サイト内検索の内容を切り替えるためのスクリプト
 */

//検索入力欄切り替え時間(ミリ秒)
var usSearchSwitchTime = 9000;
var usSearchKeyColor = "#0055D4";

//切り替える文字列
var usSearchKeyWord = new Array();
usSearchKeyWord[0] = "アップル";
usSearchKeyWord[1] = "シティグループ";
usSearchKeyWord[2] = "グーグル";
usSearchKeyWord[3] = "GE";
usSearchKeyWord[4] = "IBM";

//入力オブジェクト
var usSearchTxtBox = document.getElementById("form-search-stock-cont");
var usSearchWordChgFlg = true;
var usSearchWordFocusFlg = false;
var usSearchWordNum = Math.floor( Math.random() * usSearchKeyWord.length );
var usSearchTimerID = null;

/**
 * ランダムにサイト内検索の文字の切り替えを行います。
 */
function randomUsSearchWord() {
	if( checkUsSearchWordChange() ){
		usSearchTxtBox.value = usSearchKeyWord[usSearchWordNum];
		usSearchTxtBox.style.color=usSearchKeyColor;
		usSearchWordChgFlg = true;
	}
	usSearchWordNum++;
	
	if(usSearchWordNum >= usSearchKeyWord.length){
		usSearchWordNum = 0;
	}
	usSearchTimerID = setTimeout("randomUsSearchWord()", usSearchSwitchTime);
}

/**
 * サイト内検索のキーワードを変更してよいか確認する。
 * @retun true:変更可 false:変更不可
 */
function checkUsSearchWordChange(){
	if(usSearchWordFocusFlg){
		return false;
	}
	
	if(usSearchTxtBox.value == "" || usSearchWordChgFlg){
		return true;
	}
	return false;
}

/**
 * フォーカスされた際の処理
 */
function onUsSearchFocus(){
	usSearchWordFocusFlg = true;
	if(usSearchWordChgFlg){
		usSearchTxtBox.value = "";
		
	}
	usSearchWordChgFlg = false;
	usSearchTxtBox.style.color='#000000';
}

/**
 * フォーカスが外れた際の処理
 */
function onUsSearchBlur(){
	usSearchWordFocusFlg = false;
}

usSearchTimerID = setTimeout("randomUsSearchWord()", usSearchSwitchTime);
