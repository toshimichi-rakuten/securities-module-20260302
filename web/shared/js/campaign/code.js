(function($){
    $(function() {
        var cp_code = $('#cp_code').text();
        $('.cp_link').each(function() {
            $(this).attr({
            'onclick':"sharedLinkPage.jumpPage(sharedLinkPage.villageCampAppInput + '\&campaignCd=" + cp_code + "' + getDisplayParam());return false;"
            });
        });
    });
})(jqBase);
