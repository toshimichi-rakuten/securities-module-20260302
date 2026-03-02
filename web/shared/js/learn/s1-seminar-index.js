$(document).ready(function() {
  let selectedFlags = [];

  $('.seminar-filter-flag__list li').click(function() {
    const flag = $(this).data('flag');
    const index = selectedFlags.indexOf(flag);
    
    // フラグの選択状態をトグルする
    if (index > -1) {
      selectedFlags.splice(index, 1);
      $(this).removeClass('is-selected');
      $(this).find('i').remove();
    } else {
      selectedFlags.push(flag);
      $(this).addClass('is-selected');
      $(this).prepend('<i class="rex-icon-check"></i>');
    }

    // 表示されている要素から一旦すべてmb-0を削除
    $('.seminar-index-info').removeClass('mb-0');

    updateSeminars();
  });

  $('.seminar-filter__clear-btn').click(function() {
    $('.seminar-filter-flag__list li').removeClass('is-selected').find('i').remove();
    $('.seminar-index-info').removeClass('is-hidden');
    $('.seminar-index-info').removeClass('mb-0');
    selectedFlags = [];
  });

  function updateSeminars() {
    // 選択されているフラグがない場合、すべて表示
    if (selectedFlags.length === 0) {
      $('.seminar-index-info').removeClass('is-hidden');
      return;
    }
    
    $('.seminar-index-info').each(function() {
      const dataKey = parseInt($(this).data('key'));
      let show = false;
      
      // 選択されたフラグのいずれかが含まれているかを確認
      for (let flag of selectedFlags) {
        const key = Math.pow(2, flag);
        if (dataKey & key) {
          show = true;
          break;
        }
      }
      if (show) {
        $(this).removeClass('is-hidden');
      } else {
        $(this).addClass('is-hidden');
      }

      // 最後に表示されている要素にmargin-bottom: 0を適用
      $('.seminar-index-info:visible').last().addClass('mb-0');
    });
  }
});
function seminarJson(){
  var tempHeadSmn = '';
  var tempFootSmn = '';
  var strSmn = ''
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
        var flagTime2 = n.time2 - timestamp;
        var flagTime1 = n.time1 - timestamp;
        var timeStatus = ''
        //申込不要か判断
        if(flagEtr == '要申込'){
          //開催済か判断
          if(flagTime3 > 0){
            //受付終了か判断
            if(flagTime2 > 0){
              //受付中か判断
              if(flagTime1 > 0){
                timeStatus = '<span class="seminar-status seminar-status--off">申込み受付前</span>'
              }else{
                timeStatus = '<span class="seminar-status">申込み受付中</span>'
              }
            }else{
              timeStatus = '<span class="seminar-status seminar-status--off">申込み受付終了</span>'
            }
          }else{
            timeStatus = '<span class="seminar-status seminar-status--off">開催済</span>'
          }
        }else{
          timeStatus = '<span class="seminar-status seminar-status--unnecessary">申込み不要</span>'
        }
        
        //書き出し（開催前のものだけ）
        if(flagTime3 > 0){
          strSmn = strSmn + '<div class="seminar-index-info" data-key="'+n.flag+'"><a class="seminar-index-info__link" href="'+n.pcurl+'" data-ratid="seminar-index-'+n.rat+'" data-ratevent="click" data-ratparam="all"><div class="seminar-index-info__l">'+date+'<span>'+n.datetime+'</span>'+timeStatus+'</div><div class="seminar-index-info__c"><img src="'+n.path+'248x248.png" alt=""></div><div class="seminar-index-info__r"><div class="seminar-label">'+label+'</div><p class="seminar-index-info__hdg">'+n.title+'</p>'+ teacher +'</div></a></div>';
        }
      }
      strSmn = tempHeadSmn + strSmn + tempFootSmn;

      //画像置換処理
      // var rplBefore = ['せみなー','ほげほげ']
      // var rplAfter = ['セミナー','いやっぽい']
      
      // for(let k=0; k < rplBefore.length; k++){
      //   strSmn = strSmn.replace(new RegExp(rplBefore[k],'g'),rplAfter[k]);
      // }

      $("#data-json-seminar").append(strSmn);
    }
  });  
}

seminarJson();