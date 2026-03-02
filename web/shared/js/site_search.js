/**
 * サイト内検索の内容を切り替えるためのスクリプト
 */

//検索入力欄切り替え時間(ミリ秒)
var siteSearchSwitchTime = 9000;

//デフォルトのキーワード
var siteSearchDefault = "キーワードを入力";
var siteSearchDefaultColor = "#CCCCCC;";
var siteSearchKeyColor = "#0055D4";

//切り替える文字列
var siteSearchKeyWord = new Array();
siteSearchKeyWord[0] = "確定申告";
siteSearchKeyWord[1] = "不動産ファンド特集";
siteSearchKeyWord[2] = "iPhone android アプリ";
siteSearchKeyWord[3] = "マネーブリッジ(銀行連携） 好金利";
siteSearchKeyWord[4] = "毎月分配型ファンド";
siteSearchKeyWord[5] = "投信　売れ筋ランキング";
siteSearchKeyWord[6] = "好利回り　外国債券";
siteSearchKeyWord[7] = "国内ETF　ランキング";
siteSearchKeyWord[8] = "FX スプレッド";

//入力オブジェクト
var siteSearchTxtBox = document.getElementById("MF_form_phrase");
var siteSearchWordChgFlg = true;
var siteSearchWordFocusFlg = false;
var siteSearchWordNum = Math.floor( Math.random() * siteSearchKeyWord.length );
var siteSearchTimerID = null;

/**
 * ランダムにサイト内検索の文字の切り替えを行います。
 */
function randomSiteSearchWord() {
	if( checkSiteSearchWordChange() ){
		siteSearchTxtBox.value = siteSearchKeyWord[siteSearchWordNum];
		siteSearchTxtBox.style.color=siteSearchKeyColor;
		siteSearchWordChgFlg = true;
	}
	siteSearchWordNum++;
	
	if(siteSearchWordNum >= siteSearchKeyWord.length){
		siteSearchWordNum = 0;
	}
	siteSearchTimerID = setTimeout("randomSiteSearchWord()", siteSearchSwitchTime);
}

/**
 * サイト内検索のキーワードを変更してよいか確認する。
 * @retun true:変更可 false:変更不可
 */
function checkSiteSearchWordChange(){
//	if(document.activeElement == siteSearchTxtBox){
	if(siteSearchWordFocusFlg){
		return false;
	}
	
	if(siteSearchTxtBox.value == "" || siteSearchTxtBox.value == siteSearchDefault || siteSearchWordChgFlg){
		return true;
	}
	return false;
}

/**
 * フォーカスされた際の処理
 */
function onSiteSearchFocus(){
	siteSearchWordFocusFlg = true;
	if(siteSearchTxtBox.value == siteSearchDefault || siteSearchWordChgFlg){
		siteSearchTxtBox.value = "";
		
	}
	siteSearchWordChgFlg = false;
	siteSearchTxtBox.style.color='#000000';
}

/**
 * フォーカスが外れた際の処理
 */
function onSiteSearchBlur(){
	siteSearchWordFocusFlg = false;
}

siteSearchTimerID = setTimeout("randomSiteSearchWord()", siteSearchSwitchTime);
