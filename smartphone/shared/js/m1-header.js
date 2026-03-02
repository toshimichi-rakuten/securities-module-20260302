(function () {
        //// Show Menu for click on current menu if clicked again then hide menu.
        $('#dvExpandedMenu_1').click(function () {
            $('.rf-header-category-menu-inner.js-dvExpandedMenu_2').hide();
            $('.rf-header-category-menu-inner.js-dvExpandedMenu_3').hide();
            $('.rf-header-category-menu-inner.js-dvExpandedMenu_1').toggle();
        });

        $('#dvExpandedMenu_2').click(function () {
            $('.rf-header-category-menu-inner.js-dvExpandedMenu_1').hide();
            $('.rf-header-category-menu-inner.js-dvExpandedMenu_3').hide();
            $('.rf-header-category-menu-inner.js-dvExpandedMenu_2').toggle();
        });

        $('#dvExpandedMore').click(function () {
            $('.rf-header-category-menu-inner.js-dvExpandedMenu_2').hide();
            $('.rf-header-category-menu-inner.js-dvExpandedMenu_1').hide();
            $('.rf-header-category-menu-inner.js-dvExpandedMenu_3').toggle();
        });

        //// For showing menu on click of menu
        $('#liMenuModal').click(function (e) {
            $("body").addClass('rf-header-modal-open');
            e.stopImmediatePropagation();
        });

        //// On click of close button close menu.
        $('.rf-header-modal-close').click(function () {
            $("body").removeClass('rf-header-modal-open');
        });

        //// On click of page other than opened modal (ex.modal opened for menu) need to hide.
        $("body, .rf-header-backdrop").click(function (event) {
            if ($("body").hasClass('rf-header-modal-open')) {
                $("body").removeClass('rf-header-modal-open');
            }
        });

        //// on click of menu stop body click event
        $('#dvMenuModal').click(function (event) {
            event.stopPropagation();
        });
})();