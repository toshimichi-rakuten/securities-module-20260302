const s2= document.createElement("script");
s2.src="https://c.marsflag.com/mf/mfx/1.0-latest/js/mfx-sbox.js";
document.body.appendChild(s2);

const s3 = document.createElement("script");
s3.src="https://s.yjtag.jp/tag.js#site=X843wUn";
document.body.appendChild(s3);

(function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-5J8CZTV');