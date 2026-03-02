(function($){
    $(function(){
        //リンク先URL , 画像パス , alt , onclick
        //var footerImg = ['https://r10.to/sc2000_pr' , '/web/images/banners/ads_bank_20200323/350x90.png' , '【選ばれて900万口座突破！】楽天銀行口座開設と1万円以上入金でもれなく2,000ポイントプレゼント！' , 'visitor_footer_bnr_ads_bank'];
        var footerImg = ['https://www.rakuten-sec.co.jp/web/campaign/moneybridge/' , '/web/images/banners/moneybridge/350x90_02.png' , '楽天銀行と連携すると普通金利がメガバンクの100倍に！' , 'visitor_footer_bnr_moneybridge'];
        //var footerImg = ['https://r10.to/10million_pr' , '/web/images/banners/ads_bank_20210210/350x90.png' , '楽天銀行口座開設＆入金で1,500ポイントプレゼント！' , 'visitor_footer_bnr_ads_bank_20210210'];

        var footerImgRan = [
        //リンク先URL , 画像パス , alt , onclick
        //画像が1つの場合配列の最後（ [~~~~~~~] ）に , をいれないでください。jsのエラーがおきます。
            ['http://ad2.trafficgate.net/t/r/8232/1441/99636_99636/' , '/web/images/banners/ads_kc/350x90.gif' , '楽天カード新規入会でポイント' , 'visitor_footer_bnr_ads_kc']
            // ['http://img.travel.rakuten.co.jp/image/tr/userm/xu/37z03/' , '/web/images/banners/ads_travel/xu_350_90.gif' , '半額以下が満載！国内・海外旅行大セール！3月8日まで【楽天トラベル】'],
        ];
        var ran = Math.floor(Math.random()*footerImgRan.length);
        $('#str-footer').find('.footerBanner').eq(0).html('<div style="position:absolute;top:0;padding:0 4px;width:18px;background:#999;color:#fff;font-size:10px;font-weight:bold;text-align:center;line-height:10px;">PR</div>\n<div id="pitari_area_01" data-phoenix-securities_footer_card_pc><a style="margin-right:28px;"  onclick="s.lidTrack(\'' + footerImg[3] + '\')" href="' + footerImg[0] + '"><img src="' + footerImg[1] + '" alt="' + footerImg[2] + '"></a>\n<a onclick="s.lidTrack(\'' + footerImgRan[ran][3] + '\')" href="' + footerImgRan[ran][0] + '"><img src="' + footerImgRan[ran][1] + '" alt="' + footerImgRan[ran][2] + '"></a></div>');
        var prt_script = document.createElement('script');
        prt_script.src = '//www.rakuten.co.jp/com/advance/card/securities_footer_card/pc/8702/condition.js';
        document.head.appendChild(prt_script);

        var prt_script = document.createElement('script');
        prt_script.src = '//r.r10s.jp/com/ap/target/phoenix-2.10.0.min.js';
        document.head.appendChild(prt_script);
    });
})(window.jqBase || jQuery);



