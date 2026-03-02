function createInfo(){
  var tempHead = '<ul class="s1-list-info">';
	var tempFoot = '</ul>'
  var cnt = '0';
  var src = '';
  fetch("/web/fop/json/fop_info.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    for(let i=0; i < data.length; i++){
      var n = data[i];
      if(n.option_pc !== ''){
        if(cnt < 5){
          src = src + '<li class="s1-list-info__item"><div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--' +n.class+ '">'+n.label+'</span></div><div class="s1-list-info__content"><a href="' + n.urpc + '" data-ratid="option_info-' + n.slid + '" data-ratevent="click" data-ratparam="all">' + n.title + '</a></div></li>'
          cnt++;
        }
      }
    }
    if(src !== ""){
      src = tempHead + src + tempFoot;
      $("#data-json-info").replaceWith(src);
    }else{
      $("#data-json-info").remove();
    }
  });
}

createInfo();