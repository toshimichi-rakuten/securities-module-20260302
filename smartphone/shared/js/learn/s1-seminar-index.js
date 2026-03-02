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

    updateSeminars();
  });

  $('.seminar-filter__clear-btn').click(function() {
    $('.seminar-filter-flag__list li').removeClass('is-selected').find('i').remove();
    $('.s1-content-area.s1-box-link-05').removeClass('is-hidden');
    $('.s1-content-area.s1-box-link-05').removeClass('mb-0');
    selectedFlags = [];
  });

  function updateSeminars() {
    // 選択されているフラグがない場合、すべて表示
    if (selectedFlags.length === 0) {
      $('.s1-content-area.s1-box-link-05').removeClass('is-hidden');
      return;
    }
    
    $('.s1-content-area.s1-box-link-05').each(function() {
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
      // $('.s1-content-area.s1-box-link-05').removeClass('mb-0');
      // $('.s1-content-area.s1-box-link-05').last().addClass('mb-0');
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
        var format = (n.format ==　"オンライン" ? '<span class="q1-seminar-label-color01">オンライン</span>' : '<span class="q1-seminar-label-color02">' + n.format + '</span>' );
        var tagArray = n.tag.split(',');
        var tag = '';
        for (let j = 0; j < tagArray.length; ++j) {
          tag = tag + '<span>' + tagArray[j] + '</span>';
        }
        var label = format + tag;

        //日付
        var date = n.date;
        var date = date.replace(/(\d{4})年(.+)/g,'<span>$1年$2</span>');

        //講師
        var teacher = '';
        if(n.teacher != ''){
          var teacher = '<p class="fs-12 mt-half">講師：' + n.teacher.replace(/,/g,'<br>') + '</p>';
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
                timeStatus = '<span class="reception-closed">申込み<br>受付前</span>'
              }else{
                timeStatus = '<span class="accepting">申込み<br>受付中</span>'
              }
            }else{
              timeStatus = '<span class="reception-closed">申込み<br>受付終了</span>'
            }
          }else{
            timeStatus = '<span class="reception-closed">開催済</span>'
          }
        }else{
          timeStatus = '<span class="unnecessary">申込み<br>不要</span>'
        }
        
        //書き出し（開催前のものだけ）
        if(flagTime3 > 0){
          strSmn = strSmn + '<div class="s1-content-area s1-box-link-05" data-key="'+n.flag+'"><a href="'+n.spurl+'" class="s1-box-link-05__item"><div><div class="s1-hdg-lv3"><h3 class="s1-hdg-lv3__element s1-hdg-lv3__element--seminar"><span>'+date+'<br>'+n.datetime+'</span>'+timeStatus+'</h3></div><div class="s1-box-link-05__media"><div class="img"><img src="'+n.path+'248x248.png"></div><div class="txt pl-10 pr-0"><div class="q1-seminar-label">'+label+'</div><p class="seminar--ttl">'+n.title+'</p>'+ teacher +'</div></div><!-- /.s1-box-link-05__media --></div></a></div>';
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