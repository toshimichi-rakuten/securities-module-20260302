// 西暦取得
today = new Date();
yy = today.getYear();
mm = today.getMonth() + 1;
if (yy < 2000) { yy += 1900; }

// 今月の日数
getDays = new Date(yy, mm, 0).getDate();

jQuery( function() {
	jQuery(document).ready(function () {
		jQuery.ajaxSetup({ cache: false });
		
		jQuery.get('/web/fund/service/xml/distributions.xml', function(data, textStatus) {
			jQuery(data).find('fund').each(function() {
				// 日付取得
				var month = today.getMonth() + 1;
				var date = today.getDate();
				
				// 月情報の取得
				var moList = new Array('default','jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec','jan2');
				var current = moList[month]; // 当月割り出し

				// XMLより情報取得
				var dDate = $(this).find('default').text(); // 分配日（デフォルト）
				var dividends = $(this).find('dividends').text(); // 直近分配金
				var isin = $(this).find('isin').text(); // 証券番号
				var name = $(this).find('name').text(); // 銘柄名
				var company = $(this).find('company').text(); // 委託会社
				var close = $(this).find("close").find(current).text();// ファンド休業日

				// ファンド休業日
				if (close != "") {
					var closeArray = close.split(",");
					var cDay = "";
					
					for( var i=0 ; i<closeArray.length ; i++ ) {
						cDay += month + '/' + closeArray[i] + "<br />";
						close = cDay;
					}
				} else {
					close = "&nbsp;"
				}
		
				var count = dDate - date; // 分配日までの日数
				var cd = getDays + count; // 当月末日までの日数
		
				if ( count < 0 ) {
					if (current == "dec") {
						month = "1";
						current = "jan2";
					} else {
						month = month + 1;
						current = moList[month];
					}
				} if ((count <= 7 && count > 2) || (cd <= 7 && cd > 2)) {
					soon = '<img src="/web/shared/img/fund/migration/guide/distributions-img-01.gif" alt="もうすぐ！" />';
				} else {
					soon = "";
				}
		
				var cmDate = $(this).find('date').find(current).text();
				
				if (!cmDate) {
					cDate = dDate;
				} else {
					cDate = cmDate;
				}

				var html = '<tr><th scope="row"><div class="date">' + soon + month + '/' + dDate + '<br><span class="current">（' + month + '/' + cDate + '）</span>' + '</div></td><td class="money">'  + dividends + '円</td><td><a href="/web/fund/detail/?ID=' + isin + '">' + name + '</a></td><td>' + company + '</td><td class="close">' + close + '</td></tr>';
				jQuery('#schedule').append(html);
			});
		}, 'html');
	});
});