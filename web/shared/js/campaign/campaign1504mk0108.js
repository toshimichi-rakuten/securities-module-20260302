function SharedLinkPage()
{
    this.jumpPage = function(page) {
        top.location = page;
    }
    this.villageCampAppInput = "http://devmw.rakuten-sec.co.jp/cgi-bin/CTS/Direct_Login.cgi?homeid=VILL_CAMP&campaignCd=1504mk0108";
    this.marginAccount="/web/domestic/margin/account.html";
};
function getDisplayParam() {
    return "";
}
var sharedLinkPage = new SharedLinkPage();
