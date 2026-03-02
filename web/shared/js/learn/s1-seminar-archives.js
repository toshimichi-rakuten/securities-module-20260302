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
        var format = (n.format ==　"オンライン" ? '<span class="seminar-label-color01">オンライン</span>' : '<span class="seminar-label-color02">' + n.format + '</span>' );
        var tagArray = n.tag.split(',');
        var tag = '';
        for (let j = 0; j < tagArray.length; ++j) {
          tag = tag + '<span>' + tagArray[j] + '</span>';
        }
        var label = format + tag;

        //日付
        var date = n.date;
        var date = date.replace(/(\d{4})年(.+)/g,'<span>$1年</span><span>$2</span>');

        //講師
        var teacher = '';
        if(n.teacher != ''){
          var teacher = '<p class="seminar-teacher">講師：' + n.teacher.replace(/,/g,'<br>') + '</p>';
        }
        
        //申込ステータス
        var flagEtr = n.entry;
        var flagTime3 = n.time3 - timestamp;
        //console.log(flagTime3)
        
        //書き出し（開催済のものだけ）
        if(flagTime3 < -1000000){
          strSmn0 = '<li class="s1-list-info__item"><div class="s1-list-info__content s1-list-info__content--time">'+date+'</div><div class="s1-list-info__content"><a href="'+n.pcurl+'" data-ratid="seminar-archives-'+n.rat+'" data-ratevent="click" data-ratparam="all">'+n.title+'</a></div>' + strSmn0;
        }else if(flagTime3 < 0){
          strSmn = '<div class="seminar-index-info"><a class="seminar-index-info__link" href="'+n.pcurl+'" data-ratid="seminar-archives-'+n.rat+'" data-ratevent="click" data-ratparam="all"><div class="seminar-index-info__l">'+date+'<span>'+n.datetime+'</span><span style="width:124px; display:block;">&nbsp;</span></div><div class="seminar-index-info__c"><img src="'+n.path+'248x248.png" alt=""></div><div class="seminar-index-info__r"><div class="seminar-label">'+label+'</div><p class="seminar-index-info__hdg">'+n.title+'</p>'+ teacher +'</div></a></div>' + strSmn;
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