const s1 = document.createElement("img");
s1.src="https://grp01.xd.rakuten.co.jp/r/f15/t.gif";
document.body.appendChild(s1);


const s2 = document.createElement("script");
s2.src="https://c.marsflag.com/mf/mfx/1.0/js/mfx-sbox.js"
document.body.appendChild(s2);

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