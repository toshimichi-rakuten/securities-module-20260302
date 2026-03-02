/**
 * jquery.tabs.js
 * Ver 1.1.2 no cookie version
 * update 2017.1.6
 *
 * History
 * 2013.4.3
 * タブ6つまで対応できるように改修
 * 2017.1.6
 * jqBaseに対応、下層モジュール組み込み
 *
 */
function getUrlVars(){var e=[],t;var n=window.location.href.slice(window.location.href.indexOf("?")+1).split("#");for(var r=0;r<n.length;r++){t=n[r].split("=");e.push(t[0]);e[t[0]]=decodeURI(t[1])}return e}(function(e){e.fn.tabs=function(t){var n=e.extend({targetID:"#tab",tabElement:".tab-list li",boxElement:".tab-box",parmName:"tab",tabName01:"default",tabName02:"corporation",tabName03:"municipal",tabName04:"tab04"},t);e(n.tabElement,n.targetID).each(function(){e(this).css("cursor","pointer");if(e(this).is(":first-child")){e(this).addClass("is-active")}e(n.boxElement,n.targetID).not(":first").hide();e(this).click(function(){var t=e(n.tabElement,n.targetID).index(this);e(n.tabElement,n.targetID).removeClass("is-active");e(this).addClass("is-active");e(n.boxElement,n.targetID).hide().eq(t).fadeIn()})});var r=getUrlVars();if(n.parmName in r){key=decodeURI(r[n.parmName]);if(key==n.tabName02){e(n.tabElement,n.targetID).removeClass("is-active");e(n.tabElement,n.targetID).eq(1).addClass("is-active");e(n.boxElement,n.targetID).hide();e(n.boxElement,n.targetID).eq(1).fadeIn()}else if(key==n.tabName03){e(n.tabElement,n.targetID).removeClass("is-active");e(n.tabElement,n.targetID).eq(2).addClass("is-active");e(n.boxElement,n.targetID).hide();e(n.boxElement,n.targetID).eq(2).fadeIn()}else if(key==n.tabName04){e(n.tabElement,n.targetID).removeClass("is-active");e(n.tabElement,n.targetID).eq(3).addClass("is-active");e(n.boxElement,n.targetID).hide();e(n.boxElement,n.targetID).eq(3).fadeIn()}else if(key==n.tabName05){e(n.tabElement,n.targetID).removeClass("is-active");e(n.tabElement,n.targetID).eq(4).addClass("is-active");e(n.boxElement,n.targetID).hide();e(n.boxElement,n.targetID).eq(4).fadeIn()}else if(key==n.tabName06){e(n.tabElement,n.targetID).removeClass("is-active");e(n.tabElement,n.targetID).eq(5).addClass("is-active");e(n.boxElement,n.targetID).hide();e(n.boxElement,n.targetID).eq(5).fadeIn()}else{e(n.tabElement,n.targetID).removeClass("is-active");e(n.tabElement,n.targetID).eq(0).addClass("is-active");e(n.boxElement,n.targetID).not(":first").hide()}}return this}})(jqBase)
jqBase.fn.tabs({targetID:"div.s1-tab-01",tabElement:".s1-tab-01__list li",boxElement:".s1-tab-01__content"})
jqBase.fn.tabs({targetID:"div.s1-tab-02",tabElement:".s1-tab-02__list li",boxElement:".s1-tab-02__content"})
jqBase.fn.tabs({targetID:"div.s1-tab-03",tabElement:".s1-tab-03__list li",boxElement:".s1-tab-03__content"})