$(function(){

var fundImgRan = [
		['https://www.rakuten-sec.co.jp/web/special/investor_z/?l-id=fund_saving_top_leftnavi_bnr_sp_investor_z' , 'https://www.rakuten-sec.co.jp/web/images/banners/sp_investor_z/200x90.png' , 'インベスターZでNISAと投信積立を学ぼう！'],
		['https://www.rakuten-sec.co.jp/nisa/campaign/nisa_fundpresent/?l-id=fund_saving_top_leftnavi_bnr_cp_nisa_fundpresent' , 'https://www.rakuten-sec.co.jp/web/images/banners/cp_nisa_fundpresent/200x91.gif' , 'NISA口座開設で投資信託を2,000円分プレゼント！']
	];
var ran = Math.floor(Math.random()*fundImgRan.length);

$('#fund-saving-top-left-banner').html('<a href="' + fundImgRan[ran][0] + '"><img src="' + fundImgRan[ran][1] + '" alt="' + fundImgRan[ran][2] + '"></a>');
});