/**
 *	campaign.js
 *  Latest Version
 *  Ver 1.0
 *	$(function () {
 *		$.fn.campaignShow({
 *			pageType: 'campaign'
 *		});
 *	});
 *	pageType: 'vtop' or pageType: 'market'
 */

(function(e){e.fn.campaignShow=function(t){var n=e.extend({targetID:"#campaign-box",jsonFile:"campaign.json",pageType:"campaign"},t);e(n.targetID).each(function(){e.getJSON(n.jsonFile,{ts:(new Date).getTime()},function(t){if(n.pageType=="campaign"){var r="";for(var i in t){var s='<li><div class="box-inner-01"><dl><dt><a href="'+t[i].linkpath+'"><span class="title">'+t[i].cpTitle+"</span>";var u='<img src="'+t[i].imagepath+'" class="thumb" alt="'+t[i].cpTitle+'" width="160" height="120" /></a></dt><dd>'+t[i].description+'</dd><dd class="schedule"><span>期間</span> '+t[i].distance+"</dd></dl></div></li>";if(t[i].newFlag==true){r+=s+'<span class="icon-new">NEW</span>'+u}else{r+=s+u}}e(n.targetID).find("ul").html(r)}else if(n.pageType=="vtop"){var r="";for(var i in t){if(t[i].topTitle){var a=t[i].topTitle}else{var a=t[i].cpTitle}if(t[i].topFlag==true){var s="<tr><td><a onclick=\"s.lidTrack('vtop_campaign_"+t[i].lidTrack+'\')" href="'+t[i].linkpath+'">'+a;var u="</a></td></tr>";if(t[i].newFlag==true){r+=s+'<span class="icon-new">NEW</span>'+u}else{r+=s+u}}}e(n.targetID).find("tbody").html(r)}else if(n.pageType=="market"){var r="";for(var i in t){if(t[i].topTitle){var a=t[i].topTitle}else{var a=t[i].cpTitle}if(t[i].topFlag==true){var s='<tr><td><a href="'+t[i].linkpath+'">'+a;var u="</a></td></tr>";if(t[i].newFlag==true){r+=s+'<span class="icon-new">NEW</span>'+u}else{r+=s+u}}}e(n.targetID).find("tbody").html(r)}})});return this}})(jQuery)
