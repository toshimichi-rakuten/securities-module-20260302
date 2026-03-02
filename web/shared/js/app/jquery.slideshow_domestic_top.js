/**
 *	jquery.slideshow.js
 *  Latest Version
 *  Ver 1.3
 *
 *	2013.7.01 オンマウスで画像が切り替わるように変更（サムネイル表示は廃止）
 *	2013.5.14 ループの後にappendするように変更
 *	2013.3.14 JSONをキャッシュさせないように変更
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

(function(e){e.fn.slideShow=function(t){var n=e.extend({targetID:"#rectangle-box",jsonFile:"/rectangle/top.json",bnrID:"#rectangle",navID:"#rectangle-nav",navBtnID:"#rectanle-btn",bnrWidth:372,bnrHeight:245,thumbWidth:100,thumbClass:".thumb",thumbDisp:false,thumbPos:0,delayTime:5000},t);e(n.targetID).each(function(){e(n.bnrID).append("<ul></ul>");e(n.navID).append("<ul></ul>");e.getJSON(n.jsonFile,{ts:(new Date).getTime()},function(t){function d(){if(s<i){s++;p.removeClass("selected").eq(s).addClass("selected");h.hide().removeClass("selected").eq(s).fadeIn("slow").addClass("selected")}else{p.removeClass("selected").eq(0).addClass("selected");h.hide().removeClass("selected").eq(0).fadeIn("slow").addClass("selected");s=0}}var r=t.length;var i=r-1;var s=0;var u=0;var a="";var f="";var l="";for(var c in t){a+='<li><a href="'+t[c].linkpath+'" onclick="s.lidTrack('+n.trackr+')"><img src="'+t[c].imagepath+'" width="'+n.bnrWidth+'" height="'+n.bnrHeight+'" alt="'+t[c].imagealt+'" /></a></li>';f+='<li id="'+n.navBtnID+c+'"><a href="'+t[c].linkpath+'" style="background-image: url('+t[c].buttonpath+');">btn'+c+"</a></li>";if(n.thumbDisp){l+='<div class="thumb" style="display: none;" id="thumb'+c+'" style="z-index: 20;"><img src="'+t[c].imagepath+'" width="'+n.thumbWidth+'" alt="" /></div>'}}e(n.bnrID).find("ul").html(a);e(n.navID).find("ul").html(f);e(n.navID).append(l);var h=e(n.bnrID).find("li");var p=e(n.navID).find("li");h.not(":first").hide().eq(0).addClass("selected");p.eq(0).addClass("selected");var v=setInterval(d,n.delayTime);p.bind("mouseover",function(){var t=p.index(this);p.removeClass("selected");h.removeClass("selected");e(this).addClass("selected");h.fadeOut().eq(t).addClass("selected").fadeIn();e(n.thumbClass).fadeOut();s=t;clearInterval(v);u=1});e(n.targetID).bind("mouseleave",function(){if(u==1){u=0;v=setInterval(d,n.delayTime)}})})});return this}})(jQuery)
