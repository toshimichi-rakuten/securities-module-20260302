/*
残存期間設定方法

1.対象ページ以下のjsを読み込む。
<script src="/web/shared/js/average.js" defer></script>
<script src="/web/shared/js/bond/s1-average.js" defer></script>

2.残存期間元になる日付(yyyy/m/d)を<span id=IN_hogehoge></span>※で囲み、
結果（x年xヵ月）を表示させる場所に<span id=OUT_hogehoge></span>※を配置する。

3.s1-average.jsの末尾に関数（inAverage('#IN_hogehoge');）※を記述する。

※hogehogeは任意の値

*/


function inAverage(inID){
  var str = $(inID).text();
  var strArr = [];
  var results = [];
  var dispID = inID.replace(/IN/g,'OUT');

  str = str.replace(/年/g,'/');
  str = str.replace(/月/g,'/');
  str = str.replace(/日/g,'');

  strArr = str.split('/');
  results =  {'dispID' : dispID , 'year' : strArr[0], 'month' : strArr[1] };

  $.fn.average(results);

}

inAverage('#IN_AAPL');
inAverage('#IN_DIS');
inAverage('#IN_JNJ');
inAverage('#IN_TNOTES');
inAverage('#IN_KO');