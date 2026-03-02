
$(function(){
    var path = location.pathname;
    var glovalFavorite = $('#grobal-favorite');
    var footerFavorite = $('#footer-favorite');
    var favoritePath = '/web/market/favorite/';
    var loopNum = 0;
    if(path == '/') return false;
    var arrPath = path.split('/');
    var subMenu = $('.sub-menu').find('a');
    searchFavorite(path);
    searchPath(path);
    function searchPath(path) {
        subMenu.each(function (index){
            if(index === 0 && loopNum >= 1) return true;
            var matchPath = $(this).attr('href');
            if (matchPath.match(path+'$')){
                $(this).addClass('selected');
                searchSelect(path);
                return false;
            }
            if (index == subMenu.length - 1) {
                arrPath.pop();
                if(arrPath.length ==2 ) return false;
                path = arrPath.join('/') + '/';
                loopNum += 1;
                searchPath(path);
            }
        });
    }
    
    function searchFavorite(path){
        if(path.match('/web/foreign/')) {
            if(path.match('web/foreign/china/')){
                glovalFavorite.attr('href',favoritePath+'china_list.html');
                footerFavorite.attr('href',favoritePath+'china_list.html');
            }else{
                glovalFavorite.attr('href',favoritePath+'us_list.html');
                footerFavorite.attr('href',favoritePath+'us_list.html');
            }
        }
        if(path.match('/web/fund/')) {
            glovalFavorite.attr('href',favoritePath+'fund_list.html');
            footerFavorite.attr('href',favoritePath+'fund_list.html');
        }
        if(path.match('/web/variety/covered_warrant/')){
            glovalFavorite.attr('href',favoritePath+'warrant_list.html');
            footerFavorite.attr('href',favoritePath+'warrant_list.html');
        }
    }
    function searchSelect(path){
        switch (path){
            case '/web/foreign/us/' :
            $('#search-item-us').attr("checked", true);
            break;
            case '/web/foreign/china/' :
            $('#search-item-china').attr("checked", true);
            break;
            case '/web/foreign/asean/' :
            $('#search-item-asean').attr("checked", true);
            break;
            case '/web/foreign/etf/' :
            $('#search-item-us').attr("checked", true);
            break;
            case '/web/foreign/' :
            $('#search-item-us').attr("checked", true);
            break;
        }
        if(path.match('/web/domestic/')) $('#search-item-domestic').attr("checked", true);
        if(path.match('/web/fund/')) $('#search-item-fund').attr("checked", true);
    }
});
    
$(function(){

    var searchBox = $('.search-box');
    var search = $('#form-search-stock-prices');
    var siteSearch =$('#MF_form_phrase');
    var searchItem = $('.search-box').find('input[name="search-item"]');
    var siteSearchFlag;
    $('#grobal-search-open').click(function(event) {
       searchBox.fadeIn();
    });
    $('#grobal-search-close').click(function(event) {
       searchBox.fadeOut();
    });
    search.focus(function(event){
        var value = $(this).val();
        $(this).css('color' , '#000000');
        if (value == '銘柄名/コード/ファンド名/キーワードを入力') $(this).val('');
    });
    search.change(function(event) {
        siteSearch.css('color' , '#000000');
    });
    siteSearch.change(function(event) {

        search.css('color' , '#000000');
    });
    search.blur(function(event){
        if ($(this).val().length === 0) {
            $(this).val('銘柄名/コード/ファンド名/キーワードを入力').css('color' , '#cccccc');
            siteSearch.css('color' , '#cccccc');
        }
    });
    siteSearch.focus(function(event){
        var value = $(this).val();
        $(this).css('color' , '#000000');
        if (value == '銘柄名/コード/ファンド名/キーワードを入力') $(this).val('').css('color' , '#000000');
    });
    siteSearch.blur(function(event){
        if ($(this).val().length === 0) {
            $(this).val('銘柄名/コード/ファンド名/キーワードを入力').css('color' , '#cccccc');
            search.css('color' , '#cccccc');
        }
    });
    searchItem.click(function(event) {
        if ($('#search-item-site').is(':checked')){
            siteSearch.val(search.val()).css('z-index','2');
            siteSearchFlag = true;
        }else if( siteSearchFlag === true){
            search.val(siteSearch.val());
            siteSearch.css('z-index','-1');
            siteSearchFlag = false;
        }
    });

});

