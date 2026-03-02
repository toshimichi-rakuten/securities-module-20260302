const s1 = document.createElement("img");



//fetch('https://stg.login.account.rakuten.com/sso/token?grant_type=authorization_code&code='+tokenCode+'&redirect_uri=https%3A%2F%2Fstgwww.rakuten%2Dsec.co.jp%2F&client_id=rakuten_securities_a_web', {
//			method: 'POST',
//			headers: {
//			'Content-Type': 'application/x-www-form-urlencoded',
//			'Authorization': 'Basic ' + btoa('rakuten_securities_a_web:123')
//			}
//})
//.then(response => response.json())
//.then(data => console.log('XXXX:', data))
//.catch(error => console.error('XXXXX:', error));


//var xhr = new XMLHttpRequest();
//xhr.open('POST', 'https://stg.login.account.rakuten.com/sso/token?grant_type=authorization_code&code='+tokenCode+'&redirect_uri=https%3A%2F%2Fstgwww.rakuten%2Dsec.co.jp%2F&client_id=rakuten_securities_a_web', true);
//xhr.setRequestHeader('Content-Length', '544');
//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//xhr.setRequestHeader('Authorization', 'Basic ' + btoa('rakuten_securities_a_web:123'));

//xhr.onreadystatechange = function() {
//  if (xhr.readyState === 4 && xhr.status === 200) {
//    var json = atob(xhr.responseText);
//    console.log(xhr.responseText);
//  }
//};
//xhr.send();

s1.src="https://grp01.xd.rakuten.co.jp/r/f15/t.gif";
document.body.appendChild(s1);


const s2 = document.createElement("script");
s2.src="https://c.marsflag.com/mf/mfx/1.0-latest/js/mfx-sbox.js"
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

(function () {
  var tagjs = document.createElement("script");
  var s = document.getElementsByTagName("script")[0];
  tagjs.async = true;
  tagjs.src = "//s.yjtag.jp/tag.js#site=X843wUn";
  s.parentNode.insertBefore(tagjs, s);
}());