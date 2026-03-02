/*
 * jquery.navigation.js
 *
 * Ver 1.2
 * ソースコードを簡略化
 * 4階層目もマッチするように改修
 *
 */

$(function(){var e=$("div#nav-local").find("ul").find("ul");var t=e.find("li");var n=location.pathname;var r=n.split("/");var i=r.slice(3,4);var s=r.slice(4,5);e.find("ul").hide();t.each(function(){var e=$(this).attr("ID");if(e==i){$(this).addClass("selected").children("ul").show()}});t.find("a").each(function(){var e=$(this).attr("href");if(e==n){$(this).parent("li").addClass("selected")}});e.find("li:last-child").addClass("last-child")})
