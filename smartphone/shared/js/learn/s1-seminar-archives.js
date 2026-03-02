function seminarJson(){
  var tempHeadSmn = '';
  var tempFootSmn = '';
  var strSmn = ''
  var tempHeadSmn0 = '<ul class="s1-list-info">';
  var tempFootSmn0 = '</ul>';
  var strSmn0 = ''
  var timestamp = $("#timestamp").text()
  //console.log(timestamp);
  $.ajax({
    async : false,
    url : "/web/learn/seminar/json/seminar.json",
    type : "get",
    dataType : "json",
    cache : false,
    success : function(data){
      for(let i=0; i < data.length; i++) {
        var n = data[i];
        
        //ラベル（tag配列処理など）
        var format = (n.format ==　"オンライン" ? '<span class="q1-seminar-label-color01">オンライン</span>' : '<span class="q1-seminar-label-color02">' + n.format + '</span>' );
        var tagArray = n.tag.split(',');
        var tag = '';
        for (let j = 0; j < tagArray.length; ++j) {
          tag = tag + '<span>' + tagArray[j] + '</span>';
        }
        var label = format + tag;

        //日付
        var date = n.date;
        var date0 = n.date;
        var date = date.replace(/(\d{4})年(.+)/g,'<span>$1年$2</span>');


        //講師
        var teacher = '';
        if(n.teacher != ''){
          var teacher = '<p class="fs-12 mt-half">講師：' + n.teacher.replace(/,/g,'<br>') + '</p>';
        }
        
        //申込ステータス
        var flagEtr = n.entry;
        var flagTime3 = n.time3 - timestamp;
        
        //書き出し（開催済のものだけ）
        if(flagTime3 < -1000000){
          strSmn0 = '<li class="s1-list-info__item"><div class="s1-list-info__content s1-list-info__content--time">'+date0+'</div><div class="s1-list-info__content"><a href="'+n.pcurl+'" data-ratid="seminar-archives-'+n.rat+'" data-ratevent="click" data-ratparam="all">'+n.title+'</a></div>' + strSmn0;
        }else if(flagTime3 < 0){
          strSmn = '<div class="s1-content-area s1-box-link-05"><a href="'+n.spurl+'" class="s1-box-link-05__item"><div><div class="s1-hdg-lv3"><h3 class="s1-hdg-lv3__element s1-hdg-lv3__element--seminar"><span>'+date+'<br>'+n.datetime+'</span></h3></div><div class="s1-box-link-05__media"><div class="img"><img src="'+n.path+'248x248.png"></div><div class="txt pl-10 pr-0"><div class="q1-seminar-label">'+label+'</div><p class="seminar--ttl">'+n.title+'</p>'+ teacher +'</div></div><!-- /.s1-box-link-05__media --></div></a></div>' + strSmn;
        }
      }
      strSmn0 = tempHeadSmn0 + strSmn0 + tempFootSmn0;
      strSmn = tempHeadSmn + strSmn + tempFootSmn;

      //画像置換処理
      // var rplBefore = ['せみなー','ほげほげ']
      // var rplAfter = ['セミナー','いやっぽい']
      
      // for(let k=0; k < rplBefore.length; k++){
      //   strSmn = strSmn.replace(new RegExp(rplBefore[k],'g'),rplAfter[k]);
      // }

      $("#data-json-seminar-1").append(strSmn);
      $("#data-json-seminar-2").append(strSmn0);
    }
  });  
}

seminarJson();