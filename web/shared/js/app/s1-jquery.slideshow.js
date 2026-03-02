/**
 *	jquery.slideshow.js
 *  Latest Version
 *  Ver 1.5
 *
 *	2013.12.09 ナビの背景をJSONから引っ張れる用に改修。thumbsDispなどのサムネイル関連のパラメータを完全排除
 *	2013.07.01 オンマウスで画像が切り替わるように変更（サムネイル表示は廃止）
 *	2013.05.14 ループの後にappendするように変更
 *	2013.03.14 JSONをキャッシュさせないように変更
 *
 *  #Code Sample
 *
 *  <div id="rectangle-box">
 *    <div id="rectangle-screen">
 *      <div id="rectangle"> </div>
 *    </div>
 *  <div id="rectangle-nav"> </div>
 *    <noscript>
 *      noscript contents
 *    </noscript>
 *  </div>
 *  <script type="text/javascript">
 *    $(function(){
 *      $.fn.slideShow({
 *        jsonFile: '/rectangle/top.json',
 *          thumbPos: -141
 *      });
 *    });
 *  </script>
 *
 */

(function(e){e.fn.slideShow=function(t){var n=e.extend({targetID:"#rectangle-box",jsonFile:"/rectangle/top.json",bnrID:"#rectangle",navID:"#rectangle-nav",navBtnID:"#rectanle-btn",bnrWidth:372,bnrHeight:245,delayTime:5000},t);e(n.targetID).each(function(){e(n.bnrID).append("<ul></ul>");e(n.navID).append("<ul></ul>");e.getJSON(n.jsonFile,{ts:(new Date).getTime()},function(t){function p(){if(s<i){s++;h.removeClass("selected").eq(s).addClass("selected");c.hide().removeClass("selected").eq(s).fadeIn("slow").addClass("selected")}else{h.removeClass("selected").eq(0).addClass("selected");c.hide().removeClass("selected").eq(0).fadeIn("slow").addClass("selected");s=0}}var r=t.length;var i=r-1;var s=0;var u=0;var a="";var f="";for(var l in t){a+='<li><a href="'+t[l].linkpath+'"><img src="'+t[l].imagepath+'" width="'+n.bnrWidth+'" height="'+n.bnrHeight+'" alt="'+t[l].imagealt+'" /></a></li>';f+='<li id="'+n.navBtnID+l+'"><a href="'+t[l].linkpath+'" style="background-image:url('+t[l].buttonpath+'); background-repeat: no-repeat;">btn'+l+"</a></li>"}e(n.bnrID).find("ul").html(a);e(n.navID).find("ul").html(f);var c=e(n.bnrID).find("li");var h=e(n.navID).find("li");c.not(":first").hide().eq(0).addClass("selected");h.eq(0).addClass("selected");var d=setInterval(p,n.delayTime);h.bind("mouseover",function(){var t=h.index(this);h.removeClass("selected");c.removeClass("selected");e(this).addClass("selected");c.fadeOut().eq(t).addClass("selected").fadeIn();e(n.thumbClass).fadeOut();s=t;clearInterval(d);u=1});e(n.targetID).bind("mouseleave",function(){if(u==1){u=0;d=setInterval(p,n.delayTime)}})})});return this}})(jqBase || jQuery)