function createInfo(){
  var tempHead = '<ul class="s1-list-info">';
	var tempFoot = '</ul>'
  var cnt = '0';
  var src = '';
  fetch("/web/shared/json/info/info_commodity.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < data.length; i++){
      var n = data[i];
      src = src + '<li class="s1-list-info__item"><div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--'+ n.label_en +'">'+ n.label +'</span></div><div class="s1-list-info__content"><a href="' + n.pc_url + '" '+(n.blank =="〇" ? 'target=\"_blank\" ' : '' )+'data-ratid="commodity_info-' + n.slid + '" data-ratevent="click" data-ratparam="all">' + n.txt + '</a></div></li>'
    }
    src = tempHead + src + tempFoot;
    $("#data-json-info").replaceWith(src);
  });
}

createInfo();