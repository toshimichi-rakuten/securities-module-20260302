//omniUI認証tokencode取得
const urlParams = new URLSearchParams(window.location.search);
const tokenCode = urlParams.get('code');

//tokencode存在する且つRz存在しない場合,
if(!(tokenCode === undefined || tokenCode === null || tokenCode === '') && $.cookie("Rz") === null ){
	$.ajax({
			//omniUI認証API
			url: 'https://stg.login.account.rakuten.com/sso/token',
			method: 'POST',
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + btoa('rakuten_securities_web:123')
			},
			data:'grant_type=authorization_code&scope=openid%20r10_cookie_rz&audience=rid&code='+tokenCode+'&redirect_uri=https%3A%2F%2Fstgwww.rakuten%2Dsec.co.jp%2F&client_id=rakuten_securities_web',
			dataType: 'json'
		})
		.done(function(result) {
			//omniUI認証情報取得する
			let searchText = '.';
			//var resJsonByBase64 = result.id_token.substring(result.id_token.indexOf(searchText)+1,result.id_token.lastIndexOf(searchText));
			//resJsonByBase64 =  "eyJyMTBfdHJhbnNhY3Rpb25fdHlwZSI6IkxPR0lOIiwiYXVkIjpbInJha3V0ZW5fc2VjdXJpdGllc193ZWIiXSwic3ViIjoiNDU4NTQ4MDIiLCJyMTBfY29va2llX3J6IjoiQTg4dThzOExOVmdkUXdYRTZrNjBudzVhaHA2Ym5pV2pDSjl0N3U2U2o0QmQwQWkzZ1VOSURGZ1RTTHpGejc0cE9fR0VBdUdlR21xMXNILThyNXU4NldxY0c5cU5BQzBpa3RrdFFMNUNGU2dtSUpqdy00LXhSRVJad21BY2I5Ylgtd35+IiwicjEwX2ZhY3RvciI6InBhc3N3b3JkIiwiYXV0aF90aW1lIjoxNzcwMTg2OTA1LCJpc3MiOiJodHRwczpcL1wvc3RnLmxvZ2luLmFjY291bnQucmFrdXRlbi5jb20iLCJleHAiOjE3NzAxODc1MzksImlhdCI6MTc3MDE4NjkzOX0";
			//omniUI認証情報Base64でデコードする
			//const deCodeResInfo = atob(resJsonByBase64);
			
			// 文字コードをutf-8に設定する
			//const bytes = new Uint8Array(deCodeResInfo.length);
			//for (let i = 0; i < deCodeResInfo.length; i++) {
			//    bytes[i] = deCodeResInfo.charCodeAt(i);
			//}
			//const decoder = new TextDecoder('utf-8');
			
			//utf-8文字コードを使っている変換したレスポンスをJSONに変換する
			//let tokenJsonByDecode = JSON.parse(decoder.decode(bytes));
			
			// 変換したJSONにRzを取得する  TODO
			//var RzByeasyId = tokenJsonByDecode.r10_cookie_rz;
			//var RzByeasyId = "A4hW9aSJhC5-TE_ZBAHM_T5LZC3oKRw5wRw-haEM0I_yj4Of_Qiq2jPaqQfP3S_7CWhOAlYezbOdQxqeGRuxbb-MJ5QtUpCqDcNjNzJnEFaaOOt8eJkjObEGyESQPqbR8aRw_tFBASwU";
			var RzByeasyId = "A88u8s8LNVgdQwXE6k60nw5ahp6bniWjCJ9t7u6Sj4Bd0Ai3gUNIDFgTSLzFz74pO_GEAuGeGmq1sH-8r5u86WqcG9qNAC0iktktQL5CFSgmIJjw-4-xRERZwmAcb9bX-w~~";
			
			
			// Rzクキーを作成する
			$.cookie('Rz', RzByeasyId, { expires: 90, path: '/', domain: 'rakuten-sec.co.jp' });
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			// 認証失敗の場合
			console.error('RMEMBERサーバとの通信でエラーになりました、HTTPステータス:' + jqXHR.status + ', エラー情報:' + jqXHR.responseText);
		});
}