var strTable = '<div class="right_sub_account"><div class="head"><p>未開設の口座･お取引</p></div><p class="text">口座の開設のみで、特典のあるお取引もございます。</p><table border="0" cellspacing="0" cellpadding="0">';
var strTrEnd = '<img src="/web/shared/images/str-sub-common/btn-acc-apply-01.gif" width="50" height="15" alt="申込" /></a></td></tr>';
var intLineNo = 1;
var wkFlg = 0;

// Rz_secを確認し、未開設の口座・お取引の表示制御を実施
function setupInfoControl() {
	if($.cookie('Rg_sec') != null && $.cookie('Rg_sec') != '') {
		if($.cookie('Rg_sec').substr(139,1) != '0'){		//全経路最終ログイン日経過日数
			if($.cookie('Rg_sec').substr(92,1) == '0'){
				classControl();
				strTable = strTable + '<th>信用取引</th><td><a href="https://www.rakuten-sec.co.jp/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init" onclick="s.lidTrack(\'rightnavi_account_mgn\')">' + strTrEnd;
			}
			if($.cookie('Rg_sec').substr(93,1) == '0'){
				classControl();
				strTable = strTable + '<th>先物・オプション</th><td><a href="/web/fop/account.html" onclick="s.lidTrack(\'rightnavi_account_fop\')">' + strTrEnd;
			}
//			if($.cookie('Rg_sec').substr(94,1) == '0'){
//				classControl();
//				strTable = strTable + '<th>カバードワラント</th><td><a href="/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init" onclick="s.lidTrack(\'rightnavi_account_cw\')">' + strTrEnd;
//			}
			if($.cookie('Rg_sec').substr(95,1) == '0'){
				classControl();
				strTable = strTable + '<th>楽天FX</th><td><a href="/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init" onclick="s.lidTrack(\'rightnavi_account_rfx\')">' + strTrEnd;
			}
//			if($.cookie('Rg_sec').substr(98,1) == '0'){
//				classControl();
//				strTable = strTable + '<th>PTS取引</th><td><a href="/web/domestic/pts/account.html" onclick="s.lidTrack(\'rightnavi_account_pts\')">' + strTrEnd;
//			}
//			if($.cookie('Rg_sec').substr(99,1) == '0'){
//				classControl();
//				strTable = strTable + '<th>楽天CFD</th><td><a href="/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init" onclick="s.lidTrack(\'rightnavi_account_cfd\')">' + strTrEnd;
//			}
			if($.cookie('Rg_sec').substr(100,1) == '0'){
				classControl();
				strTable = strTable + '<th>海外先物</th><td><a href="/cgi-bin/CTS/Direct_Login.cgi?homeid=USER&type=account&sub_type=&local=acc_app_top&eventType=init" onclick="s.lidTrack(\'rightnavi_account_ff\')">' + strTrEnd;
			}
			if(($.cookie('Rg_sec').substr(101,1) == '0') || ($.cookie('Rg_sec').substr(101,1) == '3') || ($.cookie('Rg_sec').substr(101,1) == '9')){
				classControl();
				strTable = strTable + '<th>マネーブリッジ</th><td><a href="https://www.rakuten-sec.co.jp/cgi-bin/CTS/Direct_Login.cgi?homeid=MONEY_BRIDGE" onclick="s.lidTrack(\'rightnavi_account_R-bank\')">' + strTrEnd;
			}
			
			//table作成有無により書出し制御
			if(wkFlg == 1) {
				strTable = strTable + '</tr></table></div>';
				document.getElementById('setupInfoTable').innerHTML = strTable;
			}
		}
	}
	return;
}

//テーブル背景色のclass定義
function classControl(){

	if(intLineNo % 2 == 0) {
		strTable = strTable + '<tr>';
	} else {
		strTable = strTable + '<tr class="even">';
	}
	intLineNo = intLineNo + 1;
	wkFlg = 1;

}