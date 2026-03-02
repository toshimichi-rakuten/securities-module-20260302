$(function () {
    var tabContainer = $('div.fund_tab div');
    tabContainer.hide().filter(':first').show();
    $('div.fund_tab ul.nav a').click(function () {
       tabContainer.hide();
       tabContainer.filter(this.hash).show();
       $('div.fund_tab ul.nav a').removeClass('selected');
       $(this).addClass('selected');
       return false;
    })
    .filter(':first').click();
});