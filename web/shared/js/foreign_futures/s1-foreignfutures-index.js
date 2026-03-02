function createInfo(){
  var str1 = ""
  var cnt1 = "0"
  var tempHead = '<ul class="s1-list-info">';
  var tempFoot = '</ul>';

  $.ajax({
    async : false,
    url : "/web/fop/json/fop_info.json",
    type : "get",
    dataType : "json",
    cache : false,
    success : function(data){
      for(var i=0; i < data.length; i++) {
        var n = data[i];
        if(n.foreign_futures_pc !== ''){
          if(cnt1 < 5){
            str1 = str1 +
            '<li class="s1-list-info__item">'+
            '<div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--' +n.class+ '">'+n.label+'</span></div>' +
            '<div class="s1-list-info__content"><a href="'+n.urpc+'" onclick="s.lidTrack(\'foreign_futures_info-'+n.slid+'\');" data-ratid="foreign_futures_info-'+n.slid+'" data-ratevent="click" data-ratparam="all">'+n.title+'</a></div></li>';
            cnt1++;
          }
        }
      }
      if(str1 !== ''){
        str1 = tempHead + str1 + tempFoot;
        str1 = str1.replace(/target=\"〇\"/g,' target=\"_blank\"')
        str1 = str1.replace(/target=\"×\"/g,'')
        $("#data-json-info").append(str1);
      }
    }
  });
}
createInfo();