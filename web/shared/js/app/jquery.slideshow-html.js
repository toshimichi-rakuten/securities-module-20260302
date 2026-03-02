/**
 *	jquery.slideshow-html.js
 *  Latest Version
 *  Ver 1.0
 *
 *	2014.03.03 HTMLべた書き版リリース
 *
 */

(function(e){e.fn.slideShow=function(t){var n=e.extend({targetID:"#full-banner-box",jsonFile:"/rectangle/top.json",bnrID:"#full-banner",navID:"#full-banner-nav",navBtnID:"full-nav-btn-N",bnrWidth:575,bnrHeight:181,delayTime:5e3},t);e(n.targetID).each(function(){function f(){if(u<s){u++;r.removeClass("selected").eq(u).addClass("selected");t.hide().removeClass("selected").eq(u).fadeIn("slow").addClass("selected")}else{r.removeClass("selected").eq(0).addClass("selected");t.hide().removeClass("selected").eq(0).fadeIn("slow").addClass("selected");u=0}}var t=e(n.bnrID).find("li");var r=e(n.navID).find("li");var i=t.length;var s=i-1;var u=0;var a=0;t.not(":first").hide().eq(0).addClass("selected");r.eq(0).addClass("selected");var l=setInterval(f,n.delayTime);r.bind("mouseover",function(){var i=r.index(this);r.removeClass("selected");t.removeClass("selected");e(this).addClass("selected");t.fadeOut().eq(i).addClass("selected").fadeIn();e(n.thumbClass).fadeOut();u=i;clearInterval(l);a=1});e(n.targetID).bind("mouseleave",function(){if(a==1){a=0;l=setInterval(f,n.delayTime)}})});return this}})(jQuery)