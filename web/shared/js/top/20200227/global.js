document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var megaMenu = document.getElementsByClassName('s3-rc-h-section-nav__megamenu');
    for (var i = 0; i < megaMenu.length; i++) {
        megaMenu[i].classList.add('s3-rc-h-section-nav__megamenu-tt');
    }
});
