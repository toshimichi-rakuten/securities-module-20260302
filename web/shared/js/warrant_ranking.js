jQuery(document).ready(function() {	var data         = {};
	var metadata     = {};
	var fieldNumbers = {};
	var recs         = {}; 
	var lookedup     = null;
	var refresh_flag = false;

   // get recommends
    var url = "https://www2.ewarrant.co.jp/php/f2i.php"
          + "?type=ranking"
          + "&callback=?";

	$.getJSON(url, "", function(json) {		data     = json.data;
		metadata = json.metadata;
		for(var i = 0; i < metadata.fields.length; i++){			fieldNumbers[metadata.fields[i]] = i;		}
		$(".margin-reset-01").empty().append(setTimestamp(data.timestamp));
		recs = data.ranking_recs;
		$('#sell1').find('tr:gt(0)').remove();
		for(var i = 0; i < data.ranking["PMS-T-20"].list.length; i++) {
			var rec = recs[data.ranking["PMS-T-20"].list[i]];			if((i % 2) == 0) {				var txt = "<tr>";			} else {				var txt = "<tr class=\"even\">";			}			txt = txt + '<td class=\"align-C\">' + (i + 1) + '</td>';			txt = txt + '<td><a href=\"/web/market/search/warrant_search/quote.html?id=' + encodeURI(rec[fieldNumbers.id]) + '\" target=\"_top\">';			txt = txt + rec[fieldNumbers.webNameEncoded3] + ' ' + rec[fieldNumbers.series] + '回</td>';			txt = txt + '</tr>';
			$('#sell1').append(txt);
		}
		$('#roc1').find('tr:gt(0)').remove();
		for(var i = 0; i < data.ranking["ROC-T-20"].list.length; i++) {
			var rec = recs[data.ranking["ROC-T-20"].list[i]];
			var my_roc = parseInt(rec[fieldNumbers.rateOfChange]).toFixed(2);			if((i % 2) == 0) {				var txt = "<tr>";			} else {				var txt = "<tr class=\"even\">";			}			txt = txt + '<td class=\"align-C\">' + (i + 1) + '</td>';			txt = txt + '<td><a href=\"/web/market/search/warrant_search/quote.html?id=' + encodeURI(rec[fieldNumbers.id]) + '\" target=\"_top\">';			txt = txt + rec[fieldNumbers.webNameEncoded3] + ' ' + rec[fieldNumbers.series] + '回</td>';			if(my_roc > 0) {				txt = txt + '<td class=\"align-C up-02\">' + my_roc + '%&nbsp;↑</td>';			} else {				txt = txt + '<td class=\"align-C down-02\">' + my_roc + '%&nbsp;↓</td>';			}
			txt = txt + '</tr>';
			$('#roc1').append(txt);
		}
	});});function setTimestamp(arg){
	return arg.substr(0,4)+"/"+arg.substr(4,2)+"/"+arg.substr(6,2)+" "+arg.substr(9,5);
}
