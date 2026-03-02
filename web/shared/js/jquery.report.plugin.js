/*
 * jquery.report.plugins.js
 * ver 1.0
 * update 2015.1.8
 *
 * History
 * 2015.1.8
 * 作成
 *
 * copyright Rakuten Securities, Inc.
 *
 */

;(function ($, window, document, undefined) {

		var defaults = {
			targetID: '#report-box',
			jsonFile: '/web/shared/js/report.json', //path to json
			pageType: 'opinion' // or vtop
		};

	$.fn.reportShow = function(options) {
		var o = $.extend({}, defaults, options);

		$.getJSON(
			o.jsonFile, {
				ts: new Date().getTime()
			},
			function(data) {
				var contentDataJoint = '';
				var contentDataFront = '';
				if(o.pageType === 'opinion') {
					for(var i in data.reporttop) {
						contentDataFront = '\n\
						<div class="newreport ' + data.reporttop[i].product[0] + '_hover">\n\
							<div class="image">\n\
								<img alt="' + data.reporttop[i].author + '" src="/web/market/opinion/images/photo/' + data.reporttop[i].authorImage + '">\n\
							</div>\n\
							<div class="column">\n\
								<p class="date"><span class="icon-report-' + data.reporttop[i].product[0] + '">' + data.reporttop[i].product[1] + '</span>　' + data.reporttop[i].date + '</p>\n\
								<p class="title">' + data.reporttop[i].reportTimes + data.reporttop[i].reportTitle +'</p>\n\
								<p class="report">' + data.reporttop[i].author + data.reporttop[i].Title + '</p>\n\
							</div>\n\
							<a href="' + data.reporttop[i].reportLinkPath + '"></a>\n\
						</div>\n\
						';
						contentDataJoint += contentDataFront;
					}
					$(o.targetID).html(contentDataJoint);
				}
				if(o.pageType === 'top') {
					for(var i in data.top) {

						contentDataFront = '\n\
						<li class="s-list-thumbnail">\n\
						<a onclick="s.lidTrack(\'vtop-report_' + data.top[i].lidTrack + '\')" href="' + data.top[i].reportLinkPath + '">\n\
						<div class="s-image"><img height="100" width="100" alt="' + data.top[i].author + '" src="/web/market/opinion/images/photo_v/' + data.top[i].authorImage + '"></div>\n\
						<div class="s-text">\n\
						<p class="s-date">' + data.top[i].date + '</p>\n\
						<p class="s-link">【' + data.top[i].product[1] + '】' + data.top[i].reportTitle + '<br>' + data.top[i].renewalTerm + '更新：' + data.top[i].author + '</p>\n\
						</div></a></li>\n\
						';
						contentDataJoint += contentDataFront;
					}
					$(o.targetID).html(contentDataJoint);
				}
			}
		);

		return this;
	};
})(window.jqBase || jQuery, window, document);

