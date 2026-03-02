$(function(){
	$('.accordion_contents').hide();
	
	$('.accordion').click(function(){
		$('.accordion').next().slideUp('slow', 'jswing', function() {});
        if($(this).next().css('display') == 'none'){
			$(this).next().slideDown('slow', 'jswing', function() {});
//scroll
			var acoid = $(this).attr('id');
		    setTimeout(function(){
				var p = $('#'+acoid).offset().top;
				$('html,body').animate({ scrollTop: p }, { duration: 'slow', easing: 'jswing', });
			},600);
//scroll
		};
		
	});
});


//  additional rollover 20140203
var img=['images/recommend-accobtn1_off.gif,images/recommend-accobtn1_on.gif','images/recommend-accobtn2_off.gif,images/recommend-accobtn2_on.gif','images/recommend-accobtn3_off.gif,images/recommend-accobtn3_on.gif'];
var elm=[]; var o_idx=-1;
window.onload=function(){
var e=document.getElementsByTagName('IMG');
for (var i=0,j=0; i<e.length; i++) if (e[i].className=='group1') elm[j++]=e[i];
for (i=0; i<elm.length; i++){
elm[i].onmouseover=change(i,1);
elm[i].onmouseout=change(i,0);
elm[i].onclick=change(i,2);
}
}
function change(idx,n){
return function(){
if (n > 1){
if (o_idx > -1) elm[o_idx].src=img[o_idx].split(',')[0];
elm[idx].src=img[idx].split(',')[1];
o_idx=idx;
} else {
if (idx != o_idx) elm[idx].src=img[idx].split(',')[n];
}
};}
