/**
 *	jquery.pursue.js
 *  Latest Version
 *  Ver 1.1
 *
 *	sample code
 *	$.fn.pursue({targetID: '#str-sub-common', targetType: 'nisa'});
 *
 *	targetType: 'main' str-searchと横断幕あり
 *	targetType: 'nisa' str-searchと横断幕なし -> Default
 *	targetType: 'fx'   str-searchありで横断幕なし
 *
 */

(function(e){e.fn.pursue=function(t){var n=e.extend({targetID:"#str-sub-common",targetType:"nisa",sideBarName:"#fixed-sidebar"},t);e(n.targetID).each(function(){e(this).css({position:"relative"}).wrapInner('<div id="fixed-sidebar" style="width: 180px"></div>');var t=e("#grpheader").height()+5;var r=e("#nav-global").height()+10;var i=e("#topic-path").height()+7;if(n.targetType=="main"){var s=e("#str-search").height();var u=e("#str-search").next().children("p").height();var a=t+r+i+s+u}else if(n.targetType=="fx"){var s=e("#str-search").height();var a=t+r+i+s}else{var a=t+r+i}var f=e("#str-contents").height();var l=e(this).height(f);var c=e(window).height();e(window).scroll(function(){var t=e(window).scrollTop();var r=f-c;if(t<r&&t>a){e(n.sideBarName).css({position:"fixed",top:"0"})}else if(t>r-a){e(n.sideBarName).css({position:"absolute",top:"",bottom:"0"})}else if(t<a){e(n.sideBarName).css({position:"absolute",top:"0",bottom:""})}})});return this}})(jQuery)
