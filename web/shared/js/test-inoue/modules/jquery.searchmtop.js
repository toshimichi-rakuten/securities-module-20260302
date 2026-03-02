(function ($) {

    $.fn.changeSearchResult = function(form) {
        var selectVal = (this.find('select')).val(),
            url = '',
            txt = '',
            isInvTrust = false;

        function isNumeric(num) {
            var numeric = '0123456789',
                i;

            if(num.length === 0){
                return true;
            }
            for(i=0;i<num.length;i++) {
                if(numeric.indexOf(num.charAt(i)) < 0) {
                    return false;
                }
            }
            return true;
        }

        function toRakutenSite(url) {
            window.location.assign(url);
        }

        switch(selectVal) {
            case 'srch_jp':    // 国内株式
                url = 'https://www.trkd-asia.com/rakutensec/resultcnt_ja.jsp?all=on&sector=na';
                break;
            case 'srch_us':    // 米株
                url = 'https://www.trkd-asia.com/rakutensec/resultcnt_us.jsp?all=on&vall=on&forwarding=na&target=0&theme=na&returns=na&head_office=na&sector=na';
                break;
            case 'srch_ch':    // 中国株
                url = 'https://www.trkd-asia.com/rakutensec/resultcnt_cn.jsp?all=on&catAll=on&forwarding=na&target=0&theme=na&returns=na&sector=na&pageNo=';
                break;
            case 'srch_as':    // アセアン株
                url = 'https://www.trkd-asia.com/rakutensec/resultcnt_asn.jsp?vall=on&forwarding=na&target=na&theme=na&returns=na&sector=na&c=asn&p=result&all=on&freeword=';
                break;
            case 'srch_fn':    // 投信
                isInvTrust = true;
                url = 'https://www.rakuten-sec.co.jp/web/fund/search/result.html?result=&sort=week_all_all%3Dup&count=9999&recsPerPage=20&condition2=&condition3=&tab=&condition1=';
                break;
        }

        if (isInvTrust) {
            var a = encodeURI('&s-search-text=' + document.forms[form].elements['s-search-text'].value),
                b = encodeURI('&result=' + 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2');
            txt = encodeURI('ファンド名称like*' + document.forms[form].elements['s-search-text'].value + '*');
            url += txt + a + b;
        } else {
            txt = encodeURI(document.forms[form].elements['s-search-text'].value);
            if (isNumeric(txt)) {
                url += '&code=' + txt;
            } else {
                url += '&name=' + txt;
            }
        }

        toRakutenSite(url);
    };

}(jqBase));
