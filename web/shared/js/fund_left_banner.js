$(function(){

var fundImgRan = [
		['https://www.rakuten-sec.co.jp/web/info/info20150615-01.html?l-id=fund_top_leftnavi_bnr_info20150615-01' , 'https://www.rakuten-sec.co.jp/web/images/banners/info20150615-02/200x60.png' , '楽天証券オリジナルファンドスコア誕生！'],
		['https://www.rakuten-sec.co.jp/web/market/opinion/fund/fund_picks/?l-id=fund_top_leftnavi_bnr_fund_picks' , 'https://www.rakuten-sec.co.jp/web/images/banners/market_opinion/fund_picks/200x50.png?0831' , '注目の投資信託 Fund Picks']
	];
var ran = Math.floor(Math.random()*fundImgRan.length);

$('#fund-top-left-banner').html('<a href="' + fundImgRan[ran][0] + '"><img src="' + fundImgRan[ran][1] + '" alt="' + fundImgRan[ran][2] + '"></a>');
});