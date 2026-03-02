function SharedLinkPage()
{
    this.jumpPage = function(page) {
        top.location = page;
    }
    this.villageCampAppInput = "https://www.rakuten-sec.co.jp/cgi-bin/CTS/Direct_Login.cgi?homeid=VILL_CAMP";
    this.marginAccount="https://www.rakuten-sec.co.jp/web/domestic/margin/account.html";
};
function getDisplayParam() {
    return "";
}
var sharedLinkPage = new SharedLinkPage();
