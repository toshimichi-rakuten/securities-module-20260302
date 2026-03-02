// JavaScript Document カウントダウン表示します

myDay = myCountDown(2010,12,06);
if (myDay < -5)document.write(
'<div class="lyt-image image-col1-full">',
'<p class="image"><a href="/ITS/rakuten_g/?l-id=vtoprbnr_rakuten_g"><img width="372" height="245" border="0" alt="期間限定！口座開設するなら今！ポイントプレゼントキャンペーン実施中！" src="/web/images/index-main-12200-r02.jpg"></a></p>',
'</div>'
);
else if (myDay <= 0)document.write(
'<div class="lyt-image image-col1-full">',
'<p class="image"><a href="/ITS/rakuten_g/?l-id=vtoprbnr_rakuten_g"><img width="372" height="245" border="0" alt="期間限定！口座開設するなら今！ポイントプレゼントキャンペーン実施中！" src="/web/images/index-main-12200-r02-count',myDay*(-1),'.jpg"></a></p>',
'</div>'
);
else document.write(
'<div class="lyt-image image-col1-full">',
'<p class="image"><a href="/ITS/rakuten_g/?l-id=vtoprbnr_rakuten_g"><img width="372" height="245" border="0" alt="期間限定！口座開設するなら今！ポイントプレゼントキャンペーン実施中！" src="/web/images/index-main-12200-r02.jpg"></a></p>',
'</div>'
);